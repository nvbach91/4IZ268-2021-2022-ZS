let cache = {
    lat: null,
    lon: null,
    units: "metric",
    emptyName: false,
}
let weather = {
    apiKey: "1c54893d31e3e717c91e0ab4a132f9ef",
    fetchWeather: function (lat, lon, units) {
        cache.lat = lat;
        cache.lon = lon;
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
        $(".weather").fadeIn(1000);
        const { icon, description, main } = data.weather[0];
        const { feels_like, temp, humidity } = data.main;
        const { speed } = data.wind;
        const { name } = data;
        $(".current-temperature").text(Math.round(temp));
        $(".icon").attr({
            src: "http://openweathermap.org/img/wn/" + icon + ".png",
            alt: main
        });
        if (cache.units === "metric") {
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
        if (cache.emptyName){
            $(".location").text("Počasí v " + name);
        }
        $(".conditions").text(description);
        $(".humidity").text("vlhkost: " + humidity + "%");
    },
};
$(document).ready(() => {
    function getUserLocation() {
        navigator.geolocation.getCurrentPosition(function (data) { 
            cache.emptyName = true;
            weather.fetchWeather(data.coords.latitude, data.coords.longitude, cache.units);
        console.log(data)});
    }
    function changeUnits(unit) {
        if (unit === "metric") {
            weather.fetchWeather(cache.lat, cache.lon, "metric");
            cache.units = "metric";
        } else {
            weather.fetchWeather(cache.lat, cache.lon, "imperial");
            cache.units = "imperial";
        }
    }
    $(".fahrenheit").click(() => { changeUnits("imperial"); });
    $(".celsius").click(() => { changeUnits("metric") });
    $(".position").click(() => { getUserLocation()});

    const placesAutocomplete = places({
        appId: 'plUKYE6MHLZW',
        apiKey: '494e4aad2936484cc24439027b7a32e6',
        container: $('.search-bar')[0]
    });
    function getLocation(data) {
        const { lat, lng } = data.latlng;
        const { name } = data;
        cache.emptyName = false;
        weather.fetchWeather(lat, lng, cache.units);
        $(".location").text("Počasí v " + name);
    }
    placesAutocomplete.on('change', e => getLocation(e.suggestion));
});

