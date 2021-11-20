/* HOMEWORK */
/**
 * 0) Pre-preparation.
 * - Vytvořte HTML stránku s nadpisem h1 "JavaScript is awesome!" 
 * - Na stránce vytvořte místo pro umístění jednotlivých spouštěčů úkolů - tlačítek (tj. div, který má id s hodnotou "task-buttons"). 
 * - Na stránce vytvořte místo pro výpis výsledků úkolů (div, který má id s hodnotou "result").
 * 
 * - Připojte tento homework.js soubor k vytvořené HTML stránce pomocí tagu <script> (viz LAB) a vyzkoušejte
 * console.log('Ahoj světe');
 */

console.log('0) ' + 'Hello metaverse');

/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu s věkem Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů nebo interpolaci. Pro názvy proměnných 
 * používejte smysluplnou angličtinu.
 */
// Solution here

let pepeAge0 = 24;
const pepeBday0 = { day: 25, month: 7, year: 1997 };
let pepeSentence0 = `Pepe is of ripe age ${pepeAge0}, because he was born in ${pepeBday0.year}.`

console.log('1) ' + pepeSentence0);


/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9. 
 */
// Solution here

let tmpInC0 = 17;
let tmpInF0 = tmpInC0 * 9 / 5 + 32;
let tmp0 = `${tmpInC0}ºC is ${tmpInF0}ºF`;

console.log('2) ' + tmp0);

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

const pepeInfo = (age = 24) => {
    let pepeAge = age;
    let disYear = new Date().getFullYear();
    const pepeBday = { year: disYear - age };
    return `Pepe is of ripe age ${pepeAge}, because he was born in ${pepeBday.year}.`;
};

let pepeAges = [24, 42, 69];
for (let i = 0; i < pepeAges.length; i++) {
    console.log(`3a.${i + 1}) ` + pepeInfo(pepeAges[i]));
};

const tmpConvert = (tmpC = 22) => {
    let tmpInC = tmpC;
    let tmpInF = Math.round(tmpInC * 9 / 5 + 32);
    return `${tmpInC}ºC is the same as ${tmpInF}ºF`;
};

let tmpVals = [-12, 14, 35];
for (let i = 0; i < tmpVals.length; i++) {
    console.log(`3b.${i + 1}) ` + tmpConvert(tmpVals[i]));
};

const buttons = document.getElementById('task-buttons');
const results = document.getElementById('results');

const addResult = (func, param) => {
    const result = document.createElement('p');
    result.innerText = func(param);
    results.appendChild(result);
};

// button creator
let i = 0;
const createButton = (id, text) => {
    const tmpButton = document.createElement('button');
    tmpButton.id = id;
    tmpButton.innerText = text;
    buttons.appendChild(tmpButton);
    return tmpButton
};
// event creator
const createEvent = (tmpButton, func, valsList) => {
    tmpButton.addEventListener('click', function(){
        addResult(func, valsList[i]);
        if (i < valsList.length - 1) {
            i ++;
        } else {
            i = 0;
        }
    });
};

// Uloha 1 button clicking
createEvent(createButton('task-1', "Uloha 1 (Pepe's age)"), pepeInfo, pepeAges);


// Uloha 2 button clicking
createEvent(createButton('task-2', "Uloha 2 (WTF)"), tmpConvert, tmpVals);

/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla.
 * Výsledek vypište v procentech do předem vytvořeného místa na stránce pro výsledky, např. 21 je 50% z 42. Pro
 * zkrácení / zaokrouhlení desetinných míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2);
 * Pozor na dělení nulou!
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3
 */
// Solution here

const censored = (num1=Math.floor(Math.random() * 10) + 1, num2=Math.floor(Math.random() * 11) + 1) => {
    if (num2 == 0) {
        return "Can't divide by zero."
    } else {
        prc = (num1 / num2 * 100).toFixed(2);
        return `${num1} je ${prc}% z ${num2}.`};
};

