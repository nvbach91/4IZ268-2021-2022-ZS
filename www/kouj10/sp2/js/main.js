//proměnná pro api key
const apiKey = "key=5bf436f0a714473285874ff7deeb261a";

let gameNames = [];
let games = [];
games = fetch(
  `https://api.rawg.io/api/games?${apiKey}&search=uncharted%204%20a%20thiefs%20end&search_exact=true`
).then((resp) => {
    return resp.json()
}).then((resp) => {
    console.log(resp.results[0].name);
});

