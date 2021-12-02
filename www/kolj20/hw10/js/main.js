var fruits = ['Ananas', 'Bananas', 'Apples', 'Oranges', 'Grapes', 'Kiwis', 'Lemons', 'Kakis', 'Passion fruits', 'Berries'];
fruits = fruits.concat(fruits);
fruits.sort(function() {
  return 0.5 - Math.random();
});

var firstCard = null;
var secondCard = null;
var points = 0;
var CardsRevealed = 0;
var gameField = document.querySelector('#game-field');
var pointsContainer = document.querySelector('#points');

var bindCard = function(card) {
  card.addEventListener('click', function() {
    if (card.classList.contains('revealed')) {
      return false;
    }
    if (firstCard && secondCard) {
      return false;
    }
    card.classList.add('revealed');

    if (!firstCard) {
      firstCard = card;
      return false;
    }
    secondCard = card;
    if (firstCard.innerText === secondCard.innerText) {
      points++;
      CardsRevealed += 2;
      firstCard = null;
      secondCard = null;
      if (CardsRevealed === fruits.length) {
        setTimeout(function() {
          alert('Výborne, vyhral si s ' + points + ' bodmi!');
        }, 300);
      }
    } else {
      points--;
      if (points < 0) {
        points = 0;
      }
      setTimeout(function() {
        firstCard.classList.remove('revealed');
        secondCard.classList.remove('revealed');
        firstCard = null;
        secondCard = null;
      }, 300);
    }
    pointsContainer.innerText = points;
  });
};

var addCard = function(name) {
  var card = document.createElement('div');
  card.classList.add('card');
  card.innerText = name;
  bindCard(card);
  gameField.appendChild(card);
};

fruits.forEach(function(fruit) {
  addCard(fruit);
});