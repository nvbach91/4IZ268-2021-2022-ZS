const cards = document.querySelectorAll('.memory-card');
const pts = document.getElementsByClassName("pts");
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let points = 0;

const ptts = document.getElementById("ptsres");


function flipCard() {
    if (lockBoard){
        return;
    }
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

    checkForMatch();
}

/*function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
}*/

function checkForMatch(){
    if (firstCard.dataset.framework == secondCard.dataset.framework){
        disableCards();
        points=points+1;
        ptts.innerText = points;
    }
    else {
        unflipCards();
        if (points>0){
            points=points-1;
            ptts.innerText = points;
        }
    }

}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

 (function shuffle() {
       cards.forEach(card => {
             let ramdomPos = Math.floor(Math.random() * 12);
             card.style.order = ramdomPos;
           });
     })();
cards.forEach(card => card.addEventListener('click', flipCard));

