const markers = {};
let map = null;
const proxyurl = "https://cors-anywhere.herokuapp.com/";
let findPlacesURL = proxyurl + "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
const key = "AIzaSyDxtBodAc6wctrHQjQjGIs34bUCucrvGq0"
let infoWindow;

const loadMoreButton = document.getElementById("loadMore");

let input = document.getElementById("name")
let searchButton = document.getElementById("search")
searchButton.addEventListener("click", async () =>{
	findPets (input.value)
})

loadMoreButton.addEventListener("click", async () => {
	let tokens = JSON.parse(window.localStorage.getItem("tokens") || "[]");
	let new_tokens = []
	for (let token of tokens) {
		let { data } = await loadPlaces({}, token);
		if (data.next_page_token) {
			new_tokens.push(data.next_page_token)
		}
		await processData(data.results, false);
	}
	if (new_tokens.length > 0) {
		loadMoreButton.style.display = "block";

	} else { 
		loadMoreButton.style.display = "none";
	}
	window.localStorage.setItem("tokens", JSON.stringify(new_tokens));
})

function initMap() {
	map = new google.maps.Map(document.getElementById("map"), {
		center: { lat: 50, lng: 14 }, zoom: 15,
	});
	infoWindow = new google.maps.InfoWindow();
	let currentLocationMarker;


	if (navigator.geolocation) {
		navigator.geolocation.watchPosition(async (position) => {
			if (currentLocationMarker) currentLocationMarker.setMap(null);
			const pos = { lat: 0, lng: 0 }
			pos.lat = position.coords.latitude;
			pos.lng = position.coords.longitude;
			currentLocationMarker = new google.maps.Marker({
				position: pos, map: map, title: "Current location", icon: "http://www.robotwoods.com/dev/misc/bluecircle.png"
			});
			map.setCenter(pos);
			window.localStorage.setItem("currentLocation", JSON.stringify(pos));
			await findPets()
		}, () => {
			handleLocationError(true, infoWindow, map.getCenter());
		});
	} else {
		handleLocationError(false, infoWindow, map.getCenter());
	}
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	infoWindow.setPosition(pos);
	infoWindow.setContent(browserHasGeolocation ? "Error: The Geolocation service failed." : "Error: Your browser doesn't support geolocation.");
	infoWindow.open(map);
}



async function findPets(name) {
	const pos = JSON.parse(window.localStorage.getItem("currentLocation"));
	let pet_stores = await loadPlaces({ key, radius: 20000, location: pos.lat + "," + pos.lng, type: "pet_store", keyword:name })
	let veterinaries = await loadPlaces({ key, radius: 20000, location: pos.lat + "," + pos.lng, type: "veterinaries", keyword:name })

	console.log(pet_stores.data.results);
	for (let store of pet_stores.data.results) {
		console.log(store.vicinity, store.name);
	}

	console.log(veterinaries.data.results);
	for (let vet of veterinaries.data.results) {
		console.log(vet.vicinity, vet.name);
	}

	let tokens = [];
	if (pet_stores.data.next_page_token) tokens.push(pet_stores.data.next_page_token)
	if (veterinaries.data.next_page_token) tokens.push(veterinaries.data.next_page_token)
	window.localStorage.setItem("tokens", JSON.stringify(tokens));
	if (tokens.length > 0) {
		loadMoreButton.style.display = "block";
	}
	let places = pet_stores.data.results.map(e => ({ ...e, type: "S" }))
		.concat(veterinaries.data.results.map(e => ({ ...e, type: "V" })));
	places = places.filter(place => place.business_status === "OPERATIONAL")
	processData(places, true);
}

function processData(places, clear = false) {
	if (clear) {
		Object.values(markers).map(e => e.setMap(null))
		document.getElementById("list").innerHTML = ""
	}
	let divs = []
	places.forEach(place => {
		//prida markery do mapy
		markers[place.place_id] = new google.maps.Marker({
			position: { lat: place.geometry.location.lat, lng: place.geometry.location.lng }, map: map, //nazev mista
			title: place.name, //typ S nebo V
			label: place.type, optimized: true
		});
		//pri kliknuti na marker dela:
		markers[place.place_id].addListener("click", function () {
			//pokud otevru nove okenko, predchozi se zavre
			infoWindow.close();
			//napln okenka
			infoWindow.setContent(place.name + `<br><a href='https://www.google.com/maps/search/?api=1&query=${place.geometry.location.lat},${place.geometry.location.lng}&query_place_id=${place.place_id}'>View on Google Map</a>`);
			//okenko se otevre vedle markeru
			infoWindow.open(map, markers[place.place_id]);
		});
		//prida nove misto do pole
		divs.push(createPlaceDiv(place))
	})
	// vypisuje mista do listu
	document.getElementById("list").append(...divs);
}

//google, dej mi mista podle parametru
async function loadPlaces(params, page_token = null) {
	//pokud token je
	if (page_token !== null) {
		//zadame google o mista pomoci tokenu
		return await axios({
			method: "get", url: findPlacesURL, params: {
				key, pagetoken: page_token
			}
		})
		//v opacnem propade
	} else {
		//zadame google o mista pomoci parametru
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
	let img = new Image()
	img.src = photo_url
	img.className = "place-image"
	img.alt = place.name;

	let divImg = document.createElement("div")
	divImg.appendChild(img)
	divImg.className = "image"

	let name = document.createElement("h3")
	name.innerText = place.name
	name.className = "place-name"

	let description = document.createElement("p")
	description.innerText = place.vicinity
	description.className = "place-address"


	let rating = document.createElement("p")
	if (place.rating) {
		rating.innerText = place.rating + "/5"
	}
	else {
		rating.innerText = "-/5"
	}
	
	rating.className = "place-rating"
	let ratingTotal = document.createElement("p")
	ratingTotal.innerText = "Total rated:" + place.user_ratings_total
	ratingTotal.className = "place-userratings"

	let openHours = document.createElement("p")

	if(place.opening_hours && place.opening_hours.open_now) {
		openHours.innerText = "open"
		openHours.className = "place-open_now"
	}

	else {
		openHours.innerText = "closed"
		openHours.className = "place-closed_now"
	}


	let button = document.createElement("button")
	button.innerText = "Show"
	button.className = "show"
	button.addEventListener("click", () => showPlace(place.place_id));

	let divPopis = document.createElement("div")
	divPopis.appendChild(name)
	divPopis.appendChild(description)
	divPopis.appendChild(openHours)

	divPopis.appendChild(rating)
	divPopis.appendChild(ratingTotal)

	divPopis.appendChild(button)
	divPopis.className = "info"

	let div = document.createElement("div")
	div.className = "place"
	div.appendChild(divImg)
	div.appendChild(divPopis)
	return div;
}
