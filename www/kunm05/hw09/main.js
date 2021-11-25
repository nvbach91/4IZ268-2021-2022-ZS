console.log('hello')

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';


function processText(event) {
    event.preventDefault();
    inputText = document.getElementById('cipher-text').value;
    inputKey = document.getElementById('cipher-key').value;
    

    const caesarDecipher = (cipherText, usedKey) => {
        var shiftedAlphabet = alphabet.slice(usedKey) + alphabet.slice(0, usedKey);

        var textLength = cipherText.length;
        decipheredText = "";
        for (let index = 0; index < cipherText.length; index++) {
            var cipheredLetter = cipherText.slice(index, index + 1);

            if (cipheredLetter === " ") {
                var decipheredLetter = " ";
            }
            else {
                var letterIndex = shiftedAlphabet.indexOf(cipheredLetter);
                var decipheredLetter = alphabet.charAt(letterIndex);
            }
            decipheredText = decipheredText + decipheredLetter;
        }
        //console.log(decipheredText);
        log.textContent = `Translation is: ${decipheredText}`;
    };

    //log.textContent = `${inputText} ${inputKey} is ${decipheredText}`;
    caesarDecipher(inputText,inputKey);
}


const form = document.getElementById('decipher-form');
const log = document.getElementById('deciphered-text');
form.addEventListener('submit', processText);



