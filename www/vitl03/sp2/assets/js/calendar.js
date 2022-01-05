// Client ID and API key from the Developer Console
var CLIENT_ID =
  "547208858852-7u1c48actoiv12vhfl37puc8cjbedv7i.apps.googleusercontent.com";

const config = { API_KEY: 'AIzaSyDO_rScKzh5dSM5mmqn5URZjp1_W6qrNAE' };
// var id_token = '';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces
var SCOPES = "https://www.googleapis.com/auth/calendar";

var CALENDAR_ID = "primary";

const showSpinner = () => {
  const spinner = document.createElement("div");
  spinner.classList.add("spinner");
  const divElement = document.querySelector("#section-events");
  divElement.appendChild(spinner);
  return spinner;
};

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
  gapi.load("client:auth2", initClient)
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  gapi.client
    .init({
      apiKey: config.API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES,
    })
    .then(
      function () {
        //updateSigninStatus(true);
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
       updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());        
      },
    );
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    $('#my-signin2').addClass('logged');
    showSpinner();
    listUpcomingEvents();
    if($('#my-signout').hasClass('logged')){
      $('#my-signout').removeClass('logged');
    }
  }
}


function signOut() {
  gapi.auth2.getAuthInstance().disconnect();  
  $("#section-events").hide();
  $("#my-signin2").removeClass("logged");
  $("#my-signout").addClass("logged");
  renderButton();
  $("#author-name").html("User");
  $("#nav-img").attr("src", "https://www.postavy.cz/foto/pikachu-foto.jpg");
}


/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
function listUpcomingEvents() {
  gapi.client.calendar.events
    .list({
      calendarId: CALENDAR_ID,
      timeMin: new Date().toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 10,
      orderBy: "startTime",
    })
    .then(function (response) {
      var events = response.result.items;

      if (events.length > 0) {
        for (let i = 0; i < events.length; i++) {
          var event = events[i];
          let summary = event.summary;

          //get date & time of the event
          let start = new Date(event.start.dateTime);
          let end = new Date(event.end.dateTime);

          event.day = end.toLocaleDateString([], { weekday: "short" });
          event.month = end.toLocaleDateString([], { month: "short" });
          event.date = end.toLocaleDateString([], { day: "2-digit" });
          event.startTime = start.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          });
          event.endTime = end.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          });

          let content = Mustache.render($("#upcoming-events-template").html(), {
            data: events,
          });

          $("#deadlines-text").hide();

          $("#section-events").html(content);
          $("#section-events").show(content);
        }
      } else {
        $("#section-events").hide();
      }
    });
}

function onSuccess(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log("Profile"+ profile);
  console.log("Logged in as: " + googleUser.getBasicProfile().getName()); 

  $("#author-name").html(googleUser.getBasicProfile().getName());
  $("#nav-img").attr("src", profile.getImageUrl());
}
function onFailure(error) {
  console.log(error);
}
function renderButton() {
  gapi.signin2.render("my-signin2", {
    scope: "profile email",
    width: 220,
    height: 50,
    longtitle: true,
    theme: "dark",
    onsuccess: onSuccess,
    onfailure: onFailure,
  });
}
