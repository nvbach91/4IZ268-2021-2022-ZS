//creating variables to work with them in code
var searchUrl = ''
var userInput = ''
var ingredientsName = []
var ingredientsMeasures = []
var ingridientsDictionary = {}

// Create a new empty database
var db = TAFFY();

//handling error message when user input could be found
const handleErrorMessage = () => {
    //if the error message text is on frontend - remove it
    if ($('#error-message').text() !== '') {
        $('#error-message').empty()
    } else {
        //otherwise handle reset (which means clear all the elements before replacing them with the new ones)
        handleReset();
    }
}

const handleUserInput = () =>  {
    //saving user input to a variable
    $("input").keyup(function() {
        userInput = $(this).val();
    }).keyup()
}

const handleReset = () => {
    //clear all the elements before replacing them with the new ones
    ingredientsName = []
    ingredientsMeasures = []
    ingridientsDictionary = {}
    $('#object-name').empty();
    $('#object-image').empty();
    $('#object-ingredients').empty();
    $('#object-instructions').empty();
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

$("#find-meal").click(function() {
    //API urls
    let randomMeal = 'https://www.themealdb.com/api/json/v1/1/random.php'
    let concreteMeal = 'https://www.themealdb.com/api/json/v1/1/search.php?s='

    //clearing error message
    handleErrorMessage();

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
                //save the name of meals and put them onto frontend
                $('#object-name').text(meal.meals[0].strMeal)

                //save the instructions and put them onto frontend
                $('#object-instructions').text(meal.meals[0].strInstructions)

                //save the image and put it onto frontend
                $('#object-image').html('<img alt="My favourite meal" src="' + meal.meals[0].strMealThumb + '" width="25%"/>')

                //preparing ingredience output
                iK = 0 //ingredience key variable for loop
                iM = 0 //ingredience measure variable for loop
                $.each(meal.meals[0], function(key, value) {
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
                db.insert({ "name": meal.meals[0].strMeal, "link": meal.meals[0].strYoutube, "type": "meal", "timestamp": Date.now() })
                    //ordering additions by timestamp
                db().filter({ "type": "meal" })
                db.sort("timestamp desc")

                //latest recipe appending from database
                $('#latest-meal-name').find('h3').after('<p>' + db().select("name")[0] + ' (meal)</p>')
                if (!meal.meals[0].strYoutube) {
                    $('#latest-meal-youtube').find('h3').after('<p>Youtube video was not found</p>')
                } else {
                    $('#latest-meal-youtube').find('h3').after('<p><a href="' + db().select("link")[0] + '" target="_blank">' + db().select("link")[0] + '</a></p>')
                }
            }
        }
    })

});

//the same setup as for food, but for drinks
$("#find-drink").click(function() {

    //API urls
    let randomDrink = 'https://www.thecocktaildb.com/api/json/v1/1/random.php'
    let concreteDrink = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='

    //clearing error message
    handleErrorMessage();

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
                console.log(drink.drinks[0])
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
                db.insert({ "name": drink.drinks[0].strDrink, "link": drink.drinks[0].strVideo, "type": "drink", "timestamp": Date.now() })
                db().filter({ "type": "drink" })
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