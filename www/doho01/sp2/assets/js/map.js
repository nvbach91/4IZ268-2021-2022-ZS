//initialize map
window.initMap = function() {

    let myLatlng = { lat: 60.073658, lng: 14.418540 };
    let markers = [];

    const map = new google.maps.Map(document.getElementById("map"), {
        center: myLatlng,
        zoom: 8,
    });

    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
        myLatlng = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        map.setCenter(myLatlng);
        });
    }


    //add custom marker
    const svgMarker = {
        path: "M2 15.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v13.5zM8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z",
        fillColor: "blue",
        fillOpacity: 0.5,
        strokeWeight: 0,
        rotation: 0,
        scale: 2,
        anchor: new google.maps.Point(6, 6),
    };
    
    //when click on map add marker
    map.addListener('click', (event) => {
        addMarker(event.latLng);
    });


    //add marker (automatically) function
    function addMarker(coords) {     
       /* console.log(coords.toUrlValue());
        console.log(coords.toJSON());
        console.log(coords.toString());*/
        const marker = new google.maps.Marker({
            position: coords,
            map,
            title: "Click to zoom",
            icon: svgMarker
        });

        const noteWindow = new google.maps.InfoWindow();
        const latlng = coords.toJSON()
        const latlngstr = JSON.stringify(latlng);

        //call reverse geocoding function to get adresses from coords to show in infowindow
        geocodeLatLng(map, noteWindow, marker);
        noteWindow.open({
            anchor: marker,
            shouldFocus: true,
        });

        //save markers coords to use as keys to get matching list of notes 
        localStorage.setItem(latlngstr, []);
        sessionStorage.setItem('helper', latlngstr);
        // creating url after adding new marker
        history.pushState(null, null, "#"+ marker.position.toUrlValue());

        //listens for the click event on a marker to show infowindow and to set current marker for getting match list of
        marker.addListener("click", () => {
            
            sessionStorage.setItem('helper', JSON.stringify(marker.position.toJSON()));
            history.pushState(null, null, "#"+ marker.position.toUrlValue());

            //after click it also opens a note window
            noteWindow.open({
                anchor: marker,
                shouldFocus: true,
            });

            //listens for the click event on a marker to zoom the map when the marker is clicked
            map.setZoom(8);
            map.panTo(marker.getPosition());
        });

        markers.push(marker);

        map.panTo(coords);
    }
    
    for (let i = 0; i < localStorage.length; i++) {
        const key = JSON.parse(localStorage.key(i));

        const marker = new google.maps.Marker({
            position: new google.maps.LatLng(key.lat, key.lng),
            map,
            title: "Click to zoom",
            icon: svgMarker
        });
        const noteWindow = new google.maps.InfoWindow();

        geocodeLatLng(map, noteWindow, marker);

        marker.addListener("click", () => {
        
            sessionStorage.setItem('helper', JSON.stringify(marker.position.toJSON()));
            history.pushState(null, null, "#"+marker.position.toUrlValue());

            //after click it also opens a note window
            noteWindow.open({
                anchor: marker,
                shouldFocus: true,
            });

            //listens for the click event on a marker to zoom the map when the marker is clicked
            map.setZoom(8);
            map.panTo(marker.getPosition());
        });

        markers.push(marker);
    }


    // add event listeners for the buttons
    $('#show-markers').click(showMarkers);
    $('#hide-markers').click(hideMarkers);
    $('#delete-markers').click(deleteMarkers);



    // Sets the map on all markers in the array.
    function setMapOnAll(map) {
        for (let i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    }

    // Removes the markers from the map, but keeps them in the array.
    function hideMarkers() {
        setMapOnAll(null);
    }

    // Shows any markers currently in the array.
    function showMarkers() {
        setMapOnAll(map);
    }

    // Deletes all markers in the array by removing references to them.
    function deleteMarkers() {
        hideMarkers();
        markers = [];
        localStorage.clear();
        history.pushState(null, null, location.origin);
        location.reload();
    }


    // Create the search box and link it to the UI element.
    const input = document.getElementById("map-input");
    const searchBox = new google.maps.places.SearchBox(input);

    //map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);
    // Bias the SearchBox results towards current map's viewport.
    map.addListener("bounds_changed", () => {
        searchBox.setBounds(map.getBounds());
    });

    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener("places_changed", () => {
        let markersSearch = [];
        const places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        // Clear out the old markers.
        markersSearch.forEach((marker) => {
            marker.setMap(null);
        });
        markersSearch = [];

        // For each place, get the icon, name and location.
        const bounds = new google.maps.LatLngBounds();

        places.forEach((place) => {
            if (!place.geometry || !place.geometry.location) {
                console.log("Returned place contains no geometry");
                return;
            }

            const icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25),
            };

            // Create a marker for each place.
            markersSearch.push(
                new google.maps.Marker({
                    map,
                    icon,
                    title: place.name,
                    position: place.geometry.location,
                })
            );
            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });
}


function geocodeLatLng(map, infowindow, marker) {
    const geocoder = new google.maps.Geocoder();
    const latlng = marker.position.toJSON(); 
    geocoder
      .geocode({
        location: latlng
    })
    .then((response) => {
        if (response.results[0]) {
            
          infowindow.setContent(response.results[0].formatted_address);
        } else {
          window.alert("No results found");
        }
    })
    .catch((e) => window.alert("Geocoder failed due to: " + e));
}


/*
// 10 seconds after the center of the map has changed, pan back to the
// marker. Just an experiment :/
map.addListener("center_changed", () => {
    window.setTimeout(() => {
        map.panTo(marker.getPosition());
    }, 10000);
});*/

/*
const sydney = new google.maps.LatLng(-35.867, 151.195);

infowindow = new google.maps.InfoWindow();
map = new google.maps.Map(document.getElementById("map"), {
    center: sydney,
    zoom: 15,
});


const findBtn = document.getElementById('find-btn');

findBtn.addEventListener("click", () => {
const place = document.getElementById("map-input").value;
console.log(place);
    const request = {
    query: place,
    fields: ["name", "geometry"],
  };

  service = new google.maps.places.PlacesService(map);
  service.findPlaceFromQuery(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK && results) {
      for (let i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }

      map.setCenter(results[0].geometry.location);
    }
  });
});



function createMarker(place) {
  if (!place.geometry || !place.geometry.location) return;

  const marker = new google.maps.Marker({
    map,
    position: place.geometry.location,
    icon: svgMarker
  });

  google.maps.event.addListener(marker, "click", () => {
    infowindow.setContent(place.name || "");
    infowindow.open(map);
  });
}*/