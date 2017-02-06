var express = require('express'),
    bodyParser = require('body-parser'),
    childProcess = require('child_process'),
    Constants = require('../js/values/constants'),
    cors = require('cors'),
    DateUtils = require('../js/utils/DateUtils'),
    execPhp = require('exec-php'),
    gmailLogin = require('../js/values/gmailLogin'),
    jwt = require('jsonwebtoken'),
    methodOverride = require('method-override'),
    morgan = require('morgan'),
    restful = require('node-restful'),
    Strings = require('../js/values/strings_de'),
    _ = require('underscore'),
    mongoose = restful.mongoose;

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
this.ret = [];


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
  var oracledb = require('oracledb');
  var config = require('../../dbconfig.js');
  var ret;
  return new Promise((resolve, reject) => {
    oracledb.getConnection(
      {
        user          : config.name,
        password      : config.pw,
        connectString : config.qstring,
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
  //childProcess.exec(command);
}

function requestHasToken(req){
  var token = req.headers.authorization.split(' ')[1];
  var secret = new Buffer('decodeString', 'base64');
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

app.post('/authenticate', function(req, res){
  UserModel.findOne({email: req.body.name}, function(err, user){
    if(!user){
      res.status(401).send('unauthorized');
      return;
    }else{
      if(user.password==req.body.password){
        var tInfo = {
          name: user.name,
          access: true,
          admin: user.admin,
        };
        var secret = new Buffer('decodeString', 'base64');
        var token = jwt.sign(tInfo, secret);
        res.status(200);
        res.json({
          success: true,
          displayName: user.name,
          message: 'hier dein token',
          token: token,
        });
      }
    }
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
        person_name:x[2]+' '+x[1],
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
