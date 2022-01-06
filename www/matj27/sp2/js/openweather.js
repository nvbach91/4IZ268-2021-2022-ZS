const OpenWeather = {
    url: 'http://api.openweathermap.org/data/2.5/weather',
    apiKey: '',
    weatherRetrieved: false
};

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

    App.weatherDivRendered = false;
    App.weatherDiv.empty();
    App.emailDivRendered = false;
    App.emailDiv.empty();
    App.weatherSpinner.addClass("spinner");

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
            App.openModalWindow(
                'Chyba při kontaktování OpenWeatherMap API. Je dostupné internetové připojení? Je zadán správný API klíč?'
            );
            App.weatherSpinner.removeClass("spinner");
        })
    ;
};

/**
 * Method will save received json of weather data,
 * sets flag of weather retrivision as true
 * and calls next method which will update on-screen coordinates
 * @param json of weather data
 */
OpenWeather.processWeather = (json) => {
    OpenWeather.weather = json;
    OpenWeather.weatherRetrieved = true;

    App.updateWeather(OpenWeather.weather);
}

/**
 * Method prepares a html code which will be visible on-screen in the main app
 * @param json of weather data
 * @returns {string} of prepared html code
 */
OpenWeather.prepareWeatherHtml = (json) => {
    let tempUnit = '';
    let windUnit = '';

    switch (App.weatherUnits) {
        case 'metric':
            tempUnit = '°C';
            windUnit = 'm/s';
            break;
        case 'imperial':
            tempUnit = '°F';
            windUnit = 'mph'
            break;
        case 'standard':
            tempUnit = 'K';
            windUnit = 'm/s';
            break;
        default:
            return '';
    }

    const html = `
        <div class="panel-name">
            <h1 class="location-name">${json.name}</h1>
        </div>
        <div class="weather-params">
            <div class="weather-param-wrapper">
                <div class="weather-param">Teplota</div>
                <div class="weather-data">${json.main.temp} ${tempUnit}</div>
            </div>
            <div class="weather-param-wrapper">
                <div class="weather-param">Pocitová teplota</div>
                <div class="weather-data">${json.main.feels_like} ${tempUnit}</div>
            </div>
            <div class="weather-param-wrapper">
                <div class="weather-param">Atmosferický tlak</div>
                <div class="weather-data">${json.main.pressure} hPa</div>
            </div>
            <div class="weather-param-wrapper">
                <div class="weather-param">Vlhkost vzduchu</div>
                <div class="weather-data">${json.main.humidity} %</div>
            </div>
            <div class="weather-param-wrapper">
                <div class="weather-param">Rychlost větru</div>
                <div class="weather-data">${json.wind.speed} ${windUnit}</div>
            </div>
            <div class="weather-param-wrapper">
                <div class="weather-param">Směr větru</div>
                <div class="weather-data">${json.wind.deg}°</div>
            </div>
        </div>
    `;

    return html;
}
