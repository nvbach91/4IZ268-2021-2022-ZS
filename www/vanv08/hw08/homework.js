// 0 ukol

console.log('Chaotic good');
console.log('Nenapadl mne appendovat text do results, tak jsem to delal pres input fields');



// Prvni ukol

function logPepeAge() {
    var pepeAge = null;
    if (!!pepeAge) {
        console.log('Pepe\'s age is: ' + pepeAge);
        document.getElementById("pepe_field").value = pepeAge;
    } else {
        console.log('I dont know Pepe\'s age)');
        document.getElementById("pepe_field").value = 'I dont know Pepe\s age';
    }
}

var age = document.getElementById("task-1");
age.addEventListener("click", logPepeAge, true);

// Druhy ukol jedno z nich musi byt null aby se mohla vypocitat ta druha

function tempConverter() {
    var celsius_value = document.getElementById("celsius_value").value;
    var fahrenheiht_value = document.getElementById("fahrenheiht_value").value;

    var temperatureOutput_field = document.getElementById.bind(document); // pouze jednou document.getElementId

    function celsiusToF(celsius_value) {
        return ((celsius_value * 9) / 5) + 32;
    }

    function fahrenheihtToC(fahrenheiht_value) {
        return ((fahrenheiht_value - 32) * 5) / 9;
    }

    if (!!fahrenheiht_value && !celsius_value) {
        console.log('Fahrenheit to celsius is: ' + fahrenheihtToC(fahrenheiht_value).toFixed(2) + 'C');
        temperatureOutput_field("temperature").value = parseFloat(fahrenheihtToC(fahrenheiht_value).toFixed(2)) + 'C';
    } else if (!fahrenheiht_value && !!celsius_value) {
        console.log('Celsius to fahrenheiht is: ' + celsiusToF(celsius_value).toFixed(2) + 'F');
        temperatureOutput_field("temperature").value = parseFloat(celsiusToF(celsius_value).toFixed(2)) + 'F';
    } else {
        console.log('Obe hodnty jsou null nebo si vyplnil obe cisla');
        temperatureOutput_field("temperature").value = "Error";


    }
}

const temperatureButton = document.getElementById("task-2");
temperatureButton.addEventListener("click", tempConverter, true);

// Cvrty ukol

function division() {
    var x = document.getElementById("x").value;
    var y = document.getElementById("y").value;
    if (x != y) {
        result = (x / y) * 100;
        console.log('X je mensi nez Y a vysledek deleni je: ' + parseFloat(result.toFixed(2)) + '%');
        document.getElementById("task-4-result").value = parseFloat(result.toFixed(2)) + '%';
    } else if (x = y) {
        console.log('Cisla se rovnaji');
        document.getElementById("task-4-result").value = "cisla se rovnaji";
    } else if (y = 0) {
        console.log('Nelze delit nulou')
        document.getElementById("task-4-result").value = "Nelze delit nulou";
    } else {
        document.getElementById("task-4-result").value = "Something wrong..";
    }
}

const divisionButton = document.getElementById("task-4");
divisionButton.addEventListener("click", division, true);

// Paty ukol

function comparision() {
    // var a = document.getElementById("a").value;
    // var b = document.getElementById("b").value;

    var a = -1.3;
    var b = 3;
    if (a > b) {
        console.log('Cislo A je vetsi nez B');
        document.getElementById("comparasion_field").value = "Cislo " + a + ' je vetsi nez ' + b;
    } else if (a < b) {
        console.log('Cislo A je mensi nez B');
        document.getElementById("comparasion_field").value = "Cislo " + a + ' je mensi nez ' + b;
    } else {
        console.log('pici');
    }
}

const compareButton = document.getElementById("task-5");
compareButton.addEventListener("click", comparision, true);

// Sesty ukol

function thirteenReasonWhy() {
    let pattern_string = '';
    for (let i = 0; i <= 730; i += 13) {
        pattern_string += i + ' ';

    }
    console.log(pattern_string);
    var div = document.getElementById("target_result");
    div.innerText += pattern_string; // zmemeno na innerText - ale, nic se nezmenilo?

}

const cycleButton = document.getElementById("task-6");
cycleButton.addEventListener("click", thirteenReasonWhy, true);

// Sedmy ukol

function calcAreaCircle() {
    var radius = 5;
    if (!!radius || radius != 0) {
        S = Math.pow(radius, 2) * Math.PI;
        console.log(S.toFixed(2));
        document.getElementById("circleArea_field").value = S.toFixed(2);
    } else {
        console.log("Invalid argument")
        document.getElementById("circleArea_field").value = 'Invalid argument';
    }

}
const circleButton = document.getElementById("task-7");
circleButton.addEventListener("click", calcAreaCircle, true);

// Osmy ukol

function calcVolCone(radius, height) {
    // Deklerace polomeru a vysky
    var radius = 2;
    var height = 3;
    var V; // inicializace promene V?

    if (!radius || radius == 0 || !height || height == 0) {
        console.log("Spatny argumenty");
        document.getElementById("volumeCone_field").value = 'Invalid Argument'
    } else {
        V = 1 / 3 * Math.PI * Math.pow(radius, 2) * height;
        console.log(V.toFixed(2));
        document.getElementById("volumeCone_field").value = V.toFixed(2);

    }
}
const volumeButton = document.getElementById("task-8");
volumeButton.addEventListener("click", calcVolCone, true);


// Devaty ukol

// We know that the sum of any 2 sides of a triangle should be greater than the third side.


function sumSideCheck(side1, side2, side3) {
    if (side1 + side2 > side3 && side1 + side3 > side2 && side2 + side3 > side1) {
        console.log('YES');
        // document.getElementById("trianglePossible_field").value = 'YES';
        return true;
    } else {
        console.log('NO');
        // document.getElementById("trianglePossible_field").value = 'NO';
        return false;
    }
}


function sumSideCheckFill() {
    // DEKLERACE STRAN PRO UKOL 9
    var side1 = 5;
    var side2 = 5;
    var side3 = 6;
    if (sumSideCheck(side1, side2, side3) == true) {
        document.getElementById("trianglePossible_field").value = 'YES';
    } else {
        document.getElementById("trianglePossible_field").value = 'NO';
    }
}
const checkSides = document.getElementById("task-9");
checkSides.addEventListener("click", sumSideCheckFill, true);

// Desaty ukol

function Hero() {
    var side1 = 2;
    var side2 = 2;
    var side3 = 3;
    var s;
    var S;
    if (sumSideCheck(side1, side2, side3) == true) {
        s = (side1 + side2 + side3) / 2;
        S = Math.sqrt((s * (s - side1) * (s - side2) * (s - side3)));
        console.log('Obsah je: ' + S.toFixed(2));
        document.getElementById("triangleArea_field").value = S.toFixed(2);

    } else {
        document.getElementById("triangleArea_field").value = 'Triangle is impossible';
    }
}
const huronButton = document.getElementById("task-10");
huronButton.addEventListener("click", Hero, true);