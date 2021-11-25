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

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const shiftChar = (c, shift) => {

    let result;

    if (alphabet.indexOf(c) !== -1) {

        const alphabetIndex = alphabet.indexOf(c);

        if (alphabet[alphabetIndex - shift]) {
            result = alphabet.charAt(alphabetIndex - shift);
        }
        else {
            result = alphabet.charAt(alphabetIndex - shift + 26);
        }
    }
    else {
        result = c;
    }

    return result;
};

const shiftString = (str, shift) => {
    let result = '';

    for (let i = 0; i < str.length; i++) {
        result += shiftChar(str[i].toUpperCase(), shift)
    }

    return result;
};

const caesarDecipher = (cipherText, usedKey) => {

    if (usedKey > 26) {
        usedKey = usedKey % 26;
    }

    return shiftString(cipherText, usedKey);
};

// albert einstein
console.log(caesarDecipher("MPH MABGZL TKX BGYBGBMX: MAX NGBOXKLX TGW ANFTG LMNIBWBMR; TGW B'F GHM LNKX TUHNM MAX NGBOXKLX. - TEUXKM XBGLMXBG", 19));

// john archibald wheeler
console.log(caesarDecipher("YMJWJ NX ST QFB JCHJUY YMJ QFB YMFY YMJWJ NX ST QFB. - OTMS FWHMNGFQI BMJJQJW", 5));

// charles darwin
console.log(caesarDecipher("M YMZ ITA PMDQE FA IMEFQ AZQ TAGD AR FUYQ TME ZAF PUEOAHQDQP FTQ HMXGQ AR XURQ. ― OTMDXQE PMDIUZ", 12));

const form = document.getElementById("decrypt-form");

form.addEventListener("submit", (ev) => {
    ev.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    if (data.encrypted && data.key) {
        const p = document.createElement("p");
        p.innerText = caesarDecipher(data.encrypted, parseInt(data.key));
        const resultArea = document.getElementById("result");
        resultArea.appendChild(p);
    }
})