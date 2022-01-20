$(document).ready(() => {
    const form = $('#form');
    const departure = $('#departure');
    const timeStart = $('#time-start');
    const timeEnd = $('#time-end');
    const flightContainer = $('#flight-container');
    const spinner = document.getElementById('spinner');
    let flightList = null;
    let timeStartUnix = null;
    let timeEndUnix = null;

    const button = document.getElementById('submit');
    /*
    const home = { template: '<div>home</div>' }
    const saved = { template: '<div>saved</div>' }

    const routes = [
        { path: '/', component: home },
        { path: '/saved', component: saved }
    ]

    const router = new VueRouter({
        routes: routes
    })

    const App = new Vue({
        el: '#app',
        router
        //data: {}
    }).$mount('#app')
    */
    ApiUrl = 'https://opensky-network.org/api';
    UnixTimeApiUtl = 'https://showcase.api.linx.twenty57.net/UnixTime/tounix?date='

    button.addEventListener('click', function () {
        /*
        if(spinner.nextSibling != spinner) {
            spinner.nextSibling.remove();
        }
        */
        const departureVal = departure.val();
        const timeStartVal = timeStart.val();
        const timeEndVal = timeEnd.val();

        $.ajax({
            method: 'GET',
            url: UnixTimeApiUtl + timeStartVal,
            //url: UnixTimeApiUtl + '2019-02-11 13:38:00',
            success: function (result) {
                timeStartUnix = result;
            }
        });

        $.ajax({
            method: 'GET',
            url: UnixTimeApiUtl + timeEndVal,
            success: function (result) {
                timeEndUnix = result;
            }
        });

        $.ajax({
            method: 'GET',
            url: ApiUrl + '/flights/departure?airport=' + departureVal + '&begin=' + timeStartUnix + '&end=' + timeEndUnix,
            //url: ApiUrl + '/flights/departure?airport=EGPF&begin=1517227200&end=1517237500',
            //url: ApiUrl + '/flights/departure?airport=EGPF&begin=1517227200&end=1517227201',
            dataType: 'json',
            success: function (results) {
                flightList = results;
                results.forEach(function (element) {
                    if (element.estDepartureAirport && element.estArrivalAirport) {
                        flights.insertAdjacentHTML('beforeend', "<div>" +
                            "<p>" + "Callsing: " + element.callsign + "</p>" +
                            "<p>" + "Departure: " + element.estDepartureAirport + " </p>" +
                            "<p>" + "Destination: " + element.estArrivalAirport + " </p>" +
                            "</div>");
                    }
                });
                //displayFlights();
                drawFlights();
            },
            error: function () {
                flights.insertAdjacentHTML('beforeend', "<div><p>No flights found</p></div>");
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

    drawFlights = function () {

        flightList.forEach(function (element) {
            if (element.estDepartureAirport && element.estArrivalAirport) {
                let depart = element.estDepartureAirport;
                let arrive = element.estArrivalAirport;
                let points = [[ICAO_CODES[depart][1], ICAO_CODES[depart][0]], [ICAO_CODES[arrive][1], ICAO_CODES[arrive][0]]];
                for (let i = 0; i < points.length; i++) {
                    points[i] = ol.proj.transform(points[i], 'EPSG:4326', 'EPSG:3857');
                }

                let featureLine = new ol.Feature({
                    geometry: new ol.geom.LineString(points)
                });

                let vectorLine = new ol.source.Vector({});
                vectorLine.addFeature(featureLine);

                let vectorLineLayer = new ol.layer.Vector({
                    source: vectorLine,
                    style: new ol.style.Style({
                        fill: new ol.style.Fill({ color: '#00FF00', weight: 4 }),
                        stroke: new ol.style.Stroke({ color: '#00FF00', width: 2 })
                    })
                });
                map.addLayer(vectorLineLayer);
            }
        });


    }

});