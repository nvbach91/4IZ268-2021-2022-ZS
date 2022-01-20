$(document).ready(() => {

    const showScreen = (name) => {
        document.querySelectorAll(".screen").forEach(screen => screen.classList.add("screen--hidden"));
        document.getElementById(`screen--${name}`).classList.remove("screen--hidden");
    };

    const registerEventListeners = () => {
        document.getElementById("button--start").addEventListener("click", () => showScreen("start"));
        document.getElementById("button--category-back").addEventListener("click", () => showScreen("main-menu"));

        document.getElementById("button--gener-category").addEventListener("click", () => {
            showScreen("round"); selectedCategory = "Gener"; gametime();
        });
        document.getElementById("button--movie-category").addEventListener("click", () => {
            showScreen("round"); selectedCategory = "Movie"; gametime();
        });
        document.getElementById("button--video-category").addEventListener("click", () => {
            showScreen("round"); selectedCategory = "Video"; gametime();
        });
        document.getElementById("button--geogr-category").addEventListener("click", () => {
            showScreen("round"); selectedCategory = "Geogr"; gametime();
        });
        document.getElementById("button--histo-category").addEventListener("click", () => {
            showScreen("round"); selectedCategory = "Histo"; gametime();
        });
        document.getElementById("button--mytho-category").addEventListener("click", () => {
            showScreen("round"); selectedCategory = "Mytho"; gametime();
        });
        document.getElementById("button--scien-category").addEventListener("click", () => {
            showScreen("round"); selectedCategory = "Scien"; gametime();
        });
        document.getElementById("button--music-category").addEventListener("click", () => {
            showScreen("round"); selectedCategory = "Music"; gametime();
        });
        document.getElementById("button--sport-category").addEventListener("click", () => {
            showScreen("round"); selectedCategory = "Sport"; gametime();
        });

        document.getElementById("answer1").addEventListener("click", () => {
            showScreen("round-result");
            if (document.getElementById("answer1").innerText === question.correct_answer) {
                roundResults(true);
            } else {
                roundResults(false);
            }
        });
        document.getElementById("answer2").addEventListener("click", () => {
            showScreen("round-result");
            if (document.getElementById("answer2").innerText === question.correct_answer) {
                roundResults(true);
            } else {
                roundResults(false);
            }
        });
        document.getElementById("answer3").addEventListener("click", () => {
            showScreen("round-result");
            if (document.getElementById("answer3").innerText === question.correct_answer) {
                roundResults(true);
            } else {
                roundResults(false);
            }
        });
        document.getElementById("answer4").addEventListener("click", () => {
            showScreen("round-result");
            if (document.getElementById("answer4").innerText === question.correct_answer) {
                roundResults(true);
            } else {
                roundResults(false);
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
        switch (selectedCategory) {
            case 'Gener': url += 'category=9&'; break;
            case 'Movie': url += 'category=11&'; break;
            case 'Video': url += 'category=15&'; break;
            case 'Geogr': url += 'category=22&'; break;
            case 'Histo': url += 'category=23&'; break;
            case 'Mytho': url += 'category=20&'; break;
            case 'Scien': url += 'category=17&'; break;
            case 'Music': url += 'category=12&'; break;
            case 'Sport': url += 'category=21&'; break;
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
        document.getElementById("lives-text").innerText = 'Lives: ';
        switch (player.health) {
            case 3: document.getElementById("lives-text").innerText += ' ♥ ♥ ♥'; break;
            case 2: document.getElementById("lives-text").innerText += ' ♥ ♥ ♡'; break;
            case 1: document.getElementById("lives-text").innerText += ' ♥ ♡ ♡'; break;
            case 0: document.getElementById("lives-text").innerText += ' ♡ ♡ ♡'; break;
        }
        document.getElementById("timer-text").innerText = 'Timer: ' + timer;
        document.getElementById("score-text").innerText = 'Score: ' + player.score;

        console.log(question);
        document.getElementById("question-text").innerText = 'Question: ' + question.question;

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
        document.getElementById("timer-text").innerText = 'Timer: ' + timer;

        if (timer === 0) {
            roundResults(false);
        }
    };

    const roundResults = (bool) => {
        clearInterval(intervalId);
        questionNum = questionNum + 1;
        timer = 60;

        if (bool === false) {
            player.health -= 1;
            if (player.health === 0) {
                document.getElementById("game-over-text").innerText = "GAME OVER!";
                document.getElementById("score-text3").innerText = "Score: " + player.score;

                showScreen("game-over");
            } else {
                document.getElementById("question-text2").innerText = "INCORRECT!";
            }

        } else {
            document.getElementById("question-text2").innerText = "CORRECT!";
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

        if (numOfScores > 0) {
            document.getElementById("firstPos").innerText = "1.) " + "name: " + locStoScores[0].scoreName + ", score: " + locStoScores[0].scoreScore;
            if (numOfScores > 1) {
                document.getElementById("secondPos").innerText = "2.) " + "name: " + locStoScores[1].scoreName + ", score: " + locStoScores[1].scoreScore;
                if (numOfScores > 2) {
                    document.getElementById("thirdPos").innerText = "3.) " + "name: " + locStoScores[2].scoreName + ", score: " + locStoScores[2].scoreScore;
                    if (numOfScores > 3) {
                        document.getElementById("fourthPos").innerText = "4.) " + "name: " + locStoScores[3].scoreName + ", score: " + locStoScores[3].scoreScore;
                        if (numOfScores > 4) {
                            document.getElementById("fourthPos").innerText = "5.) " + "name: " + locStoScores[4].scoreName + ", score: " + locStoScores[4].scoreScore;
                        } else {
                            document.getElementById("fifthPos").classList.add("button--hidden");
                        }
                    } else {
                        document.getElementById("fourthPos").classList.add("button--hidden");
                        document.getElementById("fifthPos").classList.add("button--hidden");
                    }
                } else {
                    document.getElementById("thirdPos").classList.add("button--hidden");
                    document.getElementById("fourthPos").classList.add("button--hidden");
                    document.getElementById("fifthPos").classList.add("button--hidden");
                }
            } else {
                document.getElementById("secondPos").classList.add("button--hidden");
                document.getElementById("thirdPos").classList.add("button--hidden");
                document.getElementById("fourthPos").classList.add("button--hidden");
                document.getElementById("fifthPos").classList.add("button--hidden");
            }
        } else {
            document.getElementById("firstPos").innerText = "There are no saved highscores yet.";
            document.getElementById("secondPos").classList.add("button--hidden");
            document.getElementById("thirdPos").classList.add("button--hidden");
            document.getElementById("fourthPos").classList.add("button--hidden");
            document.getElementById("fifthPos").classList.add("button--hidden");
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