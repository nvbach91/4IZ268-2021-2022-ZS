let cities = ['Barcelona', 'Dortmund', 'Madrid', 'Turin', 'Prague', 'London', 'Rome', 'Lisabon', 'Venice', 'Budapest'];
cities = cities.concat(cities);
cities.sort(() => {
    return 0.5 - Math.random();
});

var firstCard = null;
var secondCard = null;
var points = 0;
var moves = 0;
var pointsCounter = document.querySelector('#points');
var playground = document.querySelector('#playground');

const pairedCards = [];

const clickOnCard = (card, name) => {

    if (card.classList.contains("paired")) {
        return;
    }
    if (card.classList.contains("revealed")) {
        return;
    }
    if (firstCard && secondCard) {
        return;
    }

    moves += 0.5;
    card.classList.add("revealed");
    card.innerText = name;

    if (firstCard) {
        secondCard = card;

        if (firstCard.innerText === secondCard.innerText) {
            points++;
            firstCard.classList.add("paired");
            secondCard.classList.add("paired");
            pairedCards.push(firstCard, secondCard);
            if (pairedCards.length === cities.length) {
                alert('Gratuluji, dokončil jsi hru na ' + moves + ' tahů s ' + points + ' body.');
            }
        } else {
            if (points !== 0) points--;
            setTimeout(() => {
                firstCard.innerText = "";
                secondCard.innerText = "";
            }, 1000)
        }

        setTimeout(() => {
            firstCard.classList.remove("revealed");
            secondCard.classList.remove("revealed");
            firstCard = null;
            secondCard = null;

        }, 1000)

    } else {
        firstCard = card;
    }

    pointsCounter.innerText = points;

}

const addCard = (name) => {
    const card = document.createElement('div');
    card.classList.add('card');

    card.addEventListener("click", () => clickOnCard(card, name));
    playground.appendChild(card);
};

cities.forEach((city) => {
    addCard(city);
});