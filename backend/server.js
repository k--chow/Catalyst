var express = require('express');
var app = express();
var path = require('path');
var router = express.Router();
var port = app.listen(process.env.PORT || 3000);
var mongoose = require('mongoose');
//var cors = require('cors');
var bodyParser = require('body-parser');
var morgan = require('morgan');
mongoose.connect('mongodb://localhost/capitalone', function(err) {
  if (err) {
    console.log('connection error', err);
  } else {
    console.log('connection successful');
  }
});

//use body parser to grab info from POST requets
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



var customers = require('./routes/customers')

router.use(function(req, res, next) {
	console.log(req.method, req.url);
	next();
});

router.get('/', function(req, res) {
	res.send('I am the dashboard!');
});

app.use('/api', router);
app.use('/api/customers', customers);

app.listen(port);
console.log('3000 is da port, also follow me on github k--chow');