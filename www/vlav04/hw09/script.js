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
    const charIndex = alphabet.indexOf(c.toUpperCase());

    if (charIndex === -1) {
        return c;
    }

    const resultIndex = (charIndex + shift) % alphabet.length;

    return alphabet[resultIndex];
};



const shiftString = (str, shift) => {
    // a helper function to shift one entire string inside the 
    // alphabet based on the shift value and return the result
    let strShift = '';

    for (let i = 0; i < str.length; i++) {
        strShift += shiftChar(str[i], shift);
    }

    return strShift;
};
const caesarDecipher = (cipherText, usedKey) => {
    // your implementation goes here
    // good to know: 
    //    str.indexOf(c) - returns the index of the specified character in the string
    //    str.charAt(i) - returns the character at the specified index in the string
    //    when the shifted character is out of bound, it goes back to the beginning and count on from there
    if (usedKey === 0){
        return cipherText;
    }

    const cipherArray = cipherText.split(" ");

    let resultText = '';
    for (let i = 0; i < cipherArray.length; i++) {
        resultText += shiftString(cipherArray[i], alphabet.length - usedKey);
        resultText += " ";
    }

    return resultText;

};

// albert einstein
console.log(caesarDecipher("MPH MABGZL TKX BGYBGBMX: MAX NGBOXKLX TGW ANFTG LMNIBWBMR; TGW B'F GHM LNKX TUHNM MAX NGBOXKLX. - TEUXKM XBGLMXBG", 19));

// john archibald wheeler
console.log(caesarDecipher("YMJWJ NX ST QFB JCHJUY YMJ QFB YMFY YMJWJ NX ST QFB. - OTMS FWHMNGFQI BMJJQJW", 5));

// charles darwin
console.log(caesarDecipher("M YMZ ITA PMDQE FA IMEFQ AZQ TAGD AR FUYQ TME ZAF PUEOAHQDQP FTQ HMXGQ AR XURQ. ― OTMDXQE PMDIUZ", 12));


window.onload = () => {
    const form = document.querySelector('#form');
    const textInput = document.querySelector('#text');
    const keyInput = document.querySelector('#key');
    const textResult = document.querySelector('#result');

    form.addEventListener('submit', (e) => {
        e.preventDefault();  
        const text = textInput.value;
        if(text === ''){
            return textResult.innerText = "Napište zprávu, kterou chcete dešifrovat";
            
        }

        const key = keyInput.value;

        if(key === ''){
            return textResult.innerText = "Napište klíč";
            
        }

        if(isNaN(key)){
            return textResult.innerText = "Klíč musí být číslice";
            
        }
        
        textResult.innerText = caesarDecipher(text, key);
    }
    );
}