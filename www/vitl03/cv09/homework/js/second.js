/**
 * Long live Sparta! Vytvořte funkci, která vyřeší Caesarovu širfu. Funkce dostane 
 * na vstup zašifrovaný text a také hodnotu, která byla použita při šifrování, a pak 
 * vrátí dešifrovaný text. Předpokládejte pouze anglickou abecedu s velkými 
 * písmeny, ostatní znaky ignorujte. Poté v konzoli dešifrujte/dešiftujte následující texty.
 * 
 * key used - encrypted text
 *       19 - MPH MABGZL TKX BGYBGBMX: MAX NGBOXKLX TGW ANFTG LMNIBWBMR; TGW B'F GHM LNKX TUHNM MAX NGBOXKLX. - TEUXKM XBGLMXBG
 *        5 - YMJWJ NX ST QFB JCHJUY YMJ QFB YMFY YMJWJ NX ST QFB. - OTMS FWHMNGFQI BMJJQJW
 *       12 - M YMZ ITA PMDQE FA IMEFQ AZQ TAGD AR FUYQ TME ZAF PUEOAHQDQP FTQ HMXGQ AR XURQ. ― OTMDXQE PMDIUZ
 * 
 * Následně vytvořte uživatelské rozhraní, ve kterém bude možné zadat zmíněné dvě 
 * vstupní hodnoty (zašifrovaný text a použitý klíč) a po kliknutí na tlačítko 
 * "Decipher!" se na určeném místě zobrazí dešifrovaný text. Rozhraní také vhodně
 * nastylujte.
 */
//              0123456789...
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const shiftChar = (c, shift) => {
    // a helper function to shift one character inside the 
    // alphabet based on the shift value and return the result
    const positionOfLetter = alphabet.indexOf(c) + shift;
  //  console.log(alphabet.indexOf(c));
   // console.log(positionOfLetter);
    let newPosition = 0;
    let newLetter = '';

    if (alphabet.includes(c)) {
        if (positionOfLetter > alphabet.length) {
            newPosition = mod(positionOfLetter, alphabet.length);
            newLetter = alphabet.charAt(newPosition);
        } else {
            newLetter = alphabet.charAt(positionOfLetter);
        } 
    } else {
        return c;
    }

    return newLetter;
};

function mod(n, m) {
    return ((n % m) + m) % m;
}

const shiftString = (str, shift) => {
    // a helper function to shift one entire string inside the 
    // alphabet based on the shift value and return the result
    let newSentence = '';
    for (let i = 0; i < str.length; i += 1) {
        newSentence += shiftChar(str.charAt(i), shift);
    }
    return newSentence;
};

const caesarDecipher = (cipherText, usedKey) => {
    // your implementation goes here
    // good to know: 
    const decipherString = shiftString(cipherText, usedKey);
    return decipherString;
};


console.log(caesarDecipher("TWO THINGS ARE INFINITE: THE UNIVERSE AND HUMAN STUPIDITY; AND I'M NOT SURE ABOUT THE UNIVERSE. - ALBERT EINSTEIN", 19));
console.log(caesarDecipher("THERE IS NO LAW EXCEPT THE LAW THAT THERE IS NO LAW. - JOHN ARCHIBALD WHEELER", 5));
console.log(caesarDecipher("A MAN WHO DARES TO WASTE ONE HOUR OF TIME HAS NOT DISCOVERED THE VALUE OF LIFE. ― CHARLES DARWIN", 12));

//zašifrování
const text = document.getElementById('text');
const key = document.getElementById('key');
const submit = document.getElementById('submit');
const result = document.getElementById('result');

submit.addEventListener('click', function (e) {
    e.preventDefault();
    
    const textValue = text.value;
    const keyValue = parseInt(key.value);

    if(isNaN(keyValue)){
        alert('Key is missing');
    } else{
        result.innerText = caesarDecipher(textValue, keyValue);
    }
});