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

console.log('Hello, World!');

/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu s věkem Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů nebo interpolaci. Pro názvy proměnných 
 * používejte smysluplnou angličtinu.
 */
// Solution here

let birth = 2000;
let age = new Date().getFullYear() - birth;
console.log('Pepe is or will be ' + age + ' years old this year!')

/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9. 
 */
// Solution here

let temperatureInCelsius = 30;
let temperatureInFahrenheit = 451;

let resultInFahrenheit = temperatureInCelsius * 9 / 5 + 32;
let resultInCelsius = (temperatureInFahrenheit - 32) * 5 / 9

console.log(temperatureInCelsius + '°C = ' + resultInFahrenheit + '°F')
console.log(temperatureInFahrenheit + '°F = ' + resultInCelsius + '°C')

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

const hello = () => {
    return 'Hello, World!';
}

const printAge = (birth) => {
    let age = new Date().getFullYear() - birth;
    return 'Pepe is or will be ' + age + ' years old this year!';
}

const toFahrenheit = (celsius) => {
    let result = celsius * 9 / 5 + 32;
    return celsius + '°C = ' + result + '°F'
}

const toCelsius = (fahrenheit) => {
    let result = fahrenheit * 9 / 5 + 32;
    return fahrenheit + '°F = ' + result + '°C';
}

const createButton = (id, text, action) => {
    const button = document.createElement('button');
    button.id = id;
    button.innerText = text;
    button.addEventListener('click', () => {
        document.getElementById('result').innerText = action;
    })
    document.getElementById('task-buttons').appendChild(button);
}

createButton('task-0', 'Task 0 (Pre-preparacion)', hello());
createButton('task-1', 'Task 1 (Pepe\'s age)', printAge(2000));
createButton('task-2', 'Task 2 (WTF)', toCelsius(451));

/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla. 
 * Výsledek vypište v procentech do předem vytvořeného místa na stránce pro výsledky, např. 21 je 50% z 42. Pro 
 * zkrácení / zaokrouhlení desetinných míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); 
 * Pozor na dělení nulou! 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3
 */
// Solution here

const findPercentage = (first, second) => {
    result = first / second * 100;
    result = result.toFixed(1);
    return first + ' is ' + result + " % of " + second;
}

createButton('task-4', 'Task 4 (%CENSORED%)', findPercentage(23, 40));

/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vypíše, který z nich je větší, do předem vytvořeného 
 * místa na strácne. Pokud se čísla rovnají, vypište, že se rovnají. 
 * 
 * Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky, atd., tj. vytvoříte tlačítko s událostí pro každou
 * kombinaci argumentů a zkuste ji párkrát zavolat kliknutím na toto tlačítko. Tlačítka vytvářejte podle pokynu v 
 * úloze č. 3. Argumenty pro volání funkce zadávejte staticky.
 */
// Solution here

const findBigger = (first, second) => {
    if (first == second) {
        return 'Numbers are equal!'
    } else {
        return ((first > second) ? first : second) + ' is bigger!';
    }
}

createButton('task-5', 'Task 5 (Kdo s koho)', findBigger(6, 4 / 3));
createButton('task-5', 'Task 5 (Kdo s koho)', findBigger('0', 0.0));

/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for cyklus. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */
// Solution here

const printMultiples = () => {
    let result = 0;
    for (let i = 0; i < 731; i += 13) {
        result = result + i + ', ';
    }
    return result.slice(0, -2);
}

createButton('task-6', 'Task 6 (I can clearly see the pattern)', printMultiples());

/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here

const findArea = (radius) => {
    return (Math.PI * radius * radius).toFixed(2);
}

createButton('task-7', 'Task 7 (Around and about)', findArea(2));

/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here

const findVolume = (radius, height) => {
    return (1 / 3 * Math.PI * radius * radius * height).toFixed(2);
}

createButton('task-8', 'Task 8 (Another dimension)', findVolume(2, 5));

/** 
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z 
 * dodaných 3 délek na argumentu funkce dá postavit trojúhelník, tj. vypíše tyto 3 délky stran a, b, a c
 * a výsledek buď ano/ne, true/yes nebo false/no. Z funkce vraťte hodnotu true/false
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here

const isTriangle = (a, b, c) => {
    return (a + b > c) && (a + c > b) && (b + c > a);
}

createButton('task-9', 'Task 9 (Not sure if triangle)', isTriangle(10, 7, 4));

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

const heroicArea = (a, b, c) => {
    if (!isTriangle(a, b, c)) {
        return 'Error, this is not a triangle.';
    } else {
        let s = (a + b + c) / 2;
        let result = Math.sqrt(s * (s - a) * (s - b) * (s - c));
        return result.toFixed(2);
    }
}

createButton('task-10', 'Task 10 (Heroic performance)', heroicArea(10, 7, 4));