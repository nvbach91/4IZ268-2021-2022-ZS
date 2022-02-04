
const App = {};
// Client ID and API key from the Developer Console
App.CLIENT_ID = '185584509903-7loj94c6or5im2ualo32gua5m72kr7jq.apps.googleusercontent.com';
App.API_KEY = 'AIzaSyC9BeOOrbcAlc_cnJHWvJl8o-JdflYcKec';
App.spreadsheetId = '17niLfSSz2MDxmreOq8R8m6YXuB8cxgeojlC5vzO2YxI';

// Array of API discovery doc URLs for APIs used by the quickstart
App.DISCOVERY_DOCS = ['https://sheets.googleapis.com/$discovery/rest?version=v4'];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
// https://developers.google.com/identity/protocols/googlescopes
App.SCOPES = 'https://www.googleapis.com/auth/spreadsheets';

/**
 *  On load, called to load the auth2 library and API client library.
 */
App.handleClientLoad = () => {
    gapi.load('client:auth2', App.initClient);
};

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
App.initClient = () => {
    gapi.client.init({
        apiKey: App.API_KEY,
        clientId: App.CLIENT_ID,
        discoveryDocs: App.DISCOVERY_DOCS,
        scope: App.SCOPES
    }).then(() => {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(App.updateSigninStatus);

        // Handle the initial sign-in state.
        App.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        App.authorizeButton.click(App.handleAuthClick);
        App.signoutButton.click(App.handleSignoutClick);

    }, (error) => {
        App.appendPre(JSON.stringify(error, null, 2));
    });
};

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
App.updateSigninStatus = (isSignedIn) => {
    if (isSignedIn) {
        App.authorizeButton.hide();
        App.signoutButton.show();
    } else {
        App.authorizeButton.show();
        App.signoutButton.hide();
    }
};

/**
 *  Sign in the user upon button click.
 */
App.handleAuthClick = (event) => {
    gapi.auth2.getAuthInstance().signIn();
};

/**
 *  Sign out the user upon button click.
 */
App.handleSignoutClick = (event) => {
    gapi.auth2.getAuthInstance().signOut();
};

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
App.appendPre = (message) => {
    $('#content').append(message);
};




