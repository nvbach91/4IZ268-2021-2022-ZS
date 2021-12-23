$(document).ready(() => {
    const form = $('#form');
    const caloriesMinMaxSelector = $('#caloriesMinMaxSelector');
    const caloriesInput = $('#calories');
    const proteinMinMaxSelector = $('#proteinMinMaxSelector');
    const proteinInput = $('#protein');
    const carbsMinMaxSelector = $('#carbsMinMaxSelector');
    const carbsInput = $('#carbs');
    const fatMinMaxSelector = $('#fatMinMaxSelector');
    const fatInput = $('#fat');
    const includedIngredientsTextArea = $('#includedIngredientsTextArea');
    const excludedIngredientsTextArea = $('#excludedIngredientsTextArea');
    const foodTypeSelector = $('#foodTypeSelector');
    const dietSelector = $('#dietSelector');
    //const maxResultsSelector = $('#max-results-selector');
    const findRecipesContainer = $('#find-recipes');
    const savedRecipesContainer = $('#saved-recipes');
    const ignoredRecipesContainer = $('#ignored-recipes');
    const findRecipesResultContainer = $('#find-recipes-result-container');
    const savedRecipesResultContainer = $('#saved-recipes-result-container');
    const ignoredRecipesResultContainer = $('#ignored-recipes-result-container');
    const navFindRecipes = $('#nav-find-recipes');
    const navSavedRecipes = $('#nav-saved-recipes');
    const navIgnoredRecipes = $('#nav-ignored-recipes');
    const headerTab = $('.header-tab');
    const collapseFormButton = $('#collapse-form-button');
    const collapseIcon = $('#collapse-icon');
    let criteriaCollapsed = false;
    const findSpinner = $('#find-spinner');

    let savedRecipes = localStorage.getItem('savedRecipes');
    if (savedRecipes === null) {
        savedRecipes = [];
        localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
    }

    let ignoredRecipes = localStorage.getItem('ignoredRecipes');
    if (ignoredRecipes === null) {
        ignoredRecipes = [];
        localStorage.setItem('ignoredRecipes', JSON.stringify(ignoredRecipes));
    }



    collapseFormButton.click(toggleCriteria);

    function toggleCriteria() {
        $('#form').slideToggle('slow');
        if (!criteriaCollapsed) {
            collapseIcon.removeClass('fa-caret-up');
            collapseIcon.addClass('fa-caret-down');
            criteriaCollapsed = true;
        } else {
            collapseIcon.addClass('fa-caret-up');
            collapseIcon.removeClass('fa-caret-down');
            criteriaCollapsed = false;
        }
    }

    navFindRecipes.click(() => {
        activateTab(findRecipesContainer, navFindRecipes);
        disableTab(savedRecipesContainer, navSavedRecipes);
        disableTab(ignoredRecipesContainer, navIgnoredRecipes);
        headerTab.text('Find Recipes');
        //findRecipesResultContainer.text('Recipes will appear here after searching for them.');
        if (criteriaCollapsed) {
            toggleCriteria();
        }
        savedRecipes = JSON.parse(localStorage.getItem('savedRecipes'));
        findRecipesResultContainer.children().each(function () { 
            const recipeID = parseInt($(this).attr('recipe-id'));
            if (!savedRecipes.includes(recipeID) & $(this).find('i').length !== 0) {
                $(this).find('i').remove();
            }
        });
    });

    navSavedRecipes.click(() => {
        disableTab(findRecipesContainer, navFindRecipes);
        activateTab(savedRecipesContainer, navSavedRecipes);
        disableTab(ignoredRecipesContainer, navIgnoredRecipes);
        headerTab.text('Saved Recipes');
        fillSavedRecipes();
    });

    navIgnoredRecipes.click(() => {
        disableTab(findRecipesContainer, navFindRecipes);
        disableTab(savedRecipesContainer, navSavedRecipes);
        activateTab(ignoredRecipesContainer, navIgnoredRecipes);
        headerTab.text('Ignored Recipes');
        fillIgnoredRecipes();
    });

    function activateTab(tab, navItem) {
        tab.addClass('active');
        tab.removeClass('inactive');
        navItem.addClass('active');
    }

    function disableTab(tab, navItem) {
        tab.addClass('inactive');
        tab.removeClass('active');
        navItem.removeClass('active');
    }

    if(window.location.href.includes('?')){
        loadFromUrl();
    }

    
    function loadFromUrl() {
        const url = window.location.href;
        const query = 'https://api.spoonacular.com/recipes/complexSearch' + url.substring(url.indexOf('?')) + '&apiKey=db93c8e3543c4936b22193b19d496299&addRecipeNutrition=true&fillIngredients=true';
        console.log(query);
        fetchAndDisplayRecipes(query, findRecipesResultContainer, 'find');
    }
    

    function fillSavedRecipes() {
        savedRecipes = JSON.parse(localStorage.getItem('savedRecipes'));
        savedRecipesResultContainer.empty();
        if (savedRecipes.length === 0) {
            savedRecipesResultContainer.text('You have no saved recipes.');
        } else {

            let IDs = '';
            for (let i = 0; i < savedRecipes.length; i++) {
                IDs += savedRecipes[i];
                if (i != savedRecipes.length - 1) {
                    IDs += ',';
                }
            }
            const query = 'https://api.spoonacular.com/recipes/informationBulk?apiKey=db93c8e3543c4936b22193b19d496299&includeNutrition=true&ids=' + IDs;

            fetchAndDisplayRecipes(query, savedRecipesResultContainer, 'saved');

            /*const recipesToAppend = [];
            for (let i = 0; i < savedRecipes.length; i++) {
                let recipeID = savedRecipes[i];
                let query = 'https://api.spoonacular.com/recipes/' + recipeID + '/information?apiKey=db93c8e3543c4936b22193b19d496299&includeNutrition=true';

                fetch(query).then((resp) => {
                    return resp.json();
                }).then((resp) => {
                    try {

                        const ingredientList = [];
                        const extendedIngredients = resp.extendedIngredients;
                        extendedIngredients.forEach(ingredient => {
                            ingredientList.push(ingredient.name);
                        });
                        const recipeData = {
                            id: resp.id,
                            title: resp.title,
                            imageLink: resp.image,
                            calories: Math.round(resp.nutrition.nutrients[0].amount),
                            protein: Math.round(resp.nutrition.nutrients[8].amount),
                            carbs: Math.round(resp.nutrition.nutrients[3].amount),
                            fat: Math.round(resp.nutrition.nutrients[1].amount),
                            ingredients: ingredientList,
                            link: resp.sourceUrl
                        };
                        recipesToAppend.push(createRecipe(recipeData, 'saved'));

                    } catch (e) {
                        savedRecipesResultContainer.text('An error has occured while loading saved recipes.');
                    }

                });
            }

            console.log(recipesToAppend);
            savedRecipesResultContainer.append(recipesToAppend);*/
        }
    }

    function fillIgnoredRecipes() {
        ignoredRecipes = JSON.parse(localStorage.getItem('ignoredRecipes'));
        ignoredRecipesResultContainer.empty();
        if (ignoredRecipes.length === 0) {
            ignoredRecipesResultContainer.text('You have no ignored recipes.');
        } else {
            const recipesToAppend = [];
            for (let i = 0; i < ignoredRecipes.length; i++) {
                const ignoredRecipeContainer = $('<div>');
                let recipeID = ignoredRecipes[i];
                const recipeNameContainer = $('<div>');
                recipeNameContainer.text(recipeID);
                recipeNameContainer.addClass('ignored-recipe-name');
                const removeButton = $('<button>');
                removeButton.text('Remove from ignored');
                removeButton.click(() => {
                    ignoredRecipes = JSON.parse(localStorage.getItem('ignoredRecipes'));
                    ignoredRecipes = ignoredRecipes.filter(function (e) { return e !== recipeID })
                    localStorage.setItem('ignoredRecipes', JSON.stringify(ignoredRecipes));
                    ignoredRecipeContainer.remove();
                    if (ignoredRecipes.length === 0) {
                        ignoredRecipesResultContainer.text('You have no ignored recipes.');
                    }
                });
                ignoredRecipeContainer.append(recipeNameContainer, removeButton);
                recipesToAppend.push(ignoredRecipeContainer);
            }
            ignoredRecipesResultContainer.append(recipesToAppend);
        }
    }


    form.submit((e) => {
        e.preventDefault();
        const caloriesMinMaxValue = caloriesMinMaxSelector.val();
        const caloriesInputValue = caloriesInput.val();
        const proteinMinMaxValue = proteinMinMaxSelector.val();
        const proteinInputValue = proteinInput.val();
        const carbsMinMaxValue = carbsMinMaxSelector.val();
        const carbsInputValue = carbsInput.val();
        const fatMinMaxValue = fatMinMaxSelector.val();
        const fatInputValue = fatInput.val();
        const includedIngredientsInputValue = includedIngredientsTextArea.val().replace(/\s/g, "").split(',');
        const excludedIngredientsInputValue = excludedIngredientsTextArea.val().replace(/\s/g, "").split(',');
        const foodTypeInputValue = foodTypeSelector.val();
        const dietInputValue = dietSelector.val();
        //const maxResultsInputValue = maxResultsSelector.val();

        let query = '';


        /*if (maxResultsInputValue > 25) {
            alert('Want to search for more than 25 recipes? Buy our premium subscription - only 999 CZK per month!');
        } else {
        */
        query = query + '&number=50';


        if (caloriesInputValue != '') {
            query = query + '&' + caloriesMinMaxValue + 'Calories=' + caloriesInputValue;
        }
        if (proteinInputValue != '') {
            query = query + '&' + proteinMinMaxValue + 'Protein=' + proteinInputValue;
        }
        if (carbsInputValue != '') {
            query = query + '&' + carbsMinMaxValue + 'Carbs=' + carbsInputValue;
        }
        if (fatInputValue != '') {
            query = query + '&' + fatMinMaxValue + 'Fat=' + fatInputValue;
        }
        if (includedIngredientsInputValue != '') {
            query = query + '&includeIngredients=' + includedIngredientsInputValue;
        }
        if (excludedIngredientsInputValue != '') {
            query = query + '&excludeIngredients=' + excludedIngredientsInputValue;
        }
        if (dietInputValue != 'none') {
            query = query + '&dietInputValue=' + dietInputValue;

        }
        query = query + '&type=' + foodTypeInputValue;

        const urlString = '?' + query.substring(1);
        //const url = new URL(urlString);

        query = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=db93c8e3543c4936b22193b19d496299' + query + '&addRecipeNutrition=true&fillIngredients=true';

        window.history.pushState({}, '', urlString);

        fetchAndDisplayRecipes(query, findRecipesResultContainer, 'find');
        findRecipesResultContainer.animate({scrollTop:0}, 'fast');

        /*fetch(query).then((resp) => {
            return resp.json();
        }).then((resp) => {
            try {

                findRecipesResultContainer.empty();

                if (resp.totalResults === 0) {
                    findRecipesResultContainer.text('No results for selected criteria.');
                } else {
                    const recipesToAppend = [];
                    resp.results.forEach(recipe => {
                        ignoredRecipes = JSON.parse(localStorage.getItem('ignoredRecipes'));
                        console.log(ignoredRecipes);
                        if (!ignoredRecipes.includes(recipe.title)) {


                            const ingredientList = [];
                            const extendedIngredients = recipe.extendedIngredients;
                            extendedIngredients.forEach(ingredient => {
                                ingredientList.push(ingredient.name);
                            });

                            const recipeData = {
                                id: recipe.id,
                                title: recipe.title,
                                imageLink: recipe.image,
                                calories: Math.round(recipe.nutrition.nutrients[0].amount),
                                protein: Math.round(recipe.nutrition.nutrients[8].amount),
                                carbs: Math.round(recipe.nutrition.nutrients[3].amount),
                                fat: Math.round(recipe.nutrition.nutrients[1].amount),
                                ingredients: ingredientList,
                                link: recipe.sourceUrl
                            };
                            recipesToAppend.push(createRecipe(recipeData, 'find'));
                        }
                    });
                    findRecipesResultContainer.append(recipesToAppend);
                    toggleCriteria();
                }
            }
            catch (e) {
                findRecipesResultContainer.text('An error has occured while searching for recipes.');
            }

        });*/
        
        //}

    });

    function fetchAndDisplayRecipes(query, resultContainer, type) {
        const spinner = $('<div>').addClass('spinner');
        resultContainer.empty();
        resultContainer.append(spinner);
        fetch(query).then((resp) => {
            return resp.json();
        }).then((resp) => {
            resultContainer.empty();
            try {
                if (resp.totalResults === 0) {
                    if (type === 'find') {
                        resultContainer.text('No results for selected criteria.');
                    } else if (type === 'saved') {
                        resultContainer.text('You have no saved recipes');
                    } 
                } else if(resp.totalResults > 5000 & type==='find'){ //In case of loading from URL - if url "parameters" are nonsensical, the query just return all the recipes (>5000). This cannot happen when using the app normally, because you have to choose some food type, which limits the number. Checking if the url is nonsencical would be too much effort, so i just act like it didnt query anything.
                    resultContainer.text('Recipes will appear here after searching for them.');
                } else {
                    const recipesToAppend = [];
                    let recipeArray;
                    if(type==='find'){
                        recipeArray = resp.results;
                    } else if(type==='saved'){
                        recipeArray = resp;
                    }
                    recipeArray.forEach(recipe => {
                        ignoredRecipes = JSON.parse(localStorage.getItem('ignoredRecipes'));
                        if ((type === 'find' & !ignoredRecipes.includes(recipe.title)) | type === 'saved') {
                            const ingredientList = [];
                            const extendedIngredients = recipe.extendedIngredients;
                            extendedIngredients.forEach(ingredient => {
                                ingredientList.push(ingredient.name);
                            });

                            const recipeData = {
                                id: recipe.id,
                                title: recipe.title,
                                imageLink: recipe.image,
                                calories: Math.round(recipe.nutrition.nutrients[0].amount),
                                protein: Math.round(recipe.nutrition.nutrients[8].amount),
                                carbs: Math.round(recipe.nutrition.nutrients[3].amount),
                                fat: Math.round(recipe.nutrition.nutrients[1].amount),
                                ingredients: ingredientList,
                                link: recipe.sourceUrl
                            };
                            recipesToAppend.push(createRecipe(recipeData, type));
                        }
                    });
                    findSpinner.addClass('inactive');
                    findSpinner.removeClass('active');
                    resultContainer.append(recipesToAppend);
                    if (type === 'find') {
                        toggleCriteria();
                    }
                }
            }
            catch (e) {
                if(type==='find'){
                    findSpinner.addClass('inactive');
                    findSpinner.removeClass('active');
                    resultContainer.text('An error has occured while searching for recipes.');   
                } else if(type==='saved'){
                    resultContainer.text('An error has occured while loading saved recipes.');
                }
                
            }

        });
    }

    function createRecipe(recipeData, type) {
        const recipeContainer = $('<div>');
        recipeContainer.attr('recipe-id', recipeData.id);
        const titleContainer = $('<h3>').addClass('recipe-title');
        titleContainer.text(recipeData.title);

        savedRecipes = JSON.parse(localStorage.getItem('savedRecipes'));
        if (savedRecipes.includes(recipeData.id)) {
            const savedIndicator = $('<i>').addClass('fas fa-star');
            titleContainer.append(savedIndicator);
        }

        const imageContainer = $('<img>');
        imageContainer.attr('src', recipeData.imageLink);
        imageContainer.attr('alt', 'image of ' + 'recipeData.title');
        //const nutritionContainer = $('<div>');
        const caloriesContainer = $('<div>');
        caloriesContainer.text('Calories: ' + recipeData.calories + ' kcal');
        const proteinContainer = $('<div>');
        proteinContainer.text('Protein: ' + recipeData.protein + ' g');
        const carbsContainer = $('<div>');
        carbsContainer.text('Carbs: ' + recipeData.carbs + ' g');
        const fatContainer = $('<div>');
        fatContainer.text('Fat: ' + recipeData.fat + ' g');
        const ingredientsContainer = $('<div>');
        ingredientsContainer.text("Ingredients: ");
        for (let i = 0; i < recipeData.ingredients.length; i++) {
            ingredientsContainer.text(ingredientsContainer.text() + recipeData.ingredients[i]);
            if (i != recipeData.ingredients.length - 1) {
                ingredientsContainer.text(ingredientsContainer.text() + ', ');
            }
        }

        const linkContainer = $('<a>');
        linkContainer.attr('href', recipeData.link);
        linkContainer.text('Go to the recipe website');

        const buttonContainer = $('<div>');
        buttonContainer.addClass('button-container');
        if (type === 'find') {
            const saveButton = $('<button>');
            saveButton.text('Save this recipe');
            saveButton.click(() => {
                savedRecipes = JSON.parse(localStorage.getItem('savedRecipes'));
                if (!savedRecipes.includes(recipeData.id) & savedRecipes.length <= 5) {
                    savedRecipes.push(recipeData.id);
                    const savedIndicator = $('<i>').addClass('fas fa-star');
                    titleContainer.append(savedIndicator);
                    localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
                } else if (!savedRecipes.includes(recipeData.id) & savedRecipes.length > 5) {
                    alert("You can only save up to 5 recipes at once.")
                }
                /*
                if (titleContainer.find('i').length === 0) {
                    const savedIndicator = $('<i>').addClass('fas fa-star');
                    titleContainer.append(savedIndicator);
                }
                */
            });

            const ignoreButton = $('<button>');
            ignoreButton.text('Dont show this recipe again');
            ignoreButton.click(() => {
                ignoredRecipes = JSON.parse(localStorage.getItem('ignoredRecipes'));
                if (!ignoredRecipes.includes(recipeData.tile)) {
                    ignoredRecipes.push(recipeData.title);
                    localStorage.setItem('ignoredRecipes', JSON.stringify(ignoredRecipes));
                    recipeContainer.remove();
                    if (findRecipesResultContainer.children().length === 0) {
                        findRecipesResultContainer.text('Recipes will appear here after searching for them.');
                    }
                }
            });


            buttonContainer.append(saveButton, ignoreButton);

        }

        if (type === 'saved') {
            const removeButton = $('<button>');
            removeButton.text('Remove from saved');
            removeButton.click(() => {
                savedRecipes = JSON.parse(localStorage.getItem('savedRecipes'));
                savedRecipes = savedRecipes.filter(function (e) { return e !== recipeData.id })
                localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
                recipeContainer.remove();
                if (savedRecipes.length === 0) {
                    savedRecipesResultContainer.text('You have no saved recipes.');
                }
            });
            buttonContainer.append(removeButton);
        }

        const recipeNotImageContainer = $('<div>');
        recipeNotImageContainer.addClass('not-image-container');
        recipeNotImageContainer.append(caloriesContainer, proteinContainer, carbsContainer, fatContainer, ingredientsContainer, linkContainer);
        recipeNotImageContainer.append(buttonContainer);



        const canvas = $('<canvas>');
        const canvasContext = canvas.get(0).getContext('2d');
        canvas.attr('width', '200');
        canvas.attr('heigth', '200');
        const myChart = new Chart(canvasContext, {
            type: 'pie',
            data: {
                labels: [
                    'Protein',
                    'Carbs',
                    'Fat'
                ],
                datasets: [
                    {
                        label: 'Nutritional split',
                        data: [recipeData.protein, recipeData.carbs, recipeData.fat],
                        backgroundColor: [
                            'rgb(255, 99, 132)',
                            'rgb(54, 162, 235)',
                            'rgb(255, 205, 86)'
                        ],
                        borderWidth: 1,
                        hoverOffset: 2
                    },
                ]
            },
            options: {
                responsive: false,
                legend: {
                    position: 'top',
                }
            }
        });


        const recipeWrapper = $('<div>');
        recipeWrapper.addClass('recipe-wrapper');
        recipeWrapper.append(recipeNotImageContainer, canvas, imageContainer);

        recipeContainer.append(titleContainer, recipeWrapper);
        /*if (type === 'find') {
            findRecipesResultContainer.append(recipeContainer);
        }
        else if (type === 'saved') {
            savedRecipesResultContainer.append(recipeContainer);
        }*/
        return recipeContainer;
    }
});
