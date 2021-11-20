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
console.log('Ahoj svete')

const buttons = document.getElementById('task-buttons');
const results = document.getElementById('result');


/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu s věkem Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů nebo interpolaci. Pro názvy proměnných 
 * používejte smysluplnou angličtinu.
 */
// Solution here
const Pepa = {
    pepasBirthday: '11.09. ',
    pepasBirthYear: 2001,
    todaysDate: new Date()
}

const { pepasBirthday, pepasBirthYear, todaysDate} = Pepa;

console.log(
    'Pepas age is ' + (todaysDate.getFullYear() - pepasBirthYear) + ' because he was born ' + pepasBirthday + pepasBirthYear
); 

/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9. 
 */
// Solution here
const celsium = 20;
const fahrenheit = 68;

console.log('Převod z °C na °F: ' + celsium + '°C = ' + ((((celsium * 9) / 5)) + 32) + '°F.' + 'Převod z °F na °C: ' + fahrenheit + '°F = ' + ((((fahrenheit - 32) * 5)) / 9) + '°C.');

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


const showPepasAge = (pepasBirthYear) => {
    const todaysDate = new Date();
    return 'Pepas age is ' + (todaysDate.getFullYear() - pepasBirthYear) + ' because he was born ' + pepasBirthYear;
}

const buttonA = document.createElement('button');
buttonA.innerText = 'Úloha 1 Pepas age';
buttonA.id = 'task-1';
buttonA.addEventListener('click', () => {
    console.log(showPepasAge(1969));
    results.innerText = showPepasAge(1969);
});


const convertTemperatures = (celsium, fahrenheit) => {
    return 'Převod z °C na °F: ' + celsium + '°C = ' + ((((celsium * 9) / 5)) + 32) + '°F.' + 'Převod z °F na °C: ' + fahrenheit + '°F = ' + ((((fahrenheit - 32) * 5)) / 9) + '°C.';
}

const buttonB = document.createElement('button');
buttonB.innerText = 'Úloha 2 WTF';
buttonB.id = 'task-2';

buttonB.addEventListener('click', () => {
    console.log(convertTemperatures(20, 68));
    results.innerText = (convertTemperatures(20, 68));

});

buttons.appendChild(buttonA);
buttons.appendChild(buttonB);


/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla. 
 * Výsledek vypište v procentech do předem vytvořeného místa na stránce pro výsledky, např. 21 je 50% z 42. Pro 
 * zkrácení / zaokrouhlení desetinných míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); 
 * Pozor na dělení nulou! 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3
 */
// Solution here
const percentCounter = (x, y) => {
    if (y === 0) {
        return 'Nulou delit nelze.';
    } else {
        const res = (y / (x / 100));
        res.toFixed(2);
        return y + ' je ' + res + '% z ' + x;
    }
}

const buttonC = document.createElement('button');
buttonC.innerText = 'Úloha 4 %CENSORED%';
buttonC.id = 'task-3';

buttonC.addEventListener('click', () => {
    console.log(percentCounter(100, 20));
    results.innerText = (percentCounter(100, 20));

});

buttons.appendChild(buttonC);



/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vypíše, který z nich je větší, do předem vytvořeného 
 * místa na strácne. Pokud se čísla rovnají, vypište, že se rovnají. 
 * 
 * Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky, atd., tj. vytvoříte tlačítko s událostí pro každou
 * kombinaci argumentů a zkuste ji párkrát zavolat kliknutím na toto tlačítko. Tlačítka vytvářejte podle pokynu v 
 * úloze č. 3. Argumenty pro volání funkce zadávejte staticky.
 */
// Solution here
const eqlNumb = (x, y) => {
    if (x === y) {
        return 'Čísla se rovnají.';
    } else if (x > y) {
        return 'Číslo ' + x + ' je větší než ' + y + '.';
    } else {
        return 'Číslo ' + y + ' je větší než ' + x + '.';
    }
}

const buttonD = document.createElement('button');
buttonD.innerText = ' Úloha 5 Kdo s koho - celá';
buttonD.id = 'task-5';

buttonD.addEventListener('click', () => {
    console.log(eqlNumb(228, 322));
    results.innerText = (eqlNumb(228, 322));

});

