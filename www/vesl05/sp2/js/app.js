const map = L.map('map').setView([50.080, 14.451], 15);

var currentlyEditedMarker;
var myMarkerGroup = L.featureGroup().addTo(map).on("click", markersClick);
var mapPoints = []

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
        //marker.addTo(map);
        marker.addTo(myMarkerGroup);

        marker.id = uniqId;
        marker.name = "Název";
        marker.description = "Popis";
        marker.latlng = e.latlng;
        marker.type = "stop";

        var point = {
            id: uniqId,
            name: "Název",
            description: "Popis",
            latlng: e.latlng,
            type: "stop"
        };

        marker.bindPopup("<b>Název</b><br>Popis")

        mapPoints.push(point)
    }
}

function markersClick(event) {
    currentlyEditedMarker = event.layer.id; 
    $("#name").val(event.layer.name)
    $("#description").val(event.layer.description)
    $("#type").val(event.layer.type)
}

function markerEdit() {
    for (let index in myMarkerGroup._layers) {
        if(myMarkerGroup._layers[index].id == currentlyEditedMarker){
            myMarkerGroup._layers[index].name = $("#name").val();
            myMarkerGroup._layers[index].description = $("#description").val();
            myMarkerGroup._layers[index].type = $("#type").val();

            myMarkerGroup._layers[index].bindPopup("<b>"+$("#name").val()+"</b><br>" + $("#description").val())
        }
    }
}

function findMyLocation() {
    function success(position) {
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;
    
        map.setView([latitude, longitude], 15);
      }

    navigator.geolocation.getCurrentPosition(success, function(){});
}

function createFile(){
    console.log("test")

    var points = [];

    for (let index in myMarkerGroup._layers) {
            points.push({
                id: myMarkerGroup._layers[index].id,
                name: myMarkerGroup._layers[index].name,
                description: myMarkerGroup._layers[index].description,
                latlng: myMarkerGroup._layers[index].latlng,
                type:  myMarkerGroup._layers[index].type
            })
    }

    var file = new File([JSON.stringify(points)], "config.json", {type: "application/json"})

    sendFile(file)
}

function getData(data){
    for (let index in myMarkerGroup._layers) {
        map.removeLayer(myMarkerGroup._layers[index])
    }

    for (let index = 0; index < data.length; index++) {
            var marker = L.marker(data[index].latlng)
            marker.addTo(myMarkerGroup);

            marker.id = data[index].id;
            marker.name = data[index].name;
            marker.description = data[index].description;
            marker.latlng = data[index].latlng;
            marker.type = data[index].type;

            marker.bindPopup("<b>"+data[index].name+"</b><br>" +data[index].description)
    }
}

map.on('click', onMapClick);