let censButton = createButton('task-4', 'Uloha 4 (%CENSORED%)').addEventListener('click', function() {
    const result = document.createElement('p');
    result.innerText = censored();
    results.appendChild(result);
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

const compare = (num1=Math.floor(Math.random() * 10) + 1, num2=Math.floor(Math.random() * 11) + 1) => {
    if (num1 === num2) {
        return `${num1} = ${num2}. Čísla se rovnají`
    } else if (typeof(num1) != 'number' || typeof(num2) != 'number') {
        return 'Vstup musí být čísla.'
    } else if (num1 > num2) {
        return `${num1} > ${num2}. Číslo ${num1} je větší než ${num2}.`
    } else {
        return `${num1} < ${num2}. Číslo ${num1} je menší než ${num2}.`
    };
};

let compareButton = createButton('task-5', 'Uloha 5 (Kdo s koho)').addEventListener('click', function() {
    const result = document.createElement('p');
    result.innerText = compare();
    results.appendChild(result);
});

/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší
 * nebo rovno 730, včetě nuly. Používejte for cyklus.
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */
// Solution here

const pattern = () => {
    let result;
    for (let i = 0; (13 * i) <= 730; i++) {
        const parag = document.createElement('p');
        result = 13 * i;
        parag.innerText = result;
        results.appendChild(parag);
    };
};

const patternButton = createButton('task-6', 'Uloha 6 (I can cleary see the pattern)').addEventListener('click', function() {
    pattern();
});

/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu.
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
 * staticky.
 */
// Solution here

let circleRadia = [14, 55, 51.5, 420, 69.69];

const circleArea = (radius) => {
    return `Circle with radius ${radius} has area of ${(Math.PI * radius**2).toFixed(1)}`;
};

createEvent(createButton('task-7', 'Uloha 7 (Around and about)'), circleArea, circleRadia);

/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr.
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
 * staticky.
 */
// Solution here

const volume = (height=Math.floor(Math.random() * 10), radius=Math.floor(Math.random() * 10)) => {
    vol = (Math.PI * radius**2 * (height / 3)).toFixed(2);
    return `Volume of a cone with height ${height} and radius ${radius} is ${vol}.`
};

createButton('task-8', 'Uloha 8 (Another dimension)').addEventListener('click', function() {
    const result = document.createElement('p');
    result.innerText = volume();
    results.appendChild(result);
});

/**
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z
 * dodaných 3 délek na argumentu funkce dá postavit trojúhelník, tj. vypíše tyto 3 délky stran a, b, a c
 * a výsledek buď ano/ne, true/yes nebo false/no. Z funkce vraťte hodnotu true/false
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
 * staticky.
 */
// Solution here

const triangle = (a=Math.floor(Math.random() * 10), b=Math.floor(Math.random() * 10), c=Math.floor(Math.random() * 10)) => {
    if (a+b > c && a+c > b && b+c > a) {
        return true
    } else {return false};
};

createButton('task-9', 'Uloha 9 (Not sure if triangle)').addEventListener('click', function() {
    const result = document.createElement('p');
    result.innerText = triangle();
    results.appendChild(result);
});

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

const heroin = (a=Math.floor(Math.random() * 10), b=Math.floor(Math.random() * 10), c=Math.floor(Math.random() * 10)) => {
    if (triangle(a, b, c)) {
        let semi = (a + b + c) / 2;
        let area = Math.sqrt(semi * (semi - a) * (semi - b) * (semi - c)).toFixed(2);
        return `Triangle with sides: ${a}, ${b}, ${c} has area of ${area}`
    } else {
        return `Sides of: ${a}, ${b}, ${c} can't be a triangle, try again.`
    };
};

createButton('task-10', 'Uloha 10 (Heroic performance)').addEventListener('click', function() {
    const result = document.createElement('p');
    result.id = 'result-10'
    result.innerText = heroin();
    results.appendChild(result);
});
