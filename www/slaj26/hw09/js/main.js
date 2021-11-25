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

const shiftChar = (c, shift) => {
  const code = c.charCodeAt()

  if (c.match(/[a-z]/i)) {
    return String.fromCharCode(((code + 65 - shift) % 26) + 65)
  }

  return c
}

const shiftString = (str, shift) => {
  return [...str].map((letter) => shiftChar(letter, shift))
}

const caesarDecipher = (cipherText, usedKey) =>
  shiftString(cipherText, usedKey).join('')

// Interface
const form = document.getElementById('decode')

const field = document.getElementById('decode-field')
const key = document.getElementById('decode-key')

const output = document.getElementById('output')

const onSubmit = () => {
  event.preventDefault()

  const cipherText = field.value
  const usedKey = key.value

  output.textContent = caesarDecipher(cipherText, usedKey)

  form.reset()
}

const prefill = (cipherText, usedKey) => {
  field.value = cipherText
  key.value = usedKey
}
