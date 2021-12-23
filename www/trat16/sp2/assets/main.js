let weather = {
    apiKey: "1c54893d31e3e717c91e0ab4a132f9ef",
    fetchWeather: function (lat, lon) {
        fetch(
            "http://api.openweathermap.org/data/2.5/weather?lat="
            + lat +
            "&lon="
            + lon +
            "&units=metric&lang=cz" +
            "&appid=" +
            this.apiKey
        )
            .then((response) => response.json())
            .then((response) => console.log(response.weather));
    }
}

