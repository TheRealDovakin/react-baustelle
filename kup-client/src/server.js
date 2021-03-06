const compression = require('compression');
var express = require('express');
var path = require('path');

var app = express();

app.use(compression())
app.use(express.static(path.join(__dirname, 'public')));
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
});

var PORT = 5555;

app.listen(PORT, function(){
  console.log('Production Express server running at localhost:' + PORT)
});
