window.onload = function(){
	var current_date=new Date();
	var dataset = [];
	/* document.getElementById("start_date").value=current_date.getDate().toString()+"-"+(current_date.getMonth()+1).toString()+"-"+current_date.getFullYear().toString());
	document.getElementById("end_date").value=document.getElementById("start_date").value; */
  }
format = function(x) {
	return x[2]+"."+x[1]+'.'+x[0];
}
  
 $(document).on('click', "#submit", function() {
	var start_string=$("#start_date").val().split('-');
	var end_string=$("#end_date").val().split('-');
	if ($("#course_name").val() !== '') {
		if ( $("#end_date").val() === '' && $("#duration").val() === '') {
			alert("You haven't specified end of the course, please fix it!");
		}
		else if(new Date(start_string[0],start_string[1],start_string[2] )> new Date(end_string[0], end_string[1], end_string[2])) {
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
				alert("You are here");
			}
			$("#result").append("<div>"+new_course["course_name"]+" Starts: "+format(new_course["start_date"])+" Ends: "+format(new_course["end_date"])+"</div>");
		
			}		
		 
		 if (new_course === {}) {
		 alert("Empty");
		 }
	}
	else {
	alert("Please enter name of your course!");
	}
}) 