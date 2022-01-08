// Client ID and API key from the Developer Console
var CLIENT_ID = '779681715031-0u954k7mb1545tuhl6e1k2d6u62caokr.apps.googleusercontent.com';
var API_KEY = 'AIzaSyDdopeSLDxcJlI66BplqPTH6TqJnMb05LI';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = 'https://www.googleapis.com/auth/calendar';

var loginButton = document.getElementById('login-button');
var logoutButton = document.getElementById('logout-button');

/**
 *  On load, called to load the auth2 library and API client library.
 */
const handleClientLoad = () => {
  gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
const initClient = () => {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    loginButton.onclick = handleAuthClick;
    logoutButton.onclick = handleSignoutClick;
  }, function (error) {
    appendPre(JSON.stringify(error, null, 2));
  });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
const updateSigninStatus = (isSignedIn) => {
  if (isSignedIn) {
    loginButton.style.display = 'none';
    logoutButton.style.display = 'block';
  } else {
    loginButton.style.display = 'block';
    logoutButton.style.display = 'none';
  }
}

/**
 *  Sign in the user upon button click.
 */
const handleAuthClick = (event) => {
  gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
const handleSignoutClick = (event) => {
  gapi.auth2.getAuthInstance().signOut();
}
