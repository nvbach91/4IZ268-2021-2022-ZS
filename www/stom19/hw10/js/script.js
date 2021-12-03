let cities = ['Kiev', 'Sumy', 'Poltava', 'Zhitomir', 'Lviv', 'Kharkiv', 'Chernihiv', 'Odessa', 'Kherson', 'Los Angeles']

const allCities = cities.concat(cities);
allCities.sort(() => {
    return 0.5 - Math.random();
});

const gameSquare = document.querySelector('#gameSquare');
const numberOfPoints = document.querySelector('#number-of-points');

let score = 0;
let firstCard = null;
let secondCard = null;
let cardsRevealed = 0;

const setScore = (updateScore) => {
    let yourScore = parseInt(numberOfPoints.innerText) + updateScore;
    if (yourScore < 0) {
        yourScore = 0;
    }

    numberOfPoints.innerText = yourScore;
}



const createCard = (cityName) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerText = cityName;

    card.addEventListener('click', () => {

        if (firstCard === null) {
            firstCard = card;
            card.classList.add('revealed');
            cardsRevealed ++;
        } else if (secondCard === null) {
            secondCard = card;
            card.classList.add('revealed');

            if (firstCard.innerText === secondCard.innerText && firstCard != secondCard && !firstCard.classList.contains('revealedCards') && !secondCard.classList.contains('revealedCards')) {
                cardsRevealed = cardsRevealed + 1;
                firstCard.classList.add('revealedCards');
                secondCard.classList.add('revealedCards');
                firstCard = null;
                secondCard = null;
                setScore(1);

            } else {
                setTimeout(function () {
                    firstCard.classList.remove('revealed');
                    secondCard.classList.remove('revealed');
                    firstCard = null;
                    secondCard = null;
                }, 1500);
                setScore(-1);
            }
        }

        if (cardsRevealed === cities.length) {
                alert('Congratulations! Number of point is ' + yourScore);
        }

    });






    gameSquare.appendChild(card);
}

allCities.forEach(c => createCard(c));
