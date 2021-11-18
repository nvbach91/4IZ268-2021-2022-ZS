/* HOMEWORK */
/**
 * 0) Pre-preparacion.
 * - Vytvořte HTML stránku s nadpisem h1 "JavaScript is awesome!"
 * - Na stránce vytvořte místo pro umístění jednotlivých spouštěčů úkolů - tlačítek (tj. div, který má id s hodnotou
 *   "task-buttons").
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
const stringPepesAge = (age) => {
    return `Pepe is ${age} years old.`;
};

console.log(stringPepesAge(20));

/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak.
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32.
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9.
 */
// Solution here
const celsiusToFahrenheiht = (celsius) => {
    return `${celsius}°C = ${(celsius * 9 / 5) + 32}°F`;
};

const fahrenheihtToCelsius = (fahrhenheiht) => {
    return `${fahrhenheiht}°F = ${(fahrhenheiht - 32) * 5 / 9}°C`;
};

const celsius = 20;
console.log(celsiusToFahrenheiht(celsius));

const fahrhenheiht = 68;
console.log(fahrenheihtToCelsius(fahrhenheiht));

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
const createButtonWithText = (buttonText) => {
    const button = document.createElement('button');
    button.innerText = buttonText;

    return button;
};

const appendElementToSelected = (toBeAppended, appendTo) => {
    const element = document.getElementById(appendTo);
    element.appendChild(toBeAppended);
};

const buttonPepeAge = createButtonWithText('Print Pepe\'s age');
buttonPepeAge.addEventListener('click', function () {
    const paragraph = document.createElement('p');
    paragraph.innerText = stringPepesAge(20);
    appendElementToSelected(paragraph, 'result');
});

appendElementToSelected(buttonPepeAge, 'task-buttons');

const buttonCtoF = createButtonWithText('20°C to °F');
buttonCtoF.addEventListener('click', function () {
    const paragraph = document.createElement('p');
    paragraph.innerText = celsiusToFahrenheiht(20);
    appendElementToSelected(paragraph, 'result');
});

appendElementToSelected(buttonCtoF, 'task-buttons');

const buttonFtoC = createButtonWithText('68°F to °C');
buttonFtoC.addEventListener('click', function () {
    const paragraph = document.createElement('p');
    paragraph.innerText = fahrenheihtToCelsius(68);
    appendElementToSelected(paragraph, 'result');
});

appendElementToSelected(buttonFtoC, 'task-buttons');

/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla.
 * Výsledek vypište v procentech do předem vytvořeného místa na stránce pro výsledky, např. 21 je 50% z 42. Pro
 * zkrácení / zaokrouhlení desetinných míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2);
 * Pozor na dělení nulou!
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3
 */
// Solution here
const dividePercent = (a, b) => {
    if (b === 0) {
        return 'Nulou nelze dělit!';
    }

    return `${a} je ${(a / b * 100).toFixed(2)} % z ${b}.`;
};

const buttonDivide = createButtonWithText('Divide');
buttonDivide.addEventListener('click', function () {
    const paragraph = document.createElement('p');
    paragraph.innerText = dividePercent(21, 42);
    appendElementToSelected(paragraph, 'result');
});

appendElementToSelected(buttonDivide, 'task-buttons');

/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vypíše, který z nich je větší, do předem vytvořeného
 * místa na strácne. Pokud se čísla rovnají, vypište, že se rovnají.
 *
 * Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky, atd., tj. vytvoříte tlačítko s událostí pro každou
 * kombinaci argumentů a zkuste ji párkrát zavolat kliknutím na toto tlačítko. Tlačítka vytvářejte podle pokynu v
 * úloze č. 3. Argumenty pro volání funkce zadávejte staticky.
 */
// Solution here
const whichIsBigger = (a, b) => {
    if (a === b) {
        return `Zadané parametry (a=${a}, b=${b}) se rovnají.`;
    } else if (a > b) {
        return `a (a=${a}) je větší, než b (b=${b}).`
    }

    return `b (b=${b}) je větší, než a (a=${a}).`
};

const buttonA1B1 = createButtonWithText('Compare a=1, b=1');
buttonA1B1.addEventListener('click', function () {
    const paragraph = document.createElement('p');
    paragraph.innerText = whichIsBigger(1, 1);
    appendElementToSelected(paragraph, 'result');
});

appendElementToSelected(buttonA1B1, 'task-buttons');

const buttonA2B1 = createButtonWithText('Compare a=2, b=1');
buttonA2B1.addEventListener('click', function () {
    const paragraph = document.createElement('p');
    paragraph.innerText = whichIsBigger(2, 1);
    appendElementToSelected(paragraph, 'result');
});

