//connection is the connection to the ewh database defined in server.js
//the following line of code exports the readings collection inside the ewh database
//module.exports allows us to pass this to other files when imported
var mongoose = require("mongoose");

// module.exports = connection.model('Reading', new mongoose.Schema({temperature : Number, turbidity : Number, conductivity : Number, magnesium : Number, calcium : Number, sodium : Number, pH : Number, timestamp : {type : Date, default: Date.now}, usage: Number}));

module.exports = connection.model('Customer', new mongoose.Schema({
	name: String, 
	income: Number, 
	goals: {percent: Number,start: String,end: String,weeks: Number},
	progress: Array,
	coupon: String,image: String }
	));

// module.exports = connection.model('Reading', new mongoose.Schema({temperature : Number, turbidity : Number, conductivity : [Number], pH : Number, timestamp : {type : Date, default: Date.now}, usage: Number}));

