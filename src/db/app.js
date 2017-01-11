var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    morgan = require('morgan'),
    restful = require('node-restful'),
    cors = require('cors'),
    nodemailer = require('nodemailer'),
    gmailLogin = require('../js/values/gmailLogin'),
    mongoose = restful.mongoose;


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
app.use(cors({origin:'http://172.22.23.6:25555'}));

mongoose.connect("mongodb://localhost/kup");

var Schema = mongoose.Schema;

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
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: gmailLogin.user, // Your email id
      pass: gmailLogin.pass // Your password
    }
  });
  var mailOptions = {
    from: gmailLogin.user, // sender address
    to: adress, // list of receivers
    subject: subject, // Subject line
    text: body //, // plaintext body
    // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
  };
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      console.log(error);
      //res.json({yo: 'error'});
    }else{
      console.log('Message sent: ');
      //res.json({yo: info.response});
    };
  });
}

app.put('/sendMail', function(_req, res){
  var req = _req.body;
  sendMail(req.adress, req.subject, req.body);
});

console.log('app listens at localhost:3000');
app.listen(3000);
