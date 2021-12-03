/**
 * Memorama, Match Match, Match Up, Memory, Pelmanism, Shinkei-suijaku, Pexeso or simply Pairs
 */

let cities = [
  "Tokio",
  "Soul",
  "Šanghaj",
  "Mexiko",
  "Sao  Paulo",
  "Peking",
  "Káhira",
  "Dillí",
  "Instanbul",
  "New York",
];
cities = cities.concat(cities);
cities.sort(() => {
  return 0.5 - Math.random();
});

let firstCard = null;
let secondCard = null;
let points = 0;
let revealedCards = 0;

let numberOfCities = cities.length;

const pointsField = document.getElementById('points');
const gameField = document.getElementById('game-field');

cities.forEach((city) => {

    const card = document.createElement('div');
    card.classList.add('card');
    card.innerText = city;

    card.addEventListener('click', function () {

        if (card.classList.contains('revealed')) {
            return false;
        }

        if (firstCard && secondCard) {
            return false;
        }

        card.classList.add('revealed');

        if(firstCard  ===  null) {
            firstCard = card;
            return false;
        }

        if(secondCard  === null) {
            secondCard = card;
        } 
        if(firstCard.innerText === secondCard.innerText) {
            updatePoints(1);
            updateCards(2);
            firstCard = null;
            secondCard = null;
        } else {
            updatePoints(-1);
            setTimeout(() => {
                firstCard.classList.remove('revealed');
                secondCard.classList.remove('revealed');
                firstCard = null;
                secondCard = null;
            }, 1000);
        }
        
    });
    gameField.appendChild(card);
});

function updatePoints(number) {
  points = points + number;
  if (points < 0) {
    points = 0;
  }
  pointsField.innerText = points;
}

function updateCards(number) {
    revealedCards = revealedCards + number;
    console.log(revealedCards);
    console.log(numberOfCities);
    if (revealedCards === numberOfCities) {
        alert('Konec hry. Skončili jste s (' + points + ') body!');
    }
  }

