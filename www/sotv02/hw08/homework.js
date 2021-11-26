console.log('Ahoj světe');

const buttons = document.getElementById('task-buttons');
const results = document.getElementById('result');

/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu s věkem    Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů nebo  interpolaci. Pro názvy proměnných 
 * používejte smysluplnou angličtinu.
*/

let pepeBday = 2000;
const pepeAge = ('Pepe\'s age is ' + (new Date().getFullYear() - pepeBday));
console.log(pepeAge);

/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht,  pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte  proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9. 
*/

let tempC = 25;
let tempF = 86;
let cToF = (tempC * 9 / 5) + 32;
let fToC = (tempF - 32) * 5 / 9;
console.log(tempC + '°C is ' + cToF + '°F');
console.log(tempF + '°F is ' + fToC + '°C');

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
const appendText = (textToAppend) => {
    let text = document.createElement('p');
    text.innerText = textToAppend;
    results.appendChild(text);
}

const getPepeAge = (pepeBday) => {
    return 'Pepe\'s age is ' + (new Date().getFullYear() - pepeBday);
}

const getCToF = (tempC) => {
    let cToF = (tempC * 9 / 5) + 32;
    return tempC + ' °C is ' + cToF + '°F';
}

const getFToC = (tempF) => {
    let fToC = (tempF - 32) * 5 / 9;
    return tempF + '°F is ' + fToC + '°C';
}

const button1 = document.createElement('button');
button1.innerText = '1 Pepe\'s age';
button1.id = 'task-1';
buttons.appendChild(button1);
button1.addEventListener('click', () => {
    appendText(getPepeAge(1969));

});

const button2 = document.createElement('button');
button2.innerText = '2-1 Celsius to Fahrenheiht';
button2.id = 'task-2-1';
buttons.appendChild(button2);
button2.addEventListener('click', () => {
    appendText(getCToF(25));

});

const button3 = document.createElement('button');
button3.innerText = '2-2 Fahrenheiht to Celsius';
button3.id = 'task-2-2';
buttons.appendChild(button3);
button3.addEventListener('click', () => {
    appendText(getFToC(86));

});

/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla. 
 * Výsledek vypište v procentech do předem vytvořeného místa na stránce pro výsledky, např. 21 je 50% z 42. Pro 
 * zkrácení / zaokrouhlení desetinných míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); 
 * Pozor na dělení nulou! 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3
*/

const censored = (numA, numB) => {
    if (numB === 0) {
        return 'I\'m Gonna Stop You Right There';
    }
    percentage = (numA / numB * 100).toFixed(2);
    return numA + ' je ' + percentage + '% z ' + numB;  
}

const button4 = document.createElement('button');
button4.innerText = '4-1 Percentage';
button4.id = 'task-4-1';
buttons.appendChild(button4);
button4.addEventListener('click', () => {
    appendText(censored(12, 60));

});

const button5 = document.createElement('button');
button5.innerText = '4-2 Percentage ZERO';
button5.id = 'task-4-2';
buttons.appendChild(button5);
button5.addEventListener('click', () => {
    appendText(censored(42, 0));

});

/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vypíše, který z nich je větší, do předem vytvořeného 
 * místa na strácne. Pokud se čísla rovnají, vypište, že se rovnají. 
 * 
 * Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky, atd., tj. vytvoříte tlačítko s událostí pro každou
 * kombinaci argumentů a zkuste ji párkrát zavolat kliknutím na toto tlačítko. Tlačítka vytvářejte podle pokynu v 
 * úloze č. 3. Argumenty pro volání funkce zadávejte staticky.
*/

const greaterSmallerEquals = (numA, numB) => {
    if (numA > numB) {
        return numA + ' is greater than ' + numB;
    }
    if (numA < numB) {
        return numA + ' is smaller than ' + numB;
    }
    else {
        return numA + ' equals ' + numB;
    }
}

const button6 = document.createElement('button');
button6.innerText = '5-1 Greater';
button6.id = 'task-5-1';
buttons.appendChild(button6);
button6.addEventListener('click', () => {
    appendText(greaterSmallerEquals(42, 21));

});

const button7 = document.createElement('button');
button7.innerText = '5-2 Smaller';
button7.id = 'task-5-2';
buttons.appendChild(button7);
button7.addEventListener('click', () => {
    appendText(greaterSmallerEquals(16, 68));

});

