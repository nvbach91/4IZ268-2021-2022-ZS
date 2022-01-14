


class Storage {

    localData;
    storageProgress;

    constructor() {
        Storage.storageItem = 'getPlaces';
        Storage.size = 5222880;
        Storage.critUsage = 80;
        this.storageProgress = $('.js-storage-usage');
        this.loadLocalStorage();
        this.updateStorageUsage();
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
        this.updateStorageUsage();
    }

    getCurrentDataSize() {
        const data = JSON.stringify(this.localData);
        const blob = new Blob([data]);
        return blob.size;
    }

    getStorageUsage() {
        return Math.ceil((this.getCurrentDataSize() / Storage.size) * 100);
    }

    updateStorageUsage() {
        const percent = this.getStorageUsage();
        this.storageProgress.attr('aria-valuenow', percent);
        this.storageProgress.css('width', percent);
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

    readFile(file) {
        const _this = this;
        return new Promise(function (resolve, reject) {
            const reader = new FileReader();
            reader.onload = (function (file) {
                return function (event) {
                    const rawData = event.target.result;
                    try {
                        const data = JSON.parse(rawData);
                        if (_this.validFileData(data)) {
                            resolve(data);
                        } else {
                            reject();
                        }
                    } catch (e) {
                        reject();
                    }
                };
            })(file);
            reader.onerror = reject;
            reader.readAsText(file, 'utf-8');
        });

    }

    validFileData(data) {

        if (Array.isArray(data)) {
            if (data.length === 0) {
                return true;
            }

            const item = data[0];

            const props = ['id', 'name', 'description', 'lat', 'lng', 'interestPoints'];
            const types = ['number', 'string', 'string', 'number', 'number', 'object'];

            props.forEach(function (prop, index) {
                if (item.hasOwnProperty(prop) && item.prop === types[index]) {
                    if (types[index] === 'object') {
                        if (Array.isArray(item.prop)) {
                            if (item.prop.length > 0) {
                                const interItem = item.prop[0];
                                const interProps = ['name', 'link'];
                                interProps.forEach(function (interProp) {
                                    if (interItem.interProp !== 'string') {
                                        return false;
                                    }
                                });
                            }
                        } else {
                            return false;
                        }
                    }
                } else {
                    return false;
                }
            });

            return true;

        }

        return false;
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
        const blob = new Blob([content], {type: 'text/plain'});

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
        this.map = new google.maps.Map(document.getElementById('map'), {
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

    map;

    constructor(map, key) {
        this.map = map;
        PlacesApi.key = key;
    }

    callServer(lat, lng, callback) {


        const service = new google.maps.places.PlacesService(this.map);
        const latlng = new google.maps.LatLng(lat, lng);

        const request = {
          location: latlng,
          radius: 5000,
          type: ['tourist_attraction']
        };

        service.nearbySearch(request, function (data, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                const places = [];
                let itemCount = 5;
                if (data.length <= 5) {
                    itemCount = data.length;
                }
                for (let i = 0; i < itemCount; i++) {
                    let place = data[i];
                    places.push({name: place.name, link: 'https://www.google.com/maps/search/?api=1&query=Google&query_place_id=' + place.place_id});
                }
                callback(places);
            } else {
                callback([]);
            }
        });
    }
}


