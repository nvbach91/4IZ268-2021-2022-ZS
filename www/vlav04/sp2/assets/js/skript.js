
$(function () {
	if (localStorage.cities == null || localStorage.cities == '' || localStorage.cities == undefined) {
		localStorage.cities = '[]';
	}

	let arrayOfCities = JSON.parse(localStorage.cities);
	for (let i = 0; i < arrayOfCities.length; i++) {
		let option = document.createElement('option');
		option.text = arrayOfCities[i];
		option.value = arrayOfCities[i];
		document.querySelector('#select').add(option);
	}

	let input = $('#city'),
		inpVal = input.val();
	$('#select').on('change', function () {
		input.val(inpVal + $(this).val());
		showResult();
	});
});


$('#removeCityBtn').on('click', function () {
	let arrayOfCities = JSON.parse(localStorage.cities);
	let selectedValue = document.getElementById('city').value; //hodnota v select
	if (arrayOfCities.length === 1) {
		arrayOfCities.pop();
		let selectedValueInOption = document.querySelector('option');
		selectedValueInOption.remove();
		localStorage.setItem('cities', JSON.stringify(arrayOfCities));
	}

	else if (arrayOfCities.length > 1) {
		let selectedValueInOption = document.querySelector("option[value = " + selectedValue + "]");
		selectedValueInOption.remove();
		arrayOfCities.splice(arrayOfCities.indexOf(selectedValue), arrayOfCities.indexOf(selectedValue));
		localStorage.setItem('cities', JSON.stringify(arrayOfCities));
	}


})

$('#removeAllBtn').on('click', function () {
	localStorage.cities = '[]';
	while (document.querySelector('#select').firstChild) {
		document.querySelector('#select').removeChild(document.querySelector('#select').firstChild)
	}
})

function showResult() {


	$('#panel').css('display', 'flex');
	$('#panelNow').css('display', 'block');
	let city = $('#city').val();

	if (city != 0) {
		let newOption = document.createElement('option');
		let text = city;
		newOption.text = text;
		newOption.value = text;

		const select = document.querySelector("select");
		const optionLabels = Array.from(select.options).map((opt) => opt.value);
		const hasOption = optionLabels.includes(text);

		if (!hasOption) {
			document.querySelector('#select').add(newOption);
			let itemsArray = JSON.parse(localStorage.cities);
			itemsArray.push(city);
			localStorage.setItem('cities', JSON.stringify(itemsArray));
		}
	}


	let urlApi = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=48b680f1046ad3f47e95497e40218a29`;
	$.ajax({
		url: urlApi,
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
			// console.log(localStorage.cities);

		},
	}).done(dataHandler);


	$('#cityC').text('in ' + city);
	function dataHandler(data) {
		dataString = JSON.stringify(data);
		let now = new Date();
		let h = now.getHours();
		let num = 8 - (Math.floor(h / 3));

		document.getElementById("tempNow").innerText = "Now:" + " " + Math.floor((data.list[h].main["temp"]) - 273, 15) + "°C or " + сelsiusToFahrenheit(Math.floor((data.list[h].main["temp"]) - 273, 15)) + "°F" ;
		let imgURL = "https://openweathermap.org/img/w/" + data.list[h].weather[0].icon + ".png";
		$("#iconTempNow").attr("src", imgURL);

		let tempDays = ['tempDay1', 'tempDay2', 'tempDay3', 'tempDay4'];
		let tempNights = ['tempNight1', 'tempNight2', 'tempNight3', 'tempNight4'];
		let iconTemps = ['iconTemp1', 'iconTemp2', 'iconTemp3', 'iconTemp4'];
		let countOfParts = [4, 12, 20, 28];

		for (let i = 0; i < 4; i++) {
			document.getElementById(tempDays[i]).innerText = "Day: " + Math.floor((data.list[num + countOfParts[i]].main["temp"]) - 273, 15) + "°C or " + сelsiusToFahrenheit(Math.floor((data.list[num + countOfParts[i]].main["temp"]) - 273, 15)) + "°F" ;
			document.getElementById(tempNights[i]).innerText = "Night: " + Math.floor((data.list[num + countOfParts[i] - 4].main["temp"]) - 273, 15) + "°C or " + сelsiusToFahrenheit(Math.floor((data.list[num + countOfParts[i] - 4].main["temp"]) - 273, 15)) + "°F";
			let imgURL = "https://openweathermap.org/img/w/" + data.list[num + countOfParts[i]].weather[0].icon + ".png";
			$('#' + iconTemps[i]).attr("src", imgURL);
		}

	}
}

function сelsiusToFahrenheit(celsius){
	return celsius * 9 / 5 + 32;
}


$('#showResultBtn').on('click', function () {
	
	showResult();
});

function showDateTime() {

	let d = new Date();
	let n1, n2, n3, n4;
	let weekday = new Array(7);
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

	document.getElementById("day1").innerText = n1;
	document.getElementById("day2").innerText = n2;
	document.getElementById("day3").innerText = n3;
	document.getElementById("day4").innerText = n4;
}
showDateTime(); 