const buttonE = document.createElement('button');
buttonE.innerText = 'Úloha 5 Kdo s koho - desetinná';
buttonE.id = 'task-5';

buttonE.addEventListener('click', () => {
    console.log(eqlNumb(2.28, 3.22));
    results.innerText = (eqlNumb(2.28, 3.22));

});

const buttonF = document.createElement('button');
buttonF.innerText = 'Úloha 5 Kdo s koho - zlomky';
buttonF.id = 'task-5';

buttonF.addEventListener('click', () => {
    console.log(eqlNumb(5 / 15, 8 / 16));
    results.innerText = (eqlNumb(5 / 15, 8 / 16));

});

buttons.appendChild(buttonD);
buttons.appendChild(buttonE);
buttons.appendChild(buttonF);





/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for cyklus. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */
// Solution here
const multiplesOfNumber = (numb, endNumb) => {
    var res = '';
    for (let i = 0; i <= endNumb; i += numb) {
        res = res + i + ' ';
    }
    return res;
}

const buttonG = document.createElement('button');
buttonG.innerText = 'Úloha 6 I can cleary see the pattern';
buttonG.id = 'task-6';

buttonG.addEventListener('click', () => {
    console.log(multiplesOfNumber(13, 730));
    results.innerText = (multiplesOfNumber(13, 730));

});

buttons.appendChild(buttonG);




/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here
const contentOfCircle = (radius) => {
    return 'Obsah kružnice je ' + Math.PI * radius ^ 2 + '.';
}

const buttonH = document.createElement('button');
buttonH.innerText = 'Úloha 7 Around and about';
buttonH.id = 'task-7';

buttonH.addEventListener('click', () => {
    console.log(contentOfCircle(9));
    results.innerText = (contentOfCircle(9));

});

buttons.appendChild(buttonH);




/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here
const volumeOfCone = (radius, height) => {
    return 'Objem kuželu je ' + (1 / 3) * Math.PI * radius ^ 2 * height + '.';
}

const buttonI = document.createElement('button');
buttonI.innerText = 'Úloha 8 Another dimension';
buttonI.id = 'task-8';

buttonI.addEventListener('click', () => {
    console.log(volumeOfCone(9, 27));
    results.innerText = (volumeOfCone(9, 27));

});

buttons.appendChild(buttonI);





/** 
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z 
 * dodaných 3 délek na argumentu funkce dá postavit trojúhelník, tj. vypíše tyto 3 délky stran a, b, a c
 * a výsledek buď ano/ne, true/yes nebo false/no. Z funkce vraťte hodnotu true/false
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here
const triangle = (a, b, c) => {
    if (a + b > c && a + c > b && b + c > a) {
        return 'a= ' + a + ', b= ' + b + ', c= ' + c + ' \| existuje';
    } else {
        return 'a= ' + a + ', b= ' + b + ', c= ' + c + ' \| žadná';
    }
};

const buttonJ = document.createElement('button');
buttonJ.innerText = 'Úloha 9 Not sure if triangle';
buttonJ.id = 'task-9';

buttonJ.addEventListener('click', () => {
    var a = 5;
    var b = 10;
    var c = 8;
    console.log(triangle(a, b, c));
    results.innerText = 'Zadané délky stran jsou: ' + a + ', ' + b + ', ' + c + '. Možnost sestavit trojúhelník: ' + (triangle(a, b, c)) + '.';
});

buttons.appendChild(buttonJ);

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
const heronsFormula = (a, b, c) => {
    if (triangle(a, b, c) === 'a= ' + a + ', b= ' + b + ', c= ' + c + ' \| žadná')  {
        return 'není trojúhelník';
    }
    const x = (a + b + c) / 2;
    const content = Math.sqrt(x * (x - a) * (x - b) * (x - c));
    return 'a= ' + a + ', b= ' + b + ', c= ' + c + ' | Heronový vzorec = ' + content.toFixed(3);
};

const buttonK = document.createElement('button');
buttonK.innerText = 'Úloha 10 Heroic performance';
buttonK.id = 'task-10';

buttonK.addEventListener('click', () => {
    console.log(heronsFormula(5, 10, 8));
    results.innerText = (heronsFormula(5, 10, 8));

});

buttons.appendChild(buttonK);
