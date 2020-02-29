var express = require('express');
var app = express();

app.use(express.static(__dirname + '/www'));

var port = process.env.PORT || 3000;

app.listen(port);
console.log('working on port ' + port);