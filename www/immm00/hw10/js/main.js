/**
 * Memorama, Match Match, Match Up, Memory, Pelmanism, Shinkei-suijaku, Pexeso or simply Pairs
 */

window.onload = () => {

    const toggleMusicButton = document.createElement('button');
    toggleMusicButton.innerText = '🎵';
    let musicOn = false;
    var audio = new Audio('../audio/Majula.mp3');
    toggleMusicButton.addEventListener('click', () => {
        if (musicOn) {
            audio.pause();
            musicOn = false;
        } else {
            audio.play();
            musicOn = true;
        }
    });

    document.querySelector('body').appendChild(toggleMusicButton);
    let areas = ['Undead Asylum', 'Firelink Shrine', 'Undead Burg', 'The Depths', 'Blighttown', 'Demon Ruins', 'Sen\'s Fortress', 'Anor Londo', 'Lost Izalith', 'The Catacombs'];
    areas = areas.flatMap(i => [i, i]);
    console.log(areas);
    areas.sort(() => {
        return 0.5 - Math.random();
    });

    const gameField = document.querySelector('#game-field');
    let points = document.querySelector('#points');

    let cardsLeft = areas.length;

    let selectedCard1 = null;
    let selectedCard2 = null;
    let newMoveAvailable = true;

    let cards = [];
    areas.forEach(city => {
        cards.push(makeCard(city));
    });
    gameField.append(...cards);

    function makeCard(cardText) {
        const card = document.createElement('div');
        card.innerText = cardText;
        card.addEventListener('click', cardSelected);
        card.classList.add('card');
        return card;
    }

    function cardSelected(evt) {
        let card = evt.target;
        if (newMoveAvailable) {
            if (selectedCard1 === null) {
                selectedCard1 = card;
                card.classList.add('revealed');
            } else if (selectedCard2 === null) {
                newMoveAvailable = false;
                selectedCard2 = card;           
                card.classList.add('revealed');

                if (selectedCard1.innerText === selectedCard2.innerText) {
                    points.innerText = parseInt(points.innerText) + 1;
                    cardsLeft -= 2;
                    if (cardsLeft === 0) {
                        gameField.style.opacity = '0';
                    }
                    selectedCard1 = null;
                    selectedCard2 = null;
                    setTimeout(function () {
                        newMoveAvailable = true;
                    }
                        , 2000);
                } else {
                    if (points.innerText > 0) {
                        points.innerText = parseInt(points.innerText) - 1;
                    }

                    setTimeout(function () {
                        selectedCard1.classList.remove('revealed');
                        selectedCard2.classList.remove('revealed');
                        selectedCard1 = null;
                        selectedCard2 = null;
                        newMoveAvailable = true;
                    }
                        , 2000);
                }

            }
        }
    }
}
