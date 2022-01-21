$(document).ready(() => {
    const form = $('#form');
    const departure = $('#departure');
    const timeStart = $('#time-start');
    const timeEnd = $('#time-end');
    const flightContainer = $('#flight-container');
    const spinner = $('#spinner');
    const flights = $('#flights');
    let flightList = null;
    let timeStartUnix = null;
    let timeEndUnix = null;

    let vectorLineLayer = null;
    let vectorLine = null;
    let featureLine = null;
    let points = null;

    const apiUrl = 'https://opensky-network.org/api';
    const unixTimeApiUtl = 'https://showcase.api.linx.twenty57.net/UnixTime/tounix?date=';
    const airportApi = 'https://www.airport-data.com/api/ap_info.json?icao=';

    $('#submit').on("click", function () {

        spinner.removeClass('hidden');

        flightContainer.siblings().remove();

        const departureVal = departure.val();
        const timeStartVal = timeStart.val();
        const timeEndVal = timeEnd.val();

        $.ajax({
            method: 'GET',
            url: 'https://cors-proxy.itake.cz/get?url=' + encodeURIComponent(unixTimeApiUtl + timeStartVal),
            success: function (result) {
                timeStartUnix = result;
                console.log(timeStartUnix);
            }
        });

        $.ajax({
            method: 'GET',
            url: 'https://cors-proxy.itake.cz/get?url=' + encodeURIComponent(unixTimeApiUtl + timeEndVal),
            success: function (result) {
                timeEndUnix = result;
            }
        });

        $.ajax({
            method: 'GET',
            url: apiUrl + '/flights/departure?airport=' + departureVal + '&begin=' + timeStartUnix + '&end=' + timeEndUnix,
            dataType: 'json',
            success: function (results) {
                flightList = results;
                let flightString = '';
                let depPort = '';
                let arrPort = '';
                for(let i = 0; i < 4; i++) {
                    const urlA = encodeURIComponent(airportApi + results[i].estDepartureAirport);
                    const urlB = encodeURIComponent(airportApi + results[i].estArrivalAirport);
                    if (results[i].estDepartureAirport && results[i].estArrivalAirport && ICAO_CODES[results[i].estDepartureAirport] != undefined) {
                        $.ajax({
                            method: 'GET',
                            url: 'https://airport-info.p.rapidapi.com/airport?icao=' + results[i].estDepartureAirport,
                            headers: {
                                'x-rapidapi-host': 'airport-info.p.rapidapi.com',
                                'x-rapidapi-key': '19791debe9msh5886a156b6807d4p1c84e2jsnec0f2755f756'
                            },
                            async: true,
                            crossDomain: true,
                            dataType: 'json',
                            success: function (result) {
                                $("[data-airport=" + results[i].estDepartureAirport + "]").html("Departure: " + result.name);
                                depPort += result.name;
                                console.log(depPort);
                            }
                        });
                        $.ajax({
                            method: 'GET',
                            url: 'https://airport-info.p.rapidapi.com/airport?icao=' + results[i].estArrivalAirport,
                            headers: {
                                'x-rapidapi-host': 'airport-info.p.rapidapi.com',
                                'x-rapidapi-key': '19791debe9msh5886a156b6807d4p1c84e2jsnec0f2755f756'
                            },
                            dataType: 'json',
                            success: function (result) {
                                $("[data-airport=" + results[i].estArrivalAirport + "]").html("Destination: " + result.name);
                                arrPort += result.name;
                                console.log(arrPort);
                            }
                        });
                        spinner.addClass('hidden');
                        flightString += "<div>" +
                        "<p>" + "Callsing: " + results[i].callsign + "</p>" +
                        "<p data-airport='" + results[i].estDepartureAirport + "'>" + "Departure: " + depPort + "</p>" +
                        "<p data-airport='" + results[i].estArrivalAirport + "'>" + "Departure: " + depPort + "</p>" +
                        "<hr>" + "</div>";
                    }
                }
                flights.append(flightString);
                drawFlights();
            },
            error: function () {
                spinner.addClass('hidden');
                flights.append("<div><p>No flights found</p></div>");
                map.removeLayer(vectorLineLayer);
            }
        });
    });

    let map = new ol.Map({
        layers: [
            new ol.layer.Tile({
                source: new ol.source.XYZ({
                    attributions: [
                        ol.source.OSM.ATTRIBUTION,
                        'Tiles courtesy of ' +
                        '<a href="http://openstreetmap.org">' +
                        'OpenStreetMap' +
                        '</a>'
                    ],
                    url: 'http://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                })
            })
        ],
        controls: ol.control.defaults({
            attributionOptions: {
                collapsed: false
            }
        }).extend([
            new ol.control.ScaleLine()
        ]),
        target: 'map',
        view: new ol.View({
            center: ol.proj.fromLonLat([0, 0]),
            zoom: 2
        })
    });

    var drawFlights = function () {

        map.removeLayer(vectorLineLayer);
        points = null;

        for(let i = 0; i < 10; i++) {
            if (flightList[i].estDepartureAirport && flightList[i].estArrivalAirport) {
                let depart = flightList[i].estDepartureAirport;
                let arrive = flightList[i].estArrivalAirport;
                if(ICAO_CODES[depart] != undefined && ICAO_CODES[arrive] != undefined) {
                    points = [[ICAO_CODES[depart][1], ICAO_CODES[depart][0]], [ICAO_CODES[arrive][1], ICAO_CODES[arrive][0]]];
                    for (let i = 0; i < points.length; i++) {
                        points[i] = ol.proj.transform(points[i], 'EPSG:4326', 'EPSG:3857');
                    }
                }

                let distance = flightList[i].estDepartureAirportHorizDistance / (flightList[i].estDepartureAirportHorizDistance + flightList[i].estArrivalAirportHorizDistance);

                let colorString = 'rgba(0, 0, 0,' + distance +')';;

                featureLine = new ol.Feature({
                    geometry: new ol.geom.LineString(points)
                });

                vectorLine = new ol.source.Vector({});
                vectorLine.addFeature(featureLine);

                vectorLineLayer = new ol.layer.Vector({
                    source: vectorLine,
                    style: new ol.style.Style({
                        fill: new ol.style.Fill({ color: colorString, weight: 4 , opacity: distance}),
                        stroke: new ol.style.Stroke({ color: colorString, width: 2, opacity: distance})
                    })
                });
                map.addLayer(vectorLineLayer);
            }
        }
    }

});