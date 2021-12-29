const Mapycz = {
    center: SMap.Coords.fromWGS84(14.41, 50.08),
    zoom: 12
};

/**
 * Initialization of Mapy.cz view
 */
Mapycz.init = () => {
    Mapycz.mapDiv = $('#seznam-mapa').get(0);

    Mapycz.currentPosition().done(() => {
        Mapycz.renderMap();
        App.mapSpinner.removeClass("spinner");
    });
};

/**
 * Rendering Mapy.cz map view into page
 * Setting onclick listener
 */
Mapycz.renderMap = () => {
    Mapycz.map = new SMap(Mapycz.mapDiv, Mapycz.center, Mapycz.zoom);
    Mapycz.map.addDefaultLayer(SMap.DEF_BASE).enable();

    Mapycz.map.addControl(new SMap.Control.Sync());

    /* Mouse controls */
    let mouseControls = new SMap.Control.Mouse(SMap.MOUSE_PAN | SMap.MOUSE_WHEEL | SMap.MOUSE_ZOOM);
    Mapycz.map.addControl(mouseControls);

    /* Adding map marker layer - pins on locations */
    Mapycz.markerLayer = new SMap.Layer.Marker();
    Mapycz.map.addLayer(Mapycz.markerLayer);
    Mapycz.markerLayer.enable();

    Mapycz.map.getSignals().addListener(window, "map-click", Mapycz.mapClick); /* Při signálu kliknutí volat tuto funkci */

    if (!App.weatherDivRendered) {
        Mapycz.createMarker(Mapycz.center);
        OpenWeather.retrieveWeather(Mapycz.center.toWGS84()[1], Mapycz.center.toWGS84()[0]);
    } else {
        const newCoords = SMap.Coords.fromWGS84(App.urlParameter('lon'), App.urlParameter('lat'))
        Mapycz.createMarker(newCoords);
        Mapycz.map.setCenter(newCoords);
    }
};

/**
 * Method removes all existing in map markers and creates a new one on given coords
 * @param coords coordinates on which the new marker should be created.
 */
Mapycz.createMarker = (coords) => {
    Mapycz.markerLayer.removeAll();
    const options = {};
    const marker = new SMap.Marker(coords, "Aktualní pozice", options);
    Mapycz.markerLayer.addMarker(marker);
}

/**
 * Part of browser geolocation API
 * On pageload will try to determine browser location and sets center coordinates for map rendering
 * @returns promise
 */
Mapycz.currentPosition = () => {

    let deferred = $.Deferred();

    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    const success = (position) => {
        const coordinates = position.coords;
        Mapycz.center = SMap.Coords.fromWGS84(
            coordinates.longitude.toFixed(2),
            coordinates.latitude.toFixed(2)
        );
        deferred.resolve();
    };

    const error = (error) => {
        console.warn(`ERROR(${error.code}): ${error.message}`);
        deferred.resolve();
    };

    navigator.geolocation.getCurrentPosition(success, error, options);

    return deferred.promise();
};

/**
 * Handler of in map click
 * This method will create a new marker in map at click position and calls method for weather data retrieving.
 * @param e event
 * @param elm Mapy.cz API element
 */
Mapycz.mapClick = (e, elm) => {
    const coords = SMap.Coords.fromEvent(e.data.event, Mapycz.map);

    Mapycz.createMarker(coords);

    App.lastLocationPoppedFromHistory = false;
    OpenWeather.retrieveWeather(coords.toWGS84()[1], coords.toWGS84()[0]);
}
