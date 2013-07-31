// window.onload = function(){
	// var current_date=new Date();
	// document.getElementById("start_date").value=current_date.getDate().toString()+"-"+(current_date.getMonth()+1).toString()+"-"+current_date.getFullYear().toString());
	// document.getElementById("end_date").value=document.getElementById("start_date").value;
  // }
  
var dataset = [];

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
	for (var i=0; i<start_string.length; i++){
		start_string[i] = parseInt(start_string[i]);
		end_string[i] = parseInt(end_string[i]);
	}
	if ($("#course_name").val() !== '') {
		if ( $("#end_date").val() === '' && $("#duration").val() === '') {
			alert("You haven't specified end of the course, please fix it!");
		}
		else if($("#duration").val() === '' && new Date(start_string[0],start_string[1]-1,start_string[2] )>= new Date(end_string[0], end_string[1]-1, end_string[2])) {
			alert("End date should be later than Start date");
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
				var s_day = parseInt(new_course["start_date"][2]);
				var s_month = parseInt(new_course["start_date"][1]);
				var s_year = parseInt(new_course["start_date"][0]);
				var days = month_length(s_month, s_year);
				while (duration>(days-s_day+1)) {
					if (s_month !== 12) {
						s_month +=1;
						duration = duration - (days - s_day + 1);
						s_day = 1;
						days = month_length(s_month, s_year);
						alert(s_month);
					}
					else {
						s_year += 1;
						s_month = 1;
						duration = duration - (days - s_day + 1);
						s_day = 1;
						days = month_length(s_month, s_year);
					}
				}
				s_day += duration;
				new_course["end_date"] = [s_year, s_month, s_day];
				alert("You MOOC "+$("#course_name").val()+" was added");
			}

			// alert(new Date(s_year, s_month-1, s_day));
			// alert("Month length: "+ month_length(parseInt(new_course["start_date"][1]), parseInt(new_course["start_date"][0])));
			// $("#result").append("<div>"+new_course["course_name"]+" Starts: "+format(new_course["start_date"])+" Ends: "+format(new_course["end_date"])+"</div>");
			dataset.push(new_course);
			// $("#result").append(dataset[0].course_name)
			}
		 }
	else {
	alert("Please enter name of your course!");
	}
}) 

$(document).on('click', "#show", function() {
$("#result").append("<table><tr><th>Course name</th><th>Starts</th><th>Ends</th></tr>");
	for (var i=0; i<dataset.length; i++) {
		$("#result").append("<tr><td>"+dataset[i].course_name+"</td><td>"+format(dataset[i].start_date)+"</td><td>"+format(dataset[i].end_date)+"</td></tr>");
	}
$("#result").append("</table>");	
})
