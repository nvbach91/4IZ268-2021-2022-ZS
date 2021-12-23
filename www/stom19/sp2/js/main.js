
$.getJSON('https://api.openweathermap.org/data/2.5/onecall?lat=50.08&lon=14.42&exclude=hourly,daily&units=metric&appid=a5e0ff3f994948c38427d1f99253e306').done((data) => {
    console.log(data);
    $('#latitude').text("Latitude: " + data.lat);
        $('#longtitude').text("Longtitude: "+data.lon);
        $('#current_temp').text("Current Temperature: " +data.current.temp+ " °C");
        $('#current_feels_like').text("Currently feels like: " + data.current.feels_like+ "°C");
        $('#current_wind_speed').text("Currently wind speed: " + data.current.wind_speed+ "M/S");
})
    .fail((resp) => {
        console.log(resp.status);
        console.log('something went wrong');

    });

    



/*$.ajax({
    dataType:'json',
    url: 'https://api.openweathermap.org/data/2.5/onecall?lat=50.08&lon=14.42&exclude=hourly,daily&units=metric&appid=a5e0ff3f994948c38427d1f99253e306',
    type: 'POST',
    success: function(server_response){
        $('#latitude').text("Latitude: " + server_response.lat);
        $('#longtitude').text("Longtitude: "+server_response.lon);
        $('#current_temp').text("Current Temperature: " +server_response.current.temp+ " °C");
        $('#current_feels_like').text("Currently feels like: " + server_response.current.feels_like+ "°C");
        $('#current_wind_speed').text("Currently wind speed: " + server_response.current.wind_speed+ "M/S");
        
       
    }
}).done((data) => {
    console.log(data);
}).fail((resp) => {
    //...
});
*/
