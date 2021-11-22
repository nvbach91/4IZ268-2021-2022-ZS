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
    const finalChar = c + '';
    const finalShift = shift > 25 ? shift % 26 : shift;

    let indexInAlphabet = alphabet.indexOf(finalChar);

    let finalIndexInAlphabet = Math.abs((finalShift + indexInAlphabet + 26) % 26);

    if (alphabet.includes(finalChar)) {
        return alphabet.charAt(finalIndexInAlphabet);
    } else {
        return finalChar;
    }
};



const shiftString = (str, shift) => {
    // a helper function to shift one entire string inside the 
    // alphabet based on the shift value and return the result
    let originalString = '' + str;
    let result = '';

    for (let i = 0; i < originalString.length; i++) {
        result = result + shiftChar(str.charAt(i), shift);
    }
    return result;
};


const caesarDecipher = (cipherText, usedKey) => {

    let originalString = '' + cipherText;
    let originalArray = originalString.split(/ +/);
    let resultArray = [];


    for (let i = 0; i < originalArray.length; i++) {
        let originalWord = originalArray[i];
        let resultWorld = shiftString(originalWord, -usedKey);

        resultArray.push(resultWorld);
    }
    return resultArray.join(' ');

};


// albert einstein
console.log(caesarDecipher("MPH MABGZL TKX BGBGBMX: MAX NGBOXKLX TGW ANFTG LMNIBWBMR; TGW B'F GHM LNKX TUHNM MAX NGBOXKLX. - TEUXKM XBGLMXBG", 19));

// john archibald wheeler
console.log(caesarDecipher("YMJWJ NX ST QFB JCHJUY YMJ QFB YMFY YMJWJ NX ST QFB. - OTMS FWHMNGFQI BMJJQJW", 5));

// charles darwin
console.log(caesarDecipher("M YMZ ITA PMDQE FA IMEFQ AZQ TAGD AR FUYQ TME ZAF PUEOAHQDQP FTQ HMXGQ AR XURQ. ― OTMDXQE PMDIUZ", 12));

const button = document.querySelector('#solve-button');
button.addEventListener('click', (event) => {
    event.preventDefault();
    const cipherArea = document.querySelector('#cipher');
    const keyArea = document.querySelector('input[name=key]');
    const resultArea = document.querySelector('#result');
    const decipheredText = caesarDecipher(cipherArea.value, keyArea.value);
    resultArea.value = decipheredText;
})