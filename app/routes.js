//importing our Customer model, which has a predefined schema you can see in Customers.js
var mongoose       = require('mongoose');
var Customer        = require('./models/Customer.js');
var Coupon          = require('./models/Coupon.js');
// var data           = require('./testCus.json');
var bodyParser     = require('body-parser');

// var data = {
// "Customers": [
//   {
//     "_id": "1sd",
//     "name": "Kevin Chow",
//     "income": 5000.00,
//     "goals": {
//       "percent": 10,
//       "start": "2016-06-12",
//       "end": "2016-08-21",
//       "weeks": 10,
//     },
//     "progress": [
//         {
//           "current_week": 1,
//           "start": "2016-06-12",
//           "expected_balance": 500.00,
//           "current_balance": 525.00
//         },
//         {
//           "current_week": 2,
//           "start": "2016-06-19",
//           "expected_balance": 1000.00,
//           "current_balance": 1008.00
//         }, 
//         {
//           "current_week": 3,
//           "start": "2016-06-26",
//           "expected_balance": 1500.00,
//           "current_balance": 1350.00
//         },
//         {
//           "current_week": 4,
//           "start": "2016-07-03",
//           "expected_balance": 2000.00,
//           "current_balance": 1923.00
//         },
//         {
//           "current_week": 5,
//           "start": "2016-07-10",
//           "expected_balance": 2500.00,
//           "current_balance": 2604.00
//         },
//         {
//           "current_week": 6,
//           "start": "2016-07-17",
//           "expected_balance": 3000.00,
//           "current_balance": 3478.00
//         },
//         {
//           "current_week": 7,
//           "start": "2016-07-24",
//           "expected_balance": 3500.00,
//           "current_balance": 3833.00
//         },
//         {
//           "current_week": 8,
//           "start": "2016-07-31",
//           "expected_balance": 4000.00,
//           "current_balance": 4200.00
//         },
//         {
//           "current_week": 9,
//           "start": "2016-08-07",
//           "expected_balance": 4500.00,
//           "current_balance": 4350.00
//         },
//         {
//           "current_week": 10,
//           "start": "2016-08-14",
//           "expected_balance": 5000.00,
//           "current_balance": 5053.00
//         }
//       ],
//     "coupons": "1ab",
//     "image": "https://pbs.twimg.com/profile_images/616043541815386112/i7FxHNpE.jpg"
//   }
// ],
// "Coupons": [
//   {
//     "_id": "1ab",
//     "name": "Chipotle",
//     "category": "Food",
//     "expiration_date": "2016-05-29",
//     "description": "Buy one get one free.",
//     "image": "https://pbs.twimg.com/profile_images/616043541815386112/i7FxHNpE.jpg"

//   },

//   {
//     "_id": "1ab",
//     "name": "Chipotle",
//     "category": "Food",
//     "expiration_date": "2016-05-29",
//     "description": "Buy one get one free.",
//     "image": "https://pbs.twimg.com/profile_images/616043541815386112/i7FxHNpE.jpg"

//   }

// ]
// }
var coupon = [ {
    "_id": "1ab",
    "name": "Chipotle",
    "category": "Food",
    "expiration_date": "2016-05-29",
    "description": "Buy one get one free.",
    "image": "https://pbs.twimg.com/profile_images/616043541815386112/i7FxHNpE.jpg"

  },
  {
    "_id": "1ab",
    "name": "Chipotle",
    "category": "Food",
    "expiration_date": "2016-05-29",
    "description": "Buy one get one free.",
    "image": "https://pbs.twimg.com/profile_images/616043541815386112/i7FxHNpE.jpg"

  } ];
