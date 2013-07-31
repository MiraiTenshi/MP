window.onload = function(){
	var current_date=new Date();
	var dataset = [];
	/* document.getElementById("start_date").value=current_date.getDate().toString()+"-"+(current_date.getMonth()+1).toString()+"-"+current_date.getFullYear().toString());
	document.getElementById("end_date").value=document.getElementById("start_date").value; */
  }

format = function(x) {
	return x[2]+"."+x[1]+'.'+x[0];
}

function is_leap_year(year) {
	if (year%400 === 0) {return True}
	else if (year%4 === 0 && year%100 !==0) {return True}
	else {return False}
}

function month_length(m, y) {
	if (m===1 || m===3 || m===5 || m===7 || m===8 || m===10 || m===12){return 31}
	else if (m===4 || m===6 || m===9 || m===11) {return 30}
	else if (m===2){
			if (is_leap_year(y)===True) {return 29}
			else {return 28}
	}
	else {alert("Incorrect month value");}
}
  
 $(document).on('click', "#submit", function() {
	var start_string=$("#start_date").val().split('-');
	var end_string=$("#end_date").val().split('-');
	if ($("#course_name").val() !== '') {
		if ( $("#end_date").val() === '' && $("#duration").val() === '') {
			alert("You haven't specified end of the course, please fix it!");
		}
		else if($("#duration").val() === '' && new Date(start_string[0],start_string[1],start_string[2] )> new Date(end_string[0], end_string[1], end_string[2])) {
			alert("End date cannot be earlier than Start date");
		}
		else { 
			var new_course = {};
			new_course["course_name"]=($("#course_name").val());
			new_course["start_date"]=start_string; 
			if ($("#end_date").val() !== '' && $("#end_date").val() !== $("#start_date").val()){
				new_course["end_date"]=end_string;
				alert("You MOOC "+$("#course_name").val()+" was added");
			}
			else {
				var duration = $("#duration").val() * 7;
				
				alert(duration);
			}
			alert("Month length: "+ month_length(parseInt(new_course["start_date"][1]), parseInt(new_course["start_date"][0])));
			$("#result").append("<div>"+new_course["course_name"]+" Starts: "+format(new_course["start_date"])+" Ends: "+format(new_course["end_date"])+"</div>");
			dataset.push(new_course);
			}		
		 }
	else {
	alert("Please enter name of your course!");
	}
}) 
