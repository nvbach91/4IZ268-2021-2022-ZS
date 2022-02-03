//initialize map
function initMap() {

    let myLatlng = { lat: 60.073658, lng: 14.418540 };
    let markers = [];

    const map = new google.maps.Map(document.getElementById("map"), {
        center: myLatlng,
        zoom: 8,
    });

    //asking for geolocation API
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
    
    
    for (let i = 0; i < localStorage.length; i++) {
        const key = JSON.parse(localStorage.key(i));
        
        const marker = new google.maps.Marker({
            position: new google.maps.LatLng(key.lat, key.lng),
            map,
            title: "Click to zoom",
            icon: svgMarker,
            label: `${i + 1}`,
            animation: google.maps.Animation.DROP,
        });
        const noteWindow = new google.maps.InfoWindow({
            content: "Please wait few moments, I am retrieving info..."
        });

        markers.push(marker);
        window.setTimeout(() => {
            geocodeLatLng(map, noteWindow, marker);
        }, i * 2000);


        marker.addListener("click", () => {
        
            sessionStorage.setItem('helper', JSON.stringify(marker.position.toJSON()));

            //search for the already bouncing marker to then stop this animation and "asign" it to clicked marker
            const bouncing = markers.find(marker => marker.animation == google.maps.Animation.BOUNCE);
            if (bouncing) {
                bouncing.setAnimation(null);
            }
            marker.setAnimation(google.maps.Animation.BOUNCE);

            //after click it also opens a note window
            noteWindow.open({
                anchor: marker,
                shouldFocus: true,
            });

            //listens for the click event on a marker to zoom the map when the marker is clicked
            map.setZoom(8);
            map.panTo(marker.getPosition());

            history.pushState(null, null, "#"+marker.position.toUrlValue());
        });

        marker.addListener("dblclick", () => {
            const doDelete = confirm("Are you sure you want to delete this note?");
            const latlngstr = JSON.stringify(marker.position.toJSON());
            const deleted = marker;

            if(doDelete) {
                localStorage.removeItem(latlngstr);
                markers = markers.filter(marker => marker !== deleted);
                marker.setMap(null);
            }
        });
    }

    //when click on map add marker
    map.addListener('click', (event) => {
        addMarker(event.latLng);
    });

    //add marker (automatically) function
    function addMarker(coords) {
    
        const bouncing = markers.find(marker => marker.animation == google.maps.Animation.BOUNCE);
            if (bouncing) {
                bouncing.setAnimation(null);
        }

        const marker = new google.maps.Marker({
            position: coords,
            map,
            title: "Click to zoom",
            icon: svgMarker,
            label: `${markers.length + 1}`,
            animation: google.maps.Animation.BOUNCE,
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

        //listens for the click event on a marker to show infowindow and to set current marker for getting match list of
        marker.addListener("click", () => {
            
            sessionStorage.setItem('helper', JSON.stringify(marker.position.toJSON()));

            const bouncing = markers.find(marker => marker.animation == google.maps.Animation.BOUNCE);
            if (bouncing) {
                bouncing.setAnimation(null);
            }
            toggleBounce(marker);

            //after click it also opens a note window
            noteWindow.open({
                anchor: marker,
                shouldFocus: true,
            });

            //listens for the click event on a marker to zoom the map when the marker is clicked
            map.setZoom(8);
            map.panTo(marker.getPosition());
            
            history.pushState(null, null, "#"+ marker.position.toUrlValue());
        });

        marker.addListener("dblclick", () => {
            const doDelete = confirm("Are you sure you want to delete this note?");
            const latlngstr = JSON.stringify(marker.position.toJSON());
            const deleted = marker;

            if(doDelete) {
                localStorage.removeItem(latlngstr);
                markers = markers.filter(marker => marker !== deleted);
                marker.setMap(null);
            }
        });

        markers.push(marker);
        //set the map center to actual marker
        map.panTo(coords);
        // creating url after adding new marker
        history.pushState(null, null, "#"+ marker.position.toUrlValue());
    }


    // add event listeners for the buttons
    $('#show-markers').click(showMarkers);
    $('#hide-markers').click(hideMarkers);
    $('#delete-markers').click(deleteMarkers);

  /*  document.getElementById('show-markers').addEventListener('click', showMarkers);
    document.getElementById('hide-markers').addEventListener('click', hideMarkers);
    document.getElementById('delete-markers').addEventListener('click', deleteMarkers);*/

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
        marker
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
            
          infowindow.setContent(response.results[0].formatted_address || "");
        } else {
          window.alert("No results found");
        }
    })
    .catch((e) => window.alert("Geocoder failed due to: " + e));
}

function toggleBounce(marker) {
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}

/*
// 10 seconds after the center of the map has changed, pan back to the
// marker. Just an experiment :/
map.addListener("center_changed", () => {
    window.setTimeout(() => {
        map.panTo(marker.getPosition());
    }, 10000);
});*/
