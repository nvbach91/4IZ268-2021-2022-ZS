//nasledne bych upravil cteni hodnoty z buttonu a podle toho vybirani apicek

//creating variables to work with them in code
var searchUrl = ''
var userInput = ''
var ingredientsName = []
var ingredientsMeasures = []
var ingridientsDictionary = {}
var myRecipes = []

// Create a new empty database
var db = TAFFY()

//handling error message when user input could be found
const handleErrorMessage = (error) => {
    //if the error message text is on frontend - remove it
    if (error !== '') {
        $('#error-message').empty()
    } else {
        //otherwise handle reset (which means clear all the elements before replacing them with the new ones)
        handleReset()
    }
}

const handleUserInput = () => {
    //saving user input to a variable
    $("input").keyup(function() {
        userInput = $(this).val()
    }).keyup()
}

const handleReset = () => {
    //clear all the elements before replacing them with the new ones
    ingredientsName = []
    ingredientsMeasures = []
    ingridientsDictionary = {}
    $('#object-name').empty()
    $('#object-image').empty()
    $('#object-ingredients').empty()
    $('#object-instructions').empty()
}

const handleListIngredienceCreation = (ingredientNameKey, ingredientNameList, keyIndex, ingredientMeasureValue, ingredientValueList, valueIndex, pushedValue) => {
    //if the json key is string ingredient, put them into array of ingredient names
    if ((ingredientNameKey === 'strIngredient')) {
        ingredientNameList.push(pushedValue)
        keyIndex = keyIndex + 1
            //saving measures of ingredients into array
            //if the json key is string measure, put them into array of ingredient measures 
    } else if ((ingredientMeasureValue === 'strMeasure')) {
        ingredientValueList.push(pushedValue)
        valueIndex = valueIndex + 1
    } else {
        return
    }
}

const handleIngredientsCreation = (ingredientNameList, ingredientDictionary, ingredientMeasure) => {
    //for each ingredient name create an object in dictionary
    //so the output is for example {"onion": "one"} or {"pepper": "1/2 spoon"}
    ingredientNameList.forEach(function(k, i) {
        ingredientDictionary[k] = ingredientMeasure[i];
    })
}

const handleGenerateIngredients = (dict) => {
    $.each(dict, function(key, value) {
        //check whether the ingredient is valid
        if (!key || !value) {
            return
        } else {
            //if its valid append it to create list of ingredients on frontend
            $('#object-ingredients').append('<li id="ingredient">' + key + ' - ' + value + '</li>')
        }
    })
}

const printIngredients = (dict) => {
    let str = ''
    $.each(dict, function(key, value) {
        //check whether the ingredient is valid
        if (!key || !value) {
            return
        } else {
            //if its valid append it to create list of ingredients on frontend
            str += '<li id="ingredient">' + key + ' - ' + value + '</li>'
        }
    })
    return str
}

//checking which url to use
const handleUserInputUrl = (input, randomizedUrl, specificUrl) => {
    //if the input is empty, use random food
    if (input === '') {
        searchUrl = randomizedUrl
    } else {

        //if the input is not empty, build a specific address
        searchUrl = specificUrl + input
    }
}

window.onload = function handleLocalStorageElements() {
    $.each(JSON.parse(localStorage.getItem('myFood')), function(key, value) {
        var addButton = $('<button class="button button-red">Remove</button>')
        var htmlP = $('<p></p>')
        var htmlL = $('<p></p>')
        var addName = htmlL.text(value.name)

        htmlP.append(addButton)
        htmlL.append(addName)

        $('#latest-meal-name').find('h3').after(htmlL)
        $('#latest-meal-button').find('h3').after(htmlP)

        addButton.click(function() {
            htmlL.empty()
            htmlP.empty()

            var newArray = JSON.parse(localStorage.getItem('myFood')).filter(function(e) {
                return e.name !== value.name
            })
            localStorage.setItem('myFood', JSON.stringify(newArray))
        })
    })
}

