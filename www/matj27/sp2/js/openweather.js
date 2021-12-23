const OpenWeather = {
    url: 'http://api.openweathermap.org/data/2.5/weather',
    apiKey: '',
    weatherRetrieved: false
};

OpenWeather.init = (apiKey)=>{
    OpenWeather.apiKey=apiKey;
}

/**
 * Retrieves weather data from OpenWeatherMap API
 * @param lat [in, float] geographical latitude
 * @param lon [in, float] geographical longitude
 */
OpenWeather.retrieveWeather = (lat, lon) => {
    /* API call: api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key} */
    if (lat === null || lon === null) {
        return;
    }

    lat = Number(lat);
    lon = Number(lon);

    OpenWeather.weatherRetrieved = false;

    lat = lat.toFixed(4);
    lon = lon.toFixed(4);

    const apiQuery = `${OpenWeather.url}?lat=${lat}&lon=${lon}&units=${App.weatherUnits}&lang=${App.weatherLang}&appid=${OpenWeather.apiKey}`;

    /*
    $.getJSON(`./openweather_reply.json`)
        .done((data) => {
            OpenWeather.processWeather(data);
        })
        .fail((resp) => {
            console.log('FAIL');
        })
    ;

     */

    $.getJSON(apiQuery)
        .done((data) => {
            OpenWeather.processWeather(data);
        })
        .fail((resp) => {
            alert(
                'Chyba při kontaktování OpenWeatherMap API.\n' +
                'Je dostupné internetové připojení?'
            );
        })
    ;
};

OpenWeather.processWeather = (json) => {
    OpenWeather.weather = json;
    OpenWeather.weatherRetrieved = true;

    App.updateWeather(OpenWeather.weather);
}
