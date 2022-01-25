//scripts for google API integration
//source: https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow#js-client-library_1

var GoogleAuth;

function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

function initClient() {
    gapi.client.init({
        'apiKey': 'AIzaSyAjrLEcaHIMPgr5aYFzDIWehNH-aVq0_8A',
        'clientId': '234794660074-a4r8imrqg1emk3selhn0afp4kcss2ud3.apps.googleusercontent.com',
        'scope': 'https://www.googleapis.com/auth/drive'
    }).then(function() {
        GoogleAuth = gapi.auth2.getAuthInstance();

        gapi.client.load("https://content.googleapis.com/discovery/v1/apis/drive/v3/rest")

        GoogleAuth.isSignedIn.listen(updateSigninStatus);

        var user = GoogleAuth.currentUser.get();
        setSigninStatus();

        $('#sign-in-or-out-button').click(function() {
            handleAuthClick();
        });
        $('#revoke-access-button').click(function() {
            revokeAccess();
        });
    });
}

function handleAuthClick() {
    if (GoogleAuth.isSignedIn.get()) {
        // User is authorized and has clicked "Sign out" button.
        GoogleAuth.signOut();
    } else {
        // User is not signed in. Start Google auth flow.
        GoogleAuth.signIn();
    }
    updateSigninStatus();
}

function revokeAccess() {
    GoogleAuth.disconnect();
    updateSigninStatus();
}

function setSigninStatus() {
    let user = GoogleAuth.currentUser.get();
    let isAuthorized = user.hasGrantedScopes('https://www.googleapis.com/auth/drive');
}

function updateSigninStatus() {
    setSigninStatus();
}

function sendFile(fileToUpload){

    var metadata = {
    name: fileToUpload.name,
    mimeType: fileToUpload.type
    };

    var formData = new FormData();
    formData.append( "metadata", new Blob( [JSON.stringify( metadata )], {type: "application/json"} ));
    formData.append( "file", fileToUpload );

    fetch( "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart", {
    method: "POST",
    headers: new Headers({ "Authorization": "Bearer " + gapi.auth.getToken().access_token }),
    body: formData
    }).then( function( response ){
    return response.json();
    }).then( function( value ){
    console.log( value );
    });
}

function getFile(){
    gapi.client.drive.files.list({
        "q": "name='config.json'",
    }).execute(res => {

        gapi.client.drive.files.get({
            "fileId":res.result.files[0].id,
            "alt":"media"
        }).execute(res => {

            getData(res)
        });
    });
}