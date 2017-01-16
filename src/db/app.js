var express = require('express'),
    bodyParser = require('body-parser'),
    childProcess = require('child_process'),
    Constants = require('../js/values/constants'),
    cors = require('cors'),
    gmailLogin = require('../js/values/gmailLogin'),
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



//authentication
app.use('/', function(req, res, next){
  
});

var ItemModel = require('./models/Item.js');
ItemModel.methods(['get', 'post', 'put', 'delete']),
ItemModel.register(app, '/items');

var PhaseModel = require('./models/Phase.js');
PhaseModel.methods(['get', 'post', 'put', 'delete']),
PhaseModel.register(app, '/phases');

var ProcessModel = require('./models/Process.js');
ProcessModel.methods(['get', 'post', 'put', 'delete']),
ProcessModel.register(app, '/processes');

var CommentModel = require('./models/Comment.js');
CommentModel.methods(['get', 'post', 'delete']),
CommentModel.register(app, '/comments');

function sendMail(adress, subject, body){
  const command = getSendMailCommand(adress, subject, body);
  console.log("execute: "+command);
  childProcess.exec(command);
}

function getSendMailCommand(adress, subject, body){
  return "echo \""+body+"\" | mail -aFrom:noreply@kieback-peter.de -s \""+subject+"\" "+adress;
}



app.post('/sendMail', function(_req, res){
  var req = _req.body;
  sendMail(req.adress, req.subject, req.body);
  res.send('hallo');
});

console.log('app listens at localhost:3000');
app.listen(3000);
