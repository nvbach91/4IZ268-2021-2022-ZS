$(document).ready(() => {
    App.init($('#app'), 'open-weather-api-key', 'send-grid-api-key');
});

window.onpopstate = function (event) {
    App.lastLocationPoppedFromHistory = true;

    const lon = App.urlParameter('lon');
    const lat = App.urlParameter('lat');
    App.weatherUnits = App.urlParameter('units');

    const newCoords = SMap.Coords.fromWGS84(lon, lat)
    Mapycz.createMarker(newCoords);
    Mapycz.map.setCenter(newCoords);

    OpenWeather.retrieveWeather(lat, lon);
};

const App = {
    emailDivRendered: false,
    weatherDivRendered: false,
    weatherUnits: 'metric',
    weatherLang: 'cz',
    lastLocationPoppedFromHistory: false
};

/**
 * Runs initialization procedures for map view and for email sender form
 * @param appDiv jQuery object of main app div as specified in index.html
 * @param openWeatherLSKey localStorage key of where openweather api key is (about to be) stored
 * @param sendGridLSKey localStorage key of where sendgrid api key is (about to be) stored
 */
App.init = async (appDiv, openWeatherLSKey, sendGridLSKey) => {
    App.openWeatherLocalStorageKey = openWeatherLSKey;
    App.sendGridLocalStorageKey = sendGridLSKey;
    App.appDiv = appDiv;

    App.emailDivRendered = false;
    App.weatherDivRendered = false;

    try {
        await App.initMainAppStructure();
    } catch (e) {
        App.openModalWindow(e);
    }

    App.mapSpinner.addClass("spinner");
    OpenWeather.retrieveWeather(App.urlParameter('lat'), App.urlParameter('lon'));
    Mapycz.init();
}

/**
 * Retreive a parameter from url
 * @param name of an parameter
 * @returns {string|number|null} string/number - value of parameter if parameter found in url, if not returns null
 */
App.urlParameter = (name) => {
    let results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results === null) {
        return null;
    }
    return decodeURI(results[1]) || 0;
}

/**
 * Adds new url to history to reflect app state
 * invokes a method to render weather data to screen
 */
App.updateWeather = (json) => {
    if (!App.lastLocationPoppedFromHistory) {
        history.pushState(null, 'Počasí v lokalitě', `?lat=${json.coord.lat}&lon=${json.coord.lon}&units=${App.weatherUnits}`);
    }

    App.renderWeather(json);
}

/**
 * Renders weather data to screen
 * @param json with weather data
 */
App.renderWeather = (json) => {
    const html = OpenWeather.prepareWeatherHtml(json);

    if (html === '') {
        return;
    }

    App.weatherSpinner.removeClass("spinner");
    App.weatherDiv.html(html);
    App.weatherDivRendered = true;

    if (!App.emailDivRendered) {
        EmailSender.init();
    }
}

/**
 * Renders an email form onto screen
 */
App.renderEmailForm = () => {
    App.emailDivRendered = false;
    App.emailDiv.empty();

    const html = EmailSender.prepareEmailFormHtml();

    App.emailDiv.html(html)
    App.emailDivRendered = true;
}

/**
 * Prepares main app structure - html code of the webapp
 * @returns {Promise} got all api keys needed
 */
App.initMainAppStructure = async () => {
    let deferred = $.Deferred();

    await App.retrieveApiKeys();
    App.setApiKeys();

    App.appDiv.empty();

    const html = `
        <div id="scratch"></div>
        <div id="modal" class="modal">
            <p id="modal-paragraph"></p>
            <a href="#" rel="modal:close">Zavřít</a>
        </div>
        <div id="map">
            <div id="map-spinner"></div>
            <div id="seznam-mapa"></div>
        </div>
        <div id="side-panel">
            <div id="weather-spinner"></div>
            <div class="side-panel-content" id="weather"></div>
            <div class="side-panel-content" id="email"></div>
            <div class="side-panel-content" id="app-controls">
                <div class="panel-name">
                    <h1 class="app-controls-header">Nastavení</h1>
                </div>
                <div id="units">
                    <label for="units-select"></label>
                    <select name="units-select" id="units-select">
                        <option value="metric">Metrické jednotky (°C, m/s)</option>
                        <option value="imperial">Imperiální jednotky (°F, mph)</option>
                        <option value="standard">Standardní jednotky (Kelvin, m/s)</option>
                    </select>
                </div>
                <button id="delete-api-keys-button">Smazat API klíče</button>
            </div>
        </div>
    `;

    App.appDiv.html(html);

    App.scratchDiv = $('#scratch');

    App.modalDiv = $('#modal');
    App.modalParagraph = $('#modal-paragraph');

    App.mapSpinner = $('#map-spinner');
    App.weatherSpinner = $('#weather-spinner');
    App.weatherDiv = $('#weather');
    App.emailDiv = $('#email');

    App.unitsSelect = $('#units-select');
    const currentUnits = App.urlParameter('units');
    if (currentUnits === 'metric' ||
        currentUnits === 'imperial' ||
        currentUnits === 'standard') {
        App.unitsSelect.val(currentUnits);
        App.weatherUnits = currentUnits;
    }
    App.unitsSelect.change(() => {
        App.weatherUnits = App.unitsSelect.val();
        OpenWeather.retrieveWeather(App.urlParameter('lat'), App.urlParameter('lon'));
    });

    App.deleteApiKeysButton = $('#delete-api-keys-button');
    App.deleteApiKeysButton.click(() => {
        App.deleteApiKeys();
    });
}