const button8 = document.createElement('button');
button8.innerText = '5-3 Equals';
button8.id = 'task-5-3';
buttons.appendChild(button8);
button8.addEventListener('click', () => {
    appendText(greaterSmallerEquals(77, 77));

});

/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for cyklus. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
*/

const seeThePattern = (num) => {
    let listOfNumbers = '';
    for (let i = 0; num * i <= 730; i++) {
        listOfNumbers += num * i + ' ';
    }
    return listOfNumbers;
}

const button9 = document.createElement('button');
button9.innerText = '6 Pattern 13';
button9.id = 'task-6';
buttons.appendChild(button9);
button9.addEventListener('click', () => {
    appendText(seeThePattern(13));

});

/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
*/

const areaCircle = (rad) => {
    if (rad <= 0 ) {
        return 'nup not a circle';
    }
    return 'area of circle is  ' + (Math.PI * rad**2).toFixed(2);
}

const button10 = document.createElement('button');
button10.innerText = '7-1 Circle Area';
button10.id = 'task-7-1';
buttons.appendChild(button10);
button10.addEventListener('click', () => {
    appendText(areaCircle(5));

});

const button11 = document.createElement('button');
button11.innerText = '7-2 Circle Area ZERO';
button11.id = 'task-7-2';
buttons.appendChild(button11);
button11.addEventListener('click', () => {
    appendText(areaCircle(0));

});

/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
*/

const volumeCone = (rad, height) => {
    if (rad <= 0 || height <= 0) {
        return 'nup not a cone';
    }
    return 'volume of a cone is ' + ((1/3) * Math.PI * rad**2 * height).toFixed(2);
}

const button12 = document.createElement('button');
button12.innerText = '8-1 Cone Volume';
button12.id = 'task-8-1';
buttons.appendChild(button12);
button12.addEventListener('click', () => {
   appendText(volumeCone(2, 5));

});

const button13 = document.createElement('button');
button13.innerText = '8-2 Cone Volume ZERO';
button13.id = 'task-8-2';
buttons.appendChild(button13);
button13.addEventListener('click', () => {
   appendText(volumeCone(0, 2));

});

/** 
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z 
 * dodaných 3 délek na argumentu funkce dá postavit trojúhelník, tj. vypíše tyto 3 délky stran a, b, a c
 * a výsledek buď ano/ne, true/yes nebo false/no. Z funkce vraťte hodnotu true/false
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
*/

const isTriangle = (numA, numB, numC) => {
    if (numA+numB > numC && numA+numC > numB && numB+numC > numA) {
        return true;
    }
    else {
        return false;
    }
}

const button14 = document.createElement('button');
button14.innerText = '9-1 isTriangleTrue';
button14.id = 'task-9-1';
buttons.appendChild(button14);
button14.addEventListener('click', () => {
   appendText(isTriangle(3, 4, 5));

});

const button15 = document.createElement('button');
button15.innerText = '9-2 isTriangleFalse';
button15.id = 'task-9-2';
buttons.appendChild(button15);
button15.addEventListener('click', () => {
   appendText(isTriangle(1, 3, 5));

});

/**
 * 10) Heroic performance. Vytvořte funkci, která vypočte a vypíše obsah trojúhelníka podle Heronova vzorce, 
 * tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci v úloze č. 9, tj. počítejte pouze, 
 * když to má smysl. Hint: funkce pro odmocninu je Math.sqrt().
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
*/

const heroicPerformance = (numA, numB, numC) => {
    if (numA+numB > numC && numA+numC > numB && numB+numC > numA) {
        let numS = (numA + numB + numC) / 2;
        return Math.sqrt(numS * (numS - numA) * (numS - numB) * (numS - numC));
    }
    else {
        return 'bruh';
    }
}

const button16 = document.createElement('button');
button16.innerText = '10-1 Heron';
button16.id = 'task-10-1';
buttons.appendChild(button16);
button16.addEventListener('click', () => {
   appendText(heroicPerformance(3, 4, 5));

});

const button17 = document.createElement('button');
button17.innerText = '10-2 Heron False';
button17.id = 'task-10-2';
buttons.appendChild(button17);
button17.addEventListener('click', () => {
   appendText(heroicPerformance(1, 2, 5));

});