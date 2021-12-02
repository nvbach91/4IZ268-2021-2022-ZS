/**
 * Memorama, Match Match, Match Up, Memory, Pelmanism, Shinkei-suijaku, Pexeso or simply Pairs
 *
 * Vytvořte zjednodušenou hru Pexeso pro jednoho hráče čistě pomocí JavaScriptu a CSS pro stylování
 * (tj. nebudete šahat do výchozího HTML souboru).
 * Hra bude spočívat v postupném otáčení karet. V každém tahu hráč otočí postpně dvě karty a
 * pokud se shodují, přičte si jeden bod a karty zůstanou odhalené. Pokud se neshodují, tak
 * se karty vrátí do původního neodhaleného stavu a hráči se odečte jeden bod. Počet bodů nesmí být
 * záporný.
 *
 * Obsahem karet budou anglické názvy měst po celém světě: třeba Prague, London, Paris, Moscow,
 * California, Vancouver, Sydney... a podle nich také budete porovnávat shody. Na herní plochu
 * umístěte alespoň 20 karet (tj. do 5 sloupců a 4 řádky, vždy sudý počet). Po kliknutí se karta
 * otočí (tj. stačí aby  byl vidět obsah karty, tj, název města, nemusíte dělat animace).
 *
 * Hra skončí ve chvíli, kdy jsou všechny karty odhaleny a v tu chvíli se uživateli zobrazí celkový
 * počet bodů.
 *
 * Používejte vanila JavaScript - to jsme brali na cvičení. Nepoužívejte žádnou knihovnu.
 * */

//Vyberte DOM element pro hrací plochu a element pro výpis počtu bodů.
const gameField = document.querySelector('#game-field');
const pointsField = document.querySelector('#points');

/**
 * Nadefinujte seznam měst do pole.
 * Naduplikujte tento seznam, aby každé město tam bylo dvakrát, pomocí metody array.concat(array).
 * Aby hra byla zajímavější, zamíchejte pořadí měst pomocí array metody array.sort(), a to následovně:
**/
let cities = ['Prague', 'Chicago', 'Athens', 'Hanoi', 'Vienna', 'Paris', 'Lisbon', 'Rome', 'London', 'Tokyo', 'Berlin', 'Delhi', 'Madrid', 'Shanghai', 'Warsaw'];
cities = cities.concat(cities);
cities.sort(() => { return 0.5 - Math.random(); });

/**
 * Vytvořte pomocné proměnné, abyste mohli sledovat stav hry, 
 * tj. počet bodů, první otočená karta, druhá otočená karta, počet správně otočených karet...
 */
let pointsCount = 0;
let firstCard = null;
let secondCard = null;
let matchedCardsCount = 0;

//Vytvořte funkci, která bude mít na starost vytvořit jednu kartu pomocí DOM metod.
const createCard = (cityNames) => {
    let card = document.createElement('div');
    card.classList.add('card');
    card.innerText = cityNames;
    card.addEventListener('click', () => {
        // if this card is already revealed or matched, do nothing
        if (card.classList.contains('revealed') || card.classList.contains('matched')) {
            return false;
        }
        // if we already have two revealed cards, do nothing
        if ((firstCard != null) && (secondCard != null)) {
            return false;
        };
        //if const firstCard is null, then assign the chosen card to the const firstCard and do nothing
        if (firstCard === null) {
            firstCard = card;
            //also reveal the card
            card.classList.add('revealed');
            return false;
        }
        //lets assign and reveal the second chosen card
        card.classList.add('revealed');
        secondCard = card;

        // now we have both cards opened, it is time to check their names
        // if they match, add a point and keep track of the current number of matched cards
        if (firstCard.innerText === secondCard.innerText) {
            pointsCount++;
            matchedCardsCount = matchedCardsCount + 2;
            //wait 1 second until next move and "remove" the 2 matching cards
            setTimeout(function () {
                firstCard.classList.add('matched');
                secondCard.classList.add('matched');
                firstCard = null;
                secondCard = null;
            }, 1000);
            //there is not any card left, end the game
            if (matchedCardsCount === cities.length) {
                pointsField.innerText = pointsCount;
                gameField.innerText = 'Congratulations! You finished the game with ' + pointCount + ' points.';
                return;
            };
        } else { //else if card do not match and player has non-zero points, then subtract a point 
            if (pointsCount != 0) {
                pointsCount--;
            };
            // wait 1 second til the next move and card become unrevealed
            setTimeout(function () {
                firstCard.classList.remove('revealed');
                secondCard.classList.remove('revealed');
                firstCard = null;
                secondCard = null;
            }, 1000);
        };
        //show points count on points field
        pointsField.innerText = pointsCount;

    });
    gameField.appendChild(card);
};


// append all cards of the array cities
cities.forEach(function (city) {
    createCard(city);
});
