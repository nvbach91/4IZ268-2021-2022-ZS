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
const aLength = alphabet.length;
let decipher = false;

const shiftChar = (c, shift) => {
    // a helper function to shift one character inside the 
    // alphabet based on the shift value and return the result

    /// Prvne si vzhledem k 3. casti úkolu rovnou pripravim hlidani preteceni seznamu a dalsi zde

    if (alphabet.includes(c)) {  // hlidam, jestli jde o specialni znak nebo pismenko
        /// Sifrovani
        if (decipher == false) {
            const positionOrig = alphabet.indexOf(c);
            const positionNew = (positionOrig + shift) % aLength;
            const moved = alphabet.charAt(positionNew);
            return moved;
        }
        /// Desifrovani
        if (decipher == true) {
            const positionOrig = alphabet.indexOf(c) - shift;                    // zjistim puvodni pozici - padne casto zapor
            let positionNew = '';
            if (positionOrig >= 0) {                                             // podminka pro zapor
                positionNew = Math.abs((positionOrig)) % aLength;
            }
            else {                                                              // pokud neni pozice v zaporu
                positionNew = Math.abs((positionOrig + aLength)) % aLength;
            }
            const moved = alphabet.charAt(positionNew);
            return moved;
        }
    } else {
        return c;
    }
};

/*TEST DATA*/
//const testedChar = 'A';
//const shifting = 19;
//console.log('Testovany char je ' + testedChar + ' posun je ' + shifting + ' a vysledek je ' + shiftChar(testedChar, shifting));

const shiftString = (str, shift) => {
    // a helper function to shift one entire string inside the 
    // alphabet based on the shift value and return the result

    let i = 0; // pomocne cislo
    let movedString = '';

    while (i < str.length) {
        const charOfWord = str.charAt(i);
        movedString += shiftChar(charOfWord, shift);
        i += 1;
    };
    return movedString;
};

/*TEST DATA*/
//const testedString = 'ABCD';
//const shiftingB = 1;
//decipher = true;
//console.log('Testovany string je ' + testedString + ' posun je ' + shiftingB + ' a vysledek je ' + shiftString(testedString, shiftingB));


// Sifruj
const caesarDecipher = (cipherText, usedKey) => {
    // your implementation goes here
    // good to know: 
    //    str.indexOf(c) - returns the index of the specified character in the string
    //    str.charAt(i) - returns the character at the specified index in the string
    //    when the shifted character is out of bound, it goes back to the beginning and count on from there
    decipher = true;
    return shiftString(cipherText, usedKey);
};

// Desifruj
const caesarCipher = (cipherText, usedKey) => {
    decipher = false;
    return shiftString(cipherText, usedKey);
};

// albert einstein
console.log(caesarDecipher("MPH MABGZL TKX BGYBGBMX: MAX NGBOXKLX TGW ANFTG LMNIBWBMR; TGW B'F GHM LNKX TUHNM MAX NGBOXKLX. - TEUXKM XBGLMXBG", 19));

// john archibald wheeler
console.log(caesarDecipher("YMJWJ NX ST QFB JCHJUY YMJ QFB YMFY YMJWJ NX ST QFB. - OTMS FWHMNGFQI BMJJQJW", 5));

// charles darwin
console.log(caesarDecipher("M YMZ ITA PMDQE FA IMEFQ AZQ TAGD AR FUYQ TME ZAF PUEOAHQDQP FTQ HMXGQ AR XURQ. ― OTMDXQE PMDIUZ", 12));


/// Napojeni na HTML
window.onload = () => {
    // pracujeme s inputy
    const text = document.querySelector('input[name="cipher-text"]');
    const key = document.querySelector('input[name="key-number"]');
    const ciphre = document.getElementById('ciphre');
    const deciphre = document.getElementById('deciphre');
    let shiftedText = document.getElementById('shifted-text');

    // Sifruj klik
    ciphre.addEventListener('click', function (e) {
        e.preventDefault();

        const textValue = text.value.toUpperCase();
        const keyValue = parseInt(key.value);

        if (isNaN(keyValue) || keyValue <= 0) {
            alert('invalid key');
        } else {
            shiftedText.innerText = caesarCipher(textValue, keyValue);
        }
    });

    // Desifruj klik
    deciphre.addEventListener('click', function (e) {
        e.preventDefault();

        const textValue = text.value.toUpperCase();
        const keyValue = parseInt(key.value);

        if (isNaN(keyValue) || keyValue <= 0) {
            alert('invalid key');
        } else {
            shiftedText.innerText = caesarDecipher(textValue, keyValue);
        }
    });
};
