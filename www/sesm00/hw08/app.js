/* HOMEWORK */
/**
 * 0) Pre-preparacion.
 * - Vytvořte HTML stránku s nadpisem h1 "JavaScript is awesome!"
 * - Na stránce vytvořte místo pro umístění jednotlivých spouštěčů úkolů - tlačítek (tj. div, který má id s hodnotou "task-buttons").
 * - Na stránce vytvořte místo pro výpis výsledků úkolů (div, který má id s hodnotou "result").
 *
 * - Připojte tento homework.js soubor k vytvořené HTML stránce pomocí tagu <script> (viz LAB) a vyzkoušejte
 * console.log('Ahoj světe');
 */

console.log('Ahoj světe');

/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu s věkem Pepy, pokud znáte jeho rok narození,
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů nebo interpolaci. Pro názvy proměnných
 * používejte smysluplnou angličtinu.
 */
// Solution here
let age = 18;
console.log('Pepe\'s age is ' + age);




/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak.
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32.
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9.
 */
// Solution here
let celsius = 20.0;
let fahrenheit = 68.0;

console.log('20°C = ' + ((celsius * 9.0 / 5.0) + 32.0));
console.log('68°F = ' + ((fahrenheit - 32.0) * 5.0 / 9.0));

/**
 * 3) Funkce function fonction funktio. Vemte předchozí úlohy a udělejte z nich funkce. Tj. vytvoříte funkce,
 * které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli.
 * Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce.
 *
 * Pro testování funkce:
 * - Pouze pomocí JavaScriptu (bez knihoven) vytvořte HTML tlačítko s názvem této úlohy, resp. co funkce dělá, a
 * id s číslem úlohy <button id="task-1">Uloha 1 (Pepe's age)</button>, umístěte ho na stránku do předem vytvořeného
 * místa <div id="tasks"></div> a pomocí posluchače události "click" nabindujte implementovanou funkci na toto tlačítko.
 *
 * Výsledkem má být tlačítko, na které když kliknete, tak se provede to, co je implementováno ve funkci.
 *
 */
// Solution here

getPepesAge(12);
getPepesAge(18);
getPepesAge(30);

function getPepesAge(age) {
    console.log('Pepe\'s age is ' + age);
}

getFahrenheihtFromCelsius(30.0);
getFahrenheihtFromCelsius(35.0);
getFahrenheihtFromCelsius(40.0);

function getFahrenheihtFromCelsius(celsius) {
    console.log('20°C = ' + ((celsius * 9.0 / 5.0) + 32.0));
}

getCelsiusFromFahrenheiht(68.0);
getCelsiusFromFahrenheiht(70.0);
getCelsiusFromFahrenheiht(72.0);

function getCelsiusFromFahrenheiht(fahrenheit) {
    console.log('68°F = ' + ((fahrenheit - 32.0) * 5.0 / 9.0));
}

const tasks = document.getElementById('task-buttons');

function createButton(id, name, event) {
    const but = document.createElement('button');
    but.innerHTML = name;
    but.id = 'task-' + id;
    but.addEventListener('click', event);
    tasks.appendChild(but);
    return but;
}

createButton(1, 'Uloha 1 (Pepe\'s age)', function() {
    getPepesAge(age);
});


/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla.
 * Výsledek vypište v procentech do předem vytvořeného místa na stránce pro výsledky, např. 21 je 50% z 42. Pro
 * zkrácení / zaokrouhlení desetinných míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2);
 * Pozor na dělení nulou!
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3
 */
// Solution here

const results = document.getElementById('result');

function numbersToPercent(baseNum, numToCheck) {
    let result;
    if (baseNum == 0) {
        result = 0;
    } else {
        result = ((numToCheck / baseNum) * 100).toFixed(2);
    }
    results.innerHTML = (result + '%');
}


createButton(2, 'Uloha 2 (%CENSORED%)', function() {
    numbersToPercent(100.0, 50.0);
});


/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vypíše, který z nich je větší, do předem vytvořeného
 * místa na strácne. Pokud se čísla rovnají, vypište, že se rovnají.
 *
 * Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky, atd., tj. vytvoříte tlačítko s událostí pro každou
 * kombinaci argumentů a zkuste ji párkrát zavolat kliknutím na toto tlačítko. Tlačítka vytvářejte podle pokynu v
 * úloze č. 3. Argumenty pro volání funkce zadávejte staticky.
 */
// Solution here

function compareNumbers(num1, num2) {
    let result;
    if (num1 > num2) {
        result = num1;
    } else if (num2 > num1) {
        result = num2;
    } else {
        result = 'numbers are even';
    }
    results.innerHTML = result;
}

createButton(3, 'Uloha 3 (Kdo z koho - INT)', function() {
    compareNumbers(100, 50);
});

createButton(4, 'Uloha 3 (Kdo z koho - FLOAT)', function() {
    compareNumbers(88.5, 88.2);
});

createButton(5, 'Uloha 3 (Kdo z koho - FRACTION)', function() {
    compareNumbers(1/2, 1/3);
});

/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší
 * nebo rovno 730, včetě nuly. Používejte for cyklus.
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */
// Solution here

function multiplesOf13() {
    let result = '';
    for(let i = 1; (i * 13) <= 730; i++) {
        result += (i * 13) + '<br>';
    }
    results.innerHTML = result;
}

createButton(6, 'Uloha 4 (I can cleary see the pattern)', function () {
    multiplesOf13();
});

/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu.
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
 * staticky.
 */
// Solution here

function computeCircleSize(radius) {
    results.innerHTML = (Math.PI * Math.pow(radius, 2)).toString();
}

createButton(7, 'Uloha 5 (Around and about)', function () {
   computeCircleSize(5.0);
});

/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr.
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
 * staticky.
 */

function getConeSize(height, radius) {
    results.innerHTML = ((1/3) * Math.PI * Math.pow(radius, 2) * height).toString();
}

createButton(8, 'Uloha 6 (Another dimension)', function () {
    getConeSize(12.0, 9.0);
})



/**
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z
 * dodaných 3 délek na argumentu funkce dá postavit trojúhelník, tj. vypíše tyto 3 délky stran a, b, a c
 * a výsledek buď ano/ne, true/yes nebo false/no.
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
 * staticky.
 */

function isTriangle(a, b, c) {
    results.innerHTML = `a = ${a}, b = ${b}, c = ${c} <br>` + (((a + b) > c) ? 'ano' : 'ne');
}

createButton(9, 'Uloha 7 (Not sure if triangle)', function () {
    isTriangle(3, 3, 5);
});

/**
 * 10) Heroic performance. Vytvořte funkci, která vypočte a vypíše obsah trojúhelníka podle Heronova vzorce,
 * tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci v úloze č. 9, tj. počítejte pouze,
 * když to má smysl. Hint: funkce pro odmocninu je Math.sqrt().
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
 * staticky.
 */

function heronTriangleSize(a, b, c) {
    let result;
    if ((a + b) > c) {
        result = a + b + (c * 2);
    } else {
        result = 'Not a triangle';
    }
    results.innerHTML = result;
}

createButton(10, 'Uloha 8 (Heroic performance)', function () {
    heronTriangleSize(5, 6, 10);
});

