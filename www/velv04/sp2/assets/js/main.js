$(document).ready(() => {

    const showScreen = (name) => {
        document.querySelectorAll(".screen").forEach(screen => screen.classList.add("screen--hidden"));
        document.getElementById(`screen--${name}`).classList.remove("screen--hidden");
    };

    const registerEventListeners = () => {
        document.getElementById("button--start").addEventListener("click", () => showScreen("start"));
        document.getElementById("button--category-back").addEventListener("click", () => showScreen("main-menu"));

        const catArray = ["gener","movie","video","geogr","histo","mytho","scien","music","sport",];

        for (let i = 0; i < 9; i++) {
            document.getElementById(`button--${catArray[i].toLowerCase()}-category`).addEventListener("click", function() {
                let stringC = this.id.slice(8,13);
                console.log(stringC);
                showScreen("round"); selectedCategory = stringC; gametime();
            });
        }


        for(let i =1;i<=4;i++) {
            let tmp = document.getElementById(`answer${i}`);
            tmp.addEventListener("click", () => {
                showScreen("round-result");
                if (tmp.innerText === question.correct_answer) {
                    roundResults(true);
                } else {
                    roundResults(false);
                }   
            })  
        }

        document.addEventListener("keypress", (e) => {
            if(!document.getElementById("screen--round").classList.contains("screen--hidden")) {
                if(e.keyCode === 49 || e.which === 97 ) {
                    document.getElementById("answer1").click();
                } else if (e.which === 50 || e.which === 98 ) {
                    document.getElementById("answer2").click();
                } else if (e.which === 51 || e.which === 99 ) {
                    document.getElementById("answer3").click();
                } else if (e.which === 52 || e.which === 100 ) {
                    document.getElementById("answer4").click();
                } 
            }
        });

        document.getElementById("button--continue").addEventListener("click", () => {
            roundNum = roundNum + 1;
            if (roundNum <= 4) {
                showScreen("round");
                round(rounds.results[roundNum]);

            } else {
                showScreen("start");
            }
        });

        document.getElementById("button--submit").addEventListener("click", () => {
            saveScore();
            resetStats();
            showScreen("main-menu");
        });
        document.getElementById("button--try-again").addEventListener("click", () => {
            resetStats();
            showScreen("start");
        });
        document.getElementById("button--main-menu-back").addEventListener("click", () => {
            resetStats();
            showScreen("main-menu");
        });


        document.getElementById("button--leaderboard").addEventListener("click", () => {
            loadScores();
            showScreen("leaderboard");
        });

        document.getElementById("button--leaderboards-back").addEventListener("click", () => {
            document.getElementById("firstPos").classList.remove("button--hidden");
            document.getElementById("secondPos").classList.remove("button--hidden");
            document.getElementById("thirdPos").classList.remove("button--hidden");
            document.getElementById("fourthPos").classList.remove("button--hidden");
            document.getElementById("fifthPos").classList.remove("button--hidden");

            showScreen("main-menu");
        });


        document.getElementById("button--credits").addEventListener("click", () => showScreen("credits"));
        document.getElementById("button--credits-back").addEventListener("click", () => showScreen("main-menu"));
    };

    const gametime = () => {
        let url = 'https://opentdb.com/api.php?amount=5&';
        console.log(selectedCategory);
        switch (selectedCategory) {
            case 'gener': url += 'category=9&'; break;
            case 'movie': url += 'category=11&'; break;
            case 'video': url += 'category=15&'; break;
            case 'geogr': url += 'category=22&'; break;
            case 'histo': url += 'category=23&'; break;
            case 'mytho': url += 'category=20&'; break;
            case 'scien': url += 'category=17&'; break;
            case 'music': url += 'category=12&'; break;
            case 'sport': url += 'category=21&'; break;
        }

        if (questionNum >= 30) { url += 'difficulty=hard&'; }
        else if (questionNum >= 15) { url += 'difficulty=medium&'; }
        else { url += 'difficulty=easy&'; }
        url += 'type=multiple';

        roundNum = 0;

        $.getJSON(url).done((data) => {
            rounds = data;
            round(rounds.results[roundNum]);
        }).fail(() => {
            return console.log('Something went wrong');
        });

    };


    const round = (Aquestion) => {
        question = Aquestion;

        let tmpLives = document.getElementById("lives-text");
        let tmpTime = document.getElementById("timer-text");

        tmpLives.innerText = 'Lives: ';
        switch (player.health) {
            case 3: tmpLives.innerText += ' ♥ ♥ ♥'; break;
            case 2: tmpLives.innerText += ' ♥ ♥ ♡'; break;
            case 1: tmpLives.innerText += ' ♥ ♡ ♡'; break;
            case 0: tmpLives.innerText += ' ♡ ♡ ♡'; break;
        }
        tmpTime.innerText = 'Timer: ' + timer;
        document.getElementById("score-text").innerText = 'Score: ' + player.score;

        console.log(question);
        document.getElementById("question-text").innerHTML = 'Question: ' + question.question;

        let answers = [];
        answerType = [];
        correctAnswer = question.correct_answer;

        answers.push(question.correct_answer);
        question.incorrect_answers.forEach(element => answers.push(element));
        answers = shuffle(answers);

        for (let i = 1; i <= 4; i++) {
            document.getElementById(`answer${i}`).innerText = answers[i - 1];
        }

        intervalId = setInterval(interval, 1000);
    };

    function interval() {
        timer = timer - 1;
        tmpTime.innerText = 'Timer: ' + timer;

        if (timer === 0) {
            roundResults(false);
        }
    };

    const roundResults = (bool) => {
        clearInterval(intervalId);
        questionNum = questionNum + 1;
        timer = 60;

        let tmpResText = document.getElementById("question-text2");

        if (bool === false) {
            player.health -= 1;
            if (player.health === 0) {
                document.getElementById("game-over-text").innerText = "GAME OVER!";
                document.getElementById("score-text3").innerText = "Score: " + player.score;

                showScreen("game-over");
            } else {
                tmpResText.innerText = "INCORRECT!";
            }

        } else {
            tmpResText.innerText = "CORRECT!";
            if (questionNum <= 15) {
                player.score += 5;
            } else if (questionNum <= 30) {
                player.score += 10;
            } else {
                player.score += 25;
            }
        }
        document.getElementById("score-text2").innerText = "Score: " + player.score;
    };

    // Using a Fisher-Yates shuffle to randomize order of answers
    const shuffle = (array) => {
        let m = array.length, t, i;

        // While there remain elements to shuffle…
        while (m) {

            // Pick a remaining element…
            i = Math.floor(Math.random() * m--);

            // And swap it with the current element.
            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }

        return array;
    };

    function saveScore() {
        scores = JSON.parse(localStorage.getItem('scores'));

        if (!scores) {
            scores = JSON.parse('[]');
        }

        newScore = { scoreName: player.name + player.score, scoreScore: player.score }

        scores.push(newScore);

        localStorage.setItem("scores", JSON.stringify(scores));
    };

    function loadScores() {
        let locStoScores = JSON.parse(localStorage.getItem('scores'));

        let numOfScores;
        if (locStoScores === null) {
            numOfScores = 0;
        } else {
            numOfScores = locStoScores.length;
        };
        if (numOfScores !== 0) { locStoScores.sort((a, b) => b.scoreScore - a.scoreScore) }

        let tmp1pos = document.getElementById("firstPos");
        let tmp2pos = document.getElementById("secondPos");
        let tmp3pos = document.getElementById("thirdPos");
        let tmp4pos = document.getElementById("fourthPos");
        let tmp5pos = document.getElementById("fifthPos");

        if (numOfScores > 0) {
            tmp1pos.innerText = "1.) " + "name: " + locStoScores[0].scoreName + ", score: " + locStoScores[0].scoreScore;
            if (numOfScores > 1) {
                tmp2pos.innerText = "2.) " + "name: " + locStoScores[1].scoreName + ", score: " + locStoScores[1].scoreScore;
                if (numOfScores > 2) {
                    tmp3pos.innerText = "3.) " + "name: " + locStoScores[2].scoreName + ", score: " + locStoScores[2].scoreScore;
                    if (numOfScores > 3) {
                        tmp4pos.innerText = "4.) " + "name: " + locStoScores[3].scoreName + ", score: " + locStoScores[3].scoreScore;
                        if (numOfScores > 4) {
                            tmp5pos.innerText = "5.) " + "name: " + locStoScores[4].scoreName + ", score: " + locStoScores[4].scoreScore;
                        } else {
                            tmp5pos.classList.add("button--hidden");
                        }
                    } else {
                        tmp4pos.classList.add("button--hidden");
                        tmp5pos.classList.add("button--hidden");
                    }
                } else {
                    tmp3pos.classList.add("button--hidden");
                    tmp4pos.classList.add("button--hidden");
                    tmp5pos.classList.add("button--hidden");
                }
            } else {
                tmp2pos.classList.add("button--hidden");
                tmp3pos.classList.add("button--hidden");
                tmp4pos.classList.add("button--hidden");
                tmp5pos.classList.add("button--hidden");
            }
        } else {
            tmp1pos.innerText = "There are no saved highscores yet.";
            tmp2pos.classList.add("button--hidden");
            tmp3pos.classList.add("button--hidden");
            tmp4pos.classList.add("button--hidden");
            tmp5pos.classList.add("button--hidden");
        }
    };

    function resetStats() {
        player.health = 3;
        player.score = 0;
        questionNum = 0;
    };

    let player = {
        name: "Guest",
        health: 3,
        score: 0,
    }
    let selectedCategory = "";
    let timer = 60;
    let questionNum = 0;
    let roundNum = 0;

    let correctAnswer = "";
    let rounds = [];
    let question;

    let intervalId = null;

    registerEventListeners();
});