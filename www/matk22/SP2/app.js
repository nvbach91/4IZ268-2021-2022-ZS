const quizPromise = fetch('question.json')

/*
 * 'DOMContentLoaded' je lepsi nez 'window.onload',
 * protoze 'DOMContentLoaded' neceka, az se nactou obrazky a styly, ceka jen na nacteni DOMu
 * viz https://stackoverflow.com/questions/43162783/domcontentloaded-vs-window-onload-what-is-the-real-difference-between-these-two
 * 
 * 'addEventListener' je lepsi nez 'onload', protoze umoznuje vytvorit vice listeneru, kdyzpak onload
 * vzdy bude fungovat jen pro naposledy pridaneho listenera
 * 
 */
document.addEventListener('DOMContentLoaded', async () => {
    const questionNumber = document.querySelector('.question-number')
    const questionText = document.querySelector('.question-text')
    const optionContainer = document.querySelector('.option-container')
    const answersIndicatorContainer = document.querySelector('.answers-indicator')
    const homeBox = document.querySelector('.home-box')
    const quizBox = document.querySelector('.quiz-box')
    const resultBox = document.querySelector('.result-box')
    
    
    let questionCounter = 0
    let currentQuestion
    let availableQuestions = []
    let availableOptions = []
    let correctAnswers = 0
    let attempt = 0
    
    const response = await quizPromise
    const quiz = await response.json()
    let questionLimit = quiz.length

    //vklada otazky do pole
    function setAvailableQuestions () {
        let totalQuestion = quiz.length
        console.log('totalQuestion: ', totalQuestion)
        
        for (let i = 0; i < totalQuestion; i++) {
            availableQuestions.push(quiz[i])
        }
        // console.log(availableQuestions)

    }

    //cislo otazky, otazka, varianty
    function getNewQuestion () {
        //console.log('hi')
        //console.log(availableQuestions)

        //cislo:
        questionNumber.innerText = 'Question ' + (questionCounter + 1) + ' of ' + questionLimit
        
        //randomni sada otazek:
        const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
        currentQuestion = questionIndex
        questionText.innerText = currentQuestion.q
        //console.log(questionIndex)

        //pozice indexovani
        const index1 = availableQuestions.indexOf(questionIndex)
        //console.log(index1) console.log(questionIndex)
        //console.log(availableQuestions)


        //smazani indexovani pro neopakovani
        availableQuestions.splice(index1, 1)
        
        //ukazat obrazky (pokud existuji)
        if (currentQuestion.hasOwnProperty('img')) {
            //console.log(currentQuestion.img)
            const img = document.createElement('img')
            img.src = currentQuestion.img
            img.alt = currentQuestion.q
            questionText.appendChild(img)
        }

        //vlozeni odpovedi
        const optionLen = currentQuestion.options.length
        //console.log(currentQuestion.options)

        //vlozeni variant
        for (let i = 0; i < optionLen; i++) {
            availableOptions.push(i)
        }
        //console.log(availableOptions)

        optionContainer.innerText = ''

        let animationDelay = 0.15

        //vytvareni variant odpovedi html
        for (let i = 0; i < optionLen; i++) {

            //randomni varianty:
            const optionIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)]
            //zadani pozice 
            const index2 = availableOptions.indexOf(optionIndex)
            //smazani indexu pro neopakovani
            availableOptions.splice(index2, 1)
            //console.log(optionIndex) console.log(availableOptions)

            const option = document.createElement('div')
            option.innerText = currentQuestion.options[optionIndex]
            option.id = optionIndex
            option.style.animationDelay = animationDelay + 's'
            animationDelay = animationDelay + 0.15
            option.className = 'option'
            optionContainer.appendChild(option)
            option.addEventListener('click', () => getResult(option))
        }

        questionCounter++

    }

    //vysledek odpovedi
    function getResult (element) {
        //console.log(optionElement.innerText)
        const id = parseInt(element.id)
        //console.log(typeof id)

        //srovnovani spravnosti zmacknuteho id
        if (id === currentQuestion.answer) {
            //console.log('answer is correct')

            //nasteveni zelenou barvy
            element.classList.add('correct')
            //znamka
            updateAnswerIndicator('correct')

            correctAnswers++

        // console.log('correct: ' + correctAnswers)

        }
        else {
            //console.log('answer is wrong')

            //nasteveni cervenou barvy
            element.classList.add('wrong')

            //znamka
            updateAnswerIndicator('wrong')

            //ukazat spravnou odpoved (+ zelena barva)
            const optionLen = optionContainer.children.length
            for (let i = 0; i < optionLen; i++) {
                if (parseInt(optionContainer.children[i].id) === currentQuestion.answer) {
                    optionContainer.children[i].classList.add('correct')
                }
            }

        }

        attempt++

        unclickableOptions()

    }

    //neclikabilni jine varianty, zakaz vymeny odpovedi
    function unclickableOptions () {
        const optionLen = optionContainer.children.length
        for (let i = 0; i < optionLen; i++) {
            optionContainer.children[i].classList.add('already-answered')
        }
    }

    function answersIndicator () {
        answersIndicatorContainer.innerText = ''
        let totalQuestion = questionLimit

        for (let i = 0; i < totalQuestion; i++) {
            const indicator = document.createElement('div')
            answersIndicatorContainer.appendChild(indicator)
        }
    }

    function updateAnswerIndicator (markType) {
        //console.log(markType)
        answersIndicatorContainer.children[questionCounter - 1].classList.add(markType)
    }


    function next () {
        if (questionCounter === questionLimit) {

            //console.log('quiz over')
            quizOver()
        }
        else {
            getNewQuestion()
        }
    }

    function quizOver () {
        // hide quiz quizbox
        quizBox.classList.add('hide')

        //show result box
        resultBox.classList.remove('hide')

        quizResult()
    }

    //vysledky testu
    function quizResult () {
        resultBox.querySelector('.total-question').innerText = questionLimit
        resultBox.querySelector('.total-attempt').innerText = attempt
        resultBox.querySelector('.total-correct').innerText = correctAnswers
        resultBox.querySelector('.total-wrong').innerText = attempt - correctAnswers
        const percentage = (correctAnswers / questionLimit) * 100
        resultBox.querySelector('.percentage').innerText = percentage.toFixed(2) + '%'
        resultBox.querySelector('.total-score').innerText = correctAnswers + '/' + questionLimit
    }

    function resetQuiz () {
        questionCounter = 0
        correctAnswers = 0
        attempt = 0
        availableQuestions = []
    }


    function tryAgainQuiz () {

        //skryvat box vysledek
        resultBox.classList.add('hide')

        //ukazat zacatek
        quizBox.classList.remove('hide')

        resetQuiz()
        startQuiz()
    }

    function goToHome () {

        //skryt vysledky
        resultBox.classList.add('hide')

        //domovska stranka:
        homeBox.classList.remove('hide')

        resetQuiz()
    }


    // Zacatek programu

    function startQuiz () {

        

        questionLimit = +totalQuestionInput.value
        localStorage.setItem('questionLimit', totalQuestionInput.value)

        //skryt domovskou stranku
        homeBox.classList.add('hide')

        //otevirat quiz
        quizBox.classList.remove('hide')


        setAvailableQuestions() //sada otazek celkem
        getNewQuestion()

        answersIndicator()
    }

    const totalQuestionInput = homeBox.querySelector('.total-question')
   totalQuestionInput.value = localStorage.getItem('questionLimit') ?? questionLimit


    document.querySelector('#start_button').addEventListener('click', startQuiz)
    document.querySelector('#next_question_button').addEventListener('click', next)
    document.querySelector('#try_again_button').addEventListener('click', tryAgainQuiz)
    document.querySelector('#go_home_button').addEventListener('click', goToHome)
})
