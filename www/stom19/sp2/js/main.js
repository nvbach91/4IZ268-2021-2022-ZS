window.onload = () => {
    $('.title').text('Choose your city to start');
}


/*
document.getElementById('map').innerHTML = getLocation();

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    var myCenter = new google.maps.LatLng(lat, lng);
    var mapCanvas = document.getElementById("map");
    var mapOptions = {
        center: myCenter,
        zoom: 6
    };
    var map = new google.maps.Map(mapCanvas, mapOptions);
    var marker = new google.maps.Marker({
        position: myCenter
    });
    marker.setMap(map);

    google.maps.event.addListener(marker, 'click', function() {
        map.setZoom(9);
        map.setCenter(marker.getPosition());
    });
    const prague = {
        lat: 50.08,
        lng: 14.42
    };
    const plzen = {
        lat: 49.74,
        lng: 13.37
    };
    const brno = {
        lat: 49.19,
        lng: 16.60
    };

    const marker4 = new google.maps.Marker({
        position: prague,
        map: map,
    });
    google.maps.event.addListener(marker4, 'click', showCity);


}

*/


var currentTime = new Date();

var month = currentTime.getMonth();
var day = currentTime.getDate();
var year = currentTime.getFullYear();

var currentDate = new Date().getDate();

console.log(currentDate);

const dates = [];
for (let i = 0; i < 5; i++) {

    var thisDate = day + i;
    var date = new Date(year, month, thisDate);
    dates.push(date.toLocaleDateString());
    const classDate = document.querySelector(".date");
    const dateToday = document.createElement("button");
    dateToday.classList.add("dateButton");
    dateToday.setAttribute("data-date", thisDate);
    dateToday.innerText = date.toLocaleDateString();
    classDate.appendChild(dateToday);
    dateToday.addEventListener("click", () => {

        const dateButton2 = document.querySelectorAll(".dateButton");
        for (let i = 0; i < dateButton2.length; i++) {
            dateButton2[i].classList.remove("buttonActive");
        }
        currentDate = dateToday.getAttribute("data-date");

        console.log(currentDate);

        dateToday.classList.add("buttonActive");

    })

}

const placeForCity = document.querySelector(".cities");
const container = document.querySelector(".weatherTable");
const container2 = document.querySelector(".bigSquare");

const cities = [{
    cityName: 'Prague',
    lat: 50.08,
    lon: 14.42,
}, {
    cityName: 'Brno',
    lat: 49.19,
    lon: 16.60
}, {
    cityName: 'Plzen',
    lat: 49.74,
    lon: 13.37,
}, {
    cityName: 'Ostrava',
    lat: 49.82,
    lon: 18.26
}];
for (let i = 0; i < cities.length; i++) {
    createCity(cities[i]);
}

