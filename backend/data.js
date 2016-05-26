//var request = require('request');

// main(); 


// function main(){ 
// 	var url = "http://api.reimaginebanking.com/";
// 	var apikey = "c74704a10ae8cf22295670c1eead385f";
// 	console.log(url);
// 	var purchases = getPurchases(); 
// 	var category = determineCategory(purchases);
// }


// function getAllCustomers(){ 
// 	request(url + 'customers?key=' + apikey, function (error, response, body) {
// 		if (!error && response.statusCode == 200) {
//     console.log(body) // Show the HTML for the Google homepage. 
// }
// })
// }

// function getMerchants(){
// 	request(url + '/merchants?key=' + apikey, function (error, response, body) {
// 		if (!error && response.statusCode == 200) {
//     console.log(body) // Show the HTML for the Google homepage. 
// }
// })
// }

// http://api.reimaginebanking.com/accounts/574728a98a710f8e12324ee8/purchases?key=c74704a10ae8cf22295670c1eead385f
// function getPurchases(){ 
// 	console.log(url);
// 	console.log(url + "accounts/574728a98a710f8e12324ee8/purchases?key=" + apikey);
// 	 $.ajax({
//         url: url + "accounts/574728a98a710f8e12324ee8/purchases?key=" + apikey,
//         cache: false
//     }).done(function(swag)
//     {
//     	console.log(url + "accounts/574728a98a710f8e12324ee8/purchases?key=" + apikey);
//     });
// }

// // determines the category of the most amount of money spent within 10 weeks
// function determineCategory(purchases){ 
// 	//console.log(purchases);
// }


$(document).ready(function(){
	var url = "http://api.reimaginebanking.com/";
	var apikey = "c74704a10ae8cf22295670c1eead385f";
	$('#getCategoryButton').onClick(){ 
		$.ajax({
	        url: url + "accounts/574728a98a710f8e12324ee8/purchases?key=" + apikey,
	        cache: false
	    }).done(function(swag)
	    {
	    	console.log(swag);
	    });
	}
	$(document).on("click", "#getCategoryButton", function(){
		 $.ajax({
	        url: url + "accounts/574728a98a710f8e12324ee8/purchases?key=" + apikey,
	        cache: false
	    }).done(function(swag)
	    {
	    	console.log(swag);
	    });
	})
})






















