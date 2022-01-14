$(document).ready(() => {
    const form = $('#form');
    const caloriesMinMaxSelector = $('#calories-min-max-selector');
    const caloriesInput = $('#calories');
    const proteinMinMaxSelector = $('#protein-min-max-selector');
    const proteinInput = $('#protein');
    const carbsMinMaxSelector = $('#carbs-min-max-selector');
    const carbsInput = $('#carbs');
    const fatMinMaxSelector = $('#fat-min-max-selector');
    const fatInput = $('#fat');
    const includedIngredientsTextArea = $('#included-ingredients-textarea');
    const excludedIngredientsTextArea = $('#excluded-ingredients-textarea');
    const foodTypeSelector = $('#food-type-selector');
    const dietSelector = $('#diet-selector');
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
    const BASE_URL = 'https://api.spoonacular.com/recipes/';
    const API_KEY = 'db93c8e3543c4936b22193b19d496299';
    const API_KEY_QUERY_ITEM = `apiKey=${API_KEY}`; 

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
            collapseIcon.removeClass("fa-caret-up");
            collapseIcon.addClass("fa-caret-down");
            criteriaCollapsed = true;
        } else {
            collapseIcon.addClass("fa-caret-up");
            collapseIcon.removeClass("fa-caret-down");
            criteriaCollapsed = false;
        }
    }

    navFindRecipes.click(() => {
        activateTab(findRecipesContainer, navFindRecipes);
        disableTab(savedRecipesContainer, navSavedRecipes);
        disableTab(ignoredRecipesContainer, navIgnoredRecipes);
        headerTab.text('Find Recipes');
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
        tab.addClass("active");
        tab.removeClass("inactive");
        navItem.addClass("active");
    }

    function disableTab(tab, navItem) {
        tab.addClass("inactive");
        tab.removeClass("active");
        navItem.removeClass("active");
    }

    

    if (window.location.href.includes('?')) {
        loadFromUrl();
    }


    function loadFromUrl() {
        const url = window.location.href;
        //const query = BASE_URL + 'complexSearch' + url.substring(url.indexOf('?')) + '&apiKey=' + API_KEY + '&addRecipeNutrition=true&fillIngredients=true';
        const query = `${BASE_URL}complexSearch${url.substring(url.indexOf('?'))}&${API_KEY_QUERY_ITEM}&addRecipeNutrition=true&fillIngredients=true`; 
        console.log(query);
        fetchAndDisplayRecipes(query, findRecipesResultContainer, 'find', true);
        loadFormInputsFromURL();
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
            const query = `${BASE_URL}informationBulk?${API_KEY_QUERY_ITEM}&includeNutrition=true&ids=${IDs}`;

            fetchAndDisplayRecipes(query, savedRecipesResultContainer, 'saved', false);
        }
    }

    function fillIgnoredRecipes() {
        ignoredRecipes = JSON.parse(localStorage.getItem('ignoredRecipes'));
        ignoredRecipesResultContainer.empty();
        if (ignoredRecipes.length === 0) {
            ignoredRecipesResultContainer.text('You have no ignored recipes.');
        } else {
            let IDs = '';
            for (let i = 0; i < ignoredRecipes.length; i++) {
                IDs += ignoredRecipes[i];
                if (i != ignoredRecipes.length - 1) {
                    IDs += ',';
                }
            }

            let recipeNamesAndTitles = [];
            query = `${BASE_URL}informationBulk?${API_KEY_QUERY_ITEM}&ids=${IDs}`;
            fetch(query).then((resp) => {
                return resp.json();
            }).then((resp) => {
                console.log(resp);
                resp.forEach(recipe => {
                    recipeNamesAndTitles.push([recipe.title, recipe.id]); 
                });
            });
            console.log(recipeNamesAndTitles);
            console.log(recipeNamesAndTitles.length);

            const recipesToAppend = [];
            for (let i = 0; i < recipeNamesAndTitles.length; i++) {
                const ignoredRecipeContainer = $('<div>');
                let recipeName = recipeNamesAndTitles[i][0];
                let recipeID = recipeNamesAndTitles[i][1];
                console.log(recipeName);
                console.log(recipeID);
                const recipeNameContainer = $('<div>');
                recipeNameContainer.text(recipeName);
                recipeNameContainer.addClass("ignored-recipe-name");
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

        let query = '';

        query += '&number=50';


        if (caloriesInputValue != '') {
            //query = + '&' + caloriesMinMaxValue + 'Calories=' + caloriesInputValue;
            query += `&${caloriesMinMaxValue}Calories=${caloriesInputValue}`;
        }
        if (proteinInputValue != '') {
            query += '&' + proteinMinMaxValue + 'Protein=' + proteinInputValue;
        }
        if (carbsInputValue != '') {
            query += '&' + carbsMinMaxValue + 'Carbs=' + carbsInputValue;
        }
        if (fatInputValue != '') {
            query += '&' + fatMinMaxValue + 'Fat=' + fatInputValue;
        }
        if (includedIngredientsInputValue != '') {
            query += '&includeIngredients=' + includedIngredientsInputValue;
        }
        if (excludedIngredientsInputValue != '') {
            query += '&excludeIngredients=' + excludedIngredientsInputValue;
        }
        if (dietInputValue != 'none') {
            query += '&dietInputValue=' + dietInputValue;

        }
        query += '&type=' + foodTypeInputValue;

        const urlString = '?' + query.substring(1);

        query = `${BASE_URL}complexSearch?${API_KEY_QUERY_ITEM}${query}&addRecipeNutrition=true&fillIngredients=true`;

        window.history.pushState({}, '', urlString);

        fetchAndDisplayRecipes(query, findRecipesResultContainer, 'find', false);
        findRecipesResultContainer.animate({ scrollTop: 0 }, 'fast');
    });

    function fetchAndDisplayRecipes(query, resultContainer, type, fromURL) {
        const spinner = $('<div>').addClass("spinner");
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
                } else if (resp.totalResults > 5000 & type === 'find') { //In case of loading from URL - if url "parameters" are nonsensical, the query just return all the recipes (>5000). This cannot happen when using the app normally, because you have to choose some food type, which limits the number. Checking if the url is nonsencical would be too much effort, so i just act like it didnt query anything.
                    resultContainer.text('Recipes will appear here after searching for them.');
                } else {
                    if (fromURL) {
                        loadFormInputsFromURL();
                    }
                    const recipesToAppend = [];
                    let recipeArray;
                    if (type === 'find') {
                        recipeArray = resp.results;
                    } else if (type === 'saved') {
                        recipeArray = resp;
                    }
                    recipeArray.forEach(recipe => {
                        ignoredRecipes = JSON.parse(localStorage.getItem('ignoredRecipes'));
                        if ((type === 'find' & !ignoredRecipes.includes(recipe.id)) | type === 'saved') {
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
                    resultContainer.append(recipesToAppend);
                    if ($.trim(resultContainer.html()).length === 0 & type ==='find'){
                        //  Problem with ignored recipes - fetch only gets a certain number of recipes. If all fetched recipes are on the ignored list, nothing shows up.
                        //  There is no way to specify ignored recipes before fetching, so it is possible that the fetch result is just ignored recipes.
                        //  There could still be more recipes, but it would require fetching in a loop until i got to them (order of returned recipes is always the same, offset from start can be specified).
                        //  The API quota is not that high on the free version, and could get drained very fast this way. Thus i do not search for more recipes, even though they could exist.
                        resultContainer.text("All possible result are already in your ignored list. Consider buying our premium version to get access to even more recipes!");
                    }
                    if (type === 'find') {
                        toggleCriteria();
                    }
                }
            }
            catch (e) {
                if (type === 'find') {
                    resultContainer.empty();
                    resultContainer.text('An error has occured while searching for recipes.');
                } else if (type === 'saved') {
                    resultContainer.empty();
                    resultContainer.text('An error has occured while loading saved recipes.');
                }

            }

        });
    }

    function createRecipe(recipeData, type) {
        const recipeContainer = $('<div>');
        recipeContainer.attr('recipe-id', recipeData.id);
        const titleContainer = $('<h3>').addClass("recipe-title");
        titleContainer.text(recipeData.title);

        savedRecipes = JSON.parse(localStorage.getItem('savedRecipes'));
        if (savedRecipes.includes(recipeData.id)) {
            const savedIndicator = $('<i>').addClass("fas fa-star");
            titleContainer.append(savedIndicator);
        }

        const imageContainer = $('<img>');
        imageContainer.attr('src', recipeData.imageLink);
        imageContainer.attr('alt', 'image of ' + 'recipeData.title');
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
        buttonContainer.addClass("button-container");
        if (type === 'find') {
            const saveButton = $('<button>');
            saveButton.text('Save this recipe');
            saveButton.click(() => {
                savedRecipes = JSON.parse(localStorage.getItem('savedRecipes'));
                if (!savedRecipes.includes(recipeData.id) & savedRecipes.length <= 5) {
                    savedRecipes.push(recipeData.id);
                    const savedIndicator = $('<i>').addClass("fas fa-star");
                    titleContainer.append(savedIndicator);
                    localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
                } else if (!savedRecipes.includes(recipeData.id) & savedRecipes.length > 5) {
                    alert("You can only save up to 5 recipes at once.")
                }
            });

            const ignoreButton = $('<button>');
            ignoreButton.text('Dont show this recipe again');
            ignoreButton.click(() => {
                ignoredRecipes = JSON.parse(localStorage.getItem('ignoredRecipes'));
                if (!ignoredRecipes.includes(recipeData.id)) {
                    ignoredRecipes.push(recipeData.id);
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
        recipeNotImageContainer.addClass("not-image-container");
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
        recipeWrapper.addClass("recipe-wrapper");
        recipeWrapper.append(recipeNotImageContainer, canvas, imageContainer);

        recipeContainer.append(titleContainer, recipeWrapper);
        return recipeContainer;
    }

    function loadFormInputsFromURL() {
        const queryParametersString = window.location.href.substring(window.location.href.indexOf('?') + 1);
        const queryParametersArray = queryParametersString.split('&');
        queryParametersArray.forEach(parameter => {
            const name = parameter.split('=')[0];
            const value = parameter.split('=')[1];
            if (name === 'type') {
                foodTypeSelector.val(value);
            } else if (name === 'diet') {
                dietSelector.val(value);
            } else if (name === 'minCalories') {
                caloriesMinMaxSelector.val('min');
                caloriesInput.val(value);
            } else if (name === 'maxCalories') {
                caloriesMinMaxSelector.val('max');
                caloriesInput.val(value);
            } else if (name === 'minCarbs') {
                carbsMinMaxSelector.val('min');
                carbsInput.val(value);
            } else if (name === 'maxCarbs') {
                carbsMinMaxSelector.val('max');
                carbsInput.val(value);
            } else if (name === 'minFat') {
                fatMinMaxSelector.val('min');
                fatInput.val(value);
            } else if (name === 'maxFat') {
                fatMinMaxSelector.val('max');
                fatInput.val(value);
            } else if (name === 'includeIngredients') {
                includedIngredientsTextArea.val(value);
            } else if (name === 'excludeIngredients') {
                excludedIngredientsTextArea.val(value);
            }
        });
    }

});