var data = {
    "_id": "1sd",
    "name": "Kevin Chow",
    "income": 5000.00,
    "goals": {
      "percent": 10,
      "start": "2016-06-12",
      "end": "2016-08-21",
      "weeks": 10,
    },
    "progress": [
        {
          "current_week": 1,
          "start": "2016-06-12",
          "expected_balance": 500.00,
          "current_balance": 525.00
        },
        {
          "current_week": 2,
          "start": "2016-06-19",
          "expected_balance": 1000.00,
          "current_balance": 1008.00
        }, 
        {
          "current_week": 3,
          "start": "2016-06-26",
          "expected_balance": 1500.00,
          "current_balance": 1350.00
        },
        {
          "current_week": 4,
          "start": "2016-07-03",
          "expected_balance": 2000.00,
          "current_balance": 1923.00
        },
        {
          "current_week": 5,
          "start": "2016-07-10",
          "expected_balance": 2500.00,
          "current_balance": 2604.00
        },
        {
          "current_week": 6,
          "start": "2016-07-17",
          "expected_balance": 3000.00,
          "current_balance": 3478.00
        },
        {
          "current_week": 7,
          "start": "2016-07-24",
          "expected_balance": 3500.00,
          "current_balance": 3833.00
        },
        {
          "current_week": 8,
          "start": "2016-07-31",
          "expected_balance": 4000.00,
          "current_balance": 4200.00
        },
        {
          "current_week": 9,
          "start": "2016-08-07",
          "expected_balance": 4500.00,
          "current_balance": 4350.00
        },
        {
          "current_week": 10,
          "start": "2016-08-14",
          "expected_balance": 5000.00,
          "current_balance": 5053.00
        }
      ],
    "coupons": "1ab",
    "image": "https://pbs.twimg.com/profile_images/616043541815386112/i7FxHNpE.jpg"
  };

module.exports = function(app) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes	
	// sample api route

var new_load = new Array();

//this should be how we add to the database from now on
/*
app.use(bodyParser.json());
app.use(bodyParser.urlEncoded({extended: true}));
*/
app.post('/load/Customer', function(req, res) {
  var new_load = req.body;
  var return_string = "success";
  Customer.create(new_load, function(err, added) {
    if(err)
      res.send(err);
    res.json(added);
  });
});

app.post('/load/Coupon', function(req, res) {
  var new_load = req.body;
  var return_string = "success\n";
  Coupons.create(new_load, function(err, added) {
    if(err)
      res.send(err);
    res.json(added);
  });
});
/**
 * Handles the server request to retrieve n records from the database
 * Returns n records from the database... i hope these are most recent
 */
app.post('/api/data/Customer', function(req, res) {
  var n = parseInt(req.body.data);

  Customer.find().limit(n).exec(function(err, CustomerDetails) {
   // if there is an error retrieving, send the error. 
   // nothing after res.send(err) will execute
    if (err) 
    res.send(err);
      res.json(CustomerDetails); // return all nerds in JSON format
  });
});

/**
 * Handles the server request to retrieve n records from the database
 * Returns n records from the database... i hope these are most recent
 */
app.post('/api/data/Coupon', function(req, res) {
  var n = parseInt(req.body.data);

  Coupons.find().sort({timestamp : -1}).limit(n).exec(function(err, CustomerDetails) {
   // if there is an error retrieving, send the error. 
   // nothing after res.send(err) will execute
    if (err) 
    res.send(err);
      res.json(CustomerDetails); // return all nerds in JSON format
  });
});

app.get('/reset', function(req, res) {
  /* To remove all data points in the thing */
  Customer.remove(function(err) {
    if(err)
      handleError(err);
  });
  Coupon.remove(function(err) {
    if(err)
      handleError(err);
  });
  
  //loads json from our current data file just as a test of json
  //this will not be necessary at all when the app.post function is
  //uncommented and working
  for(i = 0; i < 1; i++) {
    Customer.create({
      name: data.name,
      income: data.income,
      goals: data.goals,
      progress: data.progress
    });
  }
  for(i = 0; i < 2; i++) {
    Coupon.create({
      name: coupon[i].name,
      category: coupon[i].category, 
      expiration_date: coupon[i].expiration_date,
      progress: coupon[i].progress,
      description: coupon[i].description,
      image: coupon[i].image
    });
  }


  res.send("success");
});

app.get('/api/data/Consumer', function(req, res) {
  // use mongoose to get all nerds in the database
  Customer.find(function(err, CustomerDetails) {
   // if there is an error retrieving, send the error. 
   // nothing after res.send(err) will execute
   if (err) 
    res.send(err);
  res.json(CustomerDetails); // return all nerds in JSON format
  });
});

app.get('/api/data/Coupon', function(req, res) {
  // use mongoose to get all nerds in the database
  Coupon.find(function(err, CouponsDetails) {
   // if there is an error retrieving, send the error. 
   // nothing after res.send(err) will execute
   if (err) 
    res.send(err);
  res.json(CouponsDetails); // return all nerds in JSON format
  });
});



 // frontend routes =========================================================
 app.get('*', function(req, res) {
  res.sendfile('./public/login.html');
 });
}