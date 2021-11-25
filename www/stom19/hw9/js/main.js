

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
    if (alphabet.indexOf(c) >= 0 && alphabet.indexOf(c) <= 26) {
        let position = alphabet.indexOf(c) - shift;
        if (position < 0) {
            position = position + alphabet.length;
        }
        return alphabet.charAt(position);
    }
    return c;

    // a helper function to shift one character inside the 
    // alphabet based on the shift value and return the result
}



const shiftString = (str, shift) => {
    let stringDecod = ' ';
    for (i = 0; i < str.length; i++) {
        stringDecod += shiftChar(str.charAt(i), shift);
    }
    return stringDecod;
    // a helper function to shift one entire string inside the 
    // alphabet based on the shift value and return the result
};

const caesarDecipher = (cipherText, usedKey) => {


    if (usedKey < 0) {
        return "Please enter positive number"
    } else if (usedKey === 0) {
        return cipherText
    }
    else if (usedKey > 26) {
        return usedKey = usedKey % 26;
    }
    cipherText = cipherText.toUpperCase();
    const splitCipherText = cipherText.split(' ');
    let decodedText = [];
    for (let i = 0; i < splitCipherText.length; i++) {
        decodedText[i] = shiftString(splitCipherText[i], usedKey);
    }
    return decodedText.join(' ');

    // your implementation goes here
    // good to know: 
    //    str.indexOf(c) - returns the index of the specified character in the string
    //    str.charAt(i) - returns the character at the specified index in the string
    //    when the shifted character is out of bound, it goes back to the beginning and count on from there
};

console.log("MPH MABGZL TKX BGYBGBMX: MAX NGBOXKLX TGW ANFTG LMNIBWBMR; TGW B'F GHM LNKX TUHNM MAX NGBOXKLX. - TEUXKM XBGLMXBG", 19);

console.log("YMJWJ NX ST QFB JCHJUY YMJ QFB YMFY YMJWJ NX ST QFB. - OTMS FWHMNGFQI BMJJQJW", 5);

console.log("M YMZ ITA PMDQE FA IMEFQ AZQ TAGD AR FUYQ TME ZAF PUEOAHQDQP FTQ HMXGQ AR XURQ. ― OTMDXQE PMDIUZ", 12);

// albert einstein
console.log(caesarDecipher("MPH MABGZL TKX BGYBGBMX: MAX NGBOXKLX TGW ANFTG LMNIBWBMR; TGW B'F GHM LNKX TUHNM MAX NGBOXKLX. - TEUXKM XBGLMXBG", 19));

// john archibald wheeler
console.log(caesarDecipher("YMJWJ NX ST QFB JCHJUY YMJ QFB YMFY YMJWJ NX ST QFB. - OTMS FWHMNGFQI BMJJQJW", 5));

// charles darwin
console.log(caesarDecipher("M YMZ ITA PMDQE FA IMEFQ AZQ TAGD AR FUYQ TME ZAF PUEOAHQDQP FTQ HMXGQ AR XURQ. ― OTMDXQE PMDIUZ", 12));


window.onload = () => {
    const dataText = document.querySelector('#dataText');
    const code = document.querySelector('#code');
    const key = document.querySelector('#key');
    const textAnswer = document.querySelector('#textAnswer');


    dataText.addEventListener('submit', (e) => {
        e.preventDefault();
        const decodText = code.value;
        const decodKey = key.value;
        textAnswer.innerText = caesarDecipher(decodText, decodKey);
    });

}


