checkWeekProgress();
//Check if progress is met this week
function checkWeekProgress()
{
	jQuery.ajax({
	type: 'GET',
	url: "http://localhost:3000/api/customers",
	success: function(data) {
		console.log(data);
	}
});

}

//check if entire goal is completed
function checkGoalCompletion()
{

}