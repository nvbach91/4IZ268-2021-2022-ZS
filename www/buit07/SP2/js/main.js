//var api = 'https://api.themoviedb.org/3/movie/{movie_id}/keywords?api_key=584897a17c53c0ddabaa0be16dd51ad6';

//var api ='https://api.themoviedb.org/3/genre/movie/list?api_key=584897a17c53c0ddabaa0be16dd51ad6&language=en-US';

var api = ["api"];

var answer = '';
var max_wrong = 10;
var mistakes = 0;
var guessed = [];
var status_word = null;

//*vybírání náhodného slova
function chosen_word() {
    answer = api[Math.floor(Math.random() * api.length)];
}

//*vytvoření klávesnice pro hráče
function keyboard() {
  var alphabet_buttons = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
    `
      <button
        class="keyboard-buttons"
        id='` + letter + `'
        onClick="handle_guess('` + letter + `')"
      >
        ` + letter + `
      </button>
    `).join('');

  document.getElementById('alphabet-buttons').innerHTML = alphabet_buttons;
}

//*, zapsání písmena do řádku po zakliknutí, po vybrání písmena znemožnit další použití
function handle_guess(chosen_letter) {
    guessed.indexOf(chosen_letter) === -1 ? guessed.push(chosen_letter) : null;
    document.getElementById(chosen_letter).setAttribute('disabled', true);

    if (answer.indexOf(chosen_letter) >= 0) {
        guessed_word();
        check_win();
    } else if (answer.indexOf(chosen_letter) === -1) {
        mistakes++;
        wrong_update();
        check_lose();
        update_img();
    }
}

//*kontrola výhry, generování vítězného
function check_win() {
    if (status_word === answer) {
        document.getElementById('alphabet-buttons').innerHTML = 'Congratulations, you have won!';
    }
}

//*kontrola prohry, generování textu
function check_lose() {
    if (mistakes === max_wrong) {
        document.getElementById('alphabet-buttons').innerHTML = 'Unfortunately, you have lost.';
        document.getElementById('unknown-word').innerHTML = 'The answer was: ' + answer + '.';
    }
}

//*aktualizace obrázku oběšense
function update_img() {
    document.getElementById('hangman-picture').src = './img/' + mistakes + '.png';
}

//*podtržítka pro hádané slovo
function guessed_word() {
    status_word = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');

  document.getElementById('unknown-word').innerHTML = status_word;
}

//*aktualizace chybných pokusů
function wrong_update() {
    document.getElementById('number-tries').innerHTML = mistakes;
}

//*počet maximálních pokusů
document.getElementById('max-tries').innerHTML = max_wrong;

//*reset celé hry
function reset() {
    mistakes = 0;
    guessed = [];
    document.getElementById('hangman-picture').src ="./img/0.png";

    chosen_word();
    guessed_word();
    wrong_update();
    keyboard();
}

document.getElementById('reset').onclick = reset;

//*volání functions
chosen_word();
keyboard();
guessed_word();