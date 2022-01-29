let cache = {
    emptyName: false,
}
$(document).ready(() => {
    let weather = {
        apiKey: "1c54893d31e3e717c91e0ab4a132f9ef",
        fetchWeather: function (lat, lon, units) {
            localStorage.setItem('lat', lat);
            localStorage.setItem('lon', lon);
            localStorage.setItem('units', units);
            $.getJSON(
                "http://api.openweathermap.org/data/2.5/weather?lat="
                + lat +
                "&lon="
                + lon +
                "&units="
                + units +
                "&lang=cz" +
                "&appid=" +
                this.apiKey
            ).done((data) => {
                this.showWeather(data);
            });
        },
        showWeather: function (data) {
            $(".weather").slideDown(1000);
            const { icon, description, main } = data.weather[0];
            const { feels_like, temp, humidity } = data.main;
            const { speed } = data.wind;
            const { name } = data;
            $(".current-temperature").text(Math.round(temp));
            $(".icon").attr({
                src: "http://openweathermap.org/img/wn/" + icon + ".png",
                alt: main
            });
            if (localStorage.getItem('units') === "metric") {
                $(".perceived").text("pocitově: " + feels_like + " °C");
                $(".wind").text("rychlost větru: " + speed + " km/h");
                $(".celsius").css("color", "black");
                $(".fahrenheit").css("color", "grey");
            } else {
                $(".perceived").text("pocitově: " + feels_like + " °F");
                $(".wind").text("rychlost větru: " + speed + " mph");
                $(".celsius").css("color", "grey");
                $(".fahrenheit").css("color", "black");
            }
            if (cache.emptyName === true) {
                const lat = localStorage.getItem('lat');
                const lng = localStorage.getItem('lon');
                history.pushState({ lat, lng, name }, null);
                localStorage.setItem('name', name);
                changeText(name);
            }
            $(".conditions").text(description);
            $(".humidity").text("vlhkost: " + humidity + "%");
        },
    };
    $(window).on('popstate', function (event) {
        if (event.originalEvent.state !== null) {
            const { lat, lng, name } = event.originalEvent.state;
            localStorage.setItem('name', name);
            cache.emptyName = false;
            changeText(name);
            weather.fetchWeather(lat, lng, localStorage.getItem('units'));
        } else {
            $("title").text("Super Weather");
            $(".weather").slideUp(1000);
            $(".search-bar").val('');
        }
    });
    function changeText(name) {
        $("title").text("Super Weather | " + name);
        $(".location").text("Počasí v " + name);
    }
    if (localStorage.getItem('units') === null) {
        localStorage.setItem('units', "metric");
    }
    if (localStorage.getItem('lat') !== null && localStorage.getItem('lon') !== null && localStorage.getItem('name') !== null) {
        changeText(localStorage.getItem('name'));
        cache.emptyName = false;
        weather.fetchWeather(localStorage.getItem('lat'), localStorage.getItem('lon'), localStorage.getItem('units'));
    }
    
    function getUserLocation() {
        navigator.geolocation.getCurrentPosition(function (data) {
            $(".search-bar").val('');
            cache.emptyName = true;
            weather.fetchWeather(data.coords.latitude, data.coords.longitude, localStorage.getItem('units'));
        });
    };
    function changeUnits(unit) {
        if (unit === "metric") {
            weather.fetchWeather(localStorage.getItem('lat'), localStorage.getItem('lon'), "metric");
        } else {
            weather.fetchWeather(localStorage.getItem('lat'), localStorage.getItem('lon'), "imperial");
        }
    };

    const placesAutocomplete = places({
        appId: 'plUKYE6MHLZW',
        apiKey: '494e4aad2936484cc24439027b7a32e6',
        container: $('.search-bar')[0]
    });
    function getLocation(data) {
        const { lat, lng } = data.latlng;
        const { name } = data;
        history.pushState({ lat, lng, name }, null);
        localStorage.setItem('name', name);
        changeText(name);
        cache.emptyName = false;
        weather.fetchWeather(lat, lng, localStorage.getItem('units'));
    }
    placesAutocomplete.on('change', e => getLocation(e.suggestion));
    $(".fahrenheit").click(() => { changeUnits("imperial"); });
    $(".celsius").click(() => { changeUnits("metric") });
    $(".position").click(() => { getUserLocation() });
});

