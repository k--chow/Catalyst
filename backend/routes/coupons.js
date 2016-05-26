var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Coupon = require('../models/coupon.js');

router.route('/')
	.get(function(req, res) {
		Coupon.find(function(err, coupons) {
			if (err) res.send(err);
			res.json(coupons);
		});
	})

	.post(function(req, res) {

		var a = new Coupon();
		a.name = req.body.name;
		a.description = req.body.description;
		a.category = req.body.category;
		a.date_expires = req.body.date_expires;
		a.image = req.body.image;
		
		a.save(function(err) {
			if (err) return res.send(err);
			console.log(err);
		});
		res.json({message: 'Coupon created!'});
	})

	.delete(function(req, res) {
		Coupon.remove().exec();
		res.json({message: 'All coupons deleted!'});
	});


	module.exports = router;