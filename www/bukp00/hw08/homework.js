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

console.log("Ahoj světe")

/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu s věkem Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů nebo interpolaci. Pro názvy proměnných 
 * používejte smysluplnou angličtinu.
 */
// Solution here

const pepesBirth = 2000;
const thisYear = new Date().getFullYear();

console.log("1)")
console.log(`Pepovi je ${thisYear - pepesBirth} let`);

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

console.log("2)");
console.log(`${celsius}°C = ${celsiusToFahrenheiht}°F resp. ${fahrenheiht}°F = ${fahrenheihtToCelsius}°C`);

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

const buttonContainer = document.getElementById("task-buttons");
const resultsContainer = document.getElementById("results");

const addButton = (id, text, fun) => {
    let button = document.createElement("button");
    button.id = id;
    button.innerHTML = text;
    button.addEventListener("click", fun);
    buttonContainer.appendChild(button);
};

const addResult = (text) => {
    const result = document.createElement("p");
    result.innerHTML = text;
    resultsContainer.appendChild(result);
};

const pepesAge = (birthYear) => {
    const thisYear = new Date().getFullYear();
    console.log(`Pepovi je ${thisYear - birthYear} let`);
    return (thisYear - birthYear);
};

addButton("task-1", "Úloha 1 (Pepe's age - 2010)", () => {
    addResult(`Task 1 - Pepovi je ${pepesAge(2010)} let.`);
});

const convertCelsiusToFahrenheit = (celsius) => {
    return celsius * 9 / 5 + 32;
};
const convertFahrenheitToCelsius = (fahrenheiht) => {
    return (fahrenheiht - 32) * 5 / 9;
};

addButton("task-2", "Úloha 2 (Teploty 20 a 68)", () => {
    console.log(`${celsius}°C = ${convertCelsiusToFahrenheit(celsius)}°F resp. ${fahrenheiht}°F = ${convertFahrenheitToCelsius(fahrenheiht)}°C`);
    addResult(`Task 2 - ${celsius}°C = ${convertCelsiusToFahrenheit(celsius)}°F resp. ${fahrenheiht}°F = ${convertFahrenheitToCelsius(fahrenheiht)}°C`);
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

const getPercentage = (fNumber, sNumber) => {
    if (sNumber === 0) {
        return ("Nelze dělit nulou");
    }
    return (`Číslo ${fNumber} je ${(fNumber / sNumber * 100).toFixed(2)}% z ${sNumber}.`);
};

addButton("task-4", "Úloha 4 (Podíl čísel 21 a 42)", () => {
    console.log(getPercentage(21, 42));
    addResult(`Task 4 - ${getPercentage(21, 42)}`);
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

const order = (fNumber, sNumber) => {
    return [fNumber, sNumber].sort();
};

addButton("task-5", "Úloha 5 (Srovnání čísel 22 a 21)", () => {
    addResult(`Task 5 - Srovnání čísel: ${order(22, 21).join(" < ")}`);
});


/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for cyklus. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */
// Solution here

const get13Multiplies = () => {
    const multiplies = [];
    for (let i = 0; i <= 730; i += 13) {
        multiplies.push(i);
    };
    return multiplies;
};

addButton("task-6", "Úloha 6 (Násobky 13)", () => {
    addResult(`Task 6 - Násobky 13: ${get13Multiplies()}`);
});


/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here

const getArea = (r) => {
    return (Math.PI * r * r);
};

addButton("task-7", "Úloha 7 (Obsah kružnice s poloměrem 5)", () => {
    addResult(`Task 7 - Obsah kružnice: ${getArea(5).toFixed(2)}`);
});

/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here

const getConeVol = (r, h) => {
    if (!r || !h) return;
    return (1 / 3 * Math.PI * r * r * h);
};

addButton("task-8", "Úloha 8 (Objem kuželu s poloměrem 5 a výškou 7)", () => {
    addResult(`Task 8 - Objem kuželu: ${getConeVol(5, 7).toFixed(2)}`);
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

const canBeTriangle = (a, b, c) => {
    if (a && b && c) {
        return (a + b > c) && (a + c > b) && (b + c > a);
    }
    return false;
}

addButton("task-9", "Úloha 9 (Může být trojúhelník?)", () => {
    addResult(`Task 9 - Trojúhelník z délek 5, 7 a 4: ${canBeTriangle(5, 7, 4)}`);
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

const heroicPerformance = (a, b, c) => {
    if (!canBeTriangle(a, b, c)) {
        return 0;
    };
    const s = (a + b + c) / 2;
    return Math.sqrt(s * (s - a) * (s - b) * (s - c));
}

addButton("task-10", "Úloha 10 (Obsah trojúhelníka 5-7-4)", () => {
    addResult(`Task 10 - Obsah trojúhelníka se stranami 5, 7 a 4: ${heroicPerformance(5, 7, 4).toFixed(2)}`);
});