$(document).ready(() => {
    App.handleClientLoad();
    App.authorizeButton = $('#authorize_button');
    App.signoutButton = $('#signout_button');
    App.signoutButton = $('#signout_button');


    let routesAreNotLoaded = true;

    /**
    *  Function of button to upload route to google sheet
    */
    const uploadButton = $('#save-to-sheet');
    uploadButton.click(() => {
        const tripName = $('input[name="new-trip-name"]').val();
        if (!gapi.auth2.getAuthInstance().isSignedIn.get()) {
            alert('Pro uložení je nutné být autentizován');
        } else if (coords.length < 2) {
            alert('Trasa musí obsahovat alespň dva body než je možné ji uložit');
        } else if (tripName == "") {
            alert('Je třeba trasu nějak pojmenovat');
        } else {
            routesAreNotLoaded=true;
            loadRouteNames();
            console.log('name of trip: ' + tripName);
            let routeToSave = [tripName];
            function addCoordinate(coordinates) {
                routeToSave.push(coordinates.toString());
                console.log(coordinates.toString());
            }
            coords.forEach(addCoordinate);



            gapi.client.sheets.spreadsheets.values.get({
                spreadsheetId: App.spreadsheetId,
                range: 'Sheet1!A1:D101',
            }).then((response) => {
                const range = response.result;
                let rowIndex = 0;
                if (range.values.length > 0) {
                    for (i = 0; i < range.values.length; i++) {
                        const row = range.values[i];
                        const name = row[0];
                        if (tripName == name) {
                            deleteRow(rowIndex);
                            break;
                        }
                        rowIndex++;
                        console.log(name);
                    }

                } else {
                    App.appendPre('No data found.');
                }
            }, (response) => {
                App.appendPre('Error: ' + response.result.error.message);
            });



            gapi.client.sheets.spreadsheets.values.append({
                spreadsheetId: App.spreadsheetId,
                range: 'Sheet1!A1',
                valueInputOption: 'RAW',
                insertDataOption: 'INSERT_ROWS',
                resource: {
                    values: [
                        routeToSave
                    ]
                }
            }).then((response) => {
                var result = response.result;
            });


        }
    });
    
    const searchTripField = $('#search-trip');
    searchTripField.change(() => {
        console.log('clicked')
        if (routesAreNotLoaded) {
            console.log('ran command')
            loadRouteNames();
            routesAreNotLoaded = false;
        }
    });


    const routeOptionsDatalist = $('#available-trips');

    const loadRouteNames = function () {
        //const loadedRouteNames = [];
        const datalistContent = [];
        gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: App.spreadsheetId,
            range: 'Sheet1!A1:D101',
        }).then((response) => {
            const range = response.result;
            if (range.values.length > 0) {
                for (i = 0; i < range.values.length; i++) {
                    const row = range.values[i];
                    const name = row[0];
                    //loadedRouteNames.push(name);
                    //console.log(name);
                    const menuLine = '<option value="' + name + '">'+name+'</option>';
                    datalistContent.push(menuLine);
                }

            } else {
                App.appendPre('No data found.');
            }
            routeOptionsDatalist.html("");
            routeOptionsDatalist.append(datalistContent);
        }, (response) => {
            App.appendPre('Error: ' + response.result.error.message);
            
        });

        

        //console.log(loadedRouteNames);
        console.log(datalistContent);
    }



    // const loadRoutesButton = $('#load-routes');
    // loadRoutesButton.click(loadRouteNames);


    const deleteRow = function (rowId) {
        console.log('attempted deletion')
        gapi.client.sheets.spreadsheets.batchUpdate({
            // auth: auth,
            spreadsheetId: App.spreadsheetId,
            resource: {
                "requests": [
                    {
                        "deleteDimension": {
                            "range": {
                                "sheetId": 0,
                                "dimension": "ROWS",
                                "startIndex": rowId,
                                "endIndex": rowId + 1
                            }
                        }
                    },
                ],
            }
        }).then((response) => {
            //var findReplaceResponse = response.result.replies[1].findReplace;
            //console.log(`${findReplaceResponse.occurrencesChanged} replacements made.`);
        });
    }












    /**
     *  Loading coordinates to coords array
    */
    function loadCoordinate(coordinate) {
        const consenantIndex = coordinate.indexOf(",");
        const longtitude = coordinate.slice(1, consenantIndex);
        const latitude = coordinate.slice(consenantIndex + 1, coordinate.length - 1);
        coords.push(SMap.Coords.fromWGS84(longtitude, latitude));
    }


    /**
    *  Function of butto loading requested route from google sheet.
    */
    const loadRouteButton = $('#load-trip');
    loadRouteButton.click(() => {
        const savedTripName = $('input[id="search-trip"]').val();
        if (!gapi.auth2.getAuthInstance().isSignedIn.get()) {
            alert('Pro načtení trasy je nutné být autentizován');
        } else if (savedTripName == "") {
            alert('Zadejte jméno hledané trasy');
        } else {
            console.log('reading '+ savedTripName);
            gapi.client.sheets.spreadsheets.values.get({
                spreadsheetId: App.spreadsheetId,
                range: 'Sheet1!A1:D101',
            }).then((response) => {
                const range = response.result;
                if (range.values.length > 0) {
                    for (i = 0; i < range.values.length; i++) {
                        const row = range.values[i];
                        if (row[0] == savedTripName) {
                            console.log('found trip')
                            console.log(row);
                            const loadedRoute = row;
                            loadedRoute.shift();
                            coords.length = 0;
                            vrstva.removeAll();
                            loadedRoute.forEach(loadCoordinate);
                            route = new SMap.Route(coords, redrawAndCenter);
                            break;
                        }
                    }

                } else {
                    App.appendPre('No data found.');
                }
            }, (response) => {
                App.appendPre('Error: ' + response.result.error.message);
            });
        }
    });


    //default coordinates of map center
    let currentLatitude = 50.084;
    let currentLongtitude = 14.434;


    /**
    *  Centering map and arker on current location
    */

    const centerOnCurrLocation = function () {
        navigator.geolocation.getCurrentPosition((position) => {
            currentLatitude = position.coords.latitude;
            currentLongtitude = position.coords.longitude;
            centerMap = SMap.Coords.fromWGS84(currentLongtitude, currentLatitude);
            m.setCenter(centerMap, true);
            marker.setCoords(centerMap);
            console.log(centerMap);
        });
    }

    centerOnCurrLocation();

    let centerMap = SMap.Coords.fromWGS84(currentLongtitude, currentLatitude);
    const m = new SMap(JAK.gel("mapa"), centerMap, 10);
    const l = m.addDefaultLayer(SMap.DEF_BASE).enable();
    const mouse = new SMap.Control.Mouse(SMap.MOUSE_PAN | SMap.MOUSE_WHEEL | SMap.MOUSE_ZOOM); /* Ovládání myší */
    m.addControl(mouse);




    const markerLayer = new SMap.Layer.Marker();
    m.addLayer(markerLayer).enable();
    let marker = new SMap.Marker(centerMap);
    marker.decorate(SMap.Marker.Feature.Draggable);
    markerLayer.addMarker(marker);


    // set marker for each point of insterest
    const placeMarker = function (markerlatitude, markerlongtitude) {
        const markerLayer = new SMap.Layer.Marker();
        m.addLayer(markerLayer).enable();
        const marker = new SMap.Marker(SMap.Coords.fromWGS84(markerlongtitude, markerlatitude));
        //marker.decorate(SMap.Marker.Feature.Draggable);
        markerLayer.addMarker(marker);
    }



    const addPointButton = $('#add-point');
    addPointButton.click(() => {

        markerCoords = marker.getCoords();
        if (coords[coords.length - 1] != markerCoords) {
            coords.push(markerCoords);
            redrawRoute();
        } else {
            console.log('already contains');
        }
    });

    const centerOnCurrLocationButton = $('#center-on-location');
    centerOnCurrLocationButton.click(() => {
        centerOnCurrLocation();
    });



    const redrawRoute = function () {
        if (coords.length > 1) {
            route = new SMap.Route(coords, found);
        } else {
            vrstva.removeAll();
        }
    }
    const removeLastPointButton = $('#remove-point');
    removeLastPointButton.click(() => {
        coords.pop();
        redrawRoute();
    });

    const vrstva = new SMap.Layer.Geometry();
    m.addLayer(vrstva).enable();

    const startOverButton = $('#start-over');
    startOverButton.click(() => {
        coords.length = 0;
        vrstva.removeAll();
    });


    const redrawAndCenter = function (route) {
        var coords = route.getResults().geometry;
        var cz = m.computeCenterZoom(coords);
        m.setCenterZoom(cz[0], cz[1]);
        var g = new SMap.Geometry(SMap.GEOMETRY_POLYLINE, null, coords);
        vrstva.addGeometry(g);
    }

    const found = function (route) {
        const coords = route.getResults().geometry;
        const g = new SMap.Geometry(SMap.GEOMETRY_POLYLINE, null, coords);
        vrstva.removeAll();
        vrstva.addGeometry(g);
    }

    const coords = [];
    let route;


});