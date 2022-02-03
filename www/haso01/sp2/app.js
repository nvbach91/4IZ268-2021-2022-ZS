$(document).ready(() => {
	const weatherForm = $('#weather-input-form');
    const cityNameInput = $('input[name="city-name"]');
	const apiKey = '&appid=49e168c62ed9de1a220b5ebdbeca7b56';
	let daily = [];
	let cityName = "";
	const mapIcon = new Map();

	mapIcon.set('01', "images/icons/icon-2.svg");
	mapIcon.set('02', "images/icons/icon-3.svg");
	mapIcon.set('03', "images/icons/icon-5.svg");
	mapIcon.set('04', "images/icons/icon-6.svg");
	mapIcon.set('09', "images/icons/icon-10.svg");
	mapIcon.set('10', "images/icons/icon-4.svg");
	mapIcon.set('11', "images/icons/icon-12.svg");
	mapIcon.set('13', "images/icons/icon-14.svg");
	mapIcon.set('50', "images/icons/icon-8.svg");

	weatherForm.submit((event) => {
		event.preventDefault();
		const inputValue = cityNameInput.val();
		if(inputValue.trim() == ""){
			return;
		}
		fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + inputValue + apiKey).then((resp) => {
			return resp.json();
		}).then((resp) => {
			const city = {
				name: resp[0].name,
				lat: resp[0].lat,
				lon: resp[0].lon
			};
			cityName = city.name;
			console.log(city.name);
			fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + city.lat + '&lon=' + city.lon + '&exclude=minutely,hourly,alerts&units=metric' + apiKey).then((resp) => {
				return resp.json();
			}).then((resp) => {
				const locale = "en-us";
				const currentWeather = resp.current;
				var date = new Date(currentWeather.dt*1000);
				const currentData =  {
					dt: date.toLocaleDateString(locale, { weekday: 'long' }),
					temp: Math.round(currentWeather.temp),
					weatherMain: currentWeather.weather[0].main,
					weatherIcon: mapIcon.get(currentWeather.weather[0].icon.substring(0, 2)),
					humidity: currentWeather.humidity,
					wind_speed: currentWeather.wind_speed
				}
				const weatherDaily = resp.daily;
				$.each(weatherDaily, function(i,jsonObject){
					var date = new Date(weatherDaily[i].dt*1000); 	
						const weatherData = {
							dt: date.toLocaleDateString(locale, { weekday: 'long' }),
							tempDay: Math.round(weatherDaily[i].temp.day),
							tempNight: Math.round(weatherDaily[i].temp.night),
							weatherMain: weatherDaily[i].weather[0].main,
							weatherIcon: mapIcon.get(weatherDaily[i].weather[0].icon.substring(0, 2)),
							humidity: weatherDaily[i].humidity,
							wind_speed: weatherDaily[i].wind_speed
						}
						daily.push(weatherData);
					});
					daily.pop();
					daily[0] = currentData;
					
					console.log(daily);
			}).then(() => {
				const dailyWeatherStats = $('#daily-forecast');
				const dailyWeatherContent = dailyWeatherStats.find('.forecast');
				dailyWeatherContent.remove();
				const weatherContainer = $(`
				<div id="current-forecast" class="today forecast">
					<div class="forecast-header">
						<div class="day">Today</div>
					</div>
					<div class="forecast-content">
						<div class="location">` + cityName + `</div>
						<div class="degree">
							<div class="num">` + daily[0].temp + `<sup>o</sup>C</div>
							<div class="forecast-icon">
								<img src="` + daily[0].weatherIcon + `" alt="" width=110>
							</div>	
							<span><img src="images/icon-umberella.png" alt="">` + daily[0].humidity + `</span>
							<span><img src="images/icon-wind.png" alt="">` + daily[0].wind_speed + `m/s</span>
						</div>
					</div>
				</div>`
				);
				dailyWeatherStats.append(weatherContainer);
				daily.shift();
				console.log(daily);

				$.each(daily, function(i,jsonObject){ 	
					const dailyWeatherContainer = $(`
					<div class="forecast">
						<div class="forecast-header">
							<div class="day">` + daily[i].dt + `</div>
						</div> <!-- .forecast-header -->
						<div class="forecast-content">
							<div class="forecast-icon">
								<img src="` + daily[i].weatherIcon + `" alt="" width=48>
							</div>
							<div class="degree">` + daily[i].tempDay + `<sup>o</sup>C</div>
							<small>` + daily[i].tempNight + `<sup>o</sup>C</small>
						</div>
					</div>`
					
				)
				dailyWeatherStats.append(dailyWeatherContainer);
				})
				daily = [];
				const mapStats = $('#map-content');
				const mapContent = mapStats.find('#map');
				mapContent.remove();
				
				const mapContainer = $(`
				<div id="map" class="map">
					<iframe src="https://openweathermap.org/weathermap?basemap=map&cities=false&layer=radar&lat=` + city.lat + `&lon=` + city.lon + `&zoom=7" width="700" height="500" allowfullscreen="" loading="lazy" class="map"></iframe>
				</div>`
				)
				mapStats.append(mapContainer);
			})
		})
	})
})