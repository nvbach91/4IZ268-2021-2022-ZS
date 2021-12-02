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

let numberOfCities = cities.length*2;

const pointsField = document.getElementById('points');
const gameField = document.getElementById('game-field');

cities.forEach((city) => {

    const card = document.createElement('div');
    card.classList.add('card');
    card.innerText = city;

    card.addEventListener('click', function () {

        if(firstCard  ===  null) {
            firstCard = card;
            card.classList.add('revealed');
        }

        else if(secondCard  === null) {
            secondCard = card;
            card.classList.add('revealed');
        } else {
            if(firstCard.innerText === secondCard.innerText &&  firstCard != secondCard && !firstCard.classList.contains('stay_revealed') && !secondCard.classList.contains('stay_revealed')) {
                updatePoints(1);
                revealedCards = revealedCards +  2;
                if (revealedCards === numberOfCities) {
                    alert('Konec hry. Skončili jste s (' + points + ') body!');
                }
                firstCard.classList.add('stay_revealed');
                secondCard.classList.add('stay_revealed');
                firstCard = null;
                secondCard = null;
            } else {
                setTimeout(() => {
                    if (!firstCard.classList.contains('stay_revealed')) {
                        firstCard.classList.remove('revealed');
                    }
                    if (!secondCard.classList.contains('stay_revealed')) {
                        secondCard.classList.remove('revealed');
                    }
                    firstCard = null;
                    secondCard = null;
                }, 1000);
                updateScore(-1);
            }
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

