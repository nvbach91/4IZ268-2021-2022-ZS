let points = 0;
let card1 = null;
let card2 = null;
let hasTwoCards = false;
let guessedPairs = 0;
let totalPairs = 0;

window.onload = () => {
    const body = document.querySelector('body');
    body.appendChild(createContainer());
}

const createContainer = () => {
    const container = document.createElement('div');
    container.setAttribute('id', 'container');
    container.appendChild(createHeading());
    container.appendChild(createPointsWindow());
    container.appendChild(createCardsContainer());
    return container;
}

const createHeading = () => {
    const heading = document.createElement('h1');
    heading.innerText = 'Pexeso';
    return heading;
}

const createPointsWindow = () => {
    const pointsWindow = document.createElement('div');
    pointsWindow.classList.add('points-box');
    pointsWindow.appendChild(createPointsText());
    pointsWindow.appendChild(createPointsCounter());
    return pointsWindow;
}

const createPointsText = () => {
    const pointsText = document.createElement('p');
    pointsText.setAttribute('id', 'points-text');
    pointsText.innerText = 'Points:';
    return pointsText;
}

const createPointsCounter = () => {
    const pointsCounter = document.createElement('p');
    pointsCounter.setAttribute('id', 'points-counter');
    pointsCounter.innerText = points;
    return pointsCounter;
}

const createCardsContainer = () => {
    const cardsContainer = document.createElement('div');
    cardsContainer.setAttribute('id', 'cards-container');
    let cardsContent = ['./img/new-york.jpg', './img/paris.jpg', './img/prague.jpg', './img/tokyo.jpg', './img/washington-dc.jpg', './img/berlin.jpg', './img/stockholm.jpg', './img/ottawa.jpg', './img/sydney.jpg', './img/london.jpg'];
    totalPairs = cardsContent.length;
    console.log(totalPairs);
    cardsContent = cardsContent.concat(cardsContent);
    cardsContent.sort(() => { return 0.5 - Math.random(); });
    for (let i = 0; i < 20; i++) {
        let card = createCard();
        let image = document.createElement('img');
        image.classList.add('image');
        image.setAttribute('alt', cardsContent[i].replace(/^\.\/img\/+|\.jpg+$/g, ''));
        image.setAttribute('src', cardsContent[i]);
        card.appendChild(image);
        cardsContainer.appendChild(card);
    }
    return cardsContainer;
}

const createCard = () => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.addEventListener('click', () => createCardListener(card));
    return card;
}

const createCardListener = (card) => {
    if (hasTwoCards === true) {
        return;
    }
    if (card.children[0].classList.contains('shown')) {
        return;
    }
    if (card1 === null) {
        card1 = card;
        card.children[0].classList.add('shown');
    } else {
        card2 = card;
        card.children[0].classList.add('shown');
        hasTwoCards = true;
    }
    if (hasTwoCards === true) {
        if ((card1 != null) && (card2 != null)) {
            if (card1.children[0].alt === card2.children[0].alt) {
                updatePoints();
                guessedPairs++;
                card1 = null;
                card2 = null;
                hasTwoCards = false;
            } else {
                setTimeout(() => {
                    card1.children[0].classList.remove('shown');
                    card2.children[0].classList.remove('shown');
                    card1 = null;
                    card2 = null;
                    hasTwoCards = false;
                }, 2000)
                removePoints();
            }
        }
    }
    if (guessedPairs === totalPairs) {
        createFinalScore();
    }
}

const updatePoints = () => {
    points++;
    const counter = document.querySelector('#points-counter');
    counter.innerText = points;
}

const removePoints = () => {
    if (points > 0) {
        points--;
        const counter = document.querySelector('#points-counter');
        counter.innerText = points;
    }
}

const createFinalScore = () => {
    const text = document.querySelector('#points-text');
    text.innerText = 'Final Score:'
}