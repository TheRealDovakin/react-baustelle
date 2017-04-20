//js
const express = require('express'),
    bodyParser = require('body-parser'),
    childProcess = require('child_process'),
    Constants = require('../js/values/constants'),
    cors = require('cors'),
    debug = require('debug'),
    jwt = require('jsonwebtoken'),
    log4js = require('log4js');
    methodOverride = require('method-override'),
    moment = require('moment'),
    morgan = require('morgan'),
    restful = require('node-restful'),
    _ = require('underscore');
//own files
const aeconfig = require('../../../aeconfig'),
    admins = require('../../../admins'),
    DateUtils = require('../js/utils/DateUtils'),
    logUtils = require('../js/utils/logUtils'),
    features = require('../../../features'),
    dbLogic = require('../js/logic/db'),
    ldapLogic = require('../js/logic/ldap'),
    logaLogic = require('../js/logic/loga'),
    jwtConf = require('../../../jwtconfig'),
    placeholder = require('../js/logic/placeholder'),
    Strings = require('../js/values/strings_de');
//mongoose
const mongoose = restful.mongoose;
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
//stuff
var err = logUtils.err;

//////////////////////////////////////////////////////
///////////////////////DB-CONFIG//////////////////////
//////////////////////////////////////////////////////
const app = express();
const logger = log4js.getLogger('mongo-rest-api');
logger.setLevel('TRACE');
app.use(morgan('tiny', {
  'stream': {
     write:  function(str){
        logger.trace(str);
      }
    }
  }
));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(methodOverride());
app.use(cors({origin: [Constants.appPath+':8080', Constants.appPath] }));
mongoose.connect("mongodb://localhost/kup");

//////////////////////////////////////////////////////
///////////////////////FUNCTIONS//////////////////////
//////////////////////////////////////////////////////
function addLineToLog(req, decoded){
  const datetime = DateUtils.getExactDateAndTimeAsString(Date.now());
  const s = '['+datetime+'] method: '+req.method+' path: '+req.path+' person: '+decoded.name;
  const command = 'echo \''+s+'\' >> app.log';
  childProcess.exec(command);
}
function ae(req, res){
  var auth = req.headers.authorization;
  var routes = ['Adito', 'Baumanager'];
  var isRoute = _.contains(routes, req.params.phase);
  if(!isRoute) return err(logger, res, null, 403, '403 - route forbidden');
  if(!auth) return err(logger, res, null, 401, '401 - Missing authorization Header');
  if(!(auth==aeconfig.user)) return err(logger, res, null, 401, '401 - Wrong user or password');
	PhaseModel.findOne({
    process_id: req.params.id,
    name: req.params.phase
  },function(error, phase){
    if(error) return err(logger, res, error, 404);
    if(!phase) return err(logger, res, null, 404, 'Could not find element with this ID');
    PhaseModel.findOneAndUpdate(
      {_id: phase._id}, //condition
      {status: 2}, //change
      function(error){ if(error) return err(logger, res, error, 500); }
    );
    ItemModel.updateMany(
      {phase_id: phase._id},
      {status: 2},
      function(error){ if(error) return err(logger, res, error, 404); }
    );
    return res.status(200).send('Set '+req.params.phase+' to done');
  });
};



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
app.all('/api', function(req, res){
  res.send(
    '<h1> It works!</h1>'+
    '<h3>EPM REST-API</h3>'
  );
});
//HACK: #010 app.put() can't be reached
app.all('/api/ae/:phase/:id', function(req, res){ ae(req, res); });
app.post('/api/tut', function(req, res){
  res.send('hallo');
});
app.post('/api/authenticate', function(req, res){
  ldapLogic.authenticate(req, res, logger);
});
app.get('/api/check', function(req, res){
  if(features.checkIfItemsSeen) dbLogic.checkIfItemsSeen(res, logger, ItemModel);
  else res.status(501).send('function disabled');
});
app.use('/api/protected', function(req, res, next){
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
app.use('/api/protected/items', function(req, res, next){
  requestHasToken(req)
  .then(decoded => {
    if(req.method=='PUT'&&req.body.open!=undefined&&!decoded.admin){
      res.status(401).send('unauthorized');
      return;
    }else next();
  })
  .catch(err =>{
    res.status(401).send('unauthorized');
  });
});
app.get('/api/protected/ldap/:nr', function(req, res){
  ldapLogic.getPersonFromLdap(req, res, logger);
});
app.get('/api/protected/loga', function(req, res){
  logaLogic.getDataFromLoga().then(rows => {
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
app.post('/api/protected/sendDataToAe', function(req, res){
  if(features.sendDataToAe) placeholder.sendDataToAe(req, res, logger);
  else res.status(501).send('function disabled');
});
app.post('/api/protected/sendMail', function(_req, res){
  var req = _req.body;
  if(features.sendMailsWhenCreatingProcess){
    placeholder.sendMail(req.adress, req.subject, req.body, logger);
    res.status(200).send('Sending mail to: '+req.adress);
  }else res.status(501).send('Function disabled');
});

var CommentModel = require('./models/Comment.js');
CommentModel.methods(['get', 'post', 'delete']),
CommentModel.register(app, '/api/protected/comments');

var ItemModel = require('./models/Item.js');
ItemModel.methods(['get', 'post', 'put', 'delete']),
ItemModel.register(app, '/api/protected/items');

var PhaseModel = require('./models/Phase.js');
PhaseModel.methods(['get', 'post', 'put', 'delete']),
PhaseModel.register(app, '/api/protected/phases');

var ProcessModel = require('./models/Process.js');
ProcessModel.methods(['get', 'post', 'put', 'delete']),
ProcessModel.register(app, '/api/protected/processes');

var UserModel = require('./models/User.js');


console.log('app listens at localhost:3000');
app.listen(3000);
