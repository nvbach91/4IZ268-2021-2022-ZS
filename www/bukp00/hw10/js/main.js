let cities = ['Alžír', 'Luanda', 'Porto Novo', 'Gaborone', 'Ouagadougou', 'Bujumbura', 'Kinshasa', 'Džíbútí', 'Káhira', 'Asmara'];

cities = cities.concat(cities);

cities.sort(() => {
  return 0.5 - Math.random();
});

let firstCard = null;
let secondCard = null;
let points = 0;
let tahy = 0;

const cardsRevealed = [];

const gameField = document.querySelector('#game-field');
const pointsField = document.querySelector('#points');

const onClick = (card, name) => {

  if (card.classList.contains("revealed")) {
    return;
  }
  if (card.classList.contains("fliped")) {
    return;
  }
  if (firstCard && secondCard) {
    return;
  }

  card.classList.add("fliped");
  card.innerText = name;
  tahy += 0.5;

  if (firstCard) {
    secondCard = card;

    if (firstCard.innerText === secondCard.innerText) {
      firstCard.classList.add("revealed");
      secondCard.classList.add("revealed");
      points ++;
      cardsRevealed.push(firstCard, secondCard);
      if(cardsRevealed.length === cities.length) {
        alert(`Super, dohrál jsi hru na ${tahy} tahů s ${points} body!`);
      }
    } else {
      if (points !== 0) points--;
      setTimeout(() => {
        firstCard.innerText = "Cheating not allowed!";
        secondCard.innerText = "Cheating not allowed!";
      }, 1000)
    }

    setTimeout(() => {
      firstCard.classList.remove("fliped");
      secondCard.classList.remove("fliped");
      firstCard = null;
      secondCard = null;
    }, 1000)

  } else {
    firstCard = card;
  }

  pointsField.innerText = points;

}

const createCard = (name) => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerText = "Cheating not allowed!";
  card.addEventListener("click", () => onClick(card, name));
  gameField.appendChild(card);
};

cities.forEach((city) => {
  createCard(city);
});
