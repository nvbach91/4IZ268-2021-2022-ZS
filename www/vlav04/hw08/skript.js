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
const birthdayPepes = 1998;
const thisYear = new Date().getFullYear();
const agePepes = thisYear - birthdayPepes;
console.log(agePepes);

/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9. 
 */

// Solution here
const celsius = 20;
const fahrenheiht = 68;
const celsiusToFahrenheiht = celsius * 9 / 5 + 32;
const fahrenheihtToCelsius = (fahrenheiht - 32) * 5 / 9;
console.log("Celsius to Fahrenheiht: " + celsiusToFahrenheiht);
console.log("Fahrenheiht to Celsius: " + fahrenheihtToCelsius);

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
function pepesAge(birthdayPepes) {
    const thisYear1 = new Date().getFullYear();
    return ("Pepe's Age: " + (thisYear1 - birthdayPepes));
}

function CelsiusToFahrenheiht(celsius) {
    return ("Celsius to Fahrenheit: " + (celsius * 9 / 5 + 32));
}

function FahrenheihtToCelsius(fahrenheiht) {
    return ("Fahrenheit to Celsius: " + (fahrenheiht - 32) * 5 / 9);
}

const taskButtons = document.getElementById('task-buttons');
const result = document.getElementById('result');

const button1 = document.createElement('button');
button1.innerText = 'Uloha 1 (Pepes age)';
button1.id = 'task-1';
button1.addEventListener('click', () => {
    result.innerText = (pepesAge(window.prompt("Pepes year of birth: ")));
});
taskButtons.appendChild(button1);

const button2 = document.createElement('button');
button2.innerText = 'Uloha 2 (Celsius to Fahrenheit)';
button2.id = 'task-2';
button2.addEventListener('click', () => {
    result.innerText = (CelsiusToFahrenheiht(window.prompt("Temperature in Celsius: ")));
});
taskButtons.appendChild(button2);

const button3 = document.createElement('button');
button3.innerText = 'Uloha 3 (Fahrenheit to Celsius)';
button3.id = 'task-3';
button3.addEventListener('click', () => {
    result.innerText = (FahrenheihtToCelsius(window.prompt("Temperature in Fahrenheit: ")));
});
taskButtons.appendChild(button3);

/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla. 
 * Výsledek vypište v procentech do předem vytvořeného místa na stránce pro výsledky, např. 21 je 50% z 42. Pro 
 * zkrácení / zaokrouhlení desetinných míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); 
 * Pozor na dělení nulou! 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3
 */

// Solution here
function percentage(num1, num2) {
    if (num2 == 0) {
        return ("Pozor, dělení nulou!");

    }
    else {
        const result = (num1 / num2 * 100);

        return (num1 + " je " + result.toFixed(0) + "% z " + num2);
    }
}

const button4 = document.createElement('button');
button4.innerText = 'Uloha 4 (Percentage)';
button4.id = 'task-4';
button4.addEventListener('click', () => {
    result.innerText = (percentage(window.prompt("1 number: "), window.prompt("2 number: ")));
});
taskButtons.appendChild(button4);

/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vypíše, který z nich je větší, do předem vytvořeného 
 * místa na strácne. Pokud se čísla rovnají, vypište, že se rovnají. 
 * 
 * Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky, atd., tj. vytvoříte tlačítko s událostí pro každou
 * kombinaci argumentů a zkuste ji párkrát zavolat kliknutím na toto tlačítko. Tlačítka vytvářejte podle pokynu v 
 * úloze č. 3. Argumenty pro volání funkce zadávejte staticky.
 */


// Solution here
function comparison(num1, num2) {
    if (num1 == num2) {
        return ("Čísla se rovnají");
    } 
    else {
        if (num1 > num2) {
            return (num1 + " je větší než " + num2);
        }
        else {
            return (num2 + " je větší než " + num1);
        }
    }
}

const button5 = document.createElement('button');
button5.innerText = 'Uloha 5 (Kdo s koho)';
button5.id = 'task-5';
button5.addEventListener('click', () => {
    result.innerText = (comparison(window.prompt("1 number: "), window.prompt("2 number: ")));
});
taskButtons.appendChild(button5);

/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for cyklus. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */

// Solution here
function multiple() {
    let t = ''; 
    for (let i = 0; i <= 730 ; i++) {
        if (i % 13 == 0){
            t += i + ' ';
        }
    }
    return t;
}

const button6 = document.createElement('button');
button6.innerText = 'Uloha 6 (I can cleary see the pattern)';
button6.id = 'task-6';
button6.addEventListener('click', () => {
    result.innerText = (multiple());
});
taskButtons.appendChild(button6);

/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */

// Solution here
function square(radius) {
    let s = Math.PI * Math.pow(radius, 2);
    return ("Area of a circle: " + s.toFixed(2));
}

const button7 = document.createElement('button');
button7.innerText = 'Uloha 7 (Around and about)';
button7.id = 'task-7';
button7.addEventListener('click', () => {
    result.innerText = (square(window.prompt("Radius: ")));
});
taskButtons.appendChild(button7);

/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */

// Solution here
function coneVolume(height, radius) {
    let v = 1 / 3 * Math.PI * Math.pow(radius, 2) * height;
    return ("Cone volume: " + v.toFixed(2));
}
const button8 = document.createElement('button');
button8.innerText = 'Uloha 8 (Another dimension)';
button8.id = 'task-8';
button8.addEventListener('click', () => {
    result.innerText = (coneVolume(window.prompt("Height: "), window.prompt("Radius: ")));
});
taskButtons.appendChild(button8);

/** 
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z 
 * dodaných 3 délek na argumentu funkce dá postavit trojúhelník, tj. vypíše tyto 3 délky stran a, b, a c
 * a výsledek buď ano/ne, true/yes nebo false/no. Z funkce vraťte hodnotu true/false
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */

// Solution here
function isTriangle(d1, d2, d3) {
    var flag = false;
    if ((d1 + d2 > d3) || (d1 + d3 > d2) || (d2 + d3 > d1)){
        return 'Možné vytvořit trojúhelník'
    } else {
        return 'Není možné vytvořit trojúhelník'
    }
}

const button9 = document.createElement('button');
button9.innerText = 'Uloha 9 (Not sure if triangle, or just some random values)';
button9.id = 'task-9';
button9.addEventListener('click', () => {
    result.innerText = (isTriangle(window.prompt("Délka 1: "), window.prompt("Délka 2: "), window.prompt("Délka 3: ")));
});
taskButtons.appendChild(button9);

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
