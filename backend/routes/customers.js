var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Customer = require('../models/customer.js');

router.route('/')
	.get(function(req, res) {
		Customer.find(function(err, customers) {
			if (err) res.send(err);
			res.json(customers);
		});
	})

	.post(function(req, res) {

		var a = new Customer();
		a.name = req.body.name;
		a.income = req.body.income;
		a.goals = req.body.goals;
		a.progress = req.body.progress;
		a.coupon = req.body.coupon;
		a.image = req.body.image;
		a.save(function(err) {
			if (err) return res.send(err);
			console.log(err);
		});
		res.json({message: 'Customer created!'});
	})

	.delete(function(req, res) {
		Customer.remove().exec();
		res.json({message: 'All customers deleted!'});
	});
/*
router.route('/:customer_id')
    //get single event
	.get(function(req, res) {
		Customer.findById(req.params.customer_id, function(err, event) {
			if (err) res.send(err);
			//return event
			res.json(event);
		});
	})
	//update single customer
	.put(function(req, res) {
		// Event.findById(req.params.customer_id, function(err, event) {
		// 	if (err) res.send(err);
		// 	if (req.body.name) customer.name = req.body.name;
		// 	if (req.body.income) customer.income = req.body.income;
		// 	if (req.body.goals) customer.goals = req.body.goals;
		// 	if (req.body.progress) customer.progress = req.body.progress;
		// 	if (req.body.coupon) customer.coupon = req.body.coupon;
		// 	if (req.body.image) customer.image = req.body.image; 
	
		// 	event.save(function(err) {
		// 		if (err) res.send(err);
		// 		//return message
		// 		res.json({message: 'Event updated!'});
		// 	})
		// })
	})

	//update event's attribute not already there
	.post(function(req, res) {
		Event.findById(req.params.event_id, function(err, event) {
			if (err) res.send(err);
			//add to event
			if (req.body.name) event.name = req.body.name;
			if (req.body.location) event.location = req.body.location;
			if (req.body.description) event.description = req.body.description;
			if (req.body.passcode) event.passcode = req.body.passcode;
			if (req.body.date) event.date = req.body.date;
			if (req.body.latitude) event.latitude = req.body.latitude; 
			if (req.body.longitude) event.longitude = req.body.longitude;
			if (req.body.image) event.image = req.body.image;
			if (req.body.director) event.director = req.body.director;
			if (req.body.society) event.society = req.body.society;
			res.json({message: "Attribute added"});
		});
	})

	//delete a single event
	.delete(function(req, res) {
		Event.remove({
			_id: req.params.event_id}, function(err, event) {
				if (err) return res.send(err);
				res.json({message: 'Successfully deleted'});
			});
		});
	
	
*/

module.exports = router;