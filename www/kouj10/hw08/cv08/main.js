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

const currentYear = new Date().getFullYear();
const birthYear = 1999;

console.log('Pepovi je ' + (currentYear - birthYear) + ' let.');


/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9. 
 */
// Solution here
const celsius = 20;
const fahrenheiht = 68;
console.log(celsius + '°C = ' + (celsius * 9 / 5 + 32) + '°F');
console.log(fahrenheiht + '°F = ' + ((fahrenheiht - 32) * 5 / 9) + '°C');

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

const taskButtons = document.querySelector('#task-buttons');
const results = document.querySelector('#result');

//1
const button1 = document.createElement('button');
button1.id = 'task-1';
button1.innerText = 'Uloha 1 (Pepe\'s age)';
button1.addEventListener('click', () => {
    console.log('Pepovi je ' + (currentYear - birthYear) + ' let.');
});

taskButtons.appendChild(button1);

//2
const button2 = document.createElement('button');
button2.id = 'task-2';
button2.innerText = 'Uloha 2 (WTF)';
button2.addEventListener('click', () => {
    console.log(celsius + '°C = ' + (celsius * 9 / 5 + 32) + '°F');
    console.log(fahrenheiht + '°F = ' + ((fahrenheiht - 32) * 5 / 9) + '°C');
});

taskButtons.appendChild(button2);

/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla.
 * Výsledek vypište v procentech do předem vytvořeného místa na stránce pro výsledky, např. 21 je 50% z 42. Pro
 * zkrácení / zaokrouhlení desetinných míst použijte funkci .toFixed(n). Např. const pi = 3.1415926535; pi.toFixed(2);
 * Pozor na dělení nulou!
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3
 */
// Solution here
const number1 = 0;
const number2 = 25;
const percent = number1 / number2 * 100;

const button3 = document.createElement('button');
button3.innerText = '%CENSORED%';
button3.id = 'task-3';
button3.addEventListener('click', () => {
    const p = document.createElement('p');

    if (number2 == 0) {
        p.innerText = 'Druhé číslo je nula a nulou dělit nelze!'
    } else
        p.innerText = number1 + ' je ' + percent.toFixed(2) + ' % z ' + number2;
    results.appendChild(p);
});

taskButtons.appendChild(button3);



/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vypíše, který z nich je větší, do předem vytvořeného
 * místa na strácne. Pokud se čísla rovnají, vypište, že se rovnají.
 *
 * Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky, atd., tj. vytvoříte tlačítko s událostí pro každou
 * kombinaci argumentů a zkuste ji párkrát zavolat kliknutím na toto tlačítko. Tlačítka vytvářejte podle pokynu v
 * úloze č. 3. Argumenty pro volání funkce zadávejte staticky.
 */
// Solution here

const compareTwoNumbers = (numberOne, numberTwo) => {
    const p = document.createElement('p');
    if (numberOne === numberTwo) {
        p.innerText = 'Čísla se rovnají';
    } else if (numberOne > numberTwo) {
        p.innerText = 'Vetší číslo je ' + numberOne + (' (numberOne)');
    } else {
        p.innerText = 'Větší číslo je ' + numberTwo + (' (numberTwo)');
    }
    results.appendChild(p);
}

const button4 = document.createElement('button');
button4.innerText = 'Kdo s koho (celé a celé)';
button4.id = 'task-5';
button4.addEventListener('click', () => {
    compareTwoNumbers(5, 9);
});

const button5 = document.createElement('button');
button5.innerText = 'Kdo s koho (zlomek a zlomek)';
button5.id = 'task-5';
button5.addEventListener('click', () => {
    compareTwoNumbers(1 / 3, 2 / 3);
});

const button6 = document.createElement('button');
button6.innerText = 'Kdo s koho (desetinné a desetinné)';
button6.id = 'task-5';
button6.addEventListener('click', () => {
    compareTwoNumbers(2.474, 2.474);
});

const button7 = document.createElement('button');
button7.innerText = 'Kdo s koho (celé a zlomek)';
button7.id = 'task-5';
button7.addEventListener('click', () => {
    compareTwoNumbers(2, 2 / 1);
});

