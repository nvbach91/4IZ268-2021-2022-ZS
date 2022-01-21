//globální objekt
const App = {
    //vytvoření audio kontextu pro Web Audio API
    audioCtx: new (window.AudioContext || window.webkitAudioContext)(),
    //pole questions a answers slouží k uchování otázek a odpovědí
    questions: [],
    answers: [],
    //momentální otázka
    questionIndex: 0,
    //počet správných odpovědí
    correctAnswers: 0,
    //celkový počet otázek, defaultně nastaven na 5
    questionCount: 5,
    //čas zahájení tréninku
    beginTime: ''
};

//funkce allowPlayback se stará o povolení přehrání audia ve web. prohlížeči
let allowPlayback = document.getElementById('startButton').addEventListener('click', function () {
    // Audio context MUSÍ být povolen gestem uživatele,
    //je napojena na tlačítko startButton (spustí se spolu s generováním testu).
    App.audioCtx.resume().then(() => {
        console.log('Playback resumed successfully');

    });
});

//funkce hide vezme jako parametr id HTML div/elementu a schová jej pomocí display='none'
let hide = function (id) {
    document.getElementById(id).style.display = 'none';
}

//funkce show je opak funkce hide, má možnost měnit vnitřní hodnotu html elementu pomocí DOM innerHTML
let show = function (id, value) {
    let element = document.getElementById(id);
    element.style.display = '';
    if (value !== undefined) {
        element.innerHTML = value;
    }
}

//pomocná funkce getRandomInteger vrací náhodné číslo mezi stanoveným min a max
let getRandomInteger = function (min, max) {
    return Math.floor(
        Math.random() * (max - min)) + min;
}

//funkce getRandomNote využívá getRandomInteger, pro potřebu výběru náhodné noty z oktávy.
let getRandomNote = function () {
    let randomNoteNumber = getRandomInteger(0, 7);
    return getNote(randomNoteNumber);
}

//Účelem této funkce je načíst objekt noty pro náhodné číslo z funkce getRandomNote v rozmezí 0-7 uvedené výše. 
//Př.: v getRandomNote vybráno číslo 0, aplikuje se case 0, který vrátí vlastnosti pro tón C5, obdobně pro ostatní případy.
// Objekt má vlastnosti code, name, hz. Code odpovídá názvu noty bez přiloženého čísla oktávy, hz je frekvence tónu.
//Samotný code poté slouží k porovnání s uživatelským vstupem, nakládá s ním funkce evaluateAnswer, hz používá oscilátor.
//Name slouží POUZE pro účely identifikace jednotlivých tónů v kódu.
// -> Při případném rozšíření o další tóny z jiných oktáv přijde 'index' k užitku v rámci lepšího rozlišení tónů.
let getNote = function (noteNumber) {
    noteNumber = noteNumber.toString();
    let searchedNote = {
        code: 'default',
        name: 'Default',
        hz: '440'

    }
    switch (noteNumber) {
        case '0':
            searchedNote = {
                code: 'C',
                name: 'C5',
                hz: '261'
            };
            break;
        case '1':
            searchedNote = {
                code: 'D',
                name: 'D5',
                hz: '293'
            };
            break;
        case '2':
            searchedNote = {
                code: 'E',
                name: 'E5',
                hz: '329'
            };
            break;
        case '3':
            searchedNote = {
                code: 'F',
                name: 'F5',
                hz: '349'
            };
            break;
        case '4':
            searchedNote = {
                code: 'G',
                name: 'G5',
                hz: '392'
            };
            break;
        case '5':
            searchedNote = {
                code: 'A',
                name: 'A5',
                hz: '440'
            };
            break;
        case '6':
            searchedNote = {
                code: 'H',
                name: 'H5',
                hz: '493'
            };
            break;
        default:
        // vrací cokoli co byla default hodnota
    }

    return searchedNote;
}

//tato funkce se volá, když je potřeba zobrazit úvodní obrazovku
window.onload = function prepareScreen() {
    hide('questionArea');
    hide('searchArea');
}

//funkce pro generování testu, napojena na tlačítko startButton, 
let generateTest = document.getElementById('startButton').addEventListener('click', function () {
    //zobrazení obrazovky pro otázky
    show('questionArea');
    show('message', 'Training started.');

    //shování úvodní obrazovky
    hide('startArea');
    hide('searchArea');

    //načtení deklarovaných arrays questions a answers, nastavení výchozích hodnot proměnných 
    App.questions = [];
    App.answers = [];
    App.questionIndex = 0;
    App.correctAnswers = 0;
    //zde se načte uživatelem zvolený počet otázek
    App.questionCount = document.getElementById('questionSetter').value

    if (App.questionCount < 5) {
        show('message', 'You must set at least 5 questions in order to start the training.');
        hide('questionArea');
        show('startArea');
        document.getElementById('questionSetter').value = 5;
        //little easter egg
    } else if (App.questionCount > 1000) {
        show('message', 'Do yourself a favor, do not play this game for eternity.')
        hide('questionArea');
        show('startArea');
    } else {


        for (let question = 0; question < App.questionCount; question++) {

            //generování náhodné otázky
            let searchedNote = getRandomNote();
            App.questions[question] = searchedNote.code;
            App.answers[question] = searchedNote;
        }

        App.beginTime = Date.now().toString(); //počátek testu//
        nextQuestion();
    }
}
);

