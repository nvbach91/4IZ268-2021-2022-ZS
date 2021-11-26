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
    let pos = alphabet.indexOf(c) - shift;
    if (pos < 0) {
        pos = pos + alphabet.length
    }
    return alphabet.charAt(pos);
};
const shiftString = (str, shift) => {
    let decodedStr = '';
    for (let i = 0; i < str.length; i++) {
        decodedStr += shiftChar(str.charAt(i), shift);
    }
    return decodedStr;
};
const caesarDecipher = (cipherText, usedKey) => {
    // your implementation goes here

    let resultText = '';
    let charsToDecode = '';

    for (let i = 0; i < cipherText.length; i++) {
        if (alphabet.indexOf(cipherText.charAt(i)) != -1) {
            charsToDecode += cipherText.charAt(i);
        } else {
            resultText += shiftString(charsToDecode, usedKey) + cipherText.charAt(i);
            charsToDecode = '';
        }
    }

    if (charsToDecode.localeCompare('') != 0) {
        resultText += shiftString(charsToDecode, usedKey);
    }

    return resultText;
};


const txtArea = document.getElementById('cipher');
const key = document.getElementById('cipherKey');
const but = document.getElementById('submitCipher');
const result = document.getElementById('result');

but.addEventListener('click', function () {
    const keyVal = parseFloat(key.value);
    if (isNaN(keyVal)) {
        result.innerText = 'Chybí klíč';
    } else {
        const decipheredTxt = caesarDecipher(txtArea.value, keyVal);
        result.innerText = decipheredTxt;
    }

});


// albert einstein
console.log(caesarDecipher("MPH MABGZL TKX BGYBGBMX: MAX NGBOXKLX TGW ANFTG LMNIBWBMR; TGW B'F GHM LNKX TUHNM MAX NGBOXKLX. - TEUXKM XBGLMXBG", 19));

// john archibald wheeler
console.log(caesarDecipher("YMJWJ NX ST QFB JCHJUY YMJ QFB YMFY YMJWJ NX ST QFB. - OTMS FWHMNGFQI BMJJQJW", 5));

// charles darwin
console.log(caesarDecipher("M YMZ ITA PMDQE FA IMEFQ AZQ TAGD AR FUYQ TME ZAF PUEOAHQDQP FTQ HMXGQ AR XURQ. ― OTMDXQE PMDIUZ", 12));