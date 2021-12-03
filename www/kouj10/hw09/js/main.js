/**
 * Long live Sparta! Vytvořte funkci, která vyřeší Caesarovu širfu. Funkce dostane 
 * na vstup zašifrovaný text a také hodnotu, která byla použita při šifrování, a pak 
 * vrátí dešifrovaný text. Předpokládejte pouze anglickou abecedu s velkými 
 * písmeny, ostatní znaky ignorujte. Poté v konzoli dešifrujte/dešiftujte následující texty.
 * 
 * usedKey used - encrypted text
 *       19 - MPH MABGZL TKX BGYBGBMX: MAX NGBOXKLX TGW ANFTG LMNIBWBMR; TGW B'F GHM LNKX TUHNM MAX NGBOXKLX. - TEUXKM XBGLMXBG
 *        5 - YMJWJ NX ST QFB JCHJUY YMJ QFB YMFY YMJWJ NX ST QFB. - OTMS FWHMNGFQI BMJJQJW
 *       12 - M YMZ ITA PMDQE FA IMEFQ AZQ TAGD AR FUYQ TME ZAF PUEOAHQDQP FTQ HMXGQ AR XURQ. ― OTMDXQE PMDIUZ
 * 
 * Následně vytvořte uživatelské rozhraní, ve kterém bude možné zadat zmíněné dvě 
 * vstupní hodnoty (zašifrovaný text a použitý klíč) a po kliknutí na tlačítko 
 * "caesarDecipher!" se na určeném místě zobrazí dešifrovaný text. Rozhraní také vhodně
 * nastylujte.
 */
//              0123456789...
const body = document.querySelector('body');

const title = document.createElement('h1');
title.innerText = 'Caesarova šifra';

const container = document.createElement('div');
container.classList.add('container');

const form = document.createElement('form');
form.classList.add('form');

const inputText = document.createElement('textarea');
inputText.setAttribute('autofocus', '');
inputText.classList.add('cipher-input');
inputText.classList.add('input');
inputText.classList.add('form-item');
inputText.placeholder = 'Šifra';

const inputNumber = document.createElement('input');
inputNumber.classList.add('key-input');
inputNumber.classList.add('input');
inputNumber.classList.add('form-item');
inputNumber.placeholder = 'Klíč';

const buttonSubmit = document.createElement('button');
buttonSubmit.classList.add('submit-button');
buttonSubmit.classList.add('form-item');
buttonSubmit.innerText = 'Dešifrovat';

const result = document.createElement('div');
result.classList.add('results');

body.appendChild(container);
container.appendChild(title);   
container.appendChild(form);
container.appendChild(result);
form.appendChild(inputText);
form.appendChild(inputNumber);
form.appendChild(buttonSubmit);

const cipher = inputText.value;
const number = inputNumber.value;

buttonSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    const paragraph = document.createElement('p');
    paragraph.innerText = caesarDecipher(inputText.value, inputNumber.value);
    result.appendChild(paragraph);
});
        

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const caesarDecipher = (cipherText, usedKey) => {
        while (usedKey > alphabet.length) {
            usedKey -= alphabet.length;
        };

    let deciphered = "";

    const countNewIndex = (oldIndex) => {
        return alphabet.indexOf(cipherText.charAt(oldIndex)) - usedKey;
    };

    const countNewIndexFromBack = (oldIndex) => {
        return 26 - (usedKey - alphabet.indexOf(cipherText.charAt(oldIndex)));
    };

    for (let i = 0; i < cipherText.length; i++) {
        let newLetter;
        if (alphabet.indexOf(cipherText.charAt(i)) == -1) {
            newLetter = cipherText.charAt(i);
        } else if (usedKey > alphabet.indexOf(cipherText.charAt(i))) {
            newLetter = alphabet.charAt(countNewIndexFromBack(i));
        } else {
            newLetter = alphabet.charAt(countNewIndex(i));
        };
        deciphered += newLetter;
    };
    return deciphered;
};

// albert einstein
console.log(caesarDecipher("MPH MABGZL TKX BGYBGBMX: MAX NGBOXKLX TGW ANFTG LMNIBWBMR; TGW B'F GHM LNKX TUHNM MAX NGBOXKLX. - TEUXKM XBGLMXBG", 19));

// john archibald wheeler
console.log(caesarDecipher("YMJWJ NX ST QFB JCHJUY YMJ QFB YMFY YMJWJ NX ST QFB. - OTMS FWHMNGFQI BMJJQJW", 5));

// charles darwin
console.log(caesarDecipher("M YMZ ITA PMDQE FA IMEFQ AZQ TAGD AR FUYQ TME ZAF PUEOAHQDQP FTQ HMXGQ AR XURQ. ― OTMDXQE PMDIUZ", 12));