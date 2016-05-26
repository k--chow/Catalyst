var mongoose = require('mongoose');

var couponSchema = new mongoose.Schema({
	name: String,
	description: String,
	date_expires: String,
	category: String,
	image: String,
});

module.exports = mongoose.model('Coupon', couponSchema);