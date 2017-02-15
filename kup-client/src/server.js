var express = require('express')
var path = require('path')
var compression = require('compression')
//var fs = require('fs');
//var http = require('http');
//var https = require('https');
//var privateKey  = fs.readFileSync('./res/host.key', 'utf8');
//var certificate = fs.readFileSync('./res/host.crt', 'utf8');
//
//var credentials = {key: privateKey, cert: certificate};

var app = express()

app.use(compression())

// serve our static stuff like index.css
app.use(express.static(path.join(__dirname, 'public')))

// send all requests to index.html so browserHistory works
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

var PORT = 5555;
//var httpServer = http.createServer(app);
//var httpsServer = https.createServer(credentials, app);
//httpServer.listen(81, function(){
//  console.log('Production Express http server running at localhost: 81')
//});
//httpsServer.listen(PORT, function(){
//  console.log('Production Express https server running at localhost:' + PORT)
//});

app.listen(PORT, function(){
  console.log('Production Express server running at localhost:' + PORT)
});
