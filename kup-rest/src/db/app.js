//js
var express = require('express'),
    bodyParser = require('body-parser'),
    childProcess = require('child_process'),
    Constants = require('../js/values/constants'),
    cors = require('cors'),
    DateUtils = require('../js/utils/DateUtils'),
    jwt = require('jsonwebtoken'),
    ldap = require('ldapjs');
    LdapAuth = require('ldapauth-fork'),
    methodOverride = require('method-override'),
    morgan = require('morgan'),
    oracledb = require('oracledb'),
    restful = require('node-restful'),
    _ = require('underscore');

//own files
var features = require('../../../features');
    ldapConf = require('../../../ldapconfig'),
    jwtConf = require('../../../jwtconfig'),
    oracleDbConfig = require('../../../dbconfig.js'),
    Strings = require('../js/values/strings_de');

var mongoose = restful.mongoose;
mongoose.Promise = global.Promise;

//////////////////////////////////////////////////////
///////////////////////DB-CONFIG//////////////////////
//////////////////////////////////////////////////////
var app = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(methodOverride());
app.use(cors({origin:Constants.appPath}));
mongoose.connect("mongodb://localhost/kup");
var Schema = mongoose.Schema;


//////////////////////////////////////////////////////
///////////////////////FUNCTIONS//////////////////////
//////////////////////////////////////////////////////
function addLineToLog(req, decoded){
  const datetime = DateUtils.getExactDateAndTimeAsString(Date.now());
  const s = '['+datetime+'] method: '+req.method+' path: '+req.path+' person: '+decoded.name;
  const command = 'echo \''+s+'\' >> app.log';
  childProcess.exec(command);
}

function getDataFromLoga(){
  var self = this;
  var ret;
  return new Promise((resolve, reject) => {
    oracledb.getConnection(
      {
        user          : oracleDbConfig.name,
        password      : oracleDbConfig.pw,
        connectString : oracleDbConfig.qstring,
      },
      function(err, connection)  {
        if (err) {
          console.error(err.message);
          return reject(err);
        }
        connection.execute(
          "select * from kp_einstellung_workflow",
          function(err, result)  {
            if (err) {
              console.error(err.message);
              doRelease(connection);
              return reject(err);
            }
            doRelease(connection);
            return resolve(result.rows);
          }
        );
      }
    );
  });
}

function doRelease(connection){
  connection.close(
    function(err) {
      if (err) {
        console.error(err.message);
      }
    }
  );
}


function getSendMailCommand(adress, subject, body){
  return "echo \""+body+"\" | mail -aFrom:noreply@kieback-peter.de -s \""+subject+"\" "+adress;
}

function sendMail(adress, subject, body){
  const command = getSendMailCommand(adress, subject, body);
  console.log('Mail to: '+adress);
  if(features.sendMailsWhenCreatingProcess) childProcess.exec(command);
}

function requestHasToken(req){
  if(req.headers.authorization){
    var token = req.headers.authorization.split(' ')[1];
    var secret = new Buffer(jwtConf.encodeString, 'base64');
  }
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, function(err, decoded){
      if(err){
        return reject(err);
      }
      return resolve(decoded);
    });
  });
}

