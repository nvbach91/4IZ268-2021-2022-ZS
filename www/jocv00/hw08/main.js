console.log("Ahoj světe");

const taskButtons = document.querySelector("#task-buttons");

/* HOMEWORK */
/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu ohledně věku Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů. Pro názvy proměnných používejte smysluplnou 
 * angličtinu.
 */
// Solution here

let yearOfBirth = 1999;

let age = new Date().getFullYear() - yearOfBirth;
console.log("Pepe is " + age + " year" + (age == 1 ? "" : "s") + " old.");

/**
 * 2) WTF (wow, that's fun). Vypište teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Výpočet probíhá takto:
 *     z C na F: vynásobit devíti, vydělit pěti a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit pěti a vydělit devítkou. 
 */
// Solution here

//C -> F

let celsius = 10;
let farenheit = celsius * 9 / 5 + 32;
console.log(celsius + "°C = " + farenheit + "°F");


//F -> C

farenheit = 50;
celsius = (farenheit - 32) * 5 / 9;
console.log(farenheit + "°F = " + celsius + "°C");


/**
 * 3) Funkce function fonction funktio. Vemte předchozí úlohy a udělejte z nich funkce. Tj. vytvořte funkce, 
 * které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli. 
 * Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce. 
 */
// Solution here

function getAge(yearOfBirth, monthOfBirth, dayOfBirth) {
    let today = new Date();
    let thisDay = today.getDay();
    let thisMonth = today.getMonth() + 1;
    let thisYear = today.getFullYear();

    let age = thisYear - yearOfBirth;

    if (yearOfBirth > thisYear || monthOfBirth > 12 || monthOfBirth < 1 || dayOfBirth > 31 || dayOfBirth < 1) {
        console.log("Wrong input");
        return;
    } else if (thisMonth < monthOfBirth || (thisMonth == monthOfBirth && thisDay < dayOfBirth)) {
        age = age - 1;
    }
    let result = "Pepe is " + age + " year" + (age == 1 ? "" : "s") + " old."
    return result;
}


function getFarenheit(celsius) {
    let farenheit = celsius * 9 / 5 + 32;
    let result = celsius + "°C = " + farenheit + "°F";
    return result;
}

function getCelsius(farenheit) {
    let celsius = (farenheit - 32) * 5 / 9;
    let result = farenheit + "°F = " + celsius + "°C"
    return result;
}



const button3 = document.createElement("button");
button3.innerText = "Úloha 3";
button3.id = "task-3";
taskButtons.appendChild(button3);

button3.addEventListener('click', () => {
    appendText3();
});

function appendText3() {
    const resultSpace = document.querySelector("#result");
    const p = document.createElement("P");
    p.innerText = getCelsius(40);
    resultSpace.appendChild(p);
}


/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla 
 * v procentech. Výsledek vypište do konzole, např. 21 je 50% z 42. Pro zkrácení / zaokrouhlování desetinných 
 * míst použijte funkci .toFixed(n). Např. let pi = 3.1415926535; pi.toFixed(2); Pozor na dělení nulou! 
 */
// Solution here

function percentage(x, y) {
    if (y == 0) {
        return;
    }
    let result = x / y * 100;
    result = x + " je " + result.toFixed(0) + "% z " + y;
    return result;
}

const button4 = document.createElement("button");
button4.innerText = "Úloha 4";
button4.id = "task-4";
taskButtons.appendChild(button4);

button4.addEventListener('click', () => {
    appendText4();
});

function appendText4() {
    const resultSpace = document.querySelector("#result");
    const p = document.createElement("P");
    p.innerText = percentage(40, 100);
    resultSpace.appendChild(p);
}


/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí ten větší z nich. Pokud se čísla 
 * rovnají, vypište, že se rovnají. Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky. Zkuste 
 * je párkrát zavolat v kódu a výsledky uložit do proměnných. 
 */
// Solution here

function returnBigger(x, y) {
    if (x > y) {
        let result = x + " je větší než " + y;
        return x + " je větší než " + y;
    } else if (y > x) {
        let result = y + " je větší než " + x;
        return result;
    } else {
        let result = x + " a " + y + " se rovná";
        return result;
    }
}

const button5_1 = document.createElement("button");
button5_1.innerText = "Úloha 5.1";
button5_1.id = "task-5.1";
taskButtons.appendChild(button5_1);

button5_1.addEventListener('click', () => {
    appendText5_1();
});

