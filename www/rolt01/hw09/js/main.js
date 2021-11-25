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
    for (let i = 0; i < alphabet.length; i++) {
        if (alphabet.charAt(i) === c) {
            let position = i - shift;
            if (position < 0) {
                position = position + alphabet.length;
                return alphabet[position];
            } else {
                return alphabet[position];
            };
        };
    };
};


const shiftString = (str, shift) => {
    // a helper function to shift one entire string inside the 
    // alphabet based on the shift value and return the result
    let decripeString = '';
    for (let i = 0; i < str.length; i++) {
        let char = shiftChar(str.charAt(i), shift);
        decripeString = decripeString + char;

    };
    return decripeString;
};


const caesarDecipher = (cipherText, usedKey) => {
    // your implementation goes here
    // good to know: 
    //    str.indexOf(c) - returns the index of the specified character in the string
    //    str.charAt(i) - returns the character at the specified index in the string
    //    when the shifted character is out of bound, it goes back to the beginning and count on from there
    let returnText = "";
    for (let i = 0; i < cipherText.length; i++) {
        if (cipherText.charAt(i).match(/[A-Z]/i)) {
            returnText += shiftChar(cipherText.charAt(i), usedKey);
        } else {
            returnText += cipherText.charAt(i);

        }
    };
    return returnText;
};



// albert einstein
caesarDecipher("MPH MABGZL TKX BGYBGBMX: MAX NGBOXKLX TGW ANFTG LMNIBWBMR; TGW B'F GHM LNKX TUHNM MAX NGBOXKLX. - TEUXKM XBGLMXBG", 19);

// john archibald wheeler
caesarDecipher("YMJWJ NX ST QFB JCHJUY YMJ QFB YMFY YMJWJ NX ST QFB. - OTMS FWHMNGFQI BMJJQJW", 5);

// charles darwin
caesarDecipher("M YMZ ITA PMDQE FA IMEFQ AZQ TAGD AR FUYQ TME ZAF PUEOAHQDQP FTQ HMXGQ AR XURQ. ― OTMDXQE PMDIUZ", 12);

window.onload = () => {
    const cipherForm = document.querySelector('#cipher-form');
    const cipherInput = document.querySelector('textarea[name="sentence"]');
    const cipherShiftInput = document.querySelector('input[name="shift"]');

    const rfinalResult = document.getElementById('cipher-result');
    cipherForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const inputValueCipher = cipherInput.value;
        const inputValueShift = cipherShiftInput.value;

        const decipherText = caesarDecipher(inputValueCipher.toUpperCase(), inputValueShift);
        rfinalResult.innerText = decipherText;

    });

};