//////////////////////////////////////////////////////
///////////////////////ROUTES/////////////////////////
//////////////////////////////////////////////////////
//authentication
app.use('/api', function(req, res, next){
  requestHasToken(req)
  .then(decoded => {
    addLineToLog(req, decoded);
    if(req.method == 'DELETE'){
      if(decoded.admin) next();
      else res.status(401).send('unauthorized');
      return;
    }
    if (decoded.access) next();
    else res.status(401).send('unauthorized');
  })
  .catch(err =>{
    res.status(401).send('unauthorized');
  });
});
app.get('/', function(req, res){
  res.send(
    '<h1> it works!</h1>'+
    '<h3>K&P REST-API</h3>'
  );
});
app.post('/authenticate', function(req, res){
  var options = {
    url: ldapConf.url,
    bindDn: ldapConf.dn,
    bindCredentials: ldapConf.pw,
    searchBase: 'ou=IT,ou=User,ou=Zentrale,dc=kiebackpeter,dc=kup',
    searchFilter: '(mail='+req.body.name+')',
    reconnect: true,
  };
  var auth = new LdapAuth(options);
  auth.on('error', function (err) {
    console.error('LdapAuth: ', err);
  });
  auth.authenticate(req.body.name, req.body.password, function(err, user) {
    if(err){
      console.log(err);
      res.status(401).send('unautherized: ' + err);
      return;
    }
    var isAdmin = user.employeeNumber==10921;
    var tInfo = {
      name: user.name,
      access: true,
      admin: isAdmin,
    };
    var secret = new Buffer(jwtConf.encodeString, 'base64');
    var token = jwt.sign(tInfo, secret, { expiresIn: jwtConf.expire });
    res.status(200);
    res.json({
      success: true,
      displayName: user.name,
      message: 'hier dein token',
      token: token,
    });
  });
  auth.close(function(err) {
    console.log('ldapAuth on close error'+err);
  });
});

app.get('/api/ldap/:nr', function(req, res){
  var x = res;
  var client = ldap.createClient({
    url: ldapConf.url,
    reconnect: true,
  });
  client.bind(ldapConf.dn, ldapConf.pw, function(err) {
    if(err) console.log(err);
  });
  var opts = {
    filter: '(employeeNumber='+req.params.nr+')',
    scope: 'sub',
    attributes: ['name', 'mail', 'title', 'employeeNumber', 'department', 'l'],
  };
  client.on('error', function(err) {
    console.warn('LDAP connection failed, but fear not, it will reconnect OK', err);
  });
  client.search('ou=IT,ou=User,ou=Zentrale,dc=kiebackpeter,dc=kup', opts, function(err, res) {
    if(err) console.log(err);
    function lul(){
      return new Promise((reject, resolve) => {
        res.on('searchEntry', function(entry) {
          x.json(entry.object);
          return resolve('');
        })
        res.on('searchReference', function(referral) {
          return resolve('');
        })
        res.on('error', function(err) {
          x.status(400);
          x.json(err.message);
          return resolve('');
        });
      });
    }
    lul().then(y => {
      client.unbind(function(err) {
        if(err) console.log(err);
      });
      client.destroy();
    });
  });
});

app.post('/api/sendMail', function(_req, res){
  var req = _req.body;
  sendMail(req.adress, req.subject, req.body);
  res.send('hallo');
});

app.get('/api/loga', function(req, res){
  getDataFromLoga().then(rows => {
    var array = [];
    var i = 0;
    for(var i = 0; i<rows.length; i++){
      var x = rows[i];
      var y = {
        status: 1,
        person_name:x[1]+', '+x[2],
        person_nr: x[0],
        short: x[3],
        job: x[4],
        place: x[5],
        department: x[6],
        due_date: x[10],
        p_type: x[11],
      }
      array.push(y);
      i++;
    }
    res.json(array);
  });
});

var ItemModel = require('./models/Item.js');
ItemModel.methods(['get', 'post', 'put', 'delete']),
ItemModel.register(app, '/api/items');

var PhaseModel = require('./models/Phase.js');
PhaseModel.methods(['get', 'post', 'put', 'delete']),
PhaseModel.register(app, '/api/phases');

var ProcessModel = require('./models/Process.js');
ProcessModel.methods(['get', 'post', 'put', 'delete']),
ProcessModel.register(app, '/api/processes');

var CommentModel = require('./models/Comment.js');
CommentModel.methods(['get', 'post', 'delete']),
CommentModel.register(app, '/api/comments');

var UserModel = require('./models/User.js');


console.log('app listens at localhost:3000');
app.listen(3000);
