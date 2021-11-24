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

const shiftChar = (char, shift) => {
    // a helper function to shift one character inside the
    // alphabet based on the shift value and return the result

    const charIndex = alphabet.indexOf(char.toUpperCase());

    if (charIndex === -1) {
        return char;
    }

    return alphabet[(charIndex + shift) % alphabet.length];
};

const shiftString = (string, shift) => {
    // a helper function to shift one entire string inside the
    // alphabet based on the shift value and return the result
    let shiftedString = '';

    for (let i = 0; i < string.length; i++) {
        shiftedString += shiftChar(string[i], shift);
    }

    return shiftedString;
};

const caesarDecipher = (cipherText, usedKey) => {
    // your implementation goes here
    // good to know:
    //    str.indexOf(c) - returns the index of the specified character in the string
    //    str.charAt(i) - returns the character at the specified index in the string
    //    when the shifted character is out of bound, it goes back to the beginning and count on from there

    if (usedKey === 0) {
        return cipherText;
    }

    const cipherTextArray = cipherText.split(" ");
    let decipheredText = '';

    for (let i = 0; i < cipherTextArray.length; i++) {
        decipheredText += shiftString(cipherTextArray[i], alphabet.length - usedKey);
        decipheredText += " ";
    }

    return decipheredText;
};

// albert einstein
console.log(caesarDecipher("MPH MABGZL TKX BGYBGBMX: MAX NGBOXKLX TGW ANFTG LMNIBWBMR; TGW B'F GHM LNKX TUHNM MAX NGBOXKLX. - TEUXKM XBGLMXBG", 19));

// john archibald wheeler
console.log(caesarDecipher("YMJWJ NX ST QFB JCHJUY YMJ QFB YMFY YMJWJ NX ST QFB. - OTMS FWHMNGFQI BMJJQJW", 5));

// charles darwin
console.log(caesarDecipher("M YMZ ITA PMDQE FA IMEFQ AZQ TAGD AR FUYQ TME ZAF PUEOAHQDQP FTQ HMXGQ AR XURQ. ― OTMDXQE PMDIUZ", 12));

const caesarsForm = document.querySelector('#caesars-form');
const cypheredTextInput = document.querySelector('input[name="cyphered-text"]');
const usedKeyInput = document.querySelector('input[name="used-key"]');

caesarsForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const cypheredText = cypheredTextInput.value.trim();
    const usedKey = usedKeyInput.value.trim();

    const decypheredText = caesarDecipher(cypheredText, usedKey);

    const resultHeader = document.createElement('h2');
    resultHeader.innerText = 'Decyphered text:';

    const resultParagraph = document.createElement('p');
    resultParagraph.innerText = decypheredText;

    const resultDiv = document.getElementById('caesars-result-div');
    while (resultDiv.firstChild) {
        resultDiv.removeChild(resultDiv.firstChild);
    }
    resultDiv.appendChild(resultHeader);
    resultDiv.appendChild(resultParagraph);
});