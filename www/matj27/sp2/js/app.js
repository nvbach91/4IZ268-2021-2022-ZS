$(document).ready(() => {
    App.init();
});

window.onpopstate = function (event) {
    App.renderWeather(WeatherHandler.prepareWeatherHtml());
};

const App = {
    openWeatherLocalStorageKey: 'open-weather-api-key',
    appDiv: $('#app'),
    emailDivRendered: false,
    weatherDivRendered: false,
    weatherUnits: 'metric',
    weatherLang: 'cz'
};

/**
 * Runs initialization procedures for map view and for email sender form
 */
App.init = async () => {
    App.emailDivRendered=false;
    App.weatherDivRendered=false;

    let appStructurePrepared = false;
    while (!appStructurePrepared) {
        try {
            await App.prepareMainAppStructure();
            appStructurePrepared = true;
        } catch (e) {
            alert(e);
        }
    }

    OpenWeather.retrieveWeather(App.urlParameter('lat'), App.urlParameter('lon'));
    Mapycz.init();
}

App.urlParameter = (name) => {
    let results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results === null) {
        return null;
    }
    return decodeURI(results[1]) || 0;
}

App.updateWeather = (json) => {
    history.pushState(null, 'Počasí v lokalitě', `?lat=${json.coord.lat}&lon=${json.coord.lon}`);

    App.renderWeather(json);
}

App.renderWeather = (json) => {
    const html = WeatherHandler.prepareWeatherHtml(json);

    if (html === '') {
        return;
    }

    App.weatherDivRendered = false;
    App.weatherDiv.empty();
    App.weatherDiv.html(html);
    App.weatherDivRendered = true;

    if (!App.emailDivRendered) {
        EmailSender.init();
    }
}

App.renderEmailForm = () => {
    App.emailDivRendered = false;
    App.emailDiv.empty();

    const html = EmailSender.prepareEmailFormHtml();

    App.emailDiv.html(html)
    App.emailDivRendered = true;
}

App.prepareMainAppStructure = async () => {
    let deferred = $.Deferred();

    const openWeatherApiKey = await App.retrieveOpenWeatherApiKey();
    if (openWeatherApiKey === null || openWeatherApiKey === '') {
        localStorage.removeItem(App.openWeatherLocalStorageKey);
        throw 'Uživatel nezadal OpenWeatherMap API klíč.';
    }

    OpenWeather.apiKey = localStorage.getItem(App.openWeatherLocalStorageKey);

    App.appDiv.empty();

    const html = `
        <div id="seznam-mapa"></div>
        <div id="side-panel">
            <div class="side-panel-content" id="weather"></div>
            <div class="side-panel-content" id="email"></div>
            <div class="side-panel-content" id="delete-api-keys-button-wrapper">
                <button id="delete-api-keys-button">Smazat API klíče</button>
            </div>
        </div>
    `;

    App.appDiv.html(html);

    App.weatherDiv = $('#weather');
    App.emailDiv = $('#email');

    App.deleteApiKeysButton = $('#delete-api-keys-button');

    App.deleteApiKeysButton.click(() => {
        App.deleteApiKeys();
    });
}

App.retrieveOpenWeatherApiKey = async () => {
    if (localStorage.getItem(App.openWeatherLocalStorageKey) === null) {
        await App.renderApiKeyInputForm();
    }

    return localStorage.getItem(App.openWeatherLocalStorageKey);
}

App.renderApiKeyInputForm = () => {
    App.appDiv.empty();

    const html = `
            <div class="main-panel">
                <div class="panel-name">
                    <h1 class="apikey-header">Zadejte API klíč pro přístup k OpenWeatherMap API</h1>
                </div>
                <form id="apikey-form">
                    <label>
                        <input id="apikey-input"
                            name="apikey"
                            placeholder="Zadejte API klíč"/>
                    </label>
                    <button>Potvrdit</button>
                </form>
            </div>
        `;

    App.appDiv.html(html);

    const apiKeyForm = $('#apikey-form');
    const apikeyInput = $('input[name="apikey"]');

    return new Promise((resolve) => {
        apiKeyForm.submit((e) => {
            e.preventDefault();

            localStorage.setItem(App.openWeatherLocalStorageKey, apikeyInput.val());

            resolve();
        });
    });
}

App.deleteApiKeys = () => {
    localStorage.removeItem(App.openWeatherLocalStorageKey);

    App.init();
}
