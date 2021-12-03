/**
 * Memorama, Match Match, Match Up, Memory, Pelmanism, Shinkei-suijaku, Pexeso or simply Pairs
 */
const points = document.querySelector('#points');
const record = document.querySelector('#record');
const gameField = document.querySelector('#game-field');
const body = document.querySelector('body');
const cover = document.createElement('div');
cover.id = 'cover';

let peugeots = ['206-rallye', '9x8', '106', '206', '308', '403', '508', 'dakar', 'daniels-taxi', 'rcz'];
peugeots = peugeots.concat(peugeots);
const randomize = () => {
    peugeots.sort(() => {
        return 0.5 - Math.random();
    });
};

let firstCard;
let secondCard;
let rightCards;
let numberOfPoints = 0;
let round = 1;

const selectCard = (card) => {
    card.addEventListener('click', () => {
        card.style = `background-image: url(img/${card.innerText}-min.jpg);`;
        if (card.classList.contains('revealed')) {
        } else {
            card.classList.add('revealed');
            if (round == 1) {
                firstCard = card;
                round = 2;
            } else {
                secondCard = card;
                round = 1;
                if (firstCard.innerText == secondCard.innerText) {
                    numberOfPoints += 2;
                } else {
                    if (numberOfPoints >= 1) {
                        numberOfPoints--;
                    }
                    body.appendChild(cover);
                    setTimeout(() => {
                        firstCard.style = '';
                        secondCard.style = '';
                        firstCard.classList.remove('revealed');
                        secondCard.classList.remove('revealed');
                        cover.remove();
                    }, 2000);
                };
                points.innerText = numberOfPoints;
            };
        }
    });
}

const dealCards = () => {
    let cards = [];
    for (i = 0; i <= 19; i++) {
        let card = document.createElement('div');
        card.innerHTML = peugeots[i];
        card.classList.add('card');
        cards.push(card);
        selectCard(card);
    }
    gameField.append(...cards);
};

const newGameButton = document.createElement('button');
newGameButton.innerText = 'Nová hra';
newGameButton.addEventListener('click', () => {
    if (document.querySelectorAll('div.revealed').length == 20) {
        gameField.innerHTML = "";
        randomize();
        dealCards();
        if (numberOfPoints > record.innerText) {
            record.innerText = numberOfPoints;
        };
        numberOfPoints = 0;
        points.innerText = 0;
    } else {
        alert('Ještě jste nedohráli, nemůžete začít novou hru!');
    };
});

const newGame = document.querySelector('#new-game');
newGame.appendChild(newGameButton);
randomize();
dealCards();