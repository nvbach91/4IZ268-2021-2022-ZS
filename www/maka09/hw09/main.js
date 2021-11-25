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
//                0123456789...
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const shiftChar = (c, shift) => {
    position = alphabet.indexOf(c) - shift;
    if (position < 0){
        position = position + alphabet.length;
    }
    return alphabet.charAt(position);
    // a helper function to shift one character inside the 
    // alphabet based on the shift value and return the result
};
const shiftString = (str, shift) => {
    let i = 0;
    let decStr = '';
    while(i<str.length){
        decStr += shiftChar(str.charAt(i),shift);
        i++;
    };
    return decStr;
    // a helper function to shift one entire string inside the 
    // alphabet based on the shift value and return the result
};


const caesarDecipher = (cipherText, usedKey) => {
    // your implementation goes here

    let deccStr = '';
    let strToDec = '';

    for (let i = 0; i < cipherText.length; i++) {
        if (alphabet.indexOf(cipherText.charAt(i)) != -1) {
            strToDec += cipherText.charAt(i);
        } else {
            deccStr += shiftString(strToDec, usedKey) + cipherText.charAt(i);
            strToDec = '';
        }
    }

    if (strToDec.localeCompare('') != 0) {
        deccStr += shiftString(strToDec, usedKey);
    }

    return deccStr;
};


const txtArea = document.getElementById('cipheredtext');
const inpKey = document.getElementById('key');
const bttn = document.getElementById('decipher');
const rslt = document.getElementById('result');

bttn.addEventListener('click', () =>{
    
    console.log(caesarDecipher("MPH MABGZL TKX BGYBGBMX: MAX NGBOXKLX TGW ANFTG LMNIBWBMR; TGW B'F GHM LNKX TUHNM MAX NGBOXKLX. - TEUXKM XBGLMXBG", 19));
    console.log(caesarDecipher("YMJWJ NX ST QFB JCHJUY YMJ QFB YMFY YMJWJ NX ST QFB. - OTMS FWHMNGFQI BMJJQJW", 5));
    console.log(caesarDecipher("M YMZ ITA PMDQE FA IMEFQ AZQ TAGD AR FUYQ TME ZAF PUEOAHQDQP FTQ HMXGQ AR XURQ. ― OTMDXQE PMDIUZ", 12));
    const decpText = caesarDecipher(txtArea.value,inpKey.value);
    rslt.innerText = decpText;
    
})
// albert einstein
//caesarDecipher("MPH MABGZL TKX BGYBGBMX: MAX NGBOXKLX TGW ANFTG LMNIBWBMR; TGW B'F GHM LNKX TUHNM MAX NGBOXKLX. - TEUXKM XBGLMXBG", 19);

// john archibald wheeler
//caesarDecipher("YMJWJ NX ST QFB JCHJUY YMJ QFB YMFY YMJWJ NX ST QFB. - OTMS FWHMNGFQI BMJJQJW", 5);

// charles darwin
//caesarDecipher("M YMZ ITA PMDQE FA IMEFQ AZQ TAGD AR FUYQ TME ZAF PUEOAHQDQP FTQ HMXGQ AR XURQ. ― OTMDXQE PMDIUZ", 12);