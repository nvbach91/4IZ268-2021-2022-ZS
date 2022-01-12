window.onload = () => {
    $('.title').text('Choose your city to start');
}



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
    google.maps.event.addListener(marker4, 'click', pragueCity);
    const marker2 = new google.maps.Marker({
        position: plzen,
        map: map,
    });
    google.maps.event.addListener(marker2, 'click', plzenCity);
    const marker3 = new google.maps.Marker({
        position: brno,
        map: map,
    });
    google.maps.event.addListener(marker3, 'click', brnoCity);

}




var currentTime = new Date();

var month = currentTime.getMonth();
var day = currentTime.getDate();
var year = currentTime.getFullYear();

const date1 = currentTime.toLocaleDateString();
const dateToday = document.getElementById("date_today");
dateToday.innerText = date1;

var nextDay = new Date(year, month, day + 1);
const dateTomorrow = document.getElementById("date_tomorrow");
dateTomorrow.innerText = nextDay.toLocaleDateString();

var dayPlus2 = new Date(year, month, day + 2);
const date2 = document.getElementById("date_plus_2");
date2.innerText = dayPlus2.toLocaleDateString();
const date2Table = document.getElementById("date_2_table");
date2Table.innerText = dayPlus2.toLocaleDateString();

var dayPlus3 = new Date(year, month, day + 3);
const date3 = document.getElementById("date_plus_3");
date3.innerText = dayPlus3.toLocaleDateString();
const date3Table = document.getElementById("date_3_table");
date3Table.innerText = dayPlus3.toLocaleDateString();

var dayPlus4 = new Date(year, month, day + 4);
const date4 = document.getElementById("date_plus_4");
date4.innerText = dayPlus4.toLocaleDateString();
const date4Table = document.getElementById("date_4_table");
date4Table.innerText = dayPlus4.toLocaleDateString();









const prague = document.getElementById('prague');

prague.addEventListener("click", pragueCity);

