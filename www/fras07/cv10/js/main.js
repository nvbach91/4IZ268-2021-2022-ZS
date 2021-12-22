const pointElm = document.querySelector('#points');
const gamePlanElem = document.querySelector('#game-field');

let cities = ['Profesor', 'Moscow', 'Oslo', 'Rio', 'Tokyo', 'Nairobi', 'Berlin', 'Helsinki', 'Lisabon', 'Denver'];
cities = cities.concat(cities);
cities.sort(() => { return 0.5 - Math.random(); });

let firstCard = null;
let secondCard = null;
let points = 0;

const onClickCard = (event) =>  {
    if(event.target.dataset.reveale === 'true') return;

    if(!firstCard) {
        firstCard = event.target.closest('.card');
        firstCard.classList.add('revealed');
        firstCard.dataset.revealed = true;

    } else if(!secondCard) {
        secondCard = event.target.closest('.card');
        secondCard.classList.add('revealed');
        secondCard.dataset.revealed = true;

        if(firstCard.querySelector('.card-text').textContent === secondCard.querySelector('.card-text').textContent) {
            points = 1 + points;
            pointElm.textContent = points;
            firstCard = null;
            secondCard = null;

        };
        setTimeout(() => {
            firstCard?.classList.remove('revealed');
            firstCard = null;
            secondCard?.classList.remove('revealed');
            secondCard = null;

        }, 2000);
    } 

    if (points === 10) {
        alert('Congratulation!')
    }
   

}


const cartsElm = []
for(const city of cities) {
    const cartElm = document.createElement('div');
    const textElm = document.createElement('span');

    cartElm.className = 'card';
    textElm.innerText = city;
    textElm.className = 'card-text';
    cartElm.dataset.revealed = false;
    cartElm.append(textElm);
    cartElm.addEventListener('click', onClickCard);
    cartsElm.push(cartElm);
}




gamePlanElem.append(...cartsElm);


