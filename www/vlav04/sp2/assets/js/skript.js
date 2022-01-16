$(function () {
	let input = $('#city'),
		inpVal = input.val();
	$('.select').on('change', function () {
		input.val(inpVal + $(this).val());
	});
});

$('#cityB').on('click', function () {
	$('#panel').css('display', 'flex');
	$('#panelNow').css('display', 'block');

	var city = $('#city').val();
	var myKey = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=48b680f1046ad3f47e95497e40218a29`;
	$.ajax({
		url: myKey,
		dataType: "jsonp",
		type: "GET",
		async: "true",
		timeout: 500,
		success: function (data) {
			console.log("Success");
		},
		error: function (e) {
			console.log("Error");
			$('#cityC').html('<p style="color:red";>ERROR</p><p style="color:#000";>Check the name is correct</p>');
			$('#panel').css('display', 'none');
			$('#panelNow').css('display', 'none');
		},
	}).done(dataHandler3);

	$('#cityC').text('in' + ' ' + city);
	function dataHandler3(data) {
		dataString = JSON.stringify(data);
		var now = new Date();
		let h = now.getHours();
		var num = 8 - (Math.floor(h / 3));
		
		document.getElementById("tempNow").innerHTML = "Now:" + " " + Math.floor((data.list[h].main["temp"]) - 273, 15) + "°C";
		var imgURL = "https://openweathermap.org/img/w/" + data.list[h].weather[0].icon + ".png";
		$("#iconTempNow").attr("src", imgURL);

		document.getElementById("tempDay1").innerHTML = "Day: " + Math.floor((data.list[num + 4].main["temp"]) - 273, 15) + "°C";
		document.getElementById("tempNight1").innerHTML = "Night: " + Math.floor((data.list[num + 0].main["temp"]) - 273, 15) + "°C";
		var imgURL = "https://openweathermap.org/img/w/" + data.list[num + 4].weather[0].icon + ".png";
		$("#iconTemp1").attr("src", imgURL);

		document.getElementById("tempDay2").innerHTML = "Day: " + Math.floor((data.list[num + 12].main["temp"]) - 273, 15) + "°C";
		document.getElementById("tempNight2").innerHTML = "Night: " + Math.floor((data.list[num + 8].main["temp"]) - 273, 15) + "°C";
		var imgURL = "https://openweathermap.org/img/w/" + data.list[num + 11].weather[0].icon + ".png";
		$("#iconTemp2").attr("src", imgURL);

		document.getElementById("tempDay3").innerHTML = "Day: " + Math.floor((data.list[num + 20].main["temp"]) - 273, 15) + "°C";
		document.getElementById("tempNight3").innerHTML = "Night: " + Math.floor((data.list[num + 16].main["temp"]) - 273, 15) + "°C";
		var imgURL = "https://openweathermap.org/img/w/" + data.list[num + 19].weather[0].icon + ".png";
		$("#iconTemp3").attr("src", imgURL);

		document.getElementById("tempDay4").innerHTML = "Day: " + Math.floor((data.list[num + 28].main["temp"]) - 273, 15) + "°C";
		document.getElementById("tempNight4").innerHTML = "Night: " + Math.floor((data.list[num + 24].main["temp"]) - 273, 15) + "°C";
		var imgURL = "https://openweathermap.org/img/w/" + data.list[num + 27].weather[0].icon + ".png";
		$("#iconTemp4").attr("src", imgURL);
	}
});

function showDateTime() {

	var d = new Date();
	var n1, n2, n3, n4;
	var weekday = new Array(7);
	weekday[0] = "Sunday";
	weekday[1] = "Monday";
	weekday[2] = "Tuesday";
	weekday[3] = "Wednesday";
	weekday[4] = "Thursday";
	weekday[5] = "Friday";
	weekday[6] = "Saturday";

	if (d.getDay() >= 3) {
		n1 = weekday[(d.getDay() + 1)];
		n2 = weekday[(d.getDay() + 2)];
		n3 = weekday[(d.getDay() + 3)];
		n4 = weekday[7 - (d.getDay() + 4)];
	} if (d.getDay() >= 4) {
		n1 = weekday[(d.getDay() + 1)];
		n2 = weekday[(d.getDay() + 2)];
		n3 = weekday[7 - (d.getDay() + 3)];
		n4 = weekday[9 - (d.getDay() + 4)];
	} if (d.getDay() >= 5) {
		n1 = weekday[(d.getDay() + 1)];
		n2 = weekday[7 - (d.getDay() + 2)];
		n3 = weekday[9 - (d.getDay() + 3)];
		n4 = weekday[11 - (d.getDay() + 4)];
	} if (d.getDay() >= 6) {
		n1 = weekday[7 - (d.getDay() + 1)];
		n2 = weekday[9 - (d.getDay() + 2)];
		n3 = weekday[11 - (d.getDay() + 3)];
		n4 = weekday[13 - (d.getDay() + 4)];
	} if (d.getDay() < 3) {
		n1 = weekday[(d.getDay() + 1)];
		n2 = weekday[(d.getDay() + 2)];
		n3 = weekday[(d.getDay() + 3)];
		n4 = weekday[(d.getDay() + 4)];

	}

	document.getElementById("day1").innerHTML = n1;
	document.getElementById("day2").innerHTML = n2;
	document.getElementById("day3").innerHTML = n3;
	document.getElementById("day4").innerHTML = n4;
}
showDateTime(); 