function createCity(city) {

    const cityButton = document.createElement("button");
    cityButton.innerText = city.cityName;
    placeForCity.appendChild(cityButton);


    cityButton.addEventListener("click", showCity);

    function showCity() {


        $.getJSON('https://api.openweathermap.org/data/2.5/onecall?lat=' + city.lat + '&lon=' + city.lon + '&units=metric&appid=a5e0ff3f994948c38427d1f99253e306').done((data) => {
                console.log(data);
                container.innerHTML = "";
                container2.innerHTML = "";

                for (let i = 0; i < 5; i++) {

                    const inputToWeatherTable = createWeatherCard(data.daily[i]);
                    const weatherTable = document.querySelector(".weatherTable");
                    weatherTable.appendChild(inputToWeatherTable);
                    var thisDate = day + i;
                    if (currentDate === thisDate.toString()) {
                        const inputToMainSpace = createMainSpace(data.daily[i]);
                        const mainSpace = document.querySelector(".bigSquare");
                        mainSpace.appendChild(inputToMainSpace);
                    }

                }
            })
            .fail((resp) => {
                console.log(resp.status);
                console.log('something went wrong');

            });

        function createWeatherCard(weather) {

            const divWeatherTable = document.createElement("div");
            //divWeatherTable.setAttribute("class", "divWeatherTable");
            //const dateTable = document.createElement("p");
            //dateTable.innerText = date.toLocaleDateString();
            const maxTemperature = document.createElement("p");
            maxTemperature.innerText = "Max: " + weather['temp']['max'] + "°C";
            const minTemperature = document.createElement("p");
            minTemperature.innerText = "Min: " + weather['temp']['min'] + "°C";
            const humidity = document.createElement("p");
            humidity.innerText = "Humidity: " + weather['humidity'] + "%"
            const description = document.createElement("p");
            description.innerText = weather['weather'][0]['main'];
            //divWeatherTable.appendChild(dateTable);
            divWeatherTable.appendChild(maxTemperature);
            divWeatherTable.appendChild(minTemperature);
            divWeatherTable.appendChild(humidity);
            divWeatherTable.appendChild(description);

            return divWeatherTable;

        }

        function createMainSpace(weather) {
            const divMainSpace = document.createElement("div");
            const imageWeather = document.createElement("img");
            //imageWeather.innerHTML="<img  class="image src='https://openweathermap.org/img/wn/' +
            // weather['weather'][0]['icon'] + '@2x.png>'"
            const moonPhase = document.createElement("p");
            moonPhase.innerText = "Moon phase: " + weather['moon_phase'];
            const mornTemp = document.createElement("p");
            mornTemp.innerText = "Morning temperature: " + weather['temp']['morn'] + " °C";
            const dayTemp = document.createElement("p");
            dayTemp.innerText = "Day temperature: " + weather['temp']['day'] + ' °C';
            const eveTemp = document.createElement("p");
            eveTemp.innerText = "Evening temperature: " + weather['temp']['eve'] + ' °C';
            const nightTemp = document.createElement("p");
            nightTemp.innerText = "Night temperature: " + weather['temp']['night'] + ' °C';
            const pressure = document.createElement("p");
            pressure.innerText = "Pressure: " + weather['pressure'] + " mm Hg";
            const windSpeed = document.createElement("p");
            windSpeed.innerText = "Wind speed: " + weather['wind_speed'] + " m/s"

            divMainSpace.appendChild(moonPhase);
            divMainSpace.appendChild(mornTemp);
            divMainSpace.appendChild(dayTemp);
            divMainSpace.appendChild(eveTemp);
            divMainSpace.appendChild(nightTemp);
            divMainSpace.appendChild(pressure);
            divMainSpace.appendChild(windSpeed);

            return divMainSpace;

        }

        function mainSpaceDate(date) {

        }



        /*

                document.querySelector('.title').innerText = ' Weather in Prague for ' + date[0];


                $.getJSON('https://api.openweathermap.org/data/2.5/onecall?lat=50.08&lon=14.42&units=metric&appid=a5e0ff3f994948c38427d1f99253e306').done((data) => {
                        console.log(data);





                        document.getElementById('image').innerHTML = '<img  class="image" src=https://openweathermap.org/img/wn/' +
                            data.daily[0]['weather'][0]['icon'] + '@2x.png>';
                        $('#weather_inf').text("Description: " + data.daily[0]['weather'][0]['description']);


                        let unix_time1 = data.daily[0]['sunrise'];
                        var date = new Date(unix_time1 * 1000);
                        var hours = date.getHours();
                        var minutes = date.getMinutes();
                        var formattedTime = hours + ":" + minutes;
                        $('#sunrise').text("Sunrise: " + formattedTime);

                        let unix_time2 = data.daily[0]['sunset'];
                        var dateSet = new Date(unix_time2 * 1000);
                        var hoursSet = dateSet.getHours();
                        var minutesSet = dateSet.getMinutes();
                        var formattedTimeSet = hoursSet + ":" + minutesSet;
                        $('#sunset').text("Sunset: " + formattedTimeSet);

                        $('#moon_phase').text("Moon phase: " + data.daily[0]['moon_phase']);
                        $('#morn_temp').text("Morning temperature: " + data.daily[0]['temp']['morn'] + ' °C');
                        $('#day_temp').text("Day temperature: " + data.daily[0]['temp']['day'] + ' °C');
                        $('#eve_temp').text("Evening temperature: " + data.daily[0]['temp']['eve'] + ' °C');
                        $('#night_temp').text("Night temperature: " + data.daily[0]['temp']['night'] + ' °C');
                        $('#pressure').text("Pressure: " + data.daily[0]['pressure'] + " mm Hg");
                        $('#wind_speed').text("Wind speed: " + data.daily[0]['wind_speed'] + " m/s");
                    })
                    .fail((resp) => {
                        console.log(resp.status);
                        console.log('something went wrong');

                    });






                const buttonToday = document.getElementById('date_today');

                buttonToday.addEventListener("click", dataToday);

                function dataToday() {
                    document.querySelector('.title').innerText = ' Weather in Prague for ' + date1;


                    $.getJSON('https://api.openweathermap.org/data/2.5/onecall?lat=50.08&lon=14.42&units=metric&appid=a5e0ff3f994948c38427d1f99253e306').done((data) => {
                            console.log(data);





                            document.getElementById('image').innerHTML = '<img  class="image" src=https://openweathermap.org/img/wn/' +
                                data.daily[0]['weather'][0]['icon'] + '@2x.png>';
                            $('#weather_inf').text("Description: " + data.daily[0]['weather'][0]['description']);


                            let unix_time1 = data.daily[0]['sunrise'];
                            var date = new Date(unix_time1 * 1000);
                            var hours = date.getHours();
                            var minutes = date.getMinutes();
                            var formattedTime = hours + ":" + minutes;
                            $('#sunrise').text("Sunrise: " + formattedTime);

                            let unix_time2 = data.daily[0]['sunset'];
                            var dateSet = new Date(unix_time2 * 1000);
                            var hoursSet = dateSet.getHours();
                            var minutesSet = dateSet.getMinutes();
                            var formattedTimeSet = hoursSet + ":" + minutesSet;
                            $('#sunset').text("Sunset: " + formattedTimeSet);

                            $('#moon_phase').text("Moon phase: " + data.daily[0]['moon_phase']);
                            $('#morn_temp').text("Morning temperature: " + data.daily[0]['temp']['morn'] + ' °C');
                            $('#day_temp').text("Day temperature: " + data.daily[0]['temp']['day'] + ' °C');
                            $('#eve_temp').text("Evening temperature: " + data.daily[0]['temp']['eve'] + ' °C');
                            $('#night_temp').text("Night temperature: " + data.daily[0]['temp']['night'] + ' °C');
                            $('#pressure').text("Pressure: " + data.daily[0]['pressure'] + " mm Hg");
                            $('#wind_speed').text("Wind speed: " + data.daily[0]['wind_speed'] + " m/s");
                        })
                        .fail((resp) => {
                            console.log(resp.status);
                            console.log('something went wrong');

                        });
                }




                const buttonTomorrow = document.getElementById('date_tomorrow');

                buttonTomorrow.addEventListener("click", dataTomorrow);

                function dataTomorrow() {

                    document.querySelector('.title').innerText = ' Weather in Prague for ' + nextDay.toLocaleDateString();

                    $.getJSON('https://api.openweathermap.org/data/2.5/onecall?lat=50.08&lon=14.42&units=metric&appid=a5e0ff3f994948c38427d1f99253e306').done((data) => {
                            console.log(data);


                            document.getElementById('image').innerHTML = '<img  class="image" src=https://openweathermap.org/img/wn/' +
                                data.daily[1]['weather'][0]['icon'] + '@2x.png>';
                            $('#weather_inf').text("Description: " + data.daily[1]['weather'][0]['description']);


                            let unix_time1 = data.daily[1]['sunrise'];
                            var date = new Date(unix_time1 * 1000);
                            var hours = date.getHours();
                            var minutes = date.getMinutes();
                            var formattedTime = hours + ":" + minutes;
                            $('#sunrise').text("Sunrise: " + formattedTime);

                            let unix_time2 = data.daily[1]['sunset'];
                            var dateSet = new Date(unix_time2 * 1000);
                            var hoursSet = dateSet.getHours();
                            var minutesSet = dateSet.getMinutes();
                            var formattedTimeSet = hoursSet + ":" + minutesSet;
                            $('#sunset').text("Sunset: " + formattedTimeSet);

                            $('#moon_phase').text("Moon phase: " + data.daily[1]['moon_phase']);
                            $('#morn_temp').text("Morning temperature: " + data.daily[1]['temp']['morn'] + ' °C');
                            $('#day_temp').text("Day temperature: " + data.daily[1]['temp']['day'] + ' °C');
                            $('#eve_temp').text("Evening temperature: " + data.daily[1]['temp']['eve'] + ' °C');
                            $('#night_temp').text("Night temperature: " + data.daily[1]['temp']['night'] + ' °C');
                            $('#pressure').text("Pressure: " + data.daily[1]['pressure'] + " mm Hg");
                            $('#wind_speed').text("Wind speed: " + data.daily[1]['wind_speed'] + " m/s");

                        })
                        .fail((resp) => {
                            console.log(resp.status);
                            console.log('something went wrong');

                        });


                }

                const buttonDay2 = document.getElementById('date_plus_2');

                buttonDay2.addEventListener("click", dataDay2);

                function dataDay2() {

                    document.querySelector('.title').innerText = ' Weather in Prague for ' + dayPlus2.toLocaleDateString();

                    $.getJSON('https://api.openweathermap.org/data/2.5/onecall?lat=50.08&lon=14.42&units=metric&appid=a5e0ff3f994948c38427d1f99253e306').done((data) => {
                            console.log(data);

                            document.getElementById('image').innerHTML = '<img  class="image" src=https://openweathermap.org/img/wn/' +
                                data.daily[2]['weather'][0]['icon'] + '@2x.png>';
                            $('#weather_inf').text("Description: " + data.daily[2]['weather'][0]['description']);


                            let unix_time1 = data.daily[2]['sunrise'];
                            var date = new Date(unix_time1 * 1000);
                            var hours = date.getHours();
                            var minutes = date.getMinutes();
                            var formattedTime = hours + ":" + minutes;
                            $('#sunrise').text("Sunrise: " + formattedTime);

                            let unix_time2 = data.daily[2]['sunset'];
                            var dateSet = new Date(unix_time2 * 1000);
                            var hoursSet = dateSet.getHours();
                            var minutesSet = dateSet.getMinutes();
                            var formattedTimeSet = hoursSet + ":" + minutesSet;
                            $('#sunset').text("Sunset: " + formattedTimeSet);

                            $('#moon_phase').text("Moon phase: " + data.daily[2]['moon_phase']);
                            $('#morn_temp').text("Morning temperature: " + data.daily[2]['temp']['morn'] + ' °C');
                            $('#day_temp').text("Day temperature: " + data.daily[2]['temp']['day'] + ' °C');
                            $('#eve_temp').text("Evening temperature: " + data.daily[2]['temp']['eve'] + ' °C');
                            $('#night_temp').text("Night temperature: " + data.daily[2]['temp']['night'] + ' °C');
                            $('#pressure').text("Pressure: " + data.daily[2]['pressure'] + " mm Hg");
                            $('#wind_speed').text("Wind speed: " + data.daily[2]['wind_speed'] + " m/s");


                        })
                        .fail((resp) => {
                            console.log(resp.status);
                            console.log('something went wrong');

                        });


                }

                const buttonDay3 = document.getElementById('date_plus_3');

                buttonDay3.addEventListener("click", dataDay3);

                function dataDay3() {

                    document.querySelector('.title').innerText = ' Weather in Prague for ' + dayPlus3.toLocaleDateString();

                    $.getJSON('https://api.openweathermap.org/data/2.5/onecall?lat=50.08&lon=14.42&units=metric&appid=a5e0ff3f994948c38427d1f99253e306').done((data) => {
                            console.log(data);

                            document.getElementById('image').innerHTML = '<img  class="image" src=https://openweathermap.org/img/wn/' +
                                data.daily[3]['weather'][0]['icon'] + '@2x.png>';
                            $('#weather_inf').text("Description: " + data.daily[3]['weather'][0]['description']);


                            let unix_time1 = data.daily[3]['sunrise'];
                            var date = new Date(unix_time1 * 1000);
                            var hours = date.getHours();
                            var minutes = date.getMinutes();
                            var formattedTime = hours + ":" + minutes;
                            $('#sunrise').text("Sunrise: " + formattedTime);

                            let unix_time2 = data.daily[3]['sunset'];
                            var dateSet = new Date(unix_time2 * 1000);
                            var hoursSet = dateSet.getHours();
                            var minutesSet = dateSet.getMinutes();
                            var formattedTimeSet = hoursSet + ":" + minutesSet;
                            $('#sunset').text("Sunset: " + formattedTimeSet);

                            $('#moon_phase').text("Moon phase: " + data.daily[3]['moon_phase']);
                            $('#morn_temp').text("Morning temperature: " + data.daily[3]['temp']['morn'] + ' °C');
                            $('#day_temp').text("Day temperature: " + data.daily[3]['temp']['day'] + ' °C');
                            $('#eve_temp').text("Evening temperature: " + data.daily[3]['temp']['eve'] + ' °C');
                            $('#night_temp').text("Night temperature: " + data.daily[3]['temp']['night'] + ' °C');
                            $('#pressure').text("Pressure: " + data.daily[3]['pressure'] + " mm Hg");
                            $('#wind_speed').text("Wind speed: " + data.daily[3]['wind_speed'] + " m/s");

                        })
                        .fail((resp) => {
                            console.log(resp.status);
                            console.log('something went wrong');

                        });


                }


                const buttonDay4 = document.getElementById('date_plus_4');

                buttonDay4.addEventListener("click", dataDay4);

                function dataDay4() {

                    document.querySelector('.title').innerText = ' Weather in Prague for ' + dayPlus4.toLocaleDateString();


                    $.getJSON('https://api.openweathermap.org/data/2.5/onecall?lat=50.08&lon=14.42&units=metric&appid=a5e0ff3f994948c38427d1f99253e306').done((data) => {
                            console.log(data);
                            document.getElementById('image').innerHTML = '<img  class="image" src=https://openweathermap.org/img/wn/' +
                                data.daily[4]['weather'][0]['icon'] + '@2x.png>';
                            $('#weather_inf').text("Description: " + data.daily[4]['weather'][0]['description']);


                            let unix_time1 = data.daily[4]['sunrise'];
                            var date = new Date(unix_time1 * 1000);
                            var hours = date.getHours();
                            var minutes = date.getMinutes();
                            var formattedTime = hours + ":" + minutes;
                            $('#sunrise').text("Sunrise: " + formattedTime);

                            let unix_time2 = data.daily[4]['sunset'];
                            var dateSet = new Date(unix_time2 * 1000);
                            var hoursSet = dateSet.getHours();
                            var minutesSet = dateSet.getMinutes();
                            var formattedTimeSet = hoursSet + ":" + minutesSet;
                            $('#sunset').text("Sunset: " + formattedTimeSet);

                            $('#moon_phase').text("Moon phase: " + data.daily[4]['moon_phase']);
                            $('#morn_temp').text("Morning temperature: " + data.daily[4]['temp']['morn'] + ' °C');
                            $('#day_temp').text("Day temperature: " + data.daily[4]['temp']['day'] + ' °C');
                            $('#eve_temp').text("Evening temperature: " + data.daily[4]['temp']['eve'] + ' °C');
                            $('#night_temp').text("Night temperature: " + data.daily[4]['temp']['night'] + ' °C');
                            $('#pressure').text("Pressure: " + data.daily[4]['pressure'] + " mm Hg");
                            $('#wind_speed').text("Wind speed: " + data.daily[4]['wind_speed'] + " m/s");

                        })
                        .fail((resp) => {
                            console.log(resp.status);
                            console.log('something went wrong');

                        });


                }

            }

        */
    }
}