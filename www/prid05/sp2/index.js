const markers = {};
let map = null;
const proxyurl = "https://cors-anywhere.herokuapp.com/";
let findPlacesURL = proxyurl + "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
const key = "AIzaSyAVkSo1iq9U0FIplqLbNsHyMAHHqtNd7No"


document.getElementById("loadMore").addEventListener("click", async () => {
	let tokens = JSON.parse(window.localStorage.getItem("tokens") || "[]");
	let new_tokens = []
	for (let token of tokens) {
		let {data} = await loadPlaces({}, token);
		if (data.next_page_token) {
			new_tokens.push(data.next_page_token)
		}
		await processData(data.results, false);
	}
	if (new_tokens.length > 0) {
		document.getElementById("loadMore").style.display = "block";
	} else {
		document.getElementById("loadMore").style.display = "none";

	}
	window.localStorage.setItem("tokens", JSON.stringify(new_tokens));
})


function initMap() {
	map = new google.maps.Map(document.getElementById("map"), {
		center: {lat: 50, lng: 14}, zoom: 15,
	});
	let infoWindow = new google.maps.InfoWindow();
	let currentLocationMarker;


	// Try HTML5 geolocation.
	if (navigator.geolocation) {
		navigator.geolocation.watchPosition(async (position) => {
			if (currentLocationMarker) currentLocationMarker.setMap(null);
			const pos = {lat: 0, lng: 0}
			pos.lat = position.coords.latitude;
			pos.lng = position.coords.longitude;
			currentLocationMarker = new google.maps.Marker({
				position: pos, map: map, title: "Current location", icon: 'http://www.robotwoods.com/dev/misc/bluecircle.png'
			});
			map.setCenter(pos);
			window.localStorage.setItem("currentLocation", JSON.stringify(pos));
			await findPets()
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
	infoWindow.setContent(browserHasGeolocation ? "Error: The Geolocation service failed." : "Error: Your browser doesn't support geolocation.");
	infoWindow.open(map);
}

async function findPets() {
	const pos = JSON.parse(window.localStorage.getItem("currentLocation"));
	let pet_stores = await loadPlaces({key, radius: 50000, location: pos.lat + "," + pos.lng, type: "pet_store"})
	let veterinaries = await loadPlaces({key, radius: 50000, location: pos.lat + "," + pos.lng, type: "veterinary_care"})
	let tokens = [];
	if (pet_stores.data.next_page_token) tokens.push(pet_stores.data.next_page_token)
	if (veterinaries.data.next_page_token) tokens.push(veterinaries.data.next_page_token)
	window.localStorage.setItem("tokens", JSON.stringify(tokens));
	if (tokens.length > 0) {
		document.getElementById("loadMore").style.display = "block";
	}
	let places = pet_stores.data.results.map(e => ({...e, type: "S"}))
		.concat(veterinaries.data.results.map(e => ({...e, type: "V"})));
	// filter for OPEN only
	places = places.filter(place => place.business_status === "OPERATIONAL")
	// generate markers
	processData(places, true);
}

function processData(places, clear = false) {
	if (clear) {
		Object.values(markers).map(e => e.setMap(null))
		document.getElementById("list").innerHTML = ""
	}
	places.forEach(place => {
		markers[place.place_id] = new google.maps.Marker({
			position: {lat: place.geometry.location.lat, lng: place.geometry.location.lng},
			map: map,
			title: place.name,
			label: place.type,
		});
		document.getElementById("list").innerHTML += createPlaceDiv(place)
	})
}

async function loadPlaces(params, page_token = null) {
	if (page_token !== null) {
		return await axios({
			method: "get", url: findPlacesURL, params: {
				key, pagetoken: page_token
			}
		})
	} else {
		return axios({
			method: "get", url: findPlacesURL, params
		})
	}
}
function showPlace(id) {
	map.setCenter(markers[id].position);
	map.setZoom(18)
}

function createPlaceDiv(place) {
	let photo_url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=100&photo_reference=${((place.photos || [])[0] || {}).photo_reference}&key=${key}`

	if (((place.photos || [])[0] || {}).photo_reference === undefined) {
		photo_url = "./assets/images/no_image.png"
	}

	return `<div class="place" >
            <div class="image">
                <img src="${photo_url}" class='place-image' alt="">
            </div>
            <div class="info">
                <h3 class="place-name">${place.name}</h3>
                <p class="place-address">${place.vicinity}</p>
                <button class="show" onclick="showPlace('${place.place_id}')">SHOW</button>
            </div>
        </div>`
}
