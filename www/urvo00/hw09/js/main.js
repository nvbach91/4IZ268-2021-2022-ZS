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
    const alphabetIndex = alphabet.indexOf(c);
    if (alphabetIndex !== -1) {
        if (alphabetIndex - shift >= 0) {
            return alphabet.charAt(alphabetIndex - shift);
        } else {
            return alphabet.charAt((alphabetIndex - shift) + alphabet.length);
        }
    } else {
        return c;
    }
};
const shiftString = (str, shift) => {
    // a helper function to shift one entire string inside the 
    // alphabet based on the shift value and return the result
    let encodedStr = '';
    for (let i = 0; i < str.length; i++) {
        encodedStr += shiftChar(str.charAt(i), shift);
    }
    return encodedStr;
};
const caesarDecipher = (cipherText, usedKey) => {
    // your implementation goes here
    // good to know: 
    //    str.indexOf(c) - returns the index of the specified character in the string
    //    str.charAt(i) - returns the character at the specified index in the string
    //    when the shifted character is out of bound, it goes back to the beginning and count on from there
    if(usedKey < 0){
        usedKey = usedKey*-1;
    }
    if (usedKey > 26) {
        usedKey = usedKey % 26;
    }
    cipherText = cipherText.toUpperCase();
    const cipherTextSplit = cipherText.split(' ');
    let decipheredText = [];
    for (let i = 0; i < cipherTextSplit.length; i++) {
        decipheredText[i] = shiftString(cipherTextSplit[i], usedKey);
    }
    return decipheredText.join(' ');

};

// albert einstein
console.log(caesarDecipher("MPH MABGZL TKX BGYBGBMX: MAX NGBOXKLX TGW ANFTG LMNIBWBMR; TGW B'F GHM LNKX TUHNM MAX NGBOXKLX. - TEUXKM XBGLMXBG", 19));

// john archibald wheeler
console.log(caesarDecipher("YMJWJ NX ST QFB JCHJUY YMJ QFB YMFY YMJWJ NX ST QFB. - OTMS FWHMNGFQI BMJJQJW", 5));

// charles darwin
console.log(caesarDecipher("M YMZ ITA PMDQE FA IMEFQ AZQ TAGD AR FUYQ TME ZAF PUEOAHQDQP FTQ HMXGQ AR XURQ. ― OTMDXQE PMDIUZ", 12));

window.onload = () => {
    const cipherForm = document.querySelector('#cipher-form');
    const cipherTextInput = document.querySelector('textarea[name="cipher-text"]');
    const cipherKeyInput = document.querySelector('input[name="cipher-key"]');
    const textField = document.querySelector('#text');
    console.log(textField);
    cipherForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const cipherText = cipherTextInput.value;
        const cipherKey = cipherKeyInput.value;
        textField.innerText = caesarDecipher(cipherText, cipherKey);
    });
}