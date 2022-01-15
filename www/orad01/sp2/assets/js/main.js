$(document).ready(() => {
    
    let lat = 0;
    let lng = 0;
    const radiusKm = 50;
    let city = '';
    let country = '';
    let countryCode = '';
    let icao = '';
    let embed = '';
    
    const content = $(".content");
    const searchIcon = $(".search-img");
    const inputField = $(".icao-input");
    const search = $(".search-img-submit");
    const airportVideo = $(".airport-video");
    const textContainer = $(".text-container");
    const nav = $("nav");
    const showStorage = $(".show-storage");
    let airports = [];
    const airportStorage = localStorage.getItem('airports');
    if (airportStorage){
        airports = JSON.parse(airportStorage);
    }
    
    storage();

// JSON.stringify(airports)
// airports = JSON.parse(localStorage.getItem("airports"))

    function storage(){
        showStorage.empty();
        if (airports.length > 0){
            showStorage.text("Airport history")
            for (let i = 0; i < airports.length; i++) { 
                showStorage.append(
                    $('<div>')
                    .addClass("airport-box").append(
                        $('<div>')
                        .text(airports[i])
                        .addClass("airport")
                        .attr('id', airports[i]),
                        $('<button>')
                        .addClass("airport-delete")
                        .attr('id', airports[i])
                    )
                )
            }
        }
    };

    $(document).on('click', ".airport", function() {
        inputField.val($(this).text())
        search.click()
    });
    
    $(document).on('click', ".airport-delete", function() {
        airports.splice(airports.indexOf($(this).attr('id')),1);
        localStorage.setItem('airports', JSON.stringify(airports));
        storage()
    });

    inputField.keypress(function (e) {
        if (e.which == 13) {
            search.click();
            inputField.val('')
        }
      });


    $(document).on('click', ".search-img-submit", () => {
        icao = $(".icao-input").val().toUpperCase();
        airportVideo.empty();
        textContainer.empty();
        if (!airports.includes(icao)){
            airports.push(icao)
            localStorage.setItem('airports', JSON.stringify(airports));
        };
        getMetarToShow();
        storage();
        inputField.val('')
    });

    $(document).on('click', ".position-img", () => {
        airportVideo.empty();
        textContainer.empty();
        showIfICanFly()
    });
    function showIfICanFly() {
        $.ajax({
            method: 'GET',
            url: 'https://freegeoip.app/json/',
            dataType: 'json'
        }).done((data) => {
            lat = data.latitude;
            lng = data.longitude;
            city = data.city;
            country = data.country_name;
            countryCode = data.country_code;
            getWebcam();
            getAirport();
        });
    };
    function getWebcam() {
        $.ajax({
            method: 'GET',
            url: `https://api.windy.com/api/webcams/v2/list/country=CZ/category=airport/nearby=${lat},${lng},${radiusKm}/orderby=distance/?show=webcams:player`,
            headers: { 'x-windy-key': 'T86SFPoPQnyl1V4L8fk9L8dPtqexlKU3' },
            dataType: 'json'
        }).done((data) => {
            if (data.result.webcams[0].player.live.available != true) {
                embed = data.result.webcams[0].player.day.embed;
            } else {
                embed = data.result.webcams[0].player.live.embed;
            }
            airportVideo.append(
                $('<embed>')
                    .attr("type", "text/html")
                    .attr("width", "640")
                    .attr("height", "480")
                    .attr("src", `${embed}`)
            );
        }).fail(() => {
            airportVideo.append(
                $('<p>')
                    .text("video not available")
            );
        });
    };

    function getMetarToShow() {
        $.ajax({
            method: 'GET',
            url: `https://avwx.rest/api/metar/${icao}`,
            headers: { 'Authorization': 'b_6M2AGwvYHzcHpF7CPQaZuC0iYhUdGN8FGtR0vuUJw' },
            dataType: 'json'
        }).done((data) => {
            if (data.flight_rules == 'VFR') {
                textContainer.append(
                    $('<div>')
                        .addClass("can-fly good text-box")
                        .text('Weather conditions are good for VFR, you can fly!')
                        .fadeIn(1000)
                );
            } else {
                textContainer.append(
                    $('<div>')
                        .addClass("can-fly bad text-box")
                        .text(`You can\'t fly, current weather conditions are ${data.flight_rules}`)
                        .fadeIn(1000)
                );
            };
            textContainer.append(
                $('<div>')
                    .addClass("metar text-box")
                    .text(data.raw)
            );
            textContainer.append(
                $('<img>')
                    .addClass("metar-help")
                    .attr("height", "86")
                    .attr("width", "287")
                    .attr("src", "assets/img/metar.png")
            );
        }).fail(() => {
            textContainer.append(
                $('<div>')
                    .addClass("can-fly good text-box")
                    .text('Service offline')
                    .fadeIn(1000)
            );
        });
    };

    function getClosestMetar() {
        $.ajax({
            method: 'GET',
            url: `https://api.checkwx.com/metar/${icao}/nearest`,
            headers: { 'X-API-Key': '89abfc4eee2945389b8cd3f1c2' },
            dataType: 'json'
        }).done((data) => {
            icao = data.data.join().substring(0, 4);
            getMetarToShow();
        }).fail(() => {
            textContainer.append(
                $('<div>')
                    .addClass("can-fly good text-box")
                    .text('Service offline')
                    .fadeIn(1000)
            );
        });
    };


    function getAirport() {
        $.ajax({
            method: 'GET',
            url: `https://api.checkwx.com/station/lat/${lat}/lon/${lng}/radius/${radiusKm}?filter=A`,
            headers: { 'X-API-Key': '89abfc4eee2945389b8cd3f1c2' },
            dataType: 'json'
        }).done((data) => {
            icao = data.data[0].icao;
            getClosestMetar()
        }).fail(() => {
            textContainer.append(
                $('<div>')
                    .addClass("can-fly good text-box")
                    .text('Service offline')
                    .fadeIn(1000)
            );
        });
    };

});