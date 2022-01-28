const map = L.map("map").setView([50.080, 14.451], 15);

var currentlyEditedMarker;
var myMarkerGroup = L.featureGroup().addTo(map).on("click", markersClick);
var mapPoints = []
var userCreatedTypes = []

const addRadio = $("#add");
const nameInput = $("#name");
const descInput = $("#description");
const typeInput = $("#type");
const filterSelect = $("#filter");
const statusLabel = $("#status");
const newTypeInput = $("#newType");
const warningLabel = $("#warning");

const findMyLocationButton = $("#findMyLocationButton");
const createFileButton = $("#createFileButton");
const getFileButton = $("#getFileButton");
const editMarkerButton = $("#editMarkerButton");
const addTypeButton = $("#addTypeButton");
const removeTypeButton = $("#removeTypeButton");

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken: "pk.eyJ1IjoibHVrYW5lIiwiYSI6ImNreGo3cXp6dDZiaTMyeGxhZXkyaGltcnIifQ.uLQYOB-Oo_szmnDn8WwnCw"
}).addTo(map);

function onMapClick(e) {
    var marker = L.marker(e.latlng)

    if (addRadio.is(":checked")) {
        var uniqId = "id" + (new Date()).getTime();
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
    nameInput.val(event.layer.name)
    descInput.val(event.layer.description)
    typeInput.val(event.layer.type)
}

function markerEdit() {
    for (let index in myMarkerGroup._layers) {
        if (myMarkerGroup._layers[index].id == currentlyEditedMarker) {
            myMarkerGroup._layers[index].name = nameInput.val();
            myMarkerGroup._layers[index].description = descInput.val();
            myMarkerGroup._layers[index].type = typeInput.val();

            myMarkerGroup._layers[index].bindPopup("<b>" + nameInput.val() + "</b><br>" + descInput.val())

            for (let pointIndex in mapPoints) {
                if (mapPoints[pointIndex].id == currentlyEditedMarker) {
                    mapPoints[pointIndex].name = nameInput.val();
                    mapPoints[pointIndex].description = descInput.val();
                    mapPoints[pointIndex].type = typeInput.val();
                }
            }

        }
    }
}

function findMyLocation() {

    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        map.setView([latitude, longitude], 15);
    }

    navigator.geolocation.getCurrentPosition(success);
}

function createFile() {
    statusLabel.show()
    var points = [];

    for (let index in myMarkerGroup._layers) {
        points.push({
            id: myMarkerGroup._layers[index].id,
            name: myMarkerGroup._layers[index].name,
            description: myMarkerGroup._layers[index].description,
            latlng: myMarkerGroup._layers[index].latlng,
            type: myMarkerGroup._layers[index].type
        })
    }

    var file = new File([JSON.stringify(points)], "config.json", { type: "application/json" })

    sendFile(file)
}

function getData(data) {
    removeAllPoins()

    for (let index = 0; index < data.length; index++) {
        var marker = L.marker(data[index].latlng)
        marker.addTo(myMarkerGroup);

        marker.id = data[index].id;
        marker.name = data[index].name;
        marker.description = data[index].description;
        marker.latlng = data[index].latlng;
        marker.type = data[index].type;

        marker.bindPopup("<b>" + data[index].name + "</b><br>" + data[index].description)
    }
    statusLabel.hide()
}

function removeAllPoins() {
    for (let index in myMarkerGroup._layers) {
        map.removeLayer(myMarkerGroup._layers[index])
    }
}

filterSelect.change(function () {
    removeAllPoins()

    for (let index in mapPoints) {
        if (mapPoints[index].type == filterSelect.val() || filterSelect.val() == "all") {
            var marker = L.marker(mapPoints[index].latlng)
            marker.addTo(myMarkerGroup);

            marker.id = mapPoints[index].id;
            marker.name = mapPoints[index].name;
            marker.description = mapPoints[index].description;
            marker.latlng = mapPoints[index].latlng;
            marker.type = mapPoints[index].type;

            marker.bindPopup("<b>" + mapPoints[index].name + "</b><br>" + mapPoints[index].description)
        }
    }
});

$(document).keyup(function (e) {
    if (e.key === "Escape") {
        map.setView([50.080, 14.451], 15);
    }
});

map.on("click", onMapClick);
findMyLocationButton.on("click",findMyLocation);
createFileButton.on("click",createFile);
getFileButton.on("click",getFile);
editMarkerButton.on("click",markerEdit);
addTypeButton.on("click",addType);
removeTypeButton.on("click",removeType);



//new functions

$(document).ready(function() {
    var userTypesOnLocalStorage = JSON.parse(localStorage.getItem("userCreatedTypes"));

    if (userTypesOnLocalStorage != null)
    {
        userCreatedTypes = userTypesOnLocalStorage
    }

    $.each(userCreatedTypes, function( index, value ) {
        typeInput.append(new Option(value.text, value.value));
        filterSelect.append(new Option(value.text,value.value));
    });   


    setTimeout(() => {
        getFile()  
    }, 1500);
});

function addType() {
    warningLabel.hide()

    var newType = {};
    var duality = false

    var uniqId = "id" + (new Date()).getTime();
    var text = newTypeInput.val()

    $("#type option").each(function()
    {
        if($(this).text() == text)
        {
            warningLabel.show()
            duality = true;
        } 
    });

    if(duality == false){
        newType.value = uniqId;
        newType.text = text;

        console.log(newType)

        userCreatedTypes.push(newType);

        typeInput.append(new Option(text, uniqId));
        filterSelect.append(new Option(text, uniqId))

        localStorage.setItem("userCreatedTypes", JSON.stringify(userCreatedTypes));
    }
}

function removeType() {
    var text = newTypeInput.val()

    $.each(userCreatedTypes, function( index, value ) {
        if(value.text == text){

            const indexToRemove = userCreatedTypes.findIndex(type => type.text == text);

            $("#type option[value="+ userCreatedTypes[indexToRemove].value +"]").remove();
            $("#filter option[value="+ userCreatedTypes[indexToRemove].value +"]").remove();

            if (indexToRemove > -1) {
                  userCreatedTypes.splice(indexToRemove, 1);
            }

            localStorage.setItem("userCreatedTypes", JSON.stringify(userCreatedTypes));
        }
    });   
}

