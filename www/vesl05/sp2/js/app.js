const map = L.map('map').setView([50.080, 14.451], 15);

var myMarkerGroup = L.featureGroup().addTo(map).on("click", markersClick);

var mapPoints = []

var marker = L.marker([50.084559, 14.441183]).addTo(map);
marker.bindPopup("<b>Bod na mapě</b><br>To to je VŠE").openPopup();

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibHVrYW5lIiwiYSI6ImNreGo3cXp6dDZiaTMyeGxhZXkyaGltcnIifQ.uLQYOB-Oo_szmnDn8WwnCw'
}).addTo(map);

function onMapClick(e) {

    var marker = L.marker(e.latlng)

    if($("#add").is(":checked"))
    {
        var uniqId = 'id' + (new Date()).getTime();
        marker.addTo(map);
        marker.addTo(myMarkerGroup);
        marker.bindPopup("<b>Bod na mapě</b><br>"+uniqId)

        marker.id = uniqId;
        marker.name = "Název";
        marker.desctiption = "Popis";
        marker.latlng = e.latlng;
        marker.type = "stop";

        var point = {
            id: uniqId,
            name: "Název",
            desctiption: "Popis",
            latlng: e.latlng,
            type: "stop"
        };

        mapPoints.push(point)
    }
}

function markersClick(event) {
    console.log("Marker ID " + event.layer.id);
    console.log("Marker Name" + event.layer.name);
    console.log("Marker Desc " + event.layer.desctiption);
    console.log("Marker LL" + event.layer.latlng);
    console.log("Marker Type " + event.layer.type);

    $("#name").val(event.layer.name)
    $("#description").val(event.layer.desctiption)
    $("#type").val(event.layer.type)
}

map.on('click', onMapClick);
