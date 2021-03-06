/** Dependencies **/
var express = require('express');
var mongoose = require('mongoose');

/** Instantiations **/
var app = express();

/** Configurations **/
/** Middleware **/
/** Routes **/
app.get('/', function (req, res) {
  res.send('Hello World!');
});

/** Boot Up **/
var server = app.listen(8000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
