$(document)
    .ready(function () {
        $(document).ajaxStart(function () {
            spinner.show();
            info.hide();
        })
        .ajaxStop(function () {
            spinner.hide();
            info.show()
        })
        const overview = $('.weather');
        const temperature = $('.current-temperature');
        const wind = $('.wind');
        const perceived = $('.perceived');
        const celsius = $('.celsius');
        const fahrenheit = $('.fahrenheit');
        const conditions = $('.conditions');
        const percentage = $('.humidity');
        const search = $('.search-bar');
        const position = $('.position');
        const searchBtn = $('.search-button');
        const changeLang = $('.lang-btn');
        const spinner = $('.loading');
        const info = $('.info')
        let cache = {
            emptyName: false,
        }
        const apiKey = '1c54893d31e3e717c91e0ab4a132f9ef';
        function fetchWeather(lat, lon, units) {
            let lang = localStorage.getItem('lang');
            localStorage.setItem('lat', lat);
            localStorage.setItem('lon', lon);
            localStorage.setItem('units', units);
            $.getJSON(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&lang=${lang}&appid=${apiKey}`
            ).fail(function () {
                alert('Chyba při načítání dat.');
            }).done((data) => {
                showWeather(data);
            });
        }
        function showWeather(data) {
            overview.slideDown(1000);
            const { icon, description, main } = data.weather[0];
            const { feels_like, temp, humidity } = data.main;
            const { speed } = data.wind;
            const { name } = data;
            temperature.text(`${Math.round(temp)}°`);
            $('.icon').attr({
                src: `http://openweathermap.org/img/wn/${icon}.png`,
                alt: main
            });
            if (localStorage.getItem('units') === 'metric') {
                perceived.text(`pocitově: ${feels_like} °C`);
                wind.text(`rychlost větru: ${speed} km/h`);
                celsius.css('color', 'black');
                fahrenheit.css('color', 'grey');
            } else {
                perceived.text(`pocitově: ${feels_like} °F`);
                wind.text(`rychlost větru: ${speed} mph`);
                celsius.css('color', 'grey');
                fahrenheit.css('color', 'black');
            }
            if (cache.emptyName === true) {
                const lat = localStorage.getItem('lat');
                const lng = localStorage.getItem('lon');
                history.pushState({ lat, lng, name }, null);
                localStorage.setItem('name', name);
                changeText(name);
            }
            conditions.text(description);
            percentage.text(`vlhkost: ${humidity}%`);
        }

        $(window).on('popstate', function (event) {
            if (event.originalEvent.state !== null) {
                const { lat, lng, name } = event.originalEvent.state;
                localStorage.setItem('name', name);
                cache.emptyName = false;
                changeText(name);
                fetchWeather(lat, lng, localStorage.getItem('units'));
            } else {
                $('title').text('Super Weather');
                overview.slideUp(1000);
                search.val('');
            }
        });
        function changeText(name) {
            $('title').text(`Super Weather | ${name}`);
            $('.location').text(`Počasí v ${name}`);
        }
        if (localStorage.getItem('units') === null) {
            localStorage.setItem('units', 'metric');
        }
        if (localStorage.getItem('lat') !== null && localStorage.getItem('lon') !== null && localStorage.getItem('name') !== null) {
            changeText(localStorage.getItem('name'));
            cache.emptyName = false;
            fetchWeather(localStorage.getItem('lat'), localStorage.getItem('lon'), localStorage.getItem('units'));
        }
        if (localStorage.getItem('lang') === null) {
            localStorage.setItem('lang', 'cz');
        }

        function getUserLocation() {
            navigator.geolocation.getCurrentPosition(function (data) {
                search.val('');
                cache.emptyName = true;
                fetchWeather(data.coords.latitude, data.coords.longitude, localStorage.getItem('units'));
            });
        };
        function changeUnits(unit) {
            if (unit === 'metric') {
                fetchWeather(localStorage.getItem('lat'), localStorage.getItem('lon'), 'metric');
            } else {
                fetchWeather(localStorage.getItem('lat'), localStorage.getItem('lon'), 'imperial');
            }
        };
        function useUserInput(value) {
            const validCoordinates = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;
            if (!value.match(validCoordinates)) {
                search.val('Zadali jste chybné údaje');

            } else {
                let inputValue = value.trim();
                let coordinates = inputValue.split(',');
                try {
                    cache.emptyName = true;
                    fetchWeather(parseFloat(coordinates[0]), parseFloat(coordinates[1]), localStorage.getItem('units'));
                } catch (error) {
                    alert('Chyba vstupu');
                }
            }
        }

        const placesAutocomplete = places({
            appId: 'plUKYE6MHLZW',
            apiKey: '494e4aad2936484cc24439027b7a32e6',
            container: search[0]
        });

        function getLocation(data) {
            const { lat, lng } = data.latlng;
            const { name } = data;
            history.pushState({ lat, lng, name }, null);
            localStorage.setItem('name', name);
            changeText(name);
            cache.emptyName = false;
            fetchWeather(lat, lng, localStorage.getItem('units'));
        }
        placesAutocomplete.on('change', e => getLocation(e.suggestion));

        search.on('keypress', function (e) {
            if (e.which == 13) {
                useUserInput(search.val());
            }
        })
        fahrenheit.click(() => { changeUnits('imperial'); });
        celsius.click(() => { changeUnits('metric') });
        position.click(() => { getUserLocation() });
        searchBtn.click(() => { useUserInput(search.val()) });
        changeLang.click(function () {
            $(this).siblings().removeClass('active');
            var chosenLang = $(this).addClass('active').text();
            localStorage.setItem('lang', chosenLang);
            fetchWeather(localStorage.getItem('lat'), localStorage.getItem('lon'), localStorage.getItem('units'));
        })
    })


