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

    if (alphabet.includes(c)) {
        const oldValue = alphabet.indexOf(c);
        const newValue = mod((oldValue - shift), 26);
        return alphabet.charAt(newValue);
    } else {
        return c;
    }
};

function mod(n, m) {
    return ((n % m) + m) % m;
}


const shiftString = (str, shift) => {
    // a helper function to shift one entire string inside the 
    // alphabet based on the shift value and return the result
    let newString = '';
    for (let i = 0; i < str.length; i += 1) {
        newString += shiftChar(str.charAt(i), shift);
    }
    return newString;
};

const caesarDecipher = (cipherText, usedKey) => {
    // your implementation goes here
    // good to know: 
    //    str.indexOf(c) - returns the index of the specified character in the string
    //    str.charAt(i) - returns the character at the specified index in the string
    //    when the shifted character is out of bound, it goes back to the beginning and count on from there
    console.log(shiftString(cipherText, usedKey));
    return shiftString(cipherText, usedKey);
};


// albert einstein
caesarDecipher("MPH MABGZL TKX BGYBGBMX: MAX NGBOXKLX TGW ANFTG LMNIBWBMR; TGW B'F GHM LNKX TUHNM MAX NGBOXKLX. - TEUXKM XBGLMXBG", 19);

// john archibald wheeler
caesarDecipher("YMJWJ NX ST QFB JCHJUY YMJ QFB YMFY YMJWJ NX ST QFB. - OTMS FWHMNGFQI BMJJQJW", 5);

// charles darwin
caesarDecipher("M YMZ ITA PMDQE FA IMEFQ AZQ TAGD AR FUYQ TME ZAF PUEOAHQDQP FTQ HMXGQ AR XURQ. ― OTMDXQE PMDIUZ", 12);


const cipherForm = document.getElementById('cipher-form');
const cipherTextInput = document.getElementById('cipher-text');
const cipherKeyInput = document.getElementById('cipher-key');
const decipheredTextDiv = document.getElementById('deciphered-text');

cipherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const cipherText = cipherTextInput.value;
    const cipherKey = cipherKeyInput.value;

    if(isNaN(cipherKey)){
        alert('Key must be a number');
    } else{
        decipheredTextDiv.innerText = caesarDecipher(cipherText, cipherKey);
    }
});
