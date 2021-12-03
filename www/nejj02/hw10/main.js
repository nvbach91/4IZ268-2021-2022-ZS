/**
 * Memorama, Match Match, Match Up, Memory, Pelmanism, Shinkei-suijaku, Pexeso or simply Pairs
 */

let gameField = document.getElementById('game-field');
let pointCounter = document.getElementById('points');
let points = 0;
let finishedCards = 0;
let firstCard = null;
let secondCard = null;

let cryptoPunks = ['alpha', 'beta', 'gamma', 'delta', 'zeta', 'eta', 'theta', 'iota', 'kappa', 'lambda'];
cryptoPunks = cryptoPunks.concat(cryptoPunks);
cryptoPunks.sort(() => {
    return 0.5 - Math.random();
});

let createCard = (cryptoPunk) => {
    let card = document.createElement('div');
    card.classList.add('card');
    //card.innerText = cryptoPunk;
    card.addEventListener('click', () => {
        if (!card.classList.contains('revealed') && !secondCard) {
            card.classList.add('revealed');
            card.style.backgroundImage = 'url(./img/' + cryptoPunk.toLowerCase() + '.png)';
            if (!firstCard) {
                firstCard = card;
            } else {
                secondCard = card;
                if (secondCard.style.backgroundImage == firstCard.style.backgroundImage) {
                    points++;
                    finishedCards++;
                    if (finishedCards == cryptoPunks.length / 2) {
                        setTimeout(() => { alert('Congratz u win!'); }, 1000)
                    }
                    firstCard = null;
                    secondCard = null;
                } else {
                    if (points > 0) {
                        points--;
                    }
                    setTimeout(() => {
                        firstCard.classList.remove('revealed');
                        secondCard.classList.remove('revealed');
                        firstCard.removeAttribute('style');
                        secondCard.removeAttribute('style');
                        firstCard = null;
                        secondCard = null;
                    }, 2000);
                }
            }
            pointCounter.innerText = points;
        }
    });
    return card;
}

cryptoPunks.forEach((cryptoPunk) => {
    gameField.appendChild(createCard(cryptoPunk));
});