function pragueCity() {


    $.getJSON('https://api.openweathermap.org/data/2.5/onecall?lat=50.08&lon=14.42&units=metric&appid=a5e0ff3f994948c38427d1f99253e306').done((data) => {
            console.log(data);
            $('#latitude').text("Latitude: " + data.lat);
            $('#longtitude').text("Longtitude: " + data.lon);
            $('#current_degrees').text(data.current.temp + " °C");
            $('#feels_like_degrees').text(data.current.feels_like + " °C");
            $('#timezone').text("Timezone: " + data.timezone);
            $('#current_wind_speed').text("Weather in a next day: " + data.daily[1]['temp']['day']);
            $('#table_today_weather_max').text("Max: " + data.daily[0]['temp']['max'] + "°C");
            $('#table_today_weather_min').text("Min: " + data.daily[0]['temp']['min'] + "°C");
            $('#table_today_humidity').text("Humidity: " + data.daily[0]['humidity'] + "%");
            $('#table_today_description').text(data.daily[0]['weather'][0]['main']);

            $('#table_tomorrow_weather_max').text("Max: " + data.daily[1]['temp']['max'] + "°C");
            $('#table_tomorrow_weather_min').text("Min: " + data.daily[1]['temp']['min'] + "°C");
            $('#table_tomorrow_humidity').text("Humidity: " + data.daily[1]['humidity'] + "%");
            $('#table_tomorrow_description').text(data.daily[1]['weather'][0]['main']);

            $('#table_date2_weather_max').text("Max: " + data.daily[2]['temp']['max'] + "°C");
            $('#table_date2_weather_min').text("Min: " + data.daily[2]['temp']['min'] + "°C");
            $('#table_date2_humidity').text("Humidity: " + data.daily[2]['humidity'] + "%");
            $('#table_date2_description').text(data.daily[2]['weather'][0]['main']);

            $('#table_date3_weather_max').text("Max: " + data.daily[3]['temp']['max'] + "°C");
            $('#table_date3_weather_min').text("Min: " + data.daily[3]['temp']['min'] + "°C");
            $('#table_date3_humidity').text("Humidity: " + data.daily[3]['humidity'] + "%");
            $('#table_date3_description').text(data.daily[3]['weather'][0]['main']);

            $('#table_date4_weather_max').text("Max: " + data.daily[4]['temp']['max'] + "°C");
            $('#table_date4_weather_min').text("Min: " + data.daily[4]['temp']['min'] + "°C");
            $('#table_date4_humidity').text("Humidity: " + data.daily[4]['humidity'] + "%");
            $('#table_date4_description').text(data.daily[4]['weather'][0]['main']);


        })
        .fail((resp) => {
            console.log(resp.status);
            console.log('something went wrong');

        });






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























const brno = document.getElementById('brno');

brno.addEventListener("click", brnoCity);

function brnoCity(ourDate) {

    $.getJSON('https://api.openweathermap.org/data/2.5/onecall?lat=49.19&lon=16.60&units=metric&appid=a5e0ff3f994948c38427d1f99253e306').done((data) => {
            console.log(data);
            $('#latitude').text("Latitude: " + data.lat);
            $('#longtitude').text("Longtitude: " + data.lon);
            $('#current_degrees').text(data.current.temp + " °C");
            $('#feels_like_degrees').text(data.current.feels_like + " °C");
            $('#timezone').text("Timezone: " + data.timezone);
            $('#current_wind_speed').text("Weather in a next day: " + data.daily[1]['temp']['day']);
            $('#table_today_weather_max').text("Max: " + data.daily[0]['temp']['max'] + "°C");
            $('#table_today_weather_min').text("Min: " + data.daily[0]['temp']['min'] + "°C");
            $('#table_today_humidity').text("Humidity: " + data.daily[0]['humidity'] + "%");
            $('#table_today_description').text(data.daily[0]['weather'][0]['main']);

            $('#table_tomorrow_weather_max').text("Max: " + data.daily[1]['temp']['max'] + "°C");
            $('#table_tomorrow_weather_min').text("Min: " + data.daily[1]['temp']['min'] + "°C");
            $('#table_tomorrow_humidity').text("Humidity: " + data.daily[1]['humidity'] + "%");
            $('#table_tomorrow_description').text(data.daily[1]['weather'][0]['main']);

            $('#table_date2_weather_max').text("Max: " + data.daily[2]['temp']['max'] + "°C");
            $('#table_date2_weather_min').text("Min: " + data.daily[2]['temp']['min'] + "°C");
            $('#table_date2_humidity').text("Humidity: " + data.daily[2]['humidity'] + "%");
            $('#table_date2_description').text(data.daily[2]['weather'][0]['main']);

            $('#table_date3_weather_max').text("Max: " + data.daily[3]['temp']['max'] + "°C");
            $('#table_date3_weather_min').text("Min: " + data.daily[3]['temp']['min'] + "°C");
            $('#table_date3_humidity').text("Humidity: " + data.daily[3]['humidity'] + "%");
            $('#table_date3_description').text(data.daily[3]['weather'][0]['main']);

            $('#table_date4_weather_max').text("Max: " + data.daily[4]['temp']['max'] + "°C");
            $('#table_date4_weather_min').text("Min: " + data.daily[4]['temp']['min'] + "°C");
            $('#table_date4_humidity').text("Humidity: " + data.daily[4]['humidity'] + "%");
            $('#table_date4_description').text(data.daily[4]['weather'][0]['main']);


        })
        .fail((resp) => {
            console.log(resp.status);
            console.log('something went wrong');

        });








    document.querySelector('.title').innerText = ' Weather in Brno for ' + date1;

    $.getJSON('https://api.openweathermap.org/data/2.5/onecall?lat=49.19&lon=16.60&units=metric&appid=a5e0ff3f994948c38427d1f99253e306').done((data) => {
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

        document.querySelector('.title').innerText = ' Weather in Brno for ' + date1;

        $.getJSON('https://api.openweathermap.org/data/2.5/onecall?lat=49.19&lon=16.60&units=metric&appid=a5e0ff3f994948c38427d1f99253e306').done((data) => {
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

        document.querySelector('.title').innerText = ' Weather in Brno for ' + nextDay.toLocaleDateString();

        $.getJSON('https://api.openweathermap.org/data/2.5/onecall?lat=49.19&lon=16.60&units=metric&appid=a5e0ff3f994948c38427d1f99253e306').done((data) => {
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

        document.querySelector('.title').innerText = ' Weather in Brno for ' + dayPlus2.toLocaleDateString();

        $.getJSON('https://api.openweathermap.org/data/2.5/onecall?lat=49.19&lon=16.60&units=metric&appid=a5e0ff3f994948c38427d1f99253e306').done((data) => {
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

        document.querySelector('.title').innerText = ' Weather in Brno for ' + dayPlus3.toLocaleDateString();

        $.getJSON('https://api.openweathermap.org/data/2.5/onecall?lat=49.19&lon=16.60&units=metric&appid=a5e0ff3f994948c38427d1f99253e306').done((data) => {
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

        document.querySelector('.title').innerText = ' Weather in Brno for ' + dayPlus4.toLocaleDateString();


        $.getJSON('https://api.openweathermap.org/data/2.5/onecall?lat=49.19&lon=16.60&units=metric&appid=a5e0ff3f994948c38427d1f99253e306').done((data) => {
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






const plzen = document.getElementById('plzen');

plzen.addEventListener("click", plzenCity);

function plzenCity() {

    $.getJSON('https://api.openweathermap.org/data/2.5/onecall?lat=49.74&lon=13.37&units=metric&appid=a5e0ff3f994948c38427d1f99253e306').done((data) => {
            console.log(data);
            $('#latitude').text("Latitude: " + data.lat);
            $('#longtitude').text("Longtitude: " + data.lon);
            $('#current_degrees').text(data.current.temp + " °C");
            $('#feels_like_degrees').text(data.current.feels_like + " °C");
            $('#timezone').text("Timezone: " + data.timezone);
            $('#current_wind_speed').text("Weather in a next day: " + data.daily[1]['temp']['day']);
            $('#table_today_weather_max').text("Max: " + data.daily[0]['temp']['max'] + "°C");
            $('#table_today_weather_min').text("Min: " + data.daily[0]['temp']['min'] + "°C");
            $('#table_today_humidity').text("Humidity: " + data.daily[0]['humidity'] + "%");
            $('#table_today_description').text(data.daily[0]['weather'][0]['main']);

            $('#table_tomorrow_weather_max').text("Max: " + data.daily[1]['temp']['max'] + "°C");
            $('#table_tomorrow_weather_min').text("Min: " + data.daily[1]['temp']['min'] + "°C");
            $('#table_tomorrow_humidity').text("Humidity: " + data.daily[1]['humidity'] + "%");
            $('#table_tomorrow_description').text(data.daily[1]['weather'][0]['main']);

            $('#table_date2_weather_max').text("Max: " + data.daily[2]['temp']['max'] + "°C");
            $('#table_date2_weather_min').text("Min: " + data.daily[2]['temp']['min'] + "°C");
            $('#table_date2_humidity').text("Humidity: " + data.daily[2]['humidity'] + "%");
            $('#table_date2_description').text(data.daily[2]['weather'][0]['main']);

            $('#table_date3_weather_max').text("Max: " + data.daily[3]['temp']['max'] + "°C");
            $('#table_date3_weather_min').text("Min: " + data.daily[3]['temp']['min'] + "°C");
            $('#table_date3_humidity').text("Humidity: " + data.daily[3]['humidity'] + "%");
            $('#table_date3_description').text(data.daily[3]['weather'][0]['main']);

            $('#table_date4_weather_max').text("Max: " + data.daily[4]['temp']['max'] + "°C");
            $('#table_date4_weather_min').text("Min: " + data.daily[4]['temp']['min'] + "°C");
            $('#table_date4_humidity').text("Humidity: " + data.daily[4]['humidity'] + "%");
            $('#table_date4_description').text(data.daily[4]['weather'][0]['main']);


        })
        .fail((resp) => {
            console.log(resp.status);
            console.log('something went wrong');

        });









    document.querySelector('.title').innerText = ' Weather in Plzen for ' + date1;

    $.getJSON('https://api.openweathermap.org/data/2.5/onecall?lat=49.74&lon=13.37&units=metric&appid=a5e0ff3f994948c38427d1f99253e306').done((data) => {
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

        document.querySelector('.title').innerText = ' Weather in Plzen for ' + date1;

        $.getJSON('https://api.openweathermap.org/data/2.5/onecall?lat=49.74&lon=13.37&units=metric&appid=a5e0ff3f994948c38427d1f99253e306').done((data) => {
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

        document.querySelector('.title').innerText = ' Weather in Plzen for ' + nextDay.toLocaleDateString();

        $.getJSON('https://api.openweathermap.org/data/2.5/onecall?lat=49.74&lon=13.37&units=metric&appid=a5e0ff3f994948c38427d1f99253e306').done((data) => {
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

        document.querySelector('.title').innerText = ' Weather in Plzen for ' + dayPlus2.toLocaleDateString();

        $.getJSON('https://api.openweathermap.org/data/2.5/onecall?lat=49.74&lon=13.37&units=metric&appid=a5e0ff3f994948c38427d1f99253e306').done((data) => {
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

        document.querySelector('.title').innerText = ' Weather in Plzen for ' + dayPlus3.toLocaleDateString();

        $.getJSON('https://api.openweathermap.org/data/2.5/onecall?lat=49.74&lon=13.37&units=metric&appid=a5e0ff3f994948c38427d1f99253e306').done((data) => {
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

        document.querySelector('.title').innerText = ' Weather in Plzen for ' + dayPlus4.toLocaleDateString();


        $.getJSON('https://api.openweathermap.org/data/2.5/onecall?lat=49.74&lon=13.37&units=metric&appid=a5e0ff3f994948c38427d1f99253e306').done((data) => {
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