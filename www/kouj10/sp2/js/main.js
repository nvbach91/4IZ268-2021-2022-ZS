//proměnná pro api key
const apiKey = "key=5bf436f0a714473285874ff7deeb261a";
let gameNames = [];
let games = [];
const newlyAdded = [];

$(document).ready(() => {
  const form = $("#add-game-form");
  const gameList = $("#game-list");
  const input = $("input");
  input.focus();
  //submit formuláře
  form.submit((event) => {
    event.preventDefault();

    const inputValue = input.val();

    //oddělení názvů
    const separatedValues = inputValue.split(", ");
    const separatedValuesLength = inputValue.split(", ").length;

    //hry, které už jsou v seznamu
    const currentGames = $(".game-name");
    let currentArrayOfGames = [];
    for (let k = 0; k < currentGames.length; k++) {
      const gameName = currentGames.eq(k);
      currentArrayOfGames.push(gameName.text());
    }
    for (let i = 0; i < separatedValues.length; i++) {
      if (currentArrayOfGames.includes(separatedValues[i])) {
        continue;
      }
      createGame(separatedValues[i]);
    }
    gameList.append(newlyAdded);
    console.log(separatedValues);
    console.log(separatedValuesLength);
    //const editedInput = "uncharted%204%20a%20thiefs%20end";
    const editedInput = inputValue;

    input.val("");
  });

  const createGame = (game) => {
    const gameWrapper = $("<div>").addClass("game-wrapper");
    const gameName = $("<h2>").addClass("game-name");

    games = fetch(
      `https://api.rawg.io/api/games?${apiKey}&search=${game}&search_exact=true`
    )
      .then((resp) => {
        return resp.json();
      })
      .then((resp) => {
        gameName.text(resp.results[0].name);
      });

    gameWrapper.append(gameName);
    newlyAdded.push(gameWrapper);
  };

  //    const editInput = () => {
  //      inputValue.ininput.val();
  //    };
});