//funkce nextQuestion se stará o aktualizaci počítadla otázek umístěného v questionArea, 
//zároveň volá playNote pro přehrání další noty
let nextQuestion = function () {

    show('questionIndex', 'Question '
        + (App.questionIndex + 1) +
        ' of ' +
        App.questionCount);

    playNote(App.answers[App.questionIndex].hz);
}

//funkce confirmAnswer je napojena na tlačítko Confirm Answer, volá evaluateAnswer pro ověření odpovědi, 
//aktualizuje číslo otázky, ověřuje jestli je otázka poslední, nebo ještě nějaká zbývá 
let confirmAnswer = document.getElementById('confirmButton').addEventListener('click', function () {
    evaluateAnswer();
    App.questionIndex++;
    if (App.questionIndex < App.questionCount) {
        nextQuestion();
    }
    else {
        finishTest();
    }
});

//funkce evaluateAnswer ověřuje odpověď pomocí porovnání stringů
let evaluateAnswer = function () {
    // do id se načte hodnota zvolená uživatelem z answer dropdown selektoru v aplikaci
    let id = document.getElementById('answer').value;
    let searchedNote = getNote(id);

    //debug
    // console.log(searchedNote.code);
    // console.log(App.answers[App.questionIndex].code);
    // console.log(App.questions[App.questionIndex]);

    //funkcionalita přičítání bodů za správnou odpověď
    if (searchedNote.code === App.answers[App.questionIndex].code) {
        App.correctAnswers++;
        show('message', 'Correct!');
    }
    else {
        show('message', 'Wrong, the correct answer was: ' +
            App.answers[App.questionIndex].code);
    }
}

let stopTest = document.getElementById('stopButton').addEventListener('click', function () {
    return finishTest();
});

//funkce finishTest vrací úvodní obrazovku + uživatele informuje, jestli pokořil předchozí rekord, nebo ne
// zároveň od času dokončení všech otázek odečte čas začátku tréninku, čímž dostane celkovou délku hry (v sekundách)
let finishTest = function () {
    show('startArea');
    hide('questionArea');

    let highScoreMessage = 'You did not beat your high score.';
    let delta = Date.now() - parseInt(App.beginTime); // výsledek = milisekundy od startu
    let completionSeconds = Math.floor(delta / 1000); //přepočet na sekundy
    if (saveHighScore(completionSeconds)) {
        highScoreMessage = 'New high score! ';
    }

    //tato hláška se objevuje vždy, nezáleže na tom, jestli byl rekord pokořen nebo ne
    show('message', highScoreMessage +
        ' You got ' + App.correctAnswers +
        ' out of ' + App.questionCount +
        ' correct in ' + completionSeconds + ' seconds.');
}

//funkce saveHighScore porovnává existující záznam s výsledkem poslední hry
//pokud si uživatel vedl lépe než kdy předtím, přehraje zvuk cymbálu přes AJAX a přepíše dosavadní rekord
let saveHighScore = function (completionSeconds) {
    let highScore = false;
    let score = localStorage.getItem('score');
    let time = localStorage.getItem('time');
    if (App.correctAnswers > score || (App.correctAnswers >= score && completionSeconds < time)) {
        localStorage.setItem('score', App.correctAnswers.toString());
        localStorage.setItem('time', completionSeconds);
        highScore = true;

        //AJAX
        successSound();
        show('searchArea');
    }
    return highScore;
}

//volá funkci playnote pro potřebu znovu přehrání noty v aktuální otázce
let replayNote = document.getElementById('replayButton').addEventListener('click', function () {
    playNote(App.answers[App.questionIndex].hz);
});

//funkce scoreClear vymaže záznam o rekordu v local storage, napojena na tlačítko clearButton, informuje uživatele
let scoreClear = document.getElementById('clearButton').addEventListener('click', function () {
    if (confirm('Do you really want to delete High Score record?')) {
        localStorage.clear();
        show('message', 'High Score record deleted.');
    } else {
        return;
    }
});

//AJAX funkce, která načte a následně přehraje zvukový efekt cymbálu, 
//volá se pouze v případě, že uživatel vytvoří nové nejvyšší high score.
let successSound = function () {
    let audioCtx = App.audioCtx;
    let audioFileUrl = 'https://s3-us-west-2.amazonaws.com/demo-aud-samp/samples/Cym_Blofeld_1.wav';
    let xhr = new XMLHttpRequest();
    xhr.open('GET', audioFileUrl);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function () {
        audioCtx.decodeAudioData(xhr.response, function (audio) {
            var buffer = audioCtx.createBufferSource();
            buffer.connect(audioCtx.destination);
            buffer.buffer = audio;
            buffer.start(0);
        });
    };
    xhr.send();
}

//funkce která využívá Web Audio API, vytváří oscilátor, 
//který přehraje notu - použije parametr note pitch - po dobu půl vteřiny
//gainNode se stará o hlasitost přehrání tónu, protože defaultní hlasitost je až příliš vysoká.
let playNote = function (notePitch) {
    let audioCtx = App.audioCtx;
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    gainNode.gain.value = 0.5; //nastavena poloviční hlasitost
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(notePitch, audioCtx.currentTime);
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.start(audioCtx.currentTime);
    oscillator.stop(audioCtx.currentTime + 0.5);
}

let getRandomCat = document.getElementById('searchButton').addEventListener('click', function () {
    fetch('https://aws.random.cat/meow')
        .then(res => res.json())
        .then(data => {

            searchResult.innerHTML = `<img src=${data.file} alt="cat" id="image"/>`
        });
});
