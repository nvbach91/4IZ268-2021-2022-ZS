let lat = 0;
let lng = 0;
const radiusKm = 50;
let city = '';
let country = '';
let countryCode = '';
let icao = '';
let embed = '';

$(document).ready(() => {
    showSearchField()
});

$(document).on('click',".search-img" , () => {
    $(".content").empty();
    $(".search-img").remove();
    $(".content").append(
        $('<input>')
            .addClass("icao-input")
            .attr("type", "text")
            .attr("placeholder", "Airport ICAO code...")
            .fadeIn(1000),
        $('<img>')
            .addClass("search-img-submit")
            .attr("height", "45")
            .attr("width", "45")
            .attr("src", "assets/img/search.png")
    );
});  

$(document).on('click',".search-img-submit" , () => {
    icao = $(".icao-input").val().toUpperCase();
    $(".icao-input").remove();
    $(".search-img-submit").remove();
    $(".content").append(
        $('<div>')
                .addClass("airport-video"),
        $('<div>')
            .addClass("text-container")
    );
    console.log(icao);
    getMetarToShow();

});

$(document).on('click',".position-img" , () => {
    $(".content").empty();
    $(".search-img").remove();
    showIfICanFly()
});

function showSearchField(){
    $(".content").empty();
    $(".search-img").remove();
    $(".content").append(
        $('<input>')
            .addClass("icao-input")
            .attr("type", "text")
            .attr("placeholder", "Airport ICAO code...")
            .fadeIn(1000),
        $('<img>')
            .addClass("search-img-submit")
            .attr("height", "45")
            .attr("width", "45")
            .attr("src", "assets/img/search.png")
            );
        $("nav").append(
            $('<img>')
                .addClass("position-img")
                .attr("height", "45")
                .attr("width", "40")
                .attr("src", "assets/img/position.png")
            );
    };

function showIfICanFly(){
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
        $(".content").append(
            $('<div>')
                    .addClass("airport-video"),
            $('<div>')
                .addClass("text-container")
        );
        getWebcam();
        getAirport();
    });
};
function getWebcam(){ 
    $.ajax({    
        method: 'GET',
        url: `https://api.windy.com/api/webcams/v2/list/country=CZ/category=airport/nearby=${lat},${lng},${radiusKm}/orderby=distance/?show=webcams:player`,
        headers: {'x-windy-key': 'T86SFPoPQnyl1V4L8fk9L8dPtqexlKU3'},
        dataType: 'json'
    }).done((data) => {
        if (data.result.webcams[0].player.live.available != true){
            embed = data.result.webcams[0].player.day.embed;
        }else{
            embed = data.result.webcams[0].player.live.embed
        };
        $(".airport-video").append(
            $('<embed>')
                .attr("type", "text/html")
                .attr("width", "640")
                .attr("height", "480")
                .attr("src", `${embed}`)
            );
        console.log(embed);
    });
};

function getMetarToShow(){ 
    $.ajax({    
        method: 'GET',
        url: `https://avwx.rest/api/metar/${icao}`,
        headers: {'Authorization':'b_6M2AGwvYHzcHpF7CPQaZuC0iYhUdGN8FGtR0vuUJw'},
        dataType: 'json'
    }).done((data) => {
        if (data.flight_rules == 'VFR'){
            $(".text-container").append(
                $('<div>')
                    .addClass("can-fly good text-box")
                    .text('Weather conditions are good for VFR, you can fly!')
                    .fadeIn(1000)
                );
        }else{
            $(".text-container").append(
                $('<div>')
                    .addClass("can-fly bad text-box")
                    .text(`You can\'t fly, current weather conditions are ${data.flight_rules}`)
                    .fadeIn(1000)
                );
        };
        $(".text-container").append(
            $('<div>')
                .addClass("metar text-box")
                .text(data.raw)
            );
        $("nav").append(
            $('<img>')
                .addClass("search-img")
                .attr("height", "45")
                .attr("width", "45")
                .attr("src", "assets/img/search.png")
            );

    });
};

function getClosestMetar(){ 
    $.ajax({    
        method: 'GET',
        url: `https://api.checkwx.com/metar/${icao}/nearest`,
        headers: {'X-API-Key':'89abfc4eee2945389b8cd3f1c2'},
        dataType: 'json'
    }).done((data) => {
        icao = data.data.join().substring(0,4)
        getMetarToShow();
    });
};


function getAirport(){ 
    $.ajax({    
        method: 'GET',
        url: `https://api.checkwx.com/station/lat/${lat}/lon/${lng}/radius/${radiusKm}?filter=A`,
        headers: {'X-API-Key':'89abfc4eee2945389b8cd3f1c2'},
        dataType: 'json'
    }).done((data) => {
        icao = data.data[0].icao;
        getClosestMetar()
    });
};