function appendText5_1() {
    const resultSpace = document.querySelector("#result");
    const p = document.createElement("P");
    p.innerText = returnBigger(40, -100);
    resultSpace.appendChild(p);
}

const button5_2 = document.createElement("button");
button5_2.innerText = "Úloha 5.2";
button5_2.id = "task-5.2";
taskButtons.appendChild(button5_2);

button5_2.addEventListener('click', () => {
    appendText5_2();
});

function appendText5_2() {
    const resultSpace = document.querySelector("#result");
    const p = document.createElement("P");
    p.innerText = returnBigger(49.123, 41.12);
    resultSpace.appendChild(p);
}

const button5_3 = document.createElement("button");
button5_3.innerText = "Úloha 5.3";
button5_3.id = "task-5.3";
taskButtons.appendChild(button5_3);

button5_3.addEventListener('click', () => {
    appendText5_3();
});

function appendText5_3() {
    const resultSpace = document.querySelector("#result");
    const p = document.createElement("P");
    p.innerText = returnBigger(5 / 7, 7 / 5);
    resultSpace.appendChild(p);
}

/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for loop. 
 */
// Solution here

function printMultiples() {
    let result = "";
    for (y = 0, multiple = 13; y * multiple <= 730; y++) {
        result = result + " " + y * multiple;
    }
    return result;
}

const button6 = document.createElement("button");
button6.innerText = "Úloha 6";
button6.id = "task-6";
taskButtons.appendChild(button6);

button6.addEventListener('click', () => {
    appendText6();
});

function appendText6() {
    const resultSpace = document.querySelector("#result");
    const p = document.createElement("P");
    p.innerText = printMultiples();
    resultSpace.appendChild(p);
}


/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 */
// Solution here

function circleArea(radius) {
    let area = Math.PI * Math.pow(radius, 2);
    return area;
}

const button7 = document.createElement("button");
button7.innerText = "Úloha 7";
button7.id = "task-7";
taskButtons.appendChild(button7);

button7.addEventListener('click', () => {
    appendText7();
});

function appendText7() {
    const resultSpace = document.querySelector("#result");
    const p = document.createElement("P");
    p.innerText = circleArea(5);
    resultSpace.appendChild(p);
}

/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 */
// Solution here

function coneVolume(radius, height) {
    let volume = Math.PI * Math.pow(radius, 2) * (height / 3);
    return volume;
}

const button8 = document.createElement("button");
button8.innerText = "Úloha 8";
button8.id = "task-8";
taskButtons.appendChild(button8);

button8.addEventListener('click', () => {
    appendText8();
});

function appendText8() {
    const resultSpace = document.querySelector("#result");
    const p = document.createElement("P");
    p.innerText = coneVolume(10, 20);
    resultSpace.appendChild(p);
}


/** 
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z 
 * dodaných 3 délek dá postavit trojúhelník, tj. vypíše buď true/yes nebo false/no. 
 */
// Solution here

function isTriangle(a, b, c) {

    let array = [a, b, c];
    array = array.sort(function (a, b) {
        return a - b;
    });

    let isTriangle = (array[0] + array[1] > array[2]) ? true : false;
    return isTriangle;
}

const button9 = document.createElement("button");
button9.innerText = "Úloha 9";
button9.id = "task-9";
taskButtons.appendChild(button9);

button9.addEventListener('click', () => {
    appendText9();
});

function appendText9() {
    const resultSpace = document.querySelector("#result");
    const p = document.createElement("P");
    p.innerText = isTriangle(2, 2, 3);
    resultSpace.appendChild(p);
}


/**
 * 10) Heroic performance. Vytvořte funkci, která vypočte obsah trojúhelníka podle Heronova vzorce, 
 * tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci, tj. počítejte pouze, 
 * když to má smysl. Hint: funkce pro odmocninu je Math.sqrt() 
 */
// Solution here

function triangleArea(a, b, c) {
    if (isTriangle(a, b, c) == true) {
        let s = (a + b + c) / 2;
        let final = Math.sqrt(s * (s - a) * (s - b) * (s - c))
        return final;
    } else {
        return;
    }
}
const button10 = document.createElement("button");
button10.innerText = "Úloha 10";
button10.id = "task-10";
taskButtons.appendChild(button10);

button10.addEventListener('click', () => {
    appendText10();
});

function appendText10() {
    const resultSpace = document.querySelector("#result");
    const p = document.createElement("P");
    p.innerText = triangleArea(10, 92, 99);
    resultSpace.appendChild(p);
}
    