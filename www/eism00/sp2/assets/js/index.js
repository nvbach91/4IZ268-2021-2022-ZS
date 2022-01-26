var userInput = document.getElementById('number-questions');
var defaultVal = "";
var difficulty = "";
var category = "";

const categories = [{"trivia_categories":[
    {"id":9,"name":"General Knowledge"},
    {"id":17,"name":"Science & Nature"},
    {"id":20,"name":"Mythology"},
    {"id":21,"name":"Sports"},
    {"id":22,"name":"Geography"},
    {"id":23,"name":"History"}]}];

function handleDifficulty(){
    if(document.getElementById('easy').checked === true) {
        difficulty = document.getElementById('easy').value;
    } else if (document.getElementById('medium').checked === true){
        difficulty = document.getElementById('medium').value;
    } else if (document.getElementById('hard').checked === true){
        difficulty = document.getElementById('hard').value;
    } else {
        alert("Choose a difficulty");
        document.getElementById('start-game').href="";
    }
    localStorage.setItem('difficulty',difficulty);
}

function handleInput() {
    defaultVal = userInput.valueAsNumber;
    if (isNaN(defaultVal) || (defaultVal <= 0)) {
        alert("Input a number bigger than 0");
        document.getElementById('start-game').href="";
    }
    else {
        localStorage.setItem('numQue',defaultVal);
        handleDifficulty();
        getCategory();
    }
}

function getCategory() {
    var matchedValue = ""
    var selectedValue = document.getElementById('category').value
    var jsonPrep = categories[0].trivia_categories
    $.each(jsonPrep, function(key, value) {
        if (selectedValue === value.name) {
            matchedValue = value.id
        }
    })
    if (!selectedValue) {
        alert("Choose a category");
        document.getElementById('start-game').href="";
    } else {
        localStorage.setItem('idCat',matchedValue);
    }
}



