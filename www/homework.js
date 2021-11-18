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


const pepasAge = (year, birthYear) => {
    const ageOfPepa = year - birthYear;
    return ageOfPepa;
}

console.log("Pepa is " + pepasAge(2021, 1999) + " years old");




/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9. 
 */
// Solution here
const celsius1 = 10;
const fahrenheit1 = celsius1 * 9 / 5 + 32;
console.log(celsius1 + '°C = ' + fahrenheit1 + '°F');


const fahrenheit2 = 68;
const celsius2 = (fahrenheit2 - 32) * 5 / 9;
console.log(fahrenheit2 + '°F = ' + celsius2 + '°C')




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

function degrees1(celsius) {
    const fahrenheit = celsius * 9 / 5 + 32;
    return (celsius + '°C=' + fahrenheit + '°F');
}


const button1 = document.createElement('button');
button1.id = 'task-2-1';
button1.innerText = 'Uloha 2-1';
const taskButtons1 = document.getElementById('task-buttons');
taskButtons1.appendChild(button1);

function placeInf1() {
    const p = document.createElement("P");
    const resultText = document.querySelector('#result');
    p.innerText = degrees1(34);
    resultText.appendChild(p);
}

button1.onclick = placeInf1;


function degrees2(fahrenheit) {
    const celsius = (fahrenheit - 32) * 5 / 9;
    return (fahrenheit + '°F=' + celsius + '°C');
}

const button2 = document.createElement('button');
button2.id = 'task-2-2';
button2.innerText = 'Uloha 2-2';
const taskButtons2 = document.getElementById('task-buttons');
taskButtons2.appendChild(button2);

function placeInf2() {
    const p = document.createElement("P");
    const resultText = document.querySelector('#result');
    p.innerText = degrees2(65);
    resultText.appendChild(p);
}

button2.onclick = placeInf2;

/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla.
 * Výsledek vypište v procentech do předem vytvořeného místa na stránce pro výsledky, např. 21 je 50% z 42. Pro
 * zkrácení / zaokrouhlení desetinných míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2);
 * Pozor na dělení nulou!
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3
 */
// Solution here

function divisionNull(dividend, divider) {
    if (divider === 0) {
        return ("Cant be null");

    }
    const result = dividend / divider * 100;
    return (dividend + " je " + result.toFixed(2) + "% z " + divider);
}


const button3 = document.createElement('button');
button3.id = 'task-4';
button3.innerText = 'Uloha-4 ';
const taskButtons3 = document.getElementById('task-buttons');
taskButtons3.appendChild(button3);

function placeInf3() {
    const p = document.createElement("P");
    const resultText = document.querySelector('#result');
    p.innerText = divisionNull(40, 1);
    resultText.appendChild(p);
}

button3.onclick = placeInf3;


/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vypíše, který z nich je větší, do předem vytvořeného
 * místa na strácne. Pokud se čísla rovnají, vypište, že se rovnají.
 *
 * Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky, atd., tj. vytvoříte tlačítko s událostí pro každou
 * kombinaci argumentů a zkuste ji párkrát zavolat kliknutím na toto tlačítko. Tlačítka vytvářejte podle pokynu v
 * úloze č. 3. Argumenty pro volání funkce zadávejte staticky.
 */
// Solution here

function comparison(number1, number2) {
    if (number1 > number2) {
        return (number1 + " is bigger then " + number2);
    } else if (number1 < number2) {
        return (number1 + " is smaller than " + number2);
    } else {
        return (number1 + " equals " + number2);
    }

}

const button4 = document.createElement('button');
button4.id = 'task-5.1';
button4.innerText = 'Uloha-5.1 ';
const taskButtons4 = document.getElementById('task-buttons');
taskButtons4.appendChild(button4);

function placeInf4() {
    const p = document.createElement("P");
    const resultText = document.querySelector('#result');
    p.innerText = comparison(50, 51);
    resultText.appendChild(p);
}

button4.onclick = placeInf4;



const button5 = document.createElement('button');
button5.id = 'task-5.2';
button5.innerText = 'Uloha-5.2 ';
const taskButtons5 = document.getElementById('task-buttons');
taskButtons5.appendChild(button5);

function placeInf5() {
    const p = document.createElement("P");
    const resultText = document.querySelector('#result');
    p.innerText = comparison(45.678, 45.6775);
    resultText.appendChild(p);
}

button5.onclick = placeInf5;


const button6 = document.createElement('button');
button6.id = 'task-5.3';
button6.innerText = 'Uloha-5.3 ';
const taskButtons6 = document.getElementById('task-buttons');
taskButtons6.appendChild(button6);

function placeInf6() {
    const p = document.createElement("P");
    const resultText = document.querySelector('#result');
    p.innerText = comparison(0.567567, 0.567567);
    resultText.appendChild(p);
}

button6.onclick = placeInf6;


