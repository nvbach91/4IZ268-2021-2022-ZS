

(function() {

    let storage;
    let addPointModal;
    let mapClickModal;
    let dataModal;
    let fileGenerator;

    jQuery(document).ready(function($) {

        const googleApiKey = 'AIzaSyDnCkPEKO4_Nye-pbr3tw5Ju6zVGaCFF8g';

        const placesList = $('.js-places-list');
        const body = $('body');
        const tabDnld = document.getElementById('download-tab');
        const tabUpld = document.getElementById('upload-tab');
        const dataModalEl = document.getElementById('dataModal');
        const uploadArea = $('.js-upload-area');
        const uploadInput = $('.js-upload-input');
        const uploadFileName = $('.js-filename');

        dataModal = new bootstrap.Modal(document.getElementById('dataModal'), {});
        addPointModal = new bootstrap.Modal(document.getElementById('addPointModal'), {});
        mapClickModal = new bootstrap.Modal(document.getElementById('clickMapModal'), {});

        storage = new Storage();
        fileGenerator = new FileGenerator();
        const mapHolder = new MapHolder();
        const placesApi = new PlacesApi(mapHolder.getMap(), googleApiKey);

        let cardPrototype = getPointCardPrototype();
        let infoWindowPrototype = getInfoWindowPrototype();
        let markerList = [];
        let fileToUpload = null;
        let activeInfoWindow = null;

        drawPlacesAndMarkers(placesList, cardPrototype, infoWindowPrototype, mapHolder, markerList);

        body.on('click', '.js-add-place', function() {
            const map = mapHolder.getMap();
            mapClickModal.show();
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
            const nameEl = $('#addPointModal .js-modal-point-name');
            const descEl = $('#addPointModal .js-modal-point-desc');

            const name = nameEl.val().trim();
            if (name === '') {
                nameEl.addClass('is-invalid');
                return;
            }
            if (nameEl.hasClass('is-invalid')) {
                nameEl.removeClass('is-invalid');
            }
            const desc = descEl.val().trim();
            nameEl.val('');
            descEl.val('');
            const lat = parseFloat($(this).attr('lat'));
            const lng = parseFloat($(this).attr('lng'));

            const modalSpinner = $('.js-modal-spinner');
            modalSpinner.removeClass('d-none');
            placesApi.callServer(lat, lng, function (data) {
                const place = new Place(id, name, desc, lat, lng, data);
                storage.addPlace(place);
                placesList.append(createPointCard(cardPrototype, place));
                markerList.push(mapHolder.createMarker(lat, lng, mapHolder.createInfoWindow(createInfoWindow(infoWindowPrototype, place.interestPoints))));
                modalSpinner.addClass('d-none');
                addPointModal.hide();
            });
        });

        body.on('click', '.js-map-point-confirm', function () {
            mapClickModal.hide();
        });

        body.on('click', '.js-card-remove', function() {
            const card = $(this).parent().parent().parent();
            const id = parseInt($(card).attr('card-id'));

            $(card).remove();
            const index = storage.getIndexOfPlace(storage.getPlace(id));

            markerList[index].setMap(null);
            markerList.splice(index, 1);

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

        body.on('click', '.js-download-btn', function () {
            const tab = new bootstrap.Tab(tabDnld);
            tab.show();

            dataModal.show();
        });

        body.on('click', '.js-upload-btn', function () {
            const tab = new bootstrap.Tab(tabUpld);
            tab.show();

            dataModal.show();
        });

        tabDnld.addEventListener('shown.bs.tab', function (event) {
            const url = fileGenerator.createFileLink(JSON.stringify(storage.localData));
            $('#download-data-btn').attr('href', url);
        });

        tabDnld.addEventListener('hidden.bs.tab', function (event) {
            fileGenerator.invalidateAllFileLinks();
        });


        dataModalEl.addEventListener('hidden.bs.modal', function (event) {
            fileGenerator.invalidateAllFileLinks();
        });


        uploadArea.on({
            dragenter: function (e) {
                uploadArea.addClass('focused');
                e.stopPropagation();
                e.preventDefault();
            },
            dragleave: function (e) {
                uploadArea.removeClass('focused');
                e.stopPropagation();
                e.preventDefault();
            },
            dragover: function (e) {
                e.stopPropagation();
                e.preventDefault();
            },
            drop: function (e) {
                if(e.originalEvent.dataTransfer) {
                    e.stopPropagation();
                    e.preventDefault();

                    fileToUpload = e.originalEvent.dataTransfer.files[0];
                    uploadFileName.text(fileToUpload.name);
                }
            },
            click: function (e) {
                uploadInput.click();
            }
        });

        uploadInput.on('change', function () {
            if (this.files.length > 0) {
                fileToUpload = this.files[0];
                uploadFileName.text(fileToUpload.name);
            }
        });

        $(body).on('click', '.js-file-submit', function () {
            storage.readFile(fileToUpload).then(function (data) {
                storage.localData = data;
                storage.saveLocalStorage();
                fileToUpload = null;
                dataModal.hide();
                uploadFileName.text('');
                removeCardsAndMarkers(placesList, markerList);
                markerList = [];
                drawPlacesAndMarkers(placesList, cardPrototype, infoWindowPrototype, mapHolder, markerList);
            }).catch(function () {
                uploadFileName.html('<span class="text-danger">Neplatný soubor nebo data</span>');
            });
        });

        $(body).on('click', '.js-btn-name-edit', function() {
            $(this).addClass('d-none');
            const singleParent = $(this).parent();
            const doubleParent = $(this).parent().parent();
            doubleParent.find('.js-name-edit').removeClass('d-none');
            singleParent.find('.js-btn-name-save').removeClass('d-none');
            doubleParent.find('.js-card-name').addClass('d-none');
        });

        $(body).on('click', '.js-btn-name-save', function () {
            const doubleParent = $(this).parent().parent();
            const input = doubleParent.find('.js-name-edit');
            const name = input.val().trim();
            if (name === '') {
                input.addClass('is-invalid');
                return;
            }
            if (input.hasClass('is-invalid')) {
                input.removeClass('is-invalid');
            }
            const singleParent = $(this).parent();
            singleParent.find('.js-btn-name-edit').removeClass('d-none');
            $(this).addClass('d-none');
            const textEl = doubleParent.find('.js-card-name');
            input.val('');
            textEl.text(name);
            input.addClass('d-none');
            textEl.removeClass('d-none');
            const cardEl = doubleParent.parent();
            const cardId = parseInt(cardEl.attr('card-id'));
            storage.getPlace(cardId).name = name;
            storage.saveLocalStorage();
        });

        $('[data-bs-toggle="tooltip"]').each(function (index, item) {
            new bootstrap.Tooltip(item);
        });

    });

    function removeCardsAndMarkers(placesList, markerList) {
        placesList.html('');
        markerList.forEach(function (marker) {
            marker.setMap(null);
        });
    }

    function drawPlacesAndMarkers(placesList, cardPrototype, infoWindowPrototype, mapHolder, markerList) {
        storage.getPlaces().forEach(function (item, key, list) {
            placesList.append(createPointCard(cardPrototype, item));
            const infoContent = createInfoWindow(infoWindowPrototype, item.interestPoints);
            const infoWindow = mapHolder.createInfoWindow(infoContent);
            markerList.push(mapHolder.createMarker(item.lat, item.lng, infoWindow));
        });
    }

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
        newCard.find('.js-card-clps-control').attr('href', '#cardClps' + place.id);
        newCard.find('.js-card-clps-control').attr('aria-controls', 'cardClps' + place.id);
        newCard.attr('card-id', place.id);
        newCard.find('.collapse').attr('id', 'cardClps' + place.id);

        return newCard;
    }

})();
