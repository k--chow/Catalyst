var mongoose = require('mongoose');

var customerSchema = new mongoose.Schema({
	name: String,
	income: Number,
	goals: {
		percent: Number,
    	start: String,
        end: String,
    	weeks: Number,
		},
	progress: {
		type: Array
	},
	coupon: String,
	image: String,
	


});

module.exports = mongoose.model('Customer', customerSchema);