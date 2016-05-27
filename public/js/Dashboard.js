var test; 	

$(document).ready(function() {
	// setTimeout(function() {
	// 	$( "#temperature" ).trigger( "click" );
	// }, 0);
 	// $('#myChart').createPH(200, 40, 7);
 	resetDB(function(res) {
	});
  update();
});

function update() {
	queue()
    .defer(d3.json, "/api/data/Consumer") //CHANGE
    // .defer(d3.json, "/api/data/Usage")
    // .defer(d3.json, "testCus.json")
    .await(makeGraphs);
}
update();
//SET TO UPDATE EVERY 10 SECONDS
//IN THE FUTURE SHOULD UPDATE BASED ON REAL TIME FOR WHEN THE DATA IS RECEIVED
setInterval(update, 100000000);

function getCurrent() {
	var current = document.getElementsByClassName("filter").value;
}

// var q = d3_queue.queue();
// q.defer(d3.json, "testCus.json");
// q.await(makeGraphs);


// function makeJson(cData){
// 	customerData = cData;
// 	makeGraphs();
// }

/********* pH Initialize function *********/ 
var goalScale;
function initGoalMeter(recentData, final, current) {
	current = Math.min(current, final);
	var padding = 10;
	var width = 800,
		height = 80;
	var indWidth = 2,
		indHeight = 50;

	var svg = d3.select("#goalMeter").append("svg")
		.attr("width", width)
		.attr("height", height);

	// Title/ Color of the behind
	var bar = svg.append("rect")
		.attr("x", padding)
		.attr("y", 20)
		.attr("rx", 5)
		.attr("ry", 5)
		.attr("width", width - 2 * padding)
		.attr("height", 20)
		.attr("fill", function() {
			return "#d3d3d3";
		})
		.attr("class", "staticBar");

	goalScale = d3.scale.linear().domain([0,final]).range([padding, width - 2 * padding]);
	
	var progressBar = svg.append("rect")
		.attr("x", padding)
		.attr("y", 20)
		.attr("rx", 5)
		.attr("ry", 5)
		.attr("width", goalScale(current))
		.attr("height", 20)
		.attr("fill", function() {
			return "green";
		})
		.attr("opacity", 0.7)
		.attr("class", "progressBar");

	var indicator = svg.append("rect")
		.attr("x", goalScale(current))
		.attr("y", 5)
		.attr("rx", 2)
		.attr("ry", 2)
		.attr("width", indWidth)
		.attr("height", indHeight)
		.attr("class", "movingBar");

	var goalText = svg.append("text")
		.attr("x", goalScale(current) - 14 )
		.attr("y", 70)
		.attr("class", "goalText")
		.text((current*100 / final) + "%");
}

function updateGoalMeter(recentData, final, current) {
	current = Math.min(current, final);
	padding = 10;
	width = 800;
	height = 80;
	indWidth = 2;
	indHeight = 50;
	indHeight = 50;
	goalScale = d3.scale.linear().domain([0,final]).range([padding, width - 2 * padding]);
	// currentVal = Math.min(current, final);
	d3.selectAll(".movingBar")
		.transition(1000)
		.attr("x", goalScale(current));
	progressBar = d3.selectAll(".progressBar")
		.transition(1000)
		.attr("width", goalScale(current) - padding);

	goalText = d3.selectAll(".goalText")
		.transition(1000)
		.attr("x", goalScale(current) - 14 )
		.attr("y", 70)
		.attr("class", "goalText")
		.text((current*100 / final) + "%");

}


