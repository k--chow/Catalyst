var mongoose = require('mongoose');

var couponSchema = new mongoose.Schema({
	name: String
});

module.exports = mongoose.model('Coupon', couponSchema);