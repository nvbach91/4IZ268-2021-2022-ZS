$(document).ready(() => {

    const body = $('body');

    const startGame = () => {
        const title = $('<h1>');
        title.text('Ultimate Quiz');
        body.append(title);
        const playButton = $('<button>');
        playButton.text('play');
        playButton.click((e) => {
            body.empty();
            chooseCategory();
        })
        body.append(playButton);
    };

    const chooseCategory = () => {
        const instructions = $('<h2>');
        instructions.text('Choose a category');
        body.append(instructions);
        $.ajax({
            type: 'GET',
            url: 'https://opentdb.com/api_category.php',
            success: (data) => {
                data.trivia_categories.forEach(category => {
                    const categoryButton = $('<button>');
                    categoryButton.text(category.name);
                    categoryButton.click((e) => {
                        body.empty();
                        fetchQuestion(category.id);
                    })
                    body.append(categoryButton);
                });
            },
            error: (error) => { console.log(error) },
        });
    };

    const fetchQuestion = (categoryID) => {
        $.ajax({
            type: 'GET',
            url: 'https://opentdb.com/api.php?amount=1&category=' + categoryID,
            success: (data) => {
                const question = $('<h2>');
                question.html(data.results[0].question);
                body.append(question);
                const options = data.results[0].incorrect_answers;
                options.push(data.results[0].correct_answer);
                options.sort(() => {
                    return 0.5 - Math.random();
                });
                options.forEach(option => {
                    const optionButton = $('<button>');
                    optionButton.html(option);
                    optionButton.addClass('option');
                    optionButton.click((e) => {
                        $('.option').prop('disabled', true);
                        console.log(data.results[0].correct_answer);
                        if (option == data.results[0].correct_answer) {
                            alert('correct');
                        } else {
                            alert('incorrect');
                        }
                        const continueButton = $('<button>');
                        continueButton.text('continue');
                        continueButton.click((e) => {
                            body.empty();
                            fetchQuestion(categoryID);
                        })
                        body.append(continueButton);
                    })
                    body.append(optionButton);
                });
            },
            error: (error) => { console.log(error) },
        })
    }

    startGame();

})