/**
 * Memorama, Match Match, Match Up, Memory, Pelmanism, Shinkei-suijaku, Pexeso or simply Pairs
 */

var shoguns = ['Ieyasu', 'Hidetada', 'Iemitsu', 'Ietsuna', 'Tsunayoshi', 'Ienobu', 'Ietsugu', 'Yoshimune', 'Ieshige', 'Ieharu', 'Ienari', 'Ieyoshi', 'Iesada', 'Iemochi', 'Yoshinobu'];
shoguns = shoguns.concat(shoguns);
shoguns.sort(function () {
    return 0.5 - Math.random();
});
maxCards = 30;
var gameField = document.querySelector('#game-field');
var pointsCounterBox = document.querySelector('#points');

var cardOne = null;
var cardTwo = null;
var pointsCounter = 0;
var revealedCards = 0;

var clickCard = function (card) {
    card.addEventListener('click', function () {
        console.log('kliknuto start');
        if (card.classList.contains('revealed')) {
            return false;
        }
                
        card.classList.add('revealed');

        if (cardOne == null) {
            cardOne = card;
            console.log('jedna', cardOne.innerText);
        } else {
            if (cardTwo == null) {
                cardTwo = card;
                console.log('dvojka', cardTwo.innerText);
            }

        }

        console.log('začátek vyhodnocení')
        
        if (cardOne != null && cardTwo != null) {
            if (cardOne.innerText === cardTwo.innerText) {
                pointsCounter = pointsCounter + 1;
                revealedCards = revealedCards + 2;
                console.log(pointsCounter, revealedCards);
                cardOne = null;
                cardTwo = null;
                if (revealedCards === maxCards) {
                    window.alert("Tokugawský šógunát aneb proč bychom si dávali jména, která se nebudou pléstse všemi našimi předky.");
                }
            } else {
                setTimeout(function () {
                    cardOne.classList.remove('revealed');
                    cardTwo.classList.remove('revealed');
                    cardOne = null;
                    cardTwo = null;
                }, 800);
            }
        }
        pointsCounterBox.innerText = pointsCounter;
    })

}

var createCard = function (name) {
    var card = document.createElement('div');
    card.classList.add('card');
    card.innerText = name;
    clickCard(card);
    gameField.appendChild(card);

}

shoguns.forEach(function (shogun) {
    createCard(shogun);
});
