/*
Tips to improve
1) make one code for both depending on click button (setting variable for random & concrete objects)
2) Prepare a function to delete error message dependantly on user input to not duplicate code
*/

/*
To do
- Insert ingredience (DONE)
- Insert how to combine ingredience (DONE)
- Solve null values in arrays
- Insert image
- Prepare HTML to show as expected and wanted
- Save the latest meal into the database
- Show the latest meal in the database
- Prepare HTML to show as expected and wanted
- Do the same with drinks
- Finish it so multiple words work as well
    - currently search box works for one word
- Finish lookup of the whole page
    a) Menu
    b) Footer
- Finish details
    a) Favicon
    b) Title
    c) Description
*/

$("#find-meal").click(function() {
    //API urls
    let randomMeal = 'https://www.themealdb.com/api/json/v1/1/random.php'
    let concreteMeal = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
    var inputMeal = ''
    var ingredients = []
    var ingredientsMeasures = []
    var ingridientsDictionary = {}


    //Save user input into a variable to work with it
    $( "input" ).keyup(function() {
        inputMeal = $( this ).val();
    }).keyup()

    //if the input of the user is empty, give a random food
    if (inputMeal == '') {
        $.ajax({
            type: 'GET',
            url: randomMeal,
            success: function(meal) {
                console.log(meal.meals[0])
                //save the name of meals and put them onto frontend
                $('#object-name').text(meal.meals[0].strMeal)

                //save the instructions and put them onto frontend
                $('#object-instructions').text(meal.meals[0].strInstructions)

                //save the image and put it onto frontend
                $('#object-image').append('<img alt="My favourite meal" src="'+meal.meals[0].strMealThumb+'" width="25%"/>')

                //preparing ingredience output
                iK = 0 //ingredience key variable for loop
                iM = 0 //ingredience measure variable for loop
                $.each(meal.meals[0], function(key,value) {
                    var strIngredientKey = key.substr(0,13)
                    var strMeasureKey = key.substr(0,10)
                    
                    //saving names of ingredients into array
                    if ((strIngredientKey == 'strIngredient') && (value != '' || value != null)) {
                        ingredients.push(value)
                        iK = iK + 1
                    //saving measures of ingredients into array
                    } else if ((strMeasureKey == 'strMeasure') && (value != '' || value != null)) {
                        ingredientsMeasures.push(value)
                        iM = iM + 1
                    } else {
                        return
                    }
                    //creating dictionary of values ingredience : measure for easier work
                    ingredients.forEach(function (k, i) {
                        ingridientsDictionary[k] = ingredientsMeasures[i];
                    })
                })
                console.log(ingredients)
                console.log(ingredientsMeasures)
                //save the ingredience nad put them onto front end
                $.each(ingridientsDictionary, function(key,value) {
                    $('#object-ingredients').append('<li>'+key+' - '+value+'</li>')
                })
                //check whether there is an error message about non existing food
                    //if there is not - do nothing
                    if ($('#error-message').text() == '') {
                        return
                    //if there is - remove it / replace it with a new non existing food
                    } else {
                        $('#error-message').remove()
                    };
            }
        })
    //otherwise use the users input
    } else {
        var apiQuestionMeal = concreteMeal + inputMeal
        //if the users input is incorrect tell him this food doesnt exist
        $.ajax({
            type: 'GET',
            url: apiQuestionMeal,
            success: function(meal) {
                if (meal.meals == null) {
                    $('#error-message').text(inputMeal + ' does not exist in our database.')
                } else {
                    $('#object-name').text(meal.meals[0].strMeal)
                }
            }
        });
    }
  });

//the same setup as for food, but for drinks
$( "#find-drink" ).click(function() {
    //API urls
    let randomDrink = 'https://www.thecocktaildb.com/api/json/v1/1/random.php'
    let concreteDrink = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
    var inputDrink = ''

    //Save user input into a variable to work with it
    $( "input" ).keyup(function() {
        inputDrink = $( this ).val();
    }).keyup()

    //if the input of the user is empty, give a random drink
    if (inputDrink == '') {
        $.ajax({
            type: 'GET',
            url: randomDrink,
            success: function(drink) {
                $('#object-name').text(drink.drinks[0].strDrink)
            }
        });
    //otherwise use the users input
    } else {
        var apiQuestionDrink = concreteDrink + inputDrink
        //if the users input is incorrect tell him this drink doesnt exist
        $.ajax({
            type: 'GET',
            url: apiQuestionDrink,
            success: function(drink) {
                if (drink.drinks == null) {
                    $('#error-message').text(inputDrink + ' does not exist in our database.')
                } else {
                    $('#object-name').text(drink.drinks[0].strDrink)
                }
            }
        });
    }

    //check whether there is an error message about non existing food
    if ($('#error-message').text() == '') {
        //if there is not - do nothing
        return
    } else {
        //if there is - remove it
        $('#error-message').remove()
    };
});