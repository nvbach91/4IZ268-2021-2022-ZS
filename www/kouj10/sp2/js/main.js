//proměnná pro api key
const apiKey = "key=5bf436f0a714473285874ff7deeb261a";
let games = [];
const newlyAdded = [];
let searchedGame = "";

$(document).ready(() => {
  //načtení her z local storage
  localStorageLenght = localStorage.length;
  console.log(localStorageLenght);

  const form = $(".add-game-form");
  const gameList = $("#game-list");
  const input = $("input");
  const body = $("body");
  input.focus();
  const resultSpace = $("<div>").addClass("results");
  const spinnerWrapper = $("<div>").addClass("spinner-wrapper");
  const spinner = $(`<i class="spinner fas fa-gamepad"></i>`);
  const spinnerText = $("<span>").addClass("spinner-text").text("Načítání...");

  spinnerWrapper.append(spinner, spinnerText);

  //submit formuláře
  form.submit((event) => {
    event.preventDefault();
    resultSpace.append(spinnerWrapper);

    const pageButtons = $(".page-button");

    const gamesToChoose = $(".choose-game");

    const removeButton = $(".results.remove-button-wrapper");

    const addGameButton = $(".add-game-button");

    const inputValue = input.val();
    searchedGame = inputValue;

    //oddělení názvů
    const separatedValues = inputValue.split(", ");
    const separatedValuesLength = inputValue.split(", ").length;

    //hry, které už jsou v seznamu
    const currentGames = $(".name");
    let currentArrayOfGames = [];
    for (let k = 0; k < currentGames.length; k++) {
      const gameName = currentGames.eq(k);
      currentArrayOfGames.push(gameName.text());
    }
    for (let i = 0; i < separatedValues.length; i++) {
      if (currentArrayOfGames.includes(separatedValues[i])) {
        continue;
      }
      if (!inputValue == "") {
        searchGame(separatedValues[i]);
      } else {
        alert("Nebyl zadán název pro vyhledání");
      }
    }

    gameList.append(newlyAdded);

    if (!inputValue == "") {
      pageButtons.remove();
      gamesToChoose.remove();
      removeButton.remove();
      addGameButton.remove();
      resultSpace.append(createRemoveButton(resultSpace));
      body.append(resultSpace);
    }

    console.log(separatedValues);
    console.log(separatedValuesLength);
    //const editedInput = "uncharted%204%20a%20thiefs%20end";
    const editedInput = inputValue;

    input.val("");
  });

  const searchGame = (game) => {
    const gameWrapper = $("<div>").addClass("game-wrapper");
    const gameName = $("<h2>").addClass("game-name");

    fetch(
      `https://api.rawg.io/api/games?${apiKey}&ordering=name&search=${game}&search_exact=true`
    )
      .then((resp) => {
        return resp.json();
      })
      .then((resp) => {
        games = resp;
        if (resp.count == 0) {
          const noResult = $("<div>").addClass("no-result");
          noResult.text("Nebyly nalezeny žádné výsledky.");
          resultSpace.append(noResult);
        } else {
          const pageNumber = Math.ceil(resp.count / resp.results.length);
          console.log(pageNumber);
          console.log(resp);

          let count = resp.results.length;
          console.log(count);
          if (resp.count > count) {
            for (let x = 1; x <= pageNumber; x++) {
              resultSpace.append(createPageButton(x));
            }
          }

          renderResults(resp);
        }
      })
      .then(() => {
        spinnerWrapper.remove();
      });

    //gameWrapper.append(gameName);
    //newlyAdded.push(gameWrapper);
  };

  //vytvoření čudlíků k přepínání stránek výsledků
  const createPageButton = (numberOfPage) => {
    const pageButton = $("<button>").addClass("page-button");
    pageButton.text(numberOfPage);

    pageButton.click(() => {
      const searchResults = $(".choose-game");
      searchResults.remove();
      const addGameButton = $(".add-game-button");
      addGameButton.remove();
      resultSpace.append(spinnerWrapper);

      games = fetch(
        `https://api.rawg.io/api/games?${apiKey}&ordering=name&page=${numberOfPage}&search=${searchedGame}&search_exact=true`
      )
        .then((resp) => {
          return resp.json();
        })
        .then((resp) => {
          spinnerWrapper.remove();
          renderResults(resp);
        });
    });
    return pageButton;
  };
  //vytvoření čudlíku k přidání hry
  const createAddGameButton = (game) => {
    const addButton = $(
      `<div class="add-game-button"><i class="fas fa-plus"></i></div>`
    );

    addButton.click(() => {
      const gameDetails = {
        id: game.id,
        image: game.background_image,
        name: game.name,
        metascore: game.metacritic,
      };

      localStorage.setItem(`${game.id}`, `${JSON.stringify(gameDetails)}`);

      gameList.append(createGame(gameDetails));
      addButton.remove();
    });
    return addButton;
  };

  //vytvoření záznamu
  const createGame = (gameDetails) => {
    let modifyingNow = false;
    const gameContainer = $("<div>").addClass("game-container");
    const infoContainer = $("<div>").addClass("info-container");
    const image = $("<img>")
      .addClass("image")
      .attr({ src: gameDetails.image, alt: `${gameDetails.name} image` });
    const id = $("<div>").addClass("id").text(`${gameDetails.id}`);
    const name = $("<h2>")
      .addClass("name")
      .attr("id", gameDetails.id)
      .text(gameDetails.name);
    const metascore = $("<div>")
      .addClass("metascore")
      .text(`Skóre na Metacritic: ${gameDetails.metascore}`);
    const modifyButton = $(`<i class="fas fa-pencil-alt"></i>`).addClass(
      "modify-button"
    ).attr("title", "Upravit poznámku");
    const noteDiv = $("<div>").addClass("note-div").text(gameDetails.note);
    const noteTextArea = $("<textarea>").addClass("note-textarea");

    modifyButton.click(() => {
      if (modifyingNow) {
        let modifiedText = noteTextArea.val();

        localGame = JSON.parse(localStorage.getItem(gameDetails.id));
        localGame.note = modifiedText;
        localStorage.setItem(gameDetails.id, JSON.stringify(localGame));
        noteDiv.text(modifiedText);
        noteTextArea.remove();
        infoContainer.append(noteDiv);
        modifyingNow = false;
      } else {
        let textToChange = noteDiv.text();
        noteTextArea.val(textToChange);
        noteDiv.remove();
        infoContainer.append(noteTextArea);
        modifyingNow = true;
      }
    });

    //const $("<div>").addClass("");
    infoContainer.append(
      id,
      name,
      metascore,
      modifyButton,
      noteDiv,
      createRemoveButton(gameContainer)
    );
    gameContainer.append(image, infoContainer);

    return gameContainer;
  };

  //vytvoření čudlíku k odstranění
  const createRemoveButton = (elementToRemove) => {
    const removeButtonWrapper = $("<div>").addClass("remove-button-wrapper");
    const removeButton = $(`<i class="fas fa-times"></i>`).addClass(
      "remove-button"
    );
    removeButton.click(() => {
      switch (elementToRemove.hasClass("game-container")) {
        case false:
          elementToRemove.empty().remove();
          break;
        case true:
          if (confirm("Opravdu chcete hru odstranit?")) {
            const idToRemove = $(elementToRemove)
              .find(".info-container h2")
              .attr("id");
            localStorage.removeItem(idToRemove);
            elementToRemove.empty().remove();
          }
          break;
      }
    });
    removeButtonWrapper.append(removeButton);
    return removeButtonWrapper; //prohledat kód, najít, kde se odkazuju na removeButton a nahradit removeButtonWrapperem
  };

  //vykreslování výsledků

  const renderResults = (resp) => {
    //hry, které už jsou v seznamu
    const currentGames = $(".name");
    let arrayOfCurrentGames = [];
    for (let k = 0; k < currentGames.length; k++) {
      const currentGame = currentGames.eq(k);
      arrayOfCurrentGames.push(currentGame.attr("id"));
    }
    let count = resp.results.length;
    let gameNames = [];

    for (let y = 0; y < count; y++) {
      gameElement = $("<div>")
        .addClass("choose-game")
        .attr("id", resp.results[y].id);
      if (resp.results[y].released == null) {
        gameElement.text(`${resp.results[y].name}, rok neuveden`);
      } else {
        gameElement.text(
          `${resp.results[y].name}, ${resp.results[y].released.slice(0, 4)}`
        );
      }
      const gameElementWrapper = $("<div>").addClass("game-element-wrapper");
      gameElementWrapper.append(gameElement);

      const gameId = resp.results[y].id.toString();

      if (arrayOfCurrentGames.includes(gameId)) {
      } else {
        gameElementWrapper.append(createAddGameButton(resp.results[y]));
      }
      gameNames.push(gameElementWrapper);
    }
    console.log(arrayOfCurrentGames);
    console.log(resp.results[0].id);

    resultSpace.append(...gameNames);
  };

  //získání hodnot z localStorage
  const gamesFromStorage = () => {
    let games = [];
    let keys = Object.keys(localStorage);
    let keysLenght = keys.length;

    for (let i = 0; i <= keysLenght; i++) {
      gameList.append(createGame(JSON.parse(localStorage.getItem(keys[i]))));
    }
    //console.log(games);
    //gameList.append(...games);
  };

  //načtení her z local storage
  gamesFromStorage();

  //pageButton.click(() => {

  //})

  //    const editInput = () => {
  //      inputValue.ininput.val();
  //    };
});