const button8 = document.createElement('button');
button8.innerText = 'Kdo s koho (celé a desetinné)';
button8.id = 'task-5';
button8.addEventListener('click', () => {
    compareTwoNumbers(2, 4.01);
});

const button9 = document.createElement('button');
button9.innerText = 'Kdo s koho (zlomek a desetinné)';
button9.id = 'task-5';
button9.addEventListener('click', () => {
    compareTwoNumbers(2 / 7, 2.474);
});

taskButtons.appendChild(button4);
taskButtons.appendChild(button5);
taskButtons.appendChild(button6);
taskButtons.appendChild(button7);
taskButtons.appendChild(button8);
taskButtons.appendChild(button9);





/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší
 * nebo rovno 730, včetě nuly. Používejte for cyklus.
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */
// Solution here

const button10 = document.createElement('button');
button10.innerText = 'I can clearly see the pattern';
button10.id = 'task-6';
button10.addEventListener('click', () => {
    const p = document.createElement('p');
    for (let i = 0; i * 7 <= 730; i++) {
        p.innerText = p.innerText + ' ' + i * 7;
    };
    results.appendChild(p);
});

taskButtons.appendChild(button10);



/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu.
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
 * staticky.
 */
// Solution here
const calculateCircleArea = (radius) => {
    const p = document.createElement('p');
    p.innerText = (radius * radius * Math.PI).toFixed(2) + ' cm^2';
    results.appendChild(p);
}
const button11 = document.createElement('button');
button11.innerText = 'Around and about';
button11.id = 'task-7';
button11.addEventListener('click', () => {
    calculateCircleArea(24);
});

taskButtons.appendChild(button11);


/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr.
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
 * staticky.
 */
// Solution here
const calculateConeVolume = (radius, height) => {
    const p = document.createElement('p');
    p.innerText = 'Objem kuželu je: ' + radius * radius * height * Math.PI * 1 / 3;
    results.appendChild(p);
}

const button12 = document.createElement('button');
button12.innerText = 'Another dimension';
button12.id = 'task-8';
button12.addEventListener('click', () => {
    calculateConeVolume(5, 4);
})

taskButtons.appendChild(button12);



/**
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z
 * dodaných 3 délek na argumentu funkce dá postavit trojúhelník, tj. vypíše tyto 3 délky stran a, b, a c
 * a výsledek buď ano/ne, true/yes nebo false/no.
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
 * staticky.
 */
// Solution here

const isTriangle = (numberOne, numberTwo, numberThree) => {
    const p = document.createElement('p');

    if (numberOne + numberTwo < numberThree || numberOne + numberThree < numberTwo || numberTwo + numberThree < numberOne) {
        p.innerText = numberOne + ' ' + numberTwo + ' ' + numberThree + ' Ne'
    } else {
        p.innerText = numberOne + ' ' + numberTwo + ' ' + numberThree + ' Ano'
    }
    results.appendChild(p);
}

const button13 = document.createElement('button');
button13.innerText = 'Not sure if triangle, or just some random values';
button13.id = 'task-9';
button13.addEventListener('click', () => {
    isTriangle(40, 20, 22);
});

taskButtons.appendChild(button13);



/**
 * 10) Heroic performance. Vytvořte funkci, která vypočte a vypíše obsah trojúhelníka podle Heronova vzorce,
 * tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci v úloze č. 9, tj. počítejte pouze,
 * když to má smysl. Hint: funkce pro odmocninu je Math.sqrt().
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
 * staticky.
 */
// Solution here

const heron = (numberOne, numberTwo, numberThree) => {

    const p = document.createElement('p');

    if (numberOne + numberTwo < numberThree || numberOne + numberThree < numberTwo || numberTwo + numberThree < numberOne) {

        p.innerText = 'Není trojúhelník.'

    } else {
        const s = (numberOne + numberTwo + numberThree) / 2;
        const area = Math.sqrt(s * (s - numberOne) * (s - numberTwo) * (s - numberThree));
        p.innerText = 'Obsah trojúhelníku je: ' + area;
    }
    results.appendChild(p);
}
const button14 = document.createElement('button');
button14.innerText = 'Heroic performance';
button14.id = 'task-10';
button14.addEventListener('click', () => {
    heron(40, 50, 22);
});
taskButtons.appendChild(button14);

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
