let map;
let infoWindow;
let currentLocationMarker;
let markers = [];
let findPlacesURL = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/js?parameters'

google.load("maps", "3.exp", {
	"callback": initMap,
	"key": "AIzaSyAVkSo1iq9U0FIplqLbNsHyMAHHqtNd7No",
	"libraries": "places,visualization,localContext",
	"v": 'beta'
});

function initMap() {
	map = new google.maps.Map(document.getElementById("map"), {
		center: {lat: 50, lng: 14},
		zoom: 15,
	});
	infoWindow = new google.maps.InfoWindow();

	// Try HTML5 geolocation.
	if (navigator.geolocation) {
		navigator.geolocation.watchPosition((position) => {
			if (currentLocationMarker) currentLocationMarker.setMap(null);
			const pos = {
				lat: position.coords.latitude,
				lng: position.coords.longitude,
			};
			currentLocationMarker = new google.maps.Marker({
				position: pos,
				map: map,
				title: 'Current location',
			});
			map.setCenter(pos);
		}, () => {
			handleLocationError(true, infoWindow, map.getCenter());
		});
	} else {
		// Browser doesn't support Geolocation
		handleLocationError(false, infoWindow, map.getCenter());
	}
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	infoWindow.setPosition(pos);
	infoWindow.setContent(
		browserHasGeolocation
			? "Error: The Geolocation service failed."
			: "Error: Your browser doesn't support geolocation."
	);
	infoWindow.open(map);
}
