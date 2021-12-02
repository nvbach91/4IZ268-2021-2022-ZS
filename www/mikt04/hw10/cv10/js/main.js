/**
 * Memorama, Match Match, Match Up, Memory, Pelmanism, Shinkei-suijaku, Pexeso or simply Pairs
 */

 let cities = ['Praha', 'Brno', 'Ostrava', 'Plzeň', 'Liberec', 'Olomouc', 'České Budějovice', 'Hradec Králové', 'Ústí nad Labem', 'Pardubice'];
 cities = cities.concat(cities);
 cities.sort(() => {
   return 0.5 - Math.random();
 });

const field = document.querySelector('#game-field');
let pointsBox = document.getElementById('points');
let revealedFirst = false;
let revealedSecond = false;
let firstCity = null;
let secondCity = null;
let points = 0;

let createCity = (city) => {
  let cityOf = '';
  cityOf = document.createElement('card');
  cityOf.classList.add('card');
  cityOf.addEventListener('click', () => {
    if (revealedFirst == false && secondCity == null) {
      cityOf.classList.add('revealed');
      cityOf.innerText = city.toString();
        if (firstCity == null) {
            firstCity = cityOf;
        } else {
            secondCity = cityOf;
            if (firstCity.innerText.toString() == secondCity.innerText.toString()) {
                points++;
                secondCity = cityOf;
            } else {
                if (points > 0) {
                    points--;
                }
                setTimeout(() => {
                    firstCity.classList.remove('revealed');
                    secondCity.classList.remove('revealed');
                    firstCity.innerText.remove(city.toString());
                    secondCity.innerText.remove(city.toString());
                    revealedFirst = false;
                    revealedSecond = false;
                }, 2000);
            }
        }
        pointBox.innerText = points;
      }
  });
  return cityOf;
};

// Funkce foreach vytvori prvek pro kazdou karticku
cities.forEach((cityOf) => { 
  //element.addEventListener(...);
  field.appendChild(createCity(cityOf));
  console.log(cityOf);
});





