/**
 * Memorama, Match Match, Match Up, Memory, Pelmanism, Shinkei-suijaku, Pexeso or simply Pairs
 */

let cities = ['Prague', 'London', 'Paris', 'Moscow', 'Sacramento',
    'Vancouver', 'Sydney', 'Dubai', 'New York', 'Washington',
    'Madrid', 'Reykjavík', 'Oslo', 'Bratislava', 'Budapest',
    'Prievidza', 'Berlin', 'Tórshavn', 'Longyearbyen', 'Darłowo'];
citiesNumber = cities.length;
cities = cities.concat(cities);

cities.sort(() => {
    return 0.5 - Math.random();
});

let score = 0;

const setScore = () => {
    if (score < 0) {
        score = 0;
    }

    const scoreCounter = document.querySelector('#points');
    scoreCounter.innerText = score;
}

let guessedPairs = 0;

let revealedCards = [];

const createCard = (cityName) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerText = cityName;

    card.addEventListener('click', () => {
        if (card.classList.contains('revealed')) {
            return;
        }

        if (revealedCards.length === 2) {
            return;
        }

        if (revealedCards.length < 2) {
            card.classList.add('revealed');
            revealedCards.push(card);
        }

        if (revealedCards.length === 2) {
            if (revealedCards[0].innerText === revealedCards[1].innerText) {
                guessedPairs++;
                score++;
                setScore();
                revealedCards = [];
            } else {
                score--;
                setScore();
                setTimeout(function () {
                    revealedCards.forEach(card => card.classList.remove('revealed'));
                    revealedCards = [];
                }, 1000);
            }
        }

        if (guessedPairs === citiesNumber) {
            alert('You\'ve found them all, congratulations! Your score is ' + score + ' point(s).');
        }
    });

    return card;
}

let citiesCards = [];

cities.forEach(city => {
    const card = createCard(city);
    citiesCards.push(card);
});

const gameField = document.querySelector('#game-field');
gameField.append(...citiesCards);
