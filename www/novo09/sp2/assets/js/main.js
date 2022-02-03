
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


/**
 * Print the names and majors of students in a sample spreadsheet:
 * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 */
//  App.listData = () => {
//     const tableBody = document.querySelector('#table-body');
//     const rows = [];
//     gapi.client.sheets.spreadsheets.values.get({
//         spreadsheetId: App.spreadsheetId,
//         range: 'Sheet1!A1:D101',
//     }).then((response) => {
//         const range = response.result;
//         if (range.values.length > 0) {
//             for (i = 0; i < range.values.length; i++) {
//                 const row = range.values[i];
//                 rows.push(row);
//             }
//             tableBody.innerHTML = rows.map((row) => `<tr>${row.map((value) => `<td>${value}</td>`).join('')}</tr>`).join('');
//         } else {
//             App.appendPre('No data found.');
//         }
//     }, (response) => {
//         App.appendPre('Error: ' + response.result.error.message);
//     });
// };




$(document).ready(() => {
    App.handleClientLoad();
    App.authorizeButton = $('#authorize_button');
    App.signoutButton = $('#signout_button');
    App.signoutButton = $('#signout_button');
    //App.uploadButton = $('#save-to-drive');

    


    // App.addForm = $('#add-form').submit((e) => {
    //     e.preventDefault();
    //     const data = {};
    //     App.addForm.serializeArray().forEach(({ name, value }) => data[name] = value);
    //     gapi.client.sheets.spreadsheets.values.append({
    //         spreadsheetId: App.spreadsheetId,
    //         range: 'Sheet1!A1',
    //         valueInputOption: 'RAW',
    //         insertDataOption: 'INSERT_ROWS',
    //         resource: {
    //             values: [
    //                 [data.id, data.name, data.birth, data.height]
    //             ]
    //         }
    //     }).then((response) => {
    //         var result = response.result;
    //         //console.log(`${result.updates.updatedCells} cells appended.`);
    //         App.listData();
    //     });

    // });

    const uploadButton = $('#save-to-drive');
    uploadButton.click(()=>{
        console.log('klik');
        if(!gapi.auth2.getAuthInstance().isSignedIn.get()){
            alert('Pro uložení je nutné být autentizován');
        } else if(coords.length<2){
            alert('Trasa musí obsahovat alespň dva body než je možné ji uložit');
        } else {
            const tripName = $('input[name="new-trip-name"]').val();
            console.log(tripName + ' name');
            let routeToSave = [tripName];
            function addCoordinate(coordinates){
                routeToSave.push(coordinates.toString());
                console.log(coordinates.toString());
            }
            coords.forEach(addCoordinate);

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
                //console.log(`${result.updates.updatedCells} cells appended.`);
            });
        }
    });

    function loadCoordinate(coordinate){
        const consenantIndex = coordinate.indexOf(",");
        const longtitude = coordinate.slice(1, consenantIndex);
        const latitude = coordinate.slice(consenantIndex+1, coordinate.length-1);
        coords.push(SMap.Coords.fromWGS84(longtitude, latitude));
    }

    function testFunction(item){
        const consenantIndex = item.indexOf(",");
        const longtitude = item.slice(1, consenantIndex);
        const latitude = item.slice(consenantIndex+1, item.length-1);
        console.log(item);
        console.log(longtitude);
        console.log(latitude);
    }

    const loadRouteButton = $('#load-trip');
    loadRouteButton.click(()=>{
        if(!gapi.auth2.getAuthInstance().isSignedIn.get()){
            alert('Pro načtení trasy je nutné být autentizován');
        } else {
            //const tableBody = document.querySelector('#table-body');
            const savedTripName = $('input[name="search-trip"]').val();
            
            //const rows = [];
            gapi.client.sheets.spreadsheets.values.get({
                spreadsheetId: App.spreadsheetId,
                range: 'Sheet1!A1:D101',
            }).then((response) => {
                const range = response.result;
                if (range.values.length > 0) {
                    for (i = 0; i < range.values.length; i++) {
                        const row = range.values[i];
                        if(row[0]==savedTripName){
                            console.log('found')
                            console.log(row);
                            const loadedRoute = row;
                            loadedRoute.shift();
                            coords.length = 0;
                            vrstva.removeAll();
                            //loadedRoute.forEach(testFunction)
                            loadedRoute.forEach(loadCoordinate);
                            redrawRoute();
                            break;
                        }
                    }
                    //tableBody.innerHTML = rows.map((row) => `<tr>${row.map((value) => `<td>${value}</td>`).join('')}</tr>`).join('');
                } else {
                    App.appendPre('No data found.');
                }
            }, (response) => {
                App.appendPre('Error: ' + response.result.error.message);
            });
            //console.log(loadedRoute);
            // loadedRoute.shift();
            // console.log(loadedRoute);
            // coords.length = 0;
            // loadedRoute.forEach(loadCoordinate);
            // vrstva.removeAll();
            // redrawRoute();
        }
    });




    
    const centerMap = SMap.Coords.fromWGS84(14.40, 50.08);
    const m = new SMap(JAK.gel("mapa"), centerMap, 10);
    const l = m.addDefaultLayer(SMap.DEF_BASE).enable();
    const mouse = new SMap.Control.Mouse(SMap.MOUSE_PAN | SMap.MOUSE_WHEEL | SMap.MOUSE_ZOOM); /* Ovládání myší */
    m.addControl(mouse);     
    

    const markerLayer = new SMap.Layer.Marker();
    m.addLayer(markerLayer).enable();
    const marker = new SMap.Marker(SMap.Coords.fromWGS84(14.434, 50.084));
    marker.decorate(SMap.Marker.Feature.Draggable);
    markerLayer.addMarker(marker);

    const addPointButton = $('#add-point');
    addPointButton.click(()=>{
        
        markerCoords = marker.getCoords();
        if(coords[coords.length - 1] != markerCoords){
            coords.push(markerCoords);
            redrawRoute();
        }else{
            console.log('already contains');
        }
        // let markerCoords = null;
        // function stop(e) {
        //     if(markerCoords != null){
        //         const index = coords.indexOf(markerCoords);
        //         coords.splice(index,1);
        //     }

        //     const node = e.target.getContainer();
        //     node[SMap.LAYER_MARKER].style.cursor = "";
        //     markerCoords = e.target.getCoords();
        //     coords.push(markerCoords);
        //     route = new SMap.Route(coords, nalezeno);
            
        // }
        
        // const signals = m.getSignals();
        // signals.addListener(window, "marker-drag-stop", stop);    
   });

   const redrawRoute = function() {
        if(coords.length>1){
            route = new SMap.Route(coords, nalezeno);
        }
   }
   const removeLastPointButton = $('#remove-point');
   removeLastPointButton.click(()=>{
        coords.pop();
        redrawRoute();
   });

    const vrstva = new SMap.Layer.Geometry();
    m.addLayer(vrstva).enable();

   const startOverButton = $('#start-over');
   startOverButton.click(()=>{
        coords.length = 0;
        vrstva.removeAll();
   });


   

    const nalezeno = function(route) {
        const coords = route.getResults().geometry;
            // const cz = m.computeCenterZoom(coords);
            // m.setCenterZoom(cz[0], cz[1]);
        const g = new SMap.Geometry(SMap.GEOMETRY_POLYLINE, null, coords);
        vrstva.removeAll();
        vrstva.addGeometry(g);
    }

    const coords = [];
    let route;



});