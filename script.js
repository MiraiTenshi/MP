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
	if (year%400 === 0) {return true}
	else if (year%4 === 0 && year%100 !==0) {return true}
	else {return false}
}

function month_length(m, y) {
	if (m===1 || m===3 || m===5 || m===7 || m===8 || m===10 || m===12){return 31}
	else if (m===4 || m===6 || m===9 || m===11) {return 30}
	else if (m===2){
			if (is_leap_year(y)===true) {return 29}
			else {return 28}
	}
	else {alert("Incorrect month value");}
}

function to_table(data) {
	var result = "<table rules='all' cellpadding='4'><tr><th>Course name</th><th>Starts</th><th>Ends</th></tr>";
	for (var i=0; i<data.length; i++) {
		result+="<tr><td>"+data[i].course_name+"</td><td>"+format(data[i].start_date)+"</td><td>"+format(data[i].end_date)+"</td></tr>";
	}
	result+="</table>";
	return result
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
		else {
			var new_course = {};
			new_course["course_name"]=($("#course_name").val());
			new_course["start_date"]=start_string;
			if ( $('#end_date').val !=='' && new Date(start_string[0],start_string[1]-1,start_string[2] )<= new Date(end_string[0], end_string[1]-1, end_string[2])) {
				new_course["end_date"]=end_string;
				alert('You course: "'+$("#course_name").val()+'" was added');
				document.getElementById("end_date").value='';
				dataset.push(new_course);
			}
			else if ($('#end_date').val() ==='' || new Date(start_string[0],start_string[1]-1,start_string[2] )> new Date(end_string[0], end_string[1]-1, end_string[2])) {
				if ($('#duration').val() !==''){
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
					alert('You course: "'+$("#course_name").val()+'" was added');
					document.getElementById("end_date").value='';
					dataset.push(new_course);
				}
				else {
					alert("End date should be later than Start date");
				}
			}
		}
	}
	else {
	alert("Please enter name of your course!");
	}
}) 

$(document).on('click', "#show", function() {
	$("#result").empty();
	if (dataset.length !== 0) {$("#result").append(to_table(dataset))}
})
$(document).on('click', "#today", function() {
	$("#result").empty();
	today_table =[];
	for (var i=0; i<dataset.length; i++) {
		if (new Date(dataset[i].start_date[0], dataset[i].start_date[1]-1, dataset[i].start_date[2])<=new Date() && new Date(dataset[i].end_date[0], dataset[i].end_date[1]-1, dataset[i].end_date[2], 23)>=new Date()) {
			// alert(new Date(dataset[i].start_date[0], dataset[i].start_date[1]-1, dataset[i].start_date[2])+" "+new Date());
			today_table.push(dataset[i]);
		}
		// else {alert(new Date(dataset[i].start_date[0], dataset[i].start_date[1]-1, dataset[i].start_date[2])+" "+new Date());}
	// }
	// for (var i=0; i<today_table.length; i++) {alert(today_table[i].course_name);}
	if (today_table.length !== 0) {$("#result").append(to_table(today_table))}
})
