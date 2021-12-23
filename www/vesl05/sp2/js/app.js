const map = L.map('map').setView([50.080, 14.451], 15);

const popup = L.popup()
    .setLatLng([50.084559, 14.441183])
    .setContent("Vysoká škola ekonomická")
    .openOn(map);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibHVrYW5lIiwiYSI6ImNreGo3cXp6dDZiaTMyeGxhZXkyaGltcnIifQ.uLQYOB-Oo_szmnDn8WwnCw'
}).addTo(map);

function addPoint() {

    console.log("Test")

    return true
}