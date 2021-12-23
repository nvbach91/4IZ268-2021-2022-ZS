


class Storage {

    localData;

    constructor() {
        Storage.storageItem = "getPlaces";
        this.loadLocalStorage();
    }

    loadLocalStorage() {
        if (localStorage.getItem(Storage.storageItem) == null) {
            this.localData = [];
            return;
        }
        this.localData = JSON.parse(localStorage.getItem(Storage.storageItem));
    }

    saveLocalStorage() {
        localStorage.setItem(Storage.storageItem, JSON.stringify(this.localData));
    }

    addPlace(place) {
        this.localData.push(place);
        this.saveLocalStorage();
    }

    removePlace(id) {
        let pos = null;
        for (var place in this.localData) {
            if (this.localData[place].id === id) {
                pos = place;
                break;
            }
        }
        if (pos !== null) {
            this.localData.splice(pos, 1);
            this.saveLocalStorage();
        }
    }

    getLastID() {
        if (this.localData.length === 0) {
            return 1;
        } else {
            return this.localData[this.localData.length - 1].id + 1;
        }
    }

    getPlaces() {
        return this.localData;
    }

    getPlace(id) {
        for (let place in this.localData) {
            if (this.localData[place].id === id) {
                return this.localData[place];
            }
        }
        return null;
    }

    getIndexOfPlace(place) {
        return this.localData.indexOf(place);
    }

}


class Place {

    id;
    name;
    description;
    lat;
    lng;
    interestPoints;

    constructor(id, name, description, lat, lng, interestPoints) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.lat = lat;
        this.lng = lng;
        this.interestPoints = interestPoints;
    }

    get id() {
        return this.id;
    }

    get name() {
        return this.name;
    }

    get description() {
        return this.description;
    }

    get lat() {
        return this.lat;
    }

    get lng() {
        return this.lng;
    }

    get interestPoints() {
        return this.interestPoints;
    }
}

class FileGenerator {

    links;

    constructor() {
        this.links = [];
    }

    createFileLink(content) {
        const blob = new Blob([content], {type: "text/plain"});

        const url = window.URL.createObjectURL(blob);
        this.links.push(url);
        return url;
    }

    invalidateFileLink(link) {
        window.URL.revokeObjectURL(link);
    }

    invalidateAllFileLinks() {
        const _this = this;
        this.links.forEach(function(link) {
            _this.invalidateFileLink(link);
        });
    }
}

class MapHolder {

    map;

    constructor() {
        this.map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: 49.9, lng: 15.5 },
            zoom: 8
        });
    }

    getMap() {
        return this.map;
    }

    createMarker(lat, lng, infoWindow) {
        const marker = new google.maps.Marker({
            position: {
                lat: lat,
                lng: lng
            },
            map: this.getMap(),
        });
        marker.appInfoWindow = infoWindow;
        return marker;
    }

    createInfoWindow(content) {
        return new google.maps.InfoWindow({
           content: content
        });
    }

    setClickEvent(fnc) {
        this.map.addListener('click', fnc);
    }

    removeClickEvent() {
        google.maps.event.clearListeners(this.map, 'click');
    }

}

class PlacesApi {

    constructor(key) {
        PlacesApi.key = key;
    }

    callServer(lat, lng, callback) {
        $.ajax({
            url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + lat + '%2C' + lng + '&radius=5000&type=tourist_attraction&key=' + PlacesApi.key,
            success: function (response) {
                try {
                    const data = JSON.parse(response);
                    const places = [];
                    let itemCount = 3;
                    if (data.results.length <= 3) {
                        itemCount = data.results.length;
                    }
                    for (let i = 0; i < itemCount; i++) {
                        let place = data.results[i];
                        places.push({name: place.name, link: 'https://www.google.com/maps/search/?api=1&query=Google&query_place_id=' + place.place_id});
                    }
                    callback(places);
                } catch (e) {
                    callback([]);
                }

            },
            error: function () {
                callback([]);
            }
        });
    }

}