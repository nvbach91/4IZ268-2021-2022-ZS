/**
 * Memorama, Match Match, Match Up, Memory, Pelmanism, Shinkei-suijaku, Pexeso or simply Pairs
 */

(() => {

  let cities = ['Praha', 'Brno', 'Ostrava', 'Plzeň', 'České Budějovice', 'Pardubice', 'Poděbrady', 'Liberec', 'Kladno', 'Teplice'];
  cities = cities.concat(cities);
  cities.sort(() => {
    return 0.5 - Math.random();
  });

  let firstCard = null;
  let secondCard = null;
  let points = 0;
  let remainingCards = 20;

  const pointsField = document.getElementById('points');
  const field = document.getElementById('game-field');

  cities.forEach((city, index) => {
    const card = createCard('card-' + index);
    card.addEventListener('click', function () {
      if (secondCard !== null) {
        return;
      } else {
        if (firstCard === null) {
          firstCard = this.id;
          this.innerText = getCardValById(firstCard);
          this.classList.add('revealed');
          return;
        } else {
          secondCard = this.id;
        }
      }
      const firstCardInst = document.getElementById(firstCard);
      this.innerText = getCardValById(secondCard);
      this.classList.add('revealed');

      if (firstCardInst.innerText.localeCompare(this.innerText) !== 0) {
        const _this = this;
        setTimeout(function () {
          firstCardInst.innerText = '';
          _this.innerText = '';
          _this.classList.remove('revealed');
          firstCardInst.classList.remove('revealed');
          firstCard = null;
          secondCard = null;
          updatePoints(-1);
        }, 2000);
      } else {
        firstCard = null;
        secondCard = null;
        updatePoints(1);
        remainingCards = remainingCards - 2;
      }
      if (remainingCards === 0) {
        alert('Vaše konečné skóre je ' + points + ' bodů!');
      }
    });
    field.appendChild(card);
  });

  function getCardValById(id) {
    const index = parseInt(id.substr(5));
    return cities[index];
  }

  function updatePoints(pointsUpdate) {
    points = points + pointsUpdate;
    if (points < 0) {
      points = 0;
    }
    pointsField.innerText = points;
  }

  function createCard(id) {
    const card = document.createElement('div');
    card.id = id;
    card.classList.add('card');
    return card;
  }

})();
