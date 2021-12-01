/**
 * Memorama, Match Match, Match Up, Memory, Pelmanism, Shinkei-suijaku, Pexeso or simply Pairs
 */

let cities = ['Canberra', 'Damascus', 'Lima', 'Lisbon', 'Maputo', 'New Delhi', 'Prague', 'Seoul', 'Tokyo', 'Zagreb'];
cities = cities.concat(cities);
cities.sort(() => {
  return 0.5 - Math.random();
});

let cardSelect1 = null;
let cardSelect2 = null;
let solvedNumber = 0;

const gameField = document.getElementById('game-field');
const pointCounter = document.getElementById('points');

function createCard(text) {
  let card = document.createElement('div');
  card.classList.add('card');
  card.innerText = text;
  gameField.appendChild(card);
  card.addEventListener('click', checkCard);
};

function createGameField(cardContent) {
  cardContent.forEach(element => {
    createCard(element);
  });
}

function createButton() {
  const button = document.createElement('button');
  button.innerText = 'RESTART';
  document.querySelector('body').appendChild(button);
  button.addEventListener('click', () => {
    location.reload(); 
  });
}

function disableClickability(card) {
  card.parentElement.classList.add('disabled');
}

function checkCard(event) {
  let card = event.target;
  if(card.classList.contains('revealed')) {
    return;
  }
  card.classList.add('revealed');
  if(cardSelect1 === null) {
    cardSelect1 = card;
  } else {  
    cardSelect2 = card;
    if(cardSelect1.innerText === cardSelect2.innerText) {
      cardSelect1.classList.add('solved');
      cardSelect2.classList.add('solved');
      pointCounter.innerText = parseInt(pointCounter.innerText) + 1;
      solvedNumber += 1;
      disableClickability(cardSelect1);
    } else {
      if(pointCounter.innerText != 0) {
        pointCounter.innerText = parseInt(pointCounter.innerText) - 1;
      }
      disableClickability(cardSelect1);
      setTimeout(function(){
        cardSelect1.classList.remove('revealed');
        cardSelect2.classList.remove('revealed');
      }, 2000);
      
    }
    setTimeout(function(){
      cardSelect1.parentElement.classList.remove('disabled');
      cardSelect1 = null;
      cardSelect2 = null;
    }, 2000)
    
    
  }
  if(solvedNumber === 10) {
    pointCounter.parentElement.classList.add('finished');
    createButton();
  }
}

createGameField(cities);