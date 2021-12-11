const cities = ['Athens', 'Berlin', 'Copenhagen',
    'Dublin', 'Helsinki',
    'Madrid', 'Paris', 'Prague',
    'Rome', 'Stockholm'
]

const pexesoCities = cities.concat(cities);
pexesoCities.sort(() => {
    return 0.5 - Math.random();
});

const gameArea = document.querySelector('#game-area');
const pointCounter = document.querySelector('#point-counter');

let firstCard = null;
let secondCard = null;
let turnedCards = 0;

const updateScore = (n) => {
    let targetScore = parseInt(pointCounter.innerText) + n;
    if (targetScore < 0) {
        targetScore = 0;
    }
    pointCounter.innerText = targetScore;
}

const createCard = (cityName) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerText = cityName;
    card.addEventListener('click', () => {

        if (firstCard == null) {
            firstCard = card;
            card.classList.add('revealed');
        } else if (secondCard == null) {
            secondCard = card;
            card.classList.add('revealed');
            if (firstCard.innerText === secondCard.innerText && firstCard != secondCard && !firstCard.classList.contains('final') && !secondCard.classList.contains('final')) {
                updateScore(1);
                turnedCards = turnedCards + 1;
                firstCard.classList.add('final');
                secondCard.classList.add('final');
                firstCard = null;
                secondCard = null;
            } else {
                setTimeout(() => {
                    if (!firstCard.classList.contains('final')) {
                        firstCard.classList.remove('revealed');
                    }
                    if (!secondCard.classList.contains('final')) {
                        secondCard.classList.remove('revealed');
                    }
                    firstCard = null;
                    secondCard = null;
                }, 2000);
                updateScore(-1);
            }
        }
    });
    gameArea.appendChild(card);
}

pexesoCities.forEach(c => createCard(c));

