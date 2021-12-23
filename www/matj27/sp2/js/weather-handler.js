const WeatherHandler = {}

WeatherHandler.prepareWeatherHtml = (json) => {
    let tempUnit='';
    let windUnit='';

    switch(App.weatherUnits){
        case 'metric':
            tempUnit='°C';
            windUnit='m/s';
            break;
        case 'imperial':
            tempUnit='°F';
            windUnit='mph'
            break;
        case 'standard':
            tempUnit='K';
            windUnit='m/s';
            break;
        default:
            return '';
    }

    const html = `
        <div class="panel-name">
            <h1 class="location-name">${json.name}</h1>
        </div>
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
            <div class="weather-param">Vlhkost</div>
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
    `;

    return html;
}
