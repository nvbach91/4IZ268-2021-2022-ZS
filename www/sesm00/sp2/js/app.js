
let storage;
let addPointModal;
let fileGenerator;

jQuery(document).ready(function($) {

    const googleApiKey = 'AIzaSyDnCkPEKO4_Nye-pbr3tw5Ju6zVGaCFF8g';

    addPointModal = new bootstrap.Modal(document.getElementById('addPointModal'), {});
    storage = new Storage();
    fileGenerator = new FileGenerator();
    const mapHolder = new MapHolder();
    const placesApi = new PlacesApi(googleApiKey);

    let cardPrototype = getPointCardPrototype();
    let infoWindowPrototype = getInfoWindowPrototype();
    let markerList = [];
    let activeInfoWindow = null;

    storage.getPlaces().forEach(function (item, key, list) {
        $('.js-places-list').append(createPointCard(cardPrototype, item));
        const infoContent = createInfoWindow(infoWindowPrototype, item.interestPoints);
        const infoWindow = mapHolder.createInfoWindow(infoContent);
        markerList.push(mapHolder.createMarker(item.lat, item.lng, infoWindow));
    });

    const body = $('body');

    body.on('click', '.js-add-place', function() {
        const map = mapHolder.getMap();
        alert("Vyberte místo na mapě");
        map.setOptions({draggableCursor: 'pointer'});
        mapHolder.setClickEvent(function (event) {
            mapHolder.removeClickEvent();
            map.setOptions({draggableCursor: null});
            addPointModal.show();
            const location = event.latLng;
            $('.js-new-point-submit').attr('lat', location.lat());
            $('.js-new-point-submit').attr('lng', location.lng());
        });
    });

    body.on('click', '.js-new-point-submit', function () {
        const id = storage.getLastID();
        const name = $('#addPointModal .js-modal-point-name').val();
        const desc = $('#addPointModal .js-modal-point-desc').val();
        $('#addPointModal .js-modal-point-name').val('');
        $('#addPointModal .js-modal-point-desc').val('');
        const lat = parseFloat($('#addPointModal .js-new-point-submit').attr("lat"));
        const lng = parseFloat($('#addPointModal .js-new-point-submit').attr("lng"));

        placesApi.callServer(lat, lng, function (data) {
            const place = new Place(id, name, desc, lat, lng, data);
            storage.addPlace(place);
            $('.js-places-list').append(createPointCard(cardPrototype, place));
            markerList.push(mapHolder.createMarker(lat, lng, mapHolder.createInfoWindow(createInfoWindow(infoWindowPrototype, place.interestPoints))));
            addPointModal.hide();
        });
    });

    body.on('click', '.js-card-remove', function() {
        const card = $(this).parent().parent().parent();
        const id = parseInt($(card).attr('card-id'));

        $(card).remove();
        const index = storage.getIndexOfPlace(storage.getPlace(id));

        markerList[index].setMap(null);
        storage.removePlace(id)
    });

    body.on('click', '.js-show-on-map', function () {
        const id = parseInt($(this).parent().parent().parent().attr('card-id'));
        const index = storage.getIndexOfPlace(storage.getPlace(id));

        const infoWindow = markerList[index].appInfoWindow;

        if (activeInfoWindow !== null) {
            activeInfoWindow.close();
        }

        infoWindow.open({
            anchor: markerList[index],
            map: mapHolder.getMap(),
            shouldFocus: false
        });
        activeInfoWindow = infoWindow;

        mapHolder.getMap().panTo(markerList[index].getPosition());
    });

});

function getPointCardPrototype() {
    const prototype = $('#place-card-prototype').clone();
    $('#place-card-prototype').remove();
    $(prototype).removeAttr('id');
    return prototype;
}

function getInfoWindowPrototype() {
    const prototypeWrapper = $('#info-window-prototype');
    const prototype = prototypeWrapper.clone();
    prototypeWrapper.remove();
    return prototype;
}

function createInfoWindow(prototype, data) {
    const newInfoWindow = $(prototype).clone();
    const infoItemPrototype = newInfoWindow.find('.js-info-window-item').clone();
    newInfoWindow.find('.js-info-window-item').remove();
    const itemWrapper = newInfoWindow.find('#bodyContent');
    data.forEach(function (item) {
        const infoItem = infoItemPrototype.clone();
        infoItem.find('.name').text(item.name);
        infoItem.attr('href', item.link);
        itemWrapper.append(infoItem);
    });
    if (data.length === 0) {
        const noitems = document.createElement('div');
        noitems.classList.add('no-items-item');
        noitems.innerText = 'žádné zajímavosti k zobrazení';
        itemWrapper.append(noitems);
    }

    return newInfoWindow.html();
}

function createPointCard(prototype, place) {
    const newCard = $(prototype).clone();
    newCard.find('.js-card-name').text(place.name);
    newCard.find('.js-card-desc').text(place.description);
    newCard.find('.js-card-clps-control').attr('href', "#cardClps" + place.id);
    newCard.find('.js-card-clps-control').attr('aria-controls', "cardClps" + place.id);
    newCard.attr('card-id', place.id);
    newCard.find('.collapse').attr('id', "cardClps" + place.id);

    return newCard;
}
