/**
 * Memorama, Match Match, Match Up, Memory, Pelmanism, Shinkei-suijaku, Pexeso or simply Pairs
 */

let cities = [
    'Prague',
    'Bratislava',
    'Athenes',
    'Dortmund',
    'Stuttgart',
    'Brno',
    'Vienna',
    'Paris',
    'London',
    'Oslo'
]

cities = cities.concat(cities)

cities.sort(() => {
    return 0.5 - Math.random()
})

let numberOfPoints = 0
let firstOpenedCard = null
let secondOpenedCard = null
let numberOfMatchedCards = 0

const pairs = document.getElementById('game-field')
const pointsCounter = document.getElementById('points')

//pracuj s vybranou kartou
const handleCardClicked = (card) => {
    //pokud zvolis revealnutou kartu, nic nedelej
    if (card.classList.contains['revealed']) {
        return
    }

    //pokud mam zvolene obe karty, nic nedelej
    if (!!firstOpenedCard && !!secondOpenedCard) {
        return
    }

    //pokud neplati predchozi podminky, pridej ji revealed
    card.classList.add('revealed')

    //urceni 1. a 2. karty
    if (!firstOpenedCard) {
        firstOpenedCard = card
    } else {
        secondOpenedCard = card

        //pokud se karty matchnou, pridej 2 body (odstranuji dvojice) a pricti body
        if (firstOpenedCard.innerHTML === secondOpenedCard.innerHTML) {
            numberOfMatchedCards += 2
            numberOfPoints++

            //pokud jsem uhadl pocet karet na poli, vypis cg a "ukonci" hru
            setTimeout(() => {
                if (numberOfMatchedCards === cities.length) {
                    alert("CG you've won with " + numberOfPoints + ' points!')
                } else {
                    //pokud ne , vyresetuj karty
                    firstOpenedCard = null
                    secondOpenedCard = null
                }
            }, 1000)
        } else {
            //Pokud neuhadl kartu a nema 0 bodu, odstran body a zresetuj karty
            numberOfPoints > 0 ? numberOfPoints-- : null
            setTimeout(() => {
                firstOpenedCard.classList.remove('revealed')
                secondOpenedCard.classList.remove('revealed')
                firstOpenedCard = null
                secondOpenedCard = null
            }, 1000)
        }
    }
    //update bodu
    pointsCounter.innerHTML = numberOfPoints
}

//vytvareni karet na poli a prirazovani nazvu
const createCard = (title) => {
    var newCard = document.createElement('div')

    newCard.innerHTML = title
    newCard.classList.add('card')

    newCard.onclick = () => handleCardClicked(newCard)
    pairs.appendChild(newCard)
}

cities.forEach((cityName) => {
    createCard(cityName)
})