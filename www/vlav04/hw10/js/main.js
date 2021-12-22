/**
* Memorama, Match Match, Match Up, Memory, Pelmanism, Shinkei-suijaku, Pexeso or simply Pairs
*/


let cities = ['Praha', 'Brno', 'Ostrava', 'Liberec', 'Mlada Boleslav', 'Olomouc', 'Zlin', 'Karlovy Vary', 'Pardubice', 'Trutnov'];

cities = cities.concat(cities);

cities.sort(function () {
	return 0.5 - Math.random();
});

let firstCard = null;
let secondCard = null;
let score = 0;
let endCard = 0;

let gameField = document.querySelector('#game-field');
let pointsContainer = document.querySelector('#points');


const addCard = (cityNames) => {
	let card = document.createElement('div');
	card.classList.add('card');
	card.innerText = cityNames;
	gameField.appendChild(card);
	card.addEventListener('click', () => {

		if (card.classList.contains('fliped')) {
			return;
		}

		if ((firstCard != null) && (secondCard != null)) {
			return;
		};

		if (firstCard === null) {
			card.classList.add('revealed');
			firstCard = card;
			return;
		}

		card.classList.add('revealed');
		secondCard = card;

		if (firstCard.innerText === secondCard.innerText) {
			score++;
			endCard = endCard + 2;

			setTimeout(function () {
				firstCard.classList.add('fliped');
				secondCard.classList.add('fliped');
				firstCard = null;
				secondCard = null;
			}, 1000);

			if (endCard === cities.length) {
				pointsContainer.innerText = score;
				gameField.innerText = 'You finished the game. Score: ' + score;
				return;
			};

		} else {
			setTimeout(function () {
				firstCard.classList.remove('revealed');
				secondCard.classList.remove('revealed');
				firstCard = null;
				secondCard = null;
			}, 500);
		};

		pointsContainer.innerText = score;

	});
};

const creatGameField = (city) => {
	for (let i = 0; i < city.length; i++) {
		addCard(city[i]);
	};
};

const newGame = creatGameField(cities);