function makeGraphs(error, customerData) {

/********* Start Transformations *********/ 

	// converts to Date object
	var parser = d3.time.format("%Y-%m-%d");
	customerData.forEach(function(d) {
		d.progress.forEach(function(week){
			week.start = parser.parse(week.start);
			week.current_balance = week.current_balance;
			week.expected_balance = week.expected_balance;
		})
	});

	// Get only progress data; data: 
	var data = [];
	customerData.forEach(function(d) {
		d.progress.forEach(function(week){
			data.push(week);
		})
	});
	//  Get most recent data
	var recentData = data[data.length-1];

	// couponData.forEach(function(d) {
	//   d.timestamp = parser.parse(d.timestamp);
	// });

/********* END *********/ 

/********* Create a Crossfilter instance and All *********/ 

	var customerProgress = crossfilter(data);
	var all = customerProgress.groupAll();

/********* END *********/ 

/********* Define Dimensions *********/ 
	// Dimensions are only for later filters (construct a dim on type and apply filters on type)

	// Later use dateDim to sort based on certain dates
	var dateDim = customerProgress.dimension(function (d) { return d.start; });
	var minDate = dateDim.bottom(1)[0].start;
	var maxDate = dateDim.top(1)[0].start;


	var format = d3.format(".3n");



/********* END *********/ 

/********* Groups *********/ 

	var currentBalance = dateDim.group().reduceSum(function (d) { 
		return d.current_balance; }); 
	var expectedBalance = dateDim.group().reduceSum(function (d) { 
		return d.expected_balance; }); 
	var currentWeek = dateDim.group().reduceSum(function (d) { return d.current_week; }); 

/********* END *********/ 

/********* Chart Declaration *********/ 

	var timeChart  = dc.barChart("#timeline");
	var lineChart = dc.compositeChart("#dc-line-chart");


	var lineW = 868;
	var lineH = 480;

/********* END *********/ 

/******* Overlayed line chart *******/

	// /********* Tool Tips *********/
	var tip = d3.tip()
      .attr('class', 'd3-tip')
      .html(function(d) { 
      	console.log(d);
      	return '<span> Goal Balance: $' + format(d.expected_balance) + '</span>' + "<br/>" + "Real Balance: $" + format(d.current_balance);
      })
      .offset([-12, 0])
	initGoalMeter(recentData, customerData[0].income, data[data.length-1].current_balance);

	lineChart
		.width(lineW)
	    .height(lineH)
	    .margins({top: 30, right: 50, bottom: 25, left: 60})
	    .brushOn(false)
	    .transitionDuration(1000)
	    .elasticY(true)
	    .yAxisLabel("Savings ($)")
	    .renderTitle(false)

	    .rangeChart(timeChart)
	    .x(d3.time.scale().domain([minDate, maxDate]))
	    .renderLabel(true)

	    .legend(dc.legend().x(700).y(397).itemHeight(13).gap(5))
	    .compose([
	    	dc.lineChart(lineChart)
	    	.dimension(dateDim)
	    	.colors("#E4572E")
	    	.group(expectedBalance, 'Expected Balance'),
	    	dc.lineChart(lineChart)
	    	.dimension(dateDim)
	    	.group(currentBalance, 'Current Balance'),
	    	])
	    .renderHorizontalGridLines(true)
	    .renderVerticalGridLines(true)
	    .on("renderlet", function(chart) {
	    	tip = d3.tip()
		      .attr('class', 'd3-tip')
		      .html(function(d) { 
		      	console.log(d);
		      	return '<span> Balance: $' + (d.y) + '<span>';
		      })
		      .offset([-12, 0])

		    lineChart.selectAll(".dot").call(tip);
			lineChart.selectAll(".dot").on('mouseover', tip.show)
			.on('mouseout', tip.hide);
	    });
  lineChart.render();

	timeChart
		.height(40)
		.width(868)
		.margins({top: 0, right: 50, bottom: 20, left: 60})
	    .dimension(dateDim)
	    .group(expectedBalance)
	    .centerBar(true)
	    .brushOn(true)
	    .round(d3.time.week.round)
	    .alwaysUseRounding(true)
	    .x(d3.time.scale()
	    .domain([minDate, maxDate]))
	    .showYAxis(false) // Self-defined changed dc.js
	timeChart.render();


/********** Status ***************/

	// Returns array of already parsed time
	// If dates are the same then return more current data

	$("#timeline").click( function () {
		date = timeChart.brush().extent();

		var dataSelcted = dateDim.top(Infinity);
		recentData = dataSelcted[0];
		updateGoalMeter(recentData, customerData[0].income, recentData.current_balance);
		$("#expectedCont").html("");
		$("#expectedCont").html("$" + recentData.expected_balance);
		$("#currentCont").html("");
		$("#currentCont").html("$" + recentData.current_balance);
	});

	// Reset if button is clicked
	$("a.reset").click( function() {
		recentData = data[data.length-1];
		updateGoalMeter(recentData, customerData[0].income, recentData.current_balance);
	});



/********* Draw Graphs *********/ 

   // dc.renderAll();
   // dc.redrawAll();

/********* END *********/ 
    lineChart.selectAll(".dot").call(tip);
    lineChart.selectAll(".dot").on('mouseover', tip.show)
        .on('mouseout', tip.hide);
	
};
/************************** Single Day Usage Bar Chart ***************************/
