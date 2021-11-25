
const caesarDecipher = (cipherText, usedKey) => {
    const left = 'A'.charCodeAt(0);
    const right = 'Z'.charCodeAt(0);
    let resultArray = [];
    for (let i = 0; i < cipherText.length; i++) {
        if (left <= cipherText.charCodeAt(i) && cipherText.charCodeAt(i) <= right) {
            let code = cipherText.charCodeAt(i) - usedKey
            while (code < left) {
                code += 26
            }
            resultArray.push(String.fromCharCode(code))
        } else {
            resultArray.push(cipherText[i])
        }
    }
    document.getElementById('deciphered').innerText = resultArray.join('')
};


document.getElementById('cipherform').onsubmit = () => {
    caesarDecipher(document.getElementById('cipher').value, document.getElementById('key').value);
    return false;
};

// // // albert einstein
//console.log(caesarDecipher("MPH MABGZL TKX BGYBGBMX: MAX NGBOXKLX TGW ANFTG LMNIBWBMR; TGW B'F GHM LNKX TUHNM MAX NGBOXKLX. - TEUXKM XBGLMXBG", 19));

// // // john archibald wheeler
//console.log(caesarDecipher("YMJWJ NX ST QFB JCHJUY YMJ QFB YMFY YMJWJ NX ST QFB. - OTMS FWHMNGFQI BMJJQJW", 5));

// // // charles darwin
//console.log(caesarDecipher("M YMZ ITA PMDQE FA IMEFQ AZQ TAGD AR FUYQ TME ZAF PUEOAHQDQP FTQ HMXGQ AR XURQ. ― OTMDXQE PMDIUZ", 12));