$("#find-meal").click(function() {
    //API urls
    let randomMeal = 'https://www.themealdb.com/api/json/v1/1/random.php'
    let concreteMeal = 'https://www.themealdb.com/api/json/v1/1/search.php?s='

    //error message handling
    let errorMessage = $('#error-message').text()

    //clearing error message
    handleErrorMessage(errorMessage);


    //Save user input into a variable to work with it
    handleUserInput();

    //choosing URL -> if the input is empty -> randomize, otherwise use user input
    handleUserInputUrl(userInput, randomMeal, concreteMeal);

    $.ajax({
        type: 'GET',
        url: searchUrl,
        success: function(meal) {
            if (meal.meals === null) {
                $('#error-message').text('This meal does not exist in our database.')
            } else {
                let video = meal.meals[0].strYoutube.toString()

                //preparing ingredience output
                iK = 0 //ingredience key variable for loop
                iM = 0 //ingredience measure variable for loop
                $.each(meal.meals[0], function(key, value) {
                    var strIngredientKey = key.substr(0, 13)
                    var strMeasureKey = key.substr(0, 10)

                    //saving names of ingredients into array
                    handleListIngredienceCreation(strIngredientKey, ingredientsName, iK, strMeasureKey, ingredientsMeasures, iM, value)

                    //creating dictionary of values ingredience : measure for easier work
                    handleIngredientsCreation(ingredientsName, ingridientsDictionary, ingredientsMeasures)
                })


                //save the ingredience nad put them onto front end
                handleGenerateIngredients(ingridientsDictionary)

                const newHTML = `
                <div class="shadow-box margin-top-boxes center-text-alignment">
                    <p id="object-name" class="object-name">${meal.meals[0].strMeal}</p>
                    <div class="media-handler">
                        <img class="image" alt="My favourite meal" src="${meal.meals[0].strMealThumb}"/>
                        <iframe height="251" src="${video.replace('watch?v=', 'embed/')}"></iframe>
                    </div>
                </div>
                <div class="recipe-info">
                    <div class="left-side shadow-box margin-top-boxes margin-right-boxes">
                        <p class="object-name center-text-alignment">Ingredience</p>
                        <ul id="object-ingredients">
                        ${printIngredients(ingridientsDictionary)}
                        </ul>
                    </div>
                    <div class="center-text-alignment right-side shadow-box margin-top-boxes">
                        <p class="object-name center-text-alignment">Instructions</p>
                        <p id="object-instructions">${meal.meals[0].strInstructions}</p>
                    </div>
                </div>`;

                //save the name of meals and put them onto frontend
                //$('#object-name').text(meal.meals[0].strMeal)

                //save the instructions and put them onto frontend
                //$('#object-instructions').text(meal.meals[0].strInstructions)

                //save the image and put it onto frontend
                //$('#object-image').html('<img class="image" alt="My favourite meal" src="' + meal.meals[0].strMealThumb + '"/>')

                //insert video and put it onto frontend
                //$('#object-video').html('<iframe height="175" src="' + meal.meals[0].strYoutube + '"></iframe>')

                $('#meal-container').html(newHTML)
            }

            let buttonValue = ''
            let buttonColor = ''
            let recipe = {}
            recipe["name"] = meal.meals[0].strMeal


            if (myRecipes.some(item => item.name === meal.meals[0].strMeal)) {
                buttonValue = 'Remove'
                buttonColor = 'button-red'
            } else {
                buttonValue = 'Add'
                buttonColor = 'button-green'
            }

            var addButton = $('<button class="button ' + buttonColor + '">' + buttonValue + '</button>')
            var htmlButton = $('<p></p>')


            if (myRecipes.some(item => item.name === meal.meals[0].strMeal)) {
                $('#latest-meal-button').find('h3').after(htmlButton)
            } else {
                $('#latest-meal-button').find('h3').after(htmlButton)
            }

            htmlButton.append(addButton)

            addButton.click(function() {
                var buttonText = $(this).text()

                if (buttonText === 'Add') {
                    myRecipes.push(recipe)
                    localStorage.setItem('myFood', JSON.stringify(myRecipes))
                        //console.log(JSON.parse(localStorage.getItem('myFood')))
                } else if (buttonText === 'Remove') {
                    var newArray = JSON.parse(localStorage.getItem('myFood')).filter(function(e) {
                        return e.name !== meal.meals[0].strMeal
                    })
                    localStorage.setItem('myFood', JSON.stringify(newArray))
                } else {
                    return
                }
            })
            $('#latest-meal-name').find('h3').after('<p>' + meal.meals[0].strMeal + ' (meal)</p>')
        }
    })
});


/*
//the same setup as for food, but for drinks
$("#find-drink").click(function() {
    //API urls
    let randomDrink = 'https://www.thecocktaildb.com/api/json/v1/1/random.php'
    let concreteDrink = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='

    let errorMessage = $('#error-message').text()

    //clearing error message
    handleErrorMessage(errorMessage);

    //Save user input into a variable to work with it
    handleUserInput();

    //choosing URL -> if the input is empty -> randomize, otherwise use user input
    handleUserInputUrl(userInput, randomDrink, concreteDrink);

    $.ajax({
        type: 'GET',
        url: searchUrl,
        success: function(drink) {
            if (drink.drinks === null) {
                $('#error-message').text('This meal does not exist in our database.')
            } else {
                //save the name of meals and put them onto frontend
                $('#object-name').text(drink.drinks[0].strDrink)

                //save the instructions and put them onto frontend
                $('#object-instructions').text(drink.drinks[0].strInstructions)

                //save the image and put it onto frontend
                $('#object-image').html('<img alt="My favourite meal" src="' + drink.drinks[0].strDrinkThumb + '" width="25%"/>')

                //preparing ingredience output
                iK = 0 //ingredience key variable for loop
                iM = 0 //ingredience measure variable for loop
                $.each(drink.drinks[0], function(key, value) {
                    var strIngredientKey = key.substr(0, 13)
                    var strMeasureKey = key.substr(0, 10)

                    //saving names of ingredients into array
                    handleListIngredienceCreation(strIngredientKey, ingredientsName, iK, strMeasureKey, ingredientsMeasures, iM, value);

                    //creating dictionary of values ingredience : measure for easier work
                    handleIngredientsCreation(ingredientsName, ingridientsDictionary, ingredientsMeasures);
                })

                //save the ingredience nad put them onto front end
                handleGenerateIngredients(ingridientsDictionary);

                //inserting data into database
                db.insert({
                    "name": drink.drinks[0].strDrink,
                    "link": drink.drinks[0].strVideo,
                    "type": "drink",
                    "timestamp": Date.now()
                })
                db().filter({
                        "type": "drink"
                    })
                    //ordering additions by timestamp
                db.sort("timestamp desc")

                //latest recipe appending from database
                $('#latest-meal-name').find('h3').after('<p>' + db().select("name")[0] + ' (drink)</p>')
                if (!drink.drinks[0].strVideo) {
                    $('#latest-meal-youtube').find('h3').after('<p>Youtube video was not found</p>')
                } else {
                    $('#latest-meal-youtube').find('h3').after('<p><a href="' + db().select("link")[0] + '" target="_blank">' + db().select("link")[0] + '</a></p>')
                }
            }
        }
    })
});
*/