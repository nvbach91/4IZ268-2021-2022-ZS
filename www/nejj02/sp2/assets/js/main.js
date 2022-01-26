$(document).ready(() => {

    const body = $('body');
    let health = 3;
    let score = 0;
    let questionNumber = 0;
    let categoryName = '';
    let categoryID = 0;

    const showStartScreen = () => {
        body.empty()
            .removeAttr('class')
            .addClass('startScreen');
        const title = $('<h1>');
        title.text('Ultimate Quiz');
        const playButton = $('<button>');
        playButton.text('Play');
        playButton.click((e) => {
            chooseCategory();
        })
        const highScoresButton = $('<button>');
        highScoresButton.text('High Scores 🥇');
        highScoresButton.addClass('scores');
        highScoresButton.click((e) => {
            showHighScores();
        })
        body.append(title)
            .append(playButton)
            .append(highScoresButton);
    };

    const chooseCategory = () => {
        body.empty()
            .removeAttr('class')
            .addClass('chooseCategoryScreen');
        addSpinner();
        const instructions = $('<h2>');
        instructions.text('Choose a category');
        const categoriesContainer = $('<div>');
        categoriesContainer.addClass('categories');
        $.ajax({
            type: 'GET',
            url: 'https://opentdb.com/api_category.php',
            success: (data) => {
                removeSpinner();
                data.trivia_categories.forEach(category => {
                    const categoryButton = $('<button>');
                    categoryButton.text(category.name)
                        .addClass('category')
                        .click((e) => {
                            categoryName = category.name;
                            categoryID = category.id;
                            startGame();
                        })
                    categoriesContainer.append(categoryButton);
                });
            },
            error: (error) => { console.log(error) },
        });
        body.append(instructions)
            .append(categoriesContainer);
    };

    const startGame = () => {
        body.empty()
            .removeAttr('class')
            .addClass('playScreen');
        createHUD();
        fetchQuestion();
    }

    const createHUD = () => {
        const HUD = $('<aside>');
        const questionCounter = $('<span>');
        questionCounter.text('Question: ' + questionNumber)
            .addClass('question');
        const scoreCounter = $('<span>');
        scoreCounter.text('Score: ' + score)
            .addClass('score');
        const healthBar = $('<span>');
        healthBar.text('❤️❤️❤️')
            .addClass('HP');
        HUD.addClass('HUD')
            .append(questionCounter)
            .append(scoreCounter)
            .append(healthBar);
        body.append(HUD);
    }

    const refreshHUD = () => {
        $('.question').text('Question: ' + questionNumber);
        $('.score').text('Score: ' + score);
        let HP = '';
        for (let i = 0; i < health; i++) {
            HP += '❤️';
        };
        $('.HP').text(HP);
    }

    const resetStats = () => {
        health = 3;
        score = 0;
        questionNumber = 0;
    }

    const fetchQuestion = () => {
        addSpinner();
        $.ajax({
            type: 'GET',
            url: 'https://opentdb.com/api.php?amount=1&category=' + categoryID,
            success: (data) => {
                removeSpinner();
                questionNumber++;
                refreshHUD();
                const questionContainer = $('<main>');
                const question = $('<h2>');
                question.html(data.results[0].question);
                questionContainer.addClass('questionContainer')
                    .append(question);
                const optionButtons = [];

                const correctOptionButton = $('<button>');
                correctOptionButton.html(data.results[0].correct_answer)
                    .addClass('option')
                    .click((e) => {
                        $('.option').prop('disabled', true);
                        //console.log(data.results[0].correct_answer);
                        correctOptionButton.addClass('correct');
                        const checkMark = $('<span>');
                        checkMark.text('✔️')
                            .addClass('marker');
                        correctOptionButton.append(checkMark);
                        score++;
                        refreshHUD();
                        continueButton.toggleClass('invisible');
                    })
                optionButtons.push(correctOptionButton);

                data.results[0].incorrect_answers.forEach(wrongAnswer => {
                    const wrongOptionButton = $('<button>');
                    wrongOptionButton.html(wrongAnswer)
                        .addClass('option')
                        .click((e) => {
                            $('.option').prop('disabled', true);;
                            //console.log(data.results[0].correct_answer);
                            const crossMark = $('<span>');
                            crossMark.text('❌')
                                .addClass('marker');
                            wrongOptionButton.append(crossMark)
                                .addClass('wrong');
                            const checkMark = $('<span>');
                            checkMark.text('✔️')
                                .addClass('marker');
                            correctOptionButton.addClass('correct')
                                .append(checkMark);
                            health--;
                            refreshHUD();
                            continueButton.toggleClass('invisible');
                        })
                    optionButtons.push(wrongOptionButton);
                })

                optionButtons.sort(() => {
                    return 0.5 - Math.random();
                });
                optionButtons.forEach(optionButton => {
                    questionContainer.append(optionButton);
                })

                const continueButton = $('<button>');
                continueButton.text('Continue')
                    .addClass('next')
                    .addClass('invisible')
                    .click((e) => {
                        if (health <= 0) {
                            if (localStorage.getItem(categoryName) < score) {
                                localStorage.setItem(categoryName, score);
                            }
                            showEndScreen();
                            resetStats();
                        } else {
                            questionContainer.remove();
                            fetchQuestion(categoryID);
                        }
                    })
                questionContainer.append(continueButton);
                body.append(questionContainer);
            },
            error: (error) => { console.log(error) },
        })
    }

    const showEndScreen = () => {
        body.empty()
            .removeAttr('class')
            .addClass('EndScreen');
        const title = $('<h2>');
        title.text('Game Over!');
        const achievedScore = $('<span>');
        achievedScore.text('Achieved Score: ' + score);
        const highScore = $('<span>');
        const HS = localStorage.getItem(categoryName);
        highScore.text('High Score: ' + HS);
        const playButton = $('<button>');
        playButton.text('Play Again');
        playButton.click((e) => {
            chooseCategory();
        })
        const highScoresButton = $('<button>');
        highScoresButton.text('High Scores 🥇');
        highScoresButton.addClass('scores');
        highScoresButton.click((e) => {
            showHighScores();
        })
        body.append(title)
            .append(achievedScore)
            .append(highScore)
            .append(playButton)
            .append(highScoresButton);
    };

    const showHighScores = () => {
        body.empty()
            .removeAttr('class')
            .addClass('highScoresScreen');
        const title = $('<h2>');
        title.text('High Scores');
        body.append(title);
        const highScores = $('<div>');
        for (let i = 0; i < localStorage.length; i++) {
            //console.log(localStorage.key(i) + "=[" + localStorage.getItem(localStorage.key(i)) + "]");
            const categoryHS = $('<span>');
            categoryHS.text(localStorage.key(i) + ": " + localStorage.getItem(localStorage.key(i)))
                .addClass('categoryHS');
            highScores.append(categoryHS);
        }
        body.append(highScores);
        const backButton = $('<button>');
        backButton.text('Back');
        backButton.click((e) => {
            showStartScreen();
        })
        body.append(backButton);
    }

    const addSpinner = () => {
        const spinner = $('<div>');
        spinner.addClass('spinner');
        body.append(spinner);
    }

    const removeSpinner = () => {
        $('.spinner').remove();
    }

    showStartScreen();

})