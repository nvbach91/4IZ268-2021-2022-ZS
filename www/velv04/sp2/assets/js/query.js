/**
 * This javascript file is unused, to see the used code, please go to: main.js
 */

$(document).ready(() => {
        
    const showScreen = (name) => {
        document.querySelectorAll(".screen").forEach(screen => screen.addClass("screen--hidden"));
        $(`screen--${name}`).removeClass("screen--hidden");
    };
    
    const registerEventListeners = () => {
        $("button--start").on('click',(e) => showScreen("start"));
        $("button--category-back").on('click',(e) => showScreen("main-menu"));

        $("button--gener-category").on('click',(e) => {
            showScreen("round"); selectedCategory = "Gener"; gametime();
        });
        $("button--movie-category").on('click',(e) => {
            showScreen("round"); selectedCategory = "Movie"; gametime();
        });
        $("button--video-category").on('click',(e) => {
            showScreen("round"); selectedCategory = "Video"; gametime();
        });
        $("button--geogr-category").on('click',(e) => {
            showScreen("round"); selectedCategory = "Geogr"; gametime();
        });
        $("button--histo-category").on('click',(e) => {
            showScreen("round"); selectedCategory = "Histo"; gametime();
        });
        $("button--mytho-category").on('click',(e) => {
            showScreen("round"); selectedCategory = "Mytho"; gametime();
        });
        $("button--scien-category").on('click',(e) => {
            showScreen("round"); selectedCategory = "Scien"; gametime();
        });
        $("button--music-category").on('click',(e) => {
            showScreen("round"); selectedCategory = "Music"; gametime();
        });
        $("button--sport-category").on('click',(e) => {
            showScreen("round"); selectedCategory = "Sport"; gametime();
        });

        $("answer1").on('click',(e) => {
            showScreen("round-result");
            if($("answer1").text() === question.correct_answer){
                roundResults(true);
            } else {
                roundResults(false);
            }
        });
        $("answer2").on('click',(e) => {
            showScreen("round-result");
            if($("answer2").text() === question.correct_answer){
                roundResults(true);
            } else {
                roundResults(false);
            }
        });  
        $("answer3").on('click',(e) => {
            showScreen("round-result");
            if($("answer3").text() === question.correct_answer){
                roundResults(true);
            } else {
                roundResults(false);
            }
        });    
        $("answer4").on('click',(e) => {
            showScreen("round-result");
            if($("answer4").text() === question.correct_answer){
                roundResults(true);
            } else {
                roundResults(false);
            }
        });

        $("button--continue").on('click',(e) => {
            roundNum = roundNum + 1;
            if(roundNum <= 4) {
                showScreen("round");
                round(rounds.results[roundNum]);
                    
            } else {
                showScreen("start");
            }
        });

        $("button--submit").on('click',(e) => {
            //TODO localStorage
            saveScore();
            resetStats();
            showScreen("main-menu");
        });
        $("button--try-again").on('click',(e) => {
            resetStats();
            showScreen("start");
        });
        $("button--main-menu-back").on('click',(e) => {
            resetStats();
            showScreen("main-menu");
        });


        $("button--leaderboard").on('click',(e) => {
            loadScores();
            showScreen("leaderboard");
        });
        $("button--leaderboards-back").on('click',(e) => {
            $("firstPos").removeClass("button--hidden");
            $("secondPos").removeClass("button--hidden");
            $("thirdPos").removeClass("button--hidden");
            $("fourthPos").removeClass("button--hidden");
            $("fifthPos").removeClass("button--hidden");

            showScreen("main-menu");
        });

        
        $("button--credits").on('click',(e) => showScreen("credits"));
        $("button--credits-back").on('click',(e) => showScreen("main-menu"));
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
        /*
        if (questionNum % 2 === 0) { url += 'type=multiple'; } 
        else { url += 'type=boolean'; }*/

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
        $("lives-text").text('Lives: ');
        switch(player.health) {
            case 3: $("lives-text").text() += ' ♥ ♥ ♥'; break;
            case 2: $("lives-text").text() += ' ♥ ♥ ♡'; break;
            case 1: $("lives-text").text() += ' ♥ ♡ ♡'; break;
            case 0: $("lives-text").text() += ' ♡ ♡ ♡'; break;
        }
        $("timer-text").text('Timer: ' + timer);
        $("score-text").text('Score: ' + player.score);

        console.log(question);
        $("question-text").text('Question: ' + question.question);

        let answers = [];
        answerType = [];
        correctAnswer = question.correct_answer;

        answers.push(question.correct_answer);
        question.incorrect_answers.forEach(element => answers.push(element));
        answers = shuffle(answers);

        for(let i = 1; i<=4;i++){
            $(`answer${i}`).text(answers[i-1]);
        }

        intervalId = setInterval(interval,1000);
    };

    function interval () {
        timer = timer-1;
        $("timer-text").text('Timer: ' + timer);

        if(timer === 0) {
            roundResults(false);
        }
    };

    const roundResults = (bool) => {
        clearInterval(intervalId);
        questionNum = questionNum + 1;
        timer = 60;

        if(bool === false) {
            player.health -= 1;
            if(player.health === 0) {
                $("game-over-text").text("GAME OVER!");
                $("score-text3").text("Score: "+player.score);
               
                showScreen("game-over");
            } else {
                $("question-text2").text("INCORRECT!");
            }
            
        } else {
            $("question-text2").text("CORRECT!");
            if(questionNum <= 15) {
                player.score += 5; 
            } else if (questionNum <= 30) {
                player.score += 10;
            } else {
                player.score += 25;
            }
            $("score-text2").text("Score: " + player.score); 
        }
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

    function saveScore () {
	    scores = JSON.parse(localStorage.getItem('scores'));
		
	    if (!scores){
			scores = JSON.parse('[]');
		}
		
		newScore = {scoreName: player.name+player.score, scoreScore: player.score}	

		scores.push(newScore);

		localStorage.setItem("scores", JSON.stringify(scores));
    };

    function loadScores() {
        let locStoScores = JSON.parse(localStorage.getItem('scores'));
        
        let numOfScores;
        if(locStoScores === null ) {
            numOfScores = 0;
        } else {
            numOfScores = locStoScores.length;
        } ;
        if(numOfScores != 0) { locStoScores.sort((a,b) => b.scoreScore - a.scoreScore )}
        
        if(numOfScores > 0) {
            $("firstPos").text("1.) "+"name: "+locStoScores[0].scoreName+", score: "+locStoScores[0].scoreScore);
            if(numOfScores > 1 ) {
                $("secondPos").text("2.) "+"name: "+locStoScores[1].scoreName+", score: "+locStoScores[1].scoreScore);
                if(numOfScores > 2) {
                    $("thirdPos").text("3.) "+"name: "+locStoScores[2].scoreName+", score: "+locStoScores[2].scoreScore);
                    if(numOfScores > 3) {
                        $("fourthPos").text("4.) "+"name: "+locStoScores[3].scoreName+", score: "+locStoScores[3].scoreScore);
                        if(numOfScores > 4) {
                            $("fourthPos").text("5.) "+"name: "+locStoScores[4].scoreName+", score: "+locStoScores[4].scoreScore);
                        } else {
                            $("fifthPos").addClass("button--hidden"); 
                        }
                    } else {
                        $("fourthPos").addClass("button--hidden");
                        $("fifthPos").addClass("button--hidden"); 
                    }
                } else {
                    $("thirdPos").addClass("button--hidden");
                    $("fourthPos").addClass("button--hidden");
                    $("fifthPos").addClass("button--hidden");
                }
            } else {
                $("secondPos").addClass("button--hidden");
                $("thirdPos").addClass("button--hidden");
                $("fourthPos").addClass("button--hidden");
                $("fifthPos").addClass("button--hidden");    
            }
        } else {
            $("firstPos").text("There are no saved highscores yet.");
            $("secondPos").addClass("button--hidden");
            $("thirdPos").addClass("button--hidden");
            $("fourthPos").addClass("button--hidden");
            $("fifthPos").addClass("button--hidden");
        }
    };

    function resetStats() {
        player.health = 3;
        player.score = 0;
        questionNum = 0;
    };
        
    let player = {
        name : "Guest",
        health : 3,
        score : 0,
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