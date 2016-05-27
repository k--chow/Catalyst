
$(document).ready(function() {
  $.ajax({
    url: "../coupon.json",
    data:data})
    .done( function(result){
      data = jQuery.parseJSON(result);
      console.log(data);
      data.forEach(function(d){
        console.log(d);
      })
      console.log(data[0]._id);
  });


});