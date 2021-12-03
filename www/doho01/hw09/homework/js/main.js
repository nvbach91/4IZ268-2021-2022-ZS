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
const alphabetSize = alphabet.length; 

const shiftChar = (char, shift) => {
    // a helper function to shift one character inside the 
    // alphabet based on the shift value and return the result
    let result;

    if (alphabet.indexOf(char) >= 0) {
        let alphabetIndex = alphabet.indexOf(char);
        if (alphabet[alphabetIndex - shift]) {
            result = alphabet.charAt(alphabetIndex - shift);
        }
        else {
            result = alphabet.charAt(alphabetIndex - shift + alphabetSize);
        }
    }
    else {
        result = char;
    }
    return result;
};


const shiftString = (string, shift) => {
    // a helper function to shift one entire string inside the 
    // alphabet based on the shift value and return the result
    let result = '';
    for (let i = 0; i < string.length; i++) {
        result += shiftChar(string[i].toUpperCase(), shift)
    }
    return result;
};

const caesarDecipher = (cipherText, key) => {
    // your implementation goes here
    // good to know: 
    //    str.indexOf(c) - returns the index of the specified character in the string
    //    str.charAt(i) - returns the character at the specified index in the string
    //    when the shifted character is out of bound, it goes back to the beginning and count on from there
    if (key > alphabetSize) {
       key = key % alphabetSize;
    }

    return shiftString(cipherText, key);
};

// albert einstein
console.log(caesarDecipher("MPH MABGZL TKX BGYBGBMX: MAX NGBOXKLX TGW ANFTG LMNIBWBMR; TGW B'F GHM LNKX TUHNM MAX NGBOXKLX. - TEUXKM XBGLMXBG", 19));

// john archibald wheeler
console.log(caesarDecipher("YMJWJ NX ST QFB JCHJUY YMJ QFB YMFY YMJWJ NX ST QFB. - OTMS FWHMNGFQI BMJJQJW", 5));

// charles darwin
console.log(caesarDecipher("M YMZ ITA PMDQE FA IMEFQ AZQ TAGD AR FUYQ TME ZAF PUEOAHQDQP FTQ HMXGQ AR XURQ. ― OTMDXQE PMDIUZ", 12));


const submit = document.querySelector('#submit');
submit.addEventListener( 'click', (event)=> {
    event.preventDefault();

    const encrypted = document.querySelector('#encrypted');
    const key = document.querySelector('#key');

    const decrypted = caesarDecipher(encrypted.value, key.value);
    const result= document.querySelector('#result');
    result.innerText = decrypted;
});