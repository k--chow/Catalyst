checkWeekProgress("57473a6e53363c7d8bd618eb");
//Check if progress is met this week
function checkWeekProgress(id)
{
	jQuery.ajax({
	type: 'GET',
	url: "http://localhost:3000/api/customers",
	success: function(data) {
		var i;
		for(i=0; i<data.length; i++)
		{
			if (data[i]._id === id)
			{
				break;
			}
		}
		console.log(i);
		console.log(data);
	}
});

}

//check if entire goal is completed
function checkGoalCompletion()
{

}