/**
 * tries to save all api keys into corresponding class attributes
 */
App.setApiKeys = () => {
    const openWeatherApiKey = localStorage.getItem(App.openWeatherLocalStorageKey);
    if (openWeatherApiKey === null || openWeatherApiKey === '') {
        localStorage.removeItem(App.openWeatherLocalStorageKey);
        throw 'Uživatel nezadal OpenWeatherMap API klíč.';
    }

    OpenWeather.apiKey = localStorage.getItem(App.openWeatherLocalStorageKey);

    const sendGridApiKey = localStorage.getItem(App.sendGridLocalStorageKey);
    if (sendGridApiKey === null || sendGridApiKey === '') {
        localStorage.removeItem(App.sendGridLocalStorageKey);
        throw 'Uživatel nezadal SendGrid API klíč.';
    }

    EmailSender.apiKey = localStorage.getItem(App.sendGridLocalStorageKey);
}

/**
 * Waits until user input api keys into rendered form -- await App.renderApiKeyInputForm();
 * @returns {Promise<>} got all api keys needed
 */
App.retrieveApiKeys = async () => {
    if (localStorage.getItem(App.openWeatherLocalStorageKey) === null
        || localStorage.getItem(App.sendGridLocalStorageKey) === null) {
        await App.renderApiKeyInputForm();
    }
}

/**
 * Renders a form to input all api keys
 * handles form submitting and saving api keys into localStorage
 */

App.renderApiKeyInputForm = () => {
    App.appDiv.empty();

    const html = `
            <div class="main-panel">
                <div class="panel-name">
                    <h1 class="apikey-header">Zadejte API klíč pro přístup k OpenWeatherMap API a SendGrid API</h1>
                </div>
                <form id="apikey-form">
                    <label>
                        <input id="openweather-apikey-input"
                            class="apikey-input"
                            name="openweather-apikey"
                            placeholder="Zadejte API klíč ke službě OpenWeatherMap"/>
                    </label>
                    <label>
                        <input id="sendgrid-apikey-input"
                            class="apikey-input"
                            name="sendgrid-apikey"
                            placeholder="Zadejte API klíč ke službě SendGrid"/>
                    </label>
                    <button>Potvrdit</button>
                </form>
            </div>
        `;

    App.appDiv.html(html);

    const apiKeyForm = $('#apikey-form');
    const openWeatherApikeyInput = $('input[name="openweather-apikey"]');
    const sendGridApikeyInput = $('input[name="sendgrid-apikey"]');

    return new Promise((resolve) => {
        apiKeyForm.submit((e) => {
            e.preventDefault();

            localStorage.setItem(App.openWeatherLocalStorageKey, openWeatherApikeyInput.val());
            localStorage.setItem(App.sendGridLocalStorageKey, sendGridApikeyInput.val());

            resolve();
        });
    });
}

/**
 * Deletes all api keys from local storage
 */
App.deleteApiKeys = () => {
    localStorage.removeItem(App.openWeatherLocalStorageKey);
    localStorage.removeItem(App.sendGridLocalStorageKey);

    App.init($('#app'), 'open-weather-api-key', 'send-grid-api-key');
}

/**
 * Open a modal window with given message instead of alert()
 * @param message string of message to be shown in modal window
 */
App.openModalWindow = (message) => {
    App.modalParagraph.text(message);
    const a = $(`<a href="#modal" rel="modal:open"></a>`);
    App.scratchDiv.append(a);
    a.click();
    App.scratchDiv.empty();
}
