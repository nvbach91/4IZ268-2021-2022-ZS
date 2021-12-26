
// Namespace or closure
const App = {}

$(document).ready(() => { /*...*/ });

//initialize map
let map;

//const map = $('#map');

function initMap() {

    const myLatlng = { lat: 50.073658, lng: 14.418540 };
    map = new google.maps.Map(document.getElementById("map"), {
        center: myLatlng,
        zoom: 8,
    });

    //add custom marker
    const svgMarker = {
        path: "M2 15.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v13.5zM8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z",
        fillColor: "blue",
        fillOpacity: 0.5,
        strokeWeight: 0,
        rotation: 0,
        scale: 2,
        anchor: new google.maps.Point(6, 6),
    };

    //add marker manually
    /*const marker = new google.maps.Marker({
        position: myLatlng,
        map,
        title: "Click to zoom",
        icon: svgMarker,
    });*/

    //add note window
    const noteWindow = new google.maps.InfoWindow({
        content: 'Prague'
    });

    /*
    // 10 seconds after the center of the map has changed, pan back to the
    // marker. Just an experiment :/
    map.addListener("center_changed", () => {
        window.setTimeout(() => {
            map.panTo(marker.getPosition());
        }, 10000);
    });*/

    //listens for the click event on a marker to zoom the map when the marker is clicked.
    marker.addListener("click", () => {
        map.setZoom(8);
        map.setCenter(marker.getPosition());
        //after click it also opens a note window
        noteWindow.open(map, marker);

    });

    addMarker({ lat: 50.14734, lng: 14.10285});
    addMarker({ lat: 50.073658, lng: 14.418540});
    addMarker({ lat: 49.94839, lng: 15.26816});
    

    //add marker (automatically) function
    function addMarker(coords) {
        const marker = new google.maps.Marker({
            position: coords,
            map,
            title: "Click to zoom",
            icon: svgMarker,
        });
        map.panTo(coords);
    }

    map.addListener('click', (event) => {
        addMarker(event.latLng, map);
    });
}