/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší
 * nebo rovno 730, včetě nuly. Používejte for cyklus.
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */
// Solution here
function division13() {
    let result = " ";
    for (let i = 0; i < 730; i += 13) {
        result += i + " ";
    }
    return result;
}

const button7 = document.createElement('button');
button7.id = 'task-6';
button7.innerText = 'Uloha-6 ';
const taskButtons7 = document.getElementById('task-buttons');
taskButtons7.appendChild(button7);

function placeInf7() {
    const p = document.createElement("P");
    const resultText = document.querySelector('#result');
    p.innerText = division13();
    resultText.appendChild(p);
}

button7.onclick = placeInf7;



/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu.
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
 * staticky.
 */
// Solution here
function square(radius) {
    const result = Math.PI * Math.pow(radius, 2);
    return ("Square of circle is " + result.toFixed(1) + " m2");
}

const button8 = document.createElement('button');
button8.id = 'task-7';
button8.innerText = 'Uloha-7 ';
const taskButtons8 = document.getElementById('task-buttons');
taskButtons8.appendChild(button8);

function placeInf8() {
    const p = document.createElement("P");
    const resultText = document.querySelector('#result');
    p.innerText = square(10);
    resultText.appendChild(p);
}

button8.onclick = placeInf8;


/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr.
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
 * staticky.
 */
// Solution here

function volume(radius, height) {
    const result = Math.PI * Math.pow(radius, 2) * height / 3;
    return ("Volume of Cone is " + result + "m3");
}

const button9 = document.createElement('button');
button9.id = 'task-8';
button9.innerText = 'Uloha-8 ';
const taskButtons9 = document.getElementById('task-buttons');
taskButtons9.appendChild(button9);

function placeInf9() {
    const p = document.createElement("P");
    const resultText = document.querySelector('#result');
    p.innerText = volume(10, 10);
    resultText.appendChild(p);
}

button9.onclick = placeInf9;

/**
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z
 * dodaných 3 délek na argumentu funkce dá postavit trojúhelník, tj. vypíše tyto 3 délky stran a, b, a c
 * a výsledek buď ano/ne, true/yes nebo false/no. Z funkce vraťte hodnotu true/false
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
 * staticky.
 */
// Solution here

function triangle(a, b, c) {
    if (a < 0 || b < 0 || c < 0) {
        return ("cant be lower than null");
    } else if (a > b + c || b > a + c || c > a + b) {
        return false;
    } else if (a < b + c && b < a + c && c < a + b) {
        return true;
    }
}

const button10 = document.createElement('button');
button10.id = 'task-9';
button10.innerText = 'Uloha-9 ';
const taskButtons10 = document.getElementById('task-buttons');
taskButtons10.appendChild(button10);

function placeInf10() {
    const p = document.createElement("P");
    const resultText = document.querySelector('#result');
    p.innerText = triangle(10, 5, 8);
    resultText.appendChild(p);
}

button10.onclick = placeInf10;






/**
 * 10) Heroic performance. Vytvořte funkci, která vypočte a vypíše obsah trojúhelníka podle Heronova vzorce,
 * tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci v úloze č. 9, tj. počítejte pouze,
 * když to má smysl. Hint: funkce pro odmocninu je Math.sqrt().
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
 * staticky.
 */
// Solution here
// - krok 1 - vytvořte funkci
//   - krok 1.1 - pomocí selektoru vyberte container pro výpis výsledků a uložte ho do proměnné
//   - krok 1.2 - zvalidujte vstupní argumenty pomocí funkce z úlohy č. 9
//     - v případě nevalidních hodnot vypište chybovou hlášku na místo pro výpis výsledků a funkci ukončete
//     - v případě validních hodnot pokračujte s výpočtem
//   - krok 1.3 - spočítejte obsah trojúhelníku podle Heronovy vzorce a výsledek uložte do proměnné
//   - krok 1.4 - vypište výsledek na místo pro výpis výsledků
// - krok 2 - vytvořte tlačítko
// - krok 3 - nabindujte na toto tlačítko callback, ve kterém zavoláte implementovanou funkci pro výpočet a výpis výsledků
// - krok 4 - tlačítko umístěte na stránku
// - krok 5 - otestujte řešení klikáním na tlačítko

function formulaHeronova(a, b, c) {
    if (triangle(a, b, c) === true) {

        const halfPerimeter = (a + b + c) / 2;
        const result = Math.sqrt(halfPerimeter * (halfPerimeter - a) * (halfPerimeter - b) * (halfPerimeter - c));
        return result;
    } else {
        return ("Square cant be counted");
    }
}


const button11 = document.createElement('button');
button11.id = 'task-10';
button11.innerText = 'Uloha-10 ';
const taskButtons11 = document.getElementById('task-buttons');
taskButtons11.appendChild(button11);

function placeInf11() {
    const p = document.createElement("P");
    const resultText = document.querySelector('#result');
    p.innerText = formulaHeronova(10, 5, 8);
    resultText.appendChild(p);
}

button11.onclick = placeInf11;