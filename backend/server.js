var express = require('express');
var app = express();
var path = require('path');
var router = express.Router();
var port = app.listen(process.env.PORT || 3000);
var mongoose = require('mongoose');
//var cors = require('cors');
var bodyParser = require('body-parser');
var morgan = require('morgan');

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
});