const body = document.querySelector('body');

const header = document.createElement('h1');
header.innerHTML = "Pexeso";

let score = 0;

let cities = ['Barcelona', 'Dortmund', 'Madrid', 'Turin', 'Prague', 'Berlin', 'Moscow', 'Rome', 'London', 'Dublin'];
cities = cities.concat(cities);
cities.sort(() => { return 0.5 - Math.random(); });

const scoreText = document.createElement('h2');
scoreText.innerHTML = "Score: "; 


const wrapper = document.createElement('div');
wrapper.setAttribute('class', 'wrapper');

body.append(header, scoreText, wrapper);

let firstCard = null;
let secondCard = null;
let revealedCards = 0;

let flipCard = function (card) {
    card.addEventListener('click', function() {

        if (firstCard == null) {
            card.classList.add('show');
            firstCard = card;            
            console.log(firstCard.innerHTML);
        } else if (secondCard == null) {
            card.classList.add('show');
            secondCard = card;
            console.log(secondCard.innerHTML);

            if (firstCard.innerHTML === secondCard.innerHTML) {
                console.log("correct")
                score++;
                revealedCards = revealedCards + 2;
                if (revealedCards == 20) {
                    console.log("winner");
                }
                firstCard = null;
                secondCard = null;
            } else {
                setTimeout(function(){
                    score--;
                    firstCard.classList.remove('show');
                    secondCard.classList.remove('show');
                    firstCard = null;
                    secondCard = null;
                }, 1000)              
            }
        }

        scoreText.innerHTML = "Score: " + score; 
        
    });
};

let createCard = function(name) {
    const card = document.createElement('div');
    card.setAttribute('class', 'pexeso-card');
    card.innerText = name;
    flipCard(card);
    wrapper.appendChild(card);
}

cities.forEach(function(city) {
    createCard(city);
  });