appendElementToSelected(buttonA2B1, 'task-buttons');

const buttonA1_5B1 = createButtonWithText('Compare a=1,5, b=1');
buttonA1_5B1.addEventListener('click', function () {
    const paragraph = document.createElement('p');
    paragraph.innerText = whichIsBigger(1.5, 1);
    appendElementToSelected(paragraph, 'result');
});

appendElementToSelected(buttonA1_5B1, 'task-buttons');

const buttonA1_5B100div50 = createButtonWithText('Compare a=1,5, b=100/50');
buttonA1_5B100div50.addEventListener('click', function () {
    const paragraph = document.createElement('p');
    paragraph.innerText = whichIsBigger(1.5, 100 / 50);
    appendElementToSelected(paragraph, 'result');
});

appendElementToSelected(buttonA1_5B100div50, 'task-buttons');


/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší
 * nebo rovno 730, včetě nuly. Používejte for cyklus.
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */
// Solution here
const printMultiplesOf13 = () => {
    let multiples = "";
    for (let i = 0; (i * 13) <= 730; i++) {
        multiples += i * 13 + ', ';
    }
    return multiples;
};

const buttonMultiplesOf13 = createButtonWithText('Print multiples of 13');
buttonMultiplesOf13.addEventListener('click', function () {
    const paragraph = document.createElement('p');
    paragraph.innerText = printMultiplesOf13();
    appendElementToSelected(paragraph, 'result');
});

appendElementToSelected(buttonMultiplesOf13, 'task-buttons');


/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu.
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
 * staticky.
 */
// Solution here
const computeCircleArea = (radius) => {
    return `Area of circle with radius=${radius} units is ${(Math.PI * radius * radius).toFixed(2)} units squared.`;
};

const buttonCircleArea = createButtonWithText('Compute circle area (r = 5 units)');
buttonCircleArea.addEventListener('click', function () {
    const paragraph = document.createElement('p');
    paragraph.innerText = computeCircleArea(5);
    appendElementToSelected(paragraph, 'result');
});

appendElementToSelected(buttonCircleArea, 'task-buttons');


/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr.
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
 * staticky.
 */
// Solution here
const computeConeVolume = (radius, height) => {
    const volume = ((1 / 3) * Math.PI * radius * radius * height).toFixed(2);
    return `Volume of a cone (radius = ${radius} units, height = ${height} units) is ${volume} cubic units.`;
};

const buttonConeVolume = createButtonWithText('Compute cone volume (r = 5 units, h = 10 units)');
buttonConeVolume.addEventListener('click', function () {
    const paragraph = document.createElement('p');
    paragraph.innerText = computeConeVolume(5, 10);
    appendElementToSelected(paragraph, 'result');
});

appendElementToSelected(buttonConeVolume, 'task-buttons');


/**
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z
 * dodaných 3 délek na argumentu funkce dá postavit trojúhelník, tj. vypíše tyto 3 délky stran a, b, a c
 * a výsledek buď ano/ne, true/yes nebo false/no. Z funkce vraťte hodnotu true/false
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
 * staticky.
 */
// Solution here

const isTriange = (a, b, c) => {
    return (a + b > c) && (a + c > b) && (b + c > a);
};

const buttonIsTriangle = createButtonWithText('Can these lines create triangle (a=2, b=3, c=4)');
buttonIsTriangle.addEventListener('click', function () {
    const paragraph = document.createElement('p');
    paragraph.innerText = isTriange(2, 3, 4);
    appendElementToSelected(paragraph, 'result');
});

appendElementToSelected(buttonIsTriangle, 'task-buttons');

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

const heronsTriangleArea = (a, b, c) => {
    const resultElement = document.getElementById('result');

    if (!isTriange(a, b, c)) {
        const paragraph = document.createElement('p');
        paragraph.innerText = 'Tyto usecky nesplnuji trojuhelnikovou nerovnost';
        resultElement.appendChild(paragraph);

        return;
    }

    const halfPerimeter = (a + b + c) / 2;
    const area = Math.sqrt(halfPerimeter * (halfPerimeter - a) * (halfPerimeter - b) * (halfPerimeter - c)).toFixed(2);

    const paragraph = document.createElement('p');
    paragraph.innerText = `Obsah trojuhelniku o stranach a=${a}, b=${b} a c=${c} je ${area}.`;
    resultElement.appendChild(paragraph);
};

const buttonHerons = createButtonWithText('Herons triangle (a=2, b=3, c=4)');
buttonHerons.addEventListener('click', function () {
    heronsTriangleArea(2, 3, 4);
});

appendElementToSelected(buttonHerons, 'task-buttons');


