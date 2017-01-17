var express = require('express'),
    bodyParser = require('body-parser'),
    childProcess = require('child_process'),
    Constants = require('../js/values/constants'),
    cors = require('cors'),
    gmailLogin = require('../js/values/gmailLogin'),
    jwt = require('jsonwebtoken'),
    methodOverride = require('method-override'),
    morgan = require('morgan'),
    restful = require('node-restful');

var mongoose = restful.mongoose;

/**
 * express rest-api with node-restful
 * @type {express}
 */
var app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(methodOverride());
app.use(cors({origin:Constants.appPath}));

mongoose.connect("mongodb://localhost/kup");

var Schema = mongoose.Schema;

function getSendMailCommand(adress, subject, body){
  return "echo \""+body+"\" | mail -aFrom:noreply@kieback-peter.de -s \""+subject+"\" "+adress;
}

function requestHasToken(req){
  var token = req.headers.authorization.split(' ')[1];
  var secret = new Buffer('decodeString', 'base64');
  var x;
  jwt.verify(token, secret, function(err, decoded){
    if (decoded.access == 'true') {
      x =  true;
    }else x = false;
  });
  return true;
}
//authentication
app.use('/api', function(req, res, next){
  if (requestHasToken(req)) {
    next();
  }else{
    res.status(401).send('unauthorized');
  }
});

app.post('/authenticate', function(req, res){
  if(req.body.name=='Kasper'&&req.body.password=='pw'){
    auth = true;
    var tInfo = {
      name: 'Kasper',
      access: true,
    }
    var secret = new Buffer('decodeString', 'base64');
    var token = jwt.sign(tInfo, secret);
    res.status(200);
    res.json({
      success: true,
      message: 'hier dein token',
      token: token,
    });
  }else{
    res.status(401).send('unauthorized');
  }
});

var ItemModel = require('./models/Item.js');
ItemModel.methods(['get', 'post', 'put', 'delete']),
ItemModel.register(app, '/api/items');

var PhaseModel = require('./models/Phase.js');
PhaseModel.methods(['get', 'post', 'put', 'delete']),
PhaseModel.register(app, '//apiapi/phases');

var ProcessModel = require('./models/Process.js');
ProcessModel.methods(['get', 'post', 'put', 'delete']),
ProcessModel.register(app, '/api/processes');

var CommentModel = require('./models/Comment.js');
CommentModel.methods(['get', 'post', 'delete']),
CommentModel.register(app, '/api/comments');

function sendMail(adress, subject, body){
  const command = getSendMailCommand(adress, subject, body);
  console.log("execute: "+command);
  childProcess.exec(command);
}

app.post('/api/sendMail', function(_req, res){
  var req = _req.body;
  sendMail(req.adress, req.subject, req.body);
  res.send('hallo');
});

console.log('app listens at localhost:3000');
app.listen(3000);
