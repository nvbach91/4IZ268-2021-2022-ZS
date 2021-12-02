/**
 * Memorama, Match Match, Match Up, Memory, Pelmanism, Shinkei-suijaku, Pexeso or simply Pairs
 */

 let cities = ['Prague', 'Bratislava', 'Moscow', 'Lisbon', 'London', 'Tokyo', 'Warsaw', 'Sofia', 'New York', 'Paris'];
 
 cities = cities.concat(cities);
 cities.sort(() => {
   return 0.5 - Math.random();
 });

let cardFirst = null;
let cardSecond = null;
let score = 0;
let cardsLeft = cities.length;

var gameField = document.querySelector('#game-field');
var pointsField = document.querySelector('#points');

cities.forEach((city) => {

    const card = document.createElement('div');
    card.classList.add('card');
    card.innerText = city;

    card.addEventListener('click', function() {

        if (card.classList.contains('revealed')) {
            return false;
        }

        if (cardFirst && cardSecond) {
            return false;
        }

        card.classList.add('revealed');

        if (cardFirst === null) {
            cardFirst = card;
            return false;
        }

        if (cardSecond === null) {
            cardSecond = card;
        }

        if (cardFirst.innerText === cardSecond.innerText) {
            updateScore(1);
            countCards(2);
            cardFirst = null;
            cardSecond = null;
        } else {
            updateScore(-1);

            setTimeout(() => {
                cardFirst.classList.remove('revealed');
                cardSecond.classList.remove('revealed');
                cardFirst = null;
                cardSecond = null;
            }, 1000);
        }

    });
    gameField.appendChild(card);
});

const updateScore = (n) => {
    if (!(score === 0 && n < 0)) {
        score += n;
        pointsField.innerText = score;
    }
}

const countCards = (n) => {
    cardsLeft -= n;

    if (cardsLeft <= 0) {
        alert ("You won!! Your score is " + score + ' points.')
    }
}
