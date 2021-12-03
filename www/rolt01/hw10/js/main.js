/**
 * Memorama, Match Match, Match Up, Memory, Pelmanism, Shinkei-suijaku, Pexeso or simply Pairs
 */

let cities = ['Prague', 'London', 'Vienna', 'Paris', 'Rome', 'Lisbon', 'Berlin', 'Madrid', 'Budapest', 'Warsaw'];
cities = cities.concat(cities);
cities.sort(() => {
  return 0.5 - Math.random();
});

let pointCount = 0;
let firstCard = null;
let secondCard = null;
let matchedCard = 0;

const gameField = document.querySelector('#game-field');
const pointsField = document.querySelector('#points');

const addCard = (cityNames) => {
  let card = document.createElement('div');
  card.classList.add('card');
  card.innerText = cityNames;
  gameField.appendChild(card);
  card.addEventListener('click', () => {

    if (card.classList.contains('matched')) {
      return;
    }

    if ((firstCard != null) && (secondCard != null)) {
      return;
    };

    if (firstCard === null) {
      card.classList.add('revealed');
      firstCard = card;
      return;
    }

    card.classList.add('revealed');
    secondCard = card;

    if (firstCard.innerText === secondCard.innerText) {
      pointCount++;
      matchedCard = matchedCard + 2;
      (console.log(matchedCard));
      (console.log(cities.length));
      setTimeout(function () {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        firstCard = null;
        secondCard = null;
      }, 1000);
      if (matchedCard === cities.length) {
        pointsField.innerText = pointCount;
        gameField.innerText = 'Congratulations! You finished the game with ' + pointCount + ' points.';
        return;
      };
    } else {
      if (pointCount != 0) {
        pointCount--;
      };
      setTimeout(function () {
        firstCard.classList.remove('revealed');
        secondCard.classList.remove('revealed');
        firstCard = null;
        secondCard = null;
      }, 900);
    };

    pointsField.innerText = pointCount;

  });
};

const creatGameField = (city) => {
  for (let i = 0; i < city.length; i++) {
    addCard(city[i]);
  };
};

const newGame = creatGameField(cities);
