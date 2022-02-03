


const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answers-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");
const questionLimit = 3; //nebo ="quiz.length" pro vse



let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;


//vklada otazky do pole
function setAvailableQuestions() {
    const totalQuestion = quiz.length;
    for (let i = 0; i < totalQuestion; i++) {
        availableQuestions.push(quiz[i])
    }
    // console.log(availableQuestions)

}

//cislo otazky, otazka, varianty
function getNewQuestion() {
    //console.log("hi");
    //console.log(availableQuestions);

    //cislo:
    questionNumber.innerHTML = "Question " + (questionCounter + 1) + " of " + questionLimit;

    //randomni sada otazek:
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;
    //console.log(questionIndex)

    //pozice indexovani
    const index1 = availableQuestions.indexOf(questionIndex);
    //console.log(index1); console.log(questionIndex);
    //console.log(availableQuestions);


    //smazani indexovani pro neopakovani
    availableQuestions.splice(index1, 1);
    
    //ukazat obrazky (pokud existuji)
    if (currentQuestion.hasOwnProperty("img")) {
        //console.log(currentQuestion.img);
        const img = document.createElement("img");
        img.src = currentQuestion.img;
        questionText.appendChild(img);
    }

    //vlozeni odpovedi
    const optionLen = currentQuestion.options.length;
    //console.log(currentQuestion.options);

    //vlozeni variant
    for (let i = 0; i < optionLen; i++) {
        availableOptions.push(i);
    }
    //console.log(availableOptions);

    optionContainer.innerHTML = '';

    let animationDelay = 0.15;

    //vytvareni variant odpovedi html
    for (let i = 0; i < optionLen; i++) {

        //randomni varianty:
        const optionIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
        //zadani pozice 
        const index2 = availableOptions.indexOf(optionIndex);
        //smazani indexu pro neopakovani
        availableOptions.splice(index2, 1);
        //console.log(optionIndex); console.log(availableOptions);

        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[optionIndex];
        option.id = optionIndex;
        option.style.animationDelay = animationDelay + 's';
        animationDelay = animationDelay + 0.15;
        option.className = "option";
        optionContainer.appendChild(option);
        option.setAttribute("onclick", "getResult(this)");
    }

    questionCounter++;

}

//vysledek odpovedi
function getResult(element) {
    //console.log(optionElement.innerHTML);
    const id = parseInt(element.id);
    //console.log(typeof id)

    //srovnovani spravnosti zmacknuteho id
    if (id === currentQuestion.answer) {
        //console.log("answer is correct");

        //nasteveni zelenou barvy
        element.classList.add("correct");
        //znamka
        updateAnswerIndicator("correct");

        correctAnswers++;

       // console.log("correct: " + correctAnswers);

    }
    else {
        //console.log("answer is wrong");

        //nasteveni cervenou barvy
        element.classList.add("wrong");

        //znamka
        updateAnswerIndicator("wrong");

        //ukazat spravnou odpoved (+ zelena barva)
        const optionLen = optionContainer.children.length;
        for (let i = 0; i < optionLen; i++) {
            if (parseInt(optionContainer.children[i].id) === currentQuestion.answer) {
                optionContainer.children[i].classList.add("correct");
            }
        }

    }

    attempt++;

    unclickableOptions();

}

//neclikabilni jine varianty, zakaz vymeny odpovedi
function unclickableOptions() {
    const optionLen = optionContainer.children.length;
    for (let i = 0; i < optionLen; i++) {
        optionContainer.children[i].classList.add("already-answered");
    }
}

function answersIndicator() {
    answersIndicatorContainer.innerHTML = '';
    const totalQuestion = questionLimit;
    for (let i = 0; i < totalQuestion; i++) {
        const indicator = document.createElement("div");
        answersIndicatorContainer.appendChild(indicator);
    }
}

function updateAnswerIndicator(markType) {
    //console.log(markType);
    answersIndicatorContainer.children[questionCounter - 1].classList.add(markType)
}


function next() {
    if (questionCounter === questionLimit) {

        //console.log("quiz over");
        quizOver();
    }
    else {
        getNewQuestion();
    }
}

function quizOver() {
    // hide quiz quizbox
    quizBox.classList.add("hide");

    //show result box
    resultBox.classList.remove("hide");

    quizResult();
}

//vysledky testu
function quizResult() {
    resultBox.querySelector(".total-question").innerHTML = questionLimit;
    resultBox.querySelector(".total-attempt").innerHTML = attempt;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
    resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
    const percentage = (correctAnswers / questionLimit) * 100;
    resultBox.querySelector(".percentage").innerHTML = percentage.toFixed(2) + "%";
    resultBox.querySelector(".total-score").innerHTML = correctAnswers + "/" + questionLimit;
}

function resetQuiz() {
     questionCounter = 0;
     correctAnswers = 0;
     attempt = 0;
     availableQuestions = [];
}


function tryAgainQuiz() {

    //skryvat box vysledek
    resultBox.classList.add("hide");

    //ukazat zacatek
    quizBox.classList.remove("hide");

    resetQuiz();
    startQuiz();
}

function goToHome() {

    //skryt vysledky
    resultBox.classList.add("hide");

    //domovska stranka:
    homeBox.classList.remove("hide");

    resetQuiz();

}


// Zacatek programu

function startQuiz() {

    //skryt domovskou stranku
    homeBox.classList.add("hide");

    //otevirat quiz
    quizBox.classList.remove("hide");


    setAvailableQuestions(); //sada otazek celkem
    getNewQuestion();

    answersIndicator();

}


window.onload = function() {
    homeBox.querySelector(".total-question").innerHTML = questionLimit;
}

