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
console.log('Hello World!');
const buttons = document.getElementById('task-buttons');
const results = document.getElementById('result');

/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu s věkem Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů nebo interpolaci. Pro názvy proměnných 
 * používejte smysluplnou angličtinu.
 */
// Solution here
const birthYear = 1950;
console.log('Pepe\'s age is ' + (new Date().getFullYear() - birthYear));

/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9. 
 */
// Solution here
const tempCelsius = 30;
const tempFahrenheit = 86;
console.log(`${tempCelsius}°C = ${(((tempCelsius * 9) / 5) + 32)}°F resp. ${tempFahrenheit}°F = ${((tempFahrenheit - 32) * 5) / 9}°C`);

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
const pepeAge = (birthYear) => {
    return 'Pepe\'s age is ' + (new Date().getFullYear() - birthYear);
}

const cToF = (tempCelsius) => {
    return `${tempCelsius}°C = ${(((tempCelsius * 9) / 5) + 32)}°F`;
}

const fToC = (tempFahrenheit) => {
    return `${tempFahrenheit}°F = ${((tempFahrenheit - 32) * 5) / 9}°C`;
}

const appendText = (textToAppend) => {
    let text = document.createElement('p');
    text.innerText = textToAppend;
    results.appendChild(text);
}

const button1 = document.createElement('button');
button1.innerText = 'Task 1 (Pepe\'s age)';
button1.id = 'task-1';
buttons.appendChild(button1);
button1.addEventListener('click', () => {
    appendText(pepeAge(1950));

});

const button2 = document.createElement('button');
button2.innerText = 'Task 2-1 (Celsius to Fahrenheit)';
button2.id = 'task-2-1';
buttons.appendChild(button2);
button2.addEventListener('click', () => {
    appendText(cToF(28));

});
const button3 = document.createElement('button');
button3.innerText = 'Task 2-2 (Fahrenheit to Celsius)';
button3.id = 'task-2-2';
buttons.appendChild(button3);
button3.addEventListener('click', () => {
    appendText(fToC(90));
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

const calculateRatio = (a, b) => {
    if (b === 0) {
        return 'stop';
    }
    return a + ' is ' + ((a / b) * 100).toFixed(0) + '% of ' + b;
}

const button4 = document.createElement('button');
button4.innerText = 'Task 4 (Percentage of)';
button4.id = 'task-4';
buttons.appendChild(button4);
button4.addEventListener('click', () => {
    appendText(calculateRatio(10, 100));
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

const greaterThan = (a, b) => {
    if (a === b) {
        return a + ' equals ' + b;
    }
    if (a > b) {
        return a + ' is greater than ' + b;
    } else {
        return a + ' is lesser than ' + b;
    }
}

const button5 = document.createElement('button');
button5.innerText = 'Task 5-1 (Equals)';
button5.id = 'task-5-1';
buttons.appendChild(button5);
button5.addEventListener('click', () => {
    appendText(greaterThan(100, 100));
});
const button6 = document.createElement('button');
button6.innerText = 'Task 5-2 (Greater than)';
button6.id = 'task-5-2';
buttons.appendChild(button6);
button6.addEventListener('click', () => {
    appendText(greaterThan(60.99, 60.98));
});
const button7 = document.createElement('button');
button7.innerText = 'Task 5-3 (Lesser than)';
button7.id = 'task-5-3';
buttons.appendChild(button7);
button7.addEventListener('click', () => {
    appendText(greaterThan(-0.111, 0.01));
});

/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for cyklus. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */
// Solution here

const pattern = (number) => {
    let text = '';
    for (let i = 0; number * i <= 730; i++) {
        text += number * i + ' ';
    }
    return text;
}

const button8 = document.createElement('button');
button8.innerText = 'Task 6 (Pattern)';
button8.id = 'task-6';
buttons.appendChild(button8);
button8.addEventListener('click', () => {
    appendText(pattern(13));
});

/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here

const areaOfCircle = (radius) => {
    if (radius <= 0) {
        return 'not a circle'
    }
    return Math.PI * Math.pow(radius, 2);
}

const button9 = document.createElement('button');
button9.innerText = 'Task 7 (Circle area)';
button9.id = 'task-7';
buttons.appendChild(button9);
button9.addEventListener('click', () => {
    appendText(areaOfCircle(10));
});

/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr.
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
 * staticky.
 */
// Solution here

const volumeOfCone = (height, radius) => {
    if (radius <= 0 || height <= 0) {
        return 'it has to be greater than 0, or i\'m not going to do anything'
    }
    return (1 / 3) * Math.PI * Math.pow(radius, 2) * height;
}

const button10 = document.createElement('button');
button10.innerText = 'Task 8 (Cone volume)';
button10.id = 'task-8';
buttons.appendChild(button10);
button10.addEventListener('click', () => {
    appendText(volumeOfCone(10, 5));
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

const isTriangle = (a, b, c) => {
    if (a <= 0 || b <= 0 || c <= 0) {
       return 'all values need to be greater than 0, also just'+ false;
    }
    if (a + b > c && a + c > b && b + c > a) {
        return `a: ${a} b: ${b} c: ${c} ${true}`;
    } else {
        return `a: ${a} b: ${b} c: ${c} ${false}`;
    }
}

const button11 = document.createElement('button');
button11.innerText = 'Task 9 (Triangle)';
button11.id = 'task-9';
buttons.appendChild(button11);
button11.addEventListener('click', () => {
    appendText(isTriangle(7, 8, 9));
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

const button12 = document.createElement('button');
button12.innerText = 'Task 10 (Something something triangles)';
button12.id = 'task-10';
buttons.appendChild(button12);
button12.addEventListener('click', () => {
    appendText(triangleMagic(7, 8, 9));
});

const triangleMagic = (a, b, c) => {
    if (a <= 0 || b <= 0 || c <= 0) {
        return 'all values need to be greater than 0'
    }
    if (a + b > c && a + c > b && b + c > a) {
        let magicHelper = (a + b + c) / 2;
        return Math.sqrt(magicHelper * (magicHelper - a) * (magicHelper - b) * (magicHelper - c));
    } else {
        return 'not a triangle';
    }
}
