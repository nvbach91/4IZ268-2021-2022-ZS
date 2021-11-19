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

var buttons = document.getElementById('task-buttons');
var results = document.getElementById('results');

console.log('Ahoj světe');

/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu s věkem Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů nebo interpolaci. Pro názvy proměnných 
 * používejte smysluplnou angličtinu.
 */

var currentTime = new Date();
var currYear = currentTime.getFullYear();
var pepeYear = 1992;
console.log('Pepovi je ' + (currYear - pepeYear) + '.');

/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9. 
 */

var cels = 30;
var fahr = 68;

console.log('Převod z °C na °F: ' + cels + '°C = ' + ((((cels * 9) / 5)) + 32) + '°F.');
console.log('Převod z °F na °C: ' + fahr + '°F = ' + ((((fahr - 32) * 5)) / 9) + '°C.');

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

const writePePeAge = (year) => {
    return ('Pepovi je ' + (currYear - year) + '.');
}

const buttonA = document.createElement('button');
buttonA.innerText = 'Úloha 1 Pepe\'s age';
buttonA.id = 'task-1';

buttonA.addEventListener('click', () => {
    console.log(writePePeAge(1998));
    results.innerText = writePePeAge(1998);
});

const buttonB = document.createElement('button');
buttonB.innerText = 'Úloha 2 WTF';
buttonB.id = 'task-2';

const convCtoF = (cls) => {
    return ('Převod z °C na °F: ' + cls + '°C = ' + ((((cls * 9) / 5)) + 32) + '°F.');
}

const convFtoC = (fhr) => {
    return ('Převod z °F na °C: ' + fhr + '°F = ' + ((((fhr - 32) * 5)) / 9) + '°C.');
}

buttonB.addEventListener('click', () => {
    console.log(convCtoF(20));
    console.log(convFtoC(86));
    results.innerText = (convCtoF(20)) + " " + (convFtoC(86));

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

const propNumbers = (numA, numB) => {
    if (numA == 0 || numB == 0) {
        return 'Nulou dělit nelze.';
    }
    else {

        var res = (numB / (numA / 100));
        res.toFixed(2);
        return numB + ' je ' + res + '% z ' + numA;
    }
}

const buttonC = document.createElement('button');
buttonC.innerText = 'Úloha 4 %CENSORED%';
buttonC.id = 'task-3';

buttonC.addEventListener('click', () => {
    console.log(propNumbers(200, 10));
    results.innerText = (propNumbers(200, 10));

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

const eqlNumb = (numA, numB) => {
    if (numA === numB) {
        return 'Čísla se rovnají.';
    } else if (numA > numB) {
        return 'Číslo ' + numA + ' je větší než ' + numB + '.';
    } else {
        return 'Číslo ' + numB + ' je větší než ' + numA + '.';
    }
}

const buttonD = document.createElement('button');
buttonD.innerText = ' Úloha 5 Kdo s koho - celá';
buttonD.id = 'task-5';

buttonD.addEventListener('click', () => {
    console.log(eqlNumb(200, 10));
    results.innerText = (eqlNumb(200, 10));

});

const buttonE = document.createElement('button');
buttonE.innerText = 'Úloha 5 Kdo s koho - desetinná';
buttonE.id = 'task-5';

buttonE.addEventListener('click', () => {
    console.log(eqlNumb(10.0999, 10.09991));
    results.innerText = (eqlNumb(10.0999, 10.09991));

});

const buttonF = document.createElement('button');
buttonF.innerText = 'Úloha 5 Kdo s koho - zlomky';
buttonF.id = 'task-5';

buttonF.addEventListener('click', () => {
    console.log(eqlNumb(4 / 6, 2 / 3));
    results.innerText = (eqlNumb(4 / 6, 2 / 3));

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

const multiplesNumb = (multN, endN) => {
    var res = '';
    for (let i = 0; i <= endN; i += multN) {
        res = res + i + '| ';
    }
    return res;
}

const buttonG = document.createElement('button');
buttonG.innerText = 'Úloha 6 I can cleary see the pattern';
buttonG.id = 'task-6';

buttonG.addEventListener('click', () => {
    console.log(multiplesNumb(13, 730));
    results.innerText = (multiplesNumb(13, 730));

});

buttons.appendChild(buttonG);

/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu.
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
 * staticky.
 */

const conCircle = (radius) => {
    return 'Obsah kružnice je ' + Math.PI * radius * radius + '.';
}

const buttonH = document.createElement('button');
buttonH.innerText = 'Úloha 7 Around and about';
buttonH.id = 'task-7';

buttonH.addEventListener('click', () => {
    console.log(conCircle(5));
    results.innerText = (conCircle(5));

});

buttons.appendChild(buttonH);

/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr.
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
 * staticky.
 */

const vCon = (radius, height) => {
    return 'Objem kuželu je ' + (1 / 3) * Math.PI * radius * radius * height + '.';
}

const buttonI = document.createElement('button');
buttonI.innerText = 'Úloha 8 Another dimension';
buttonI.id = 'task-8';

buttonI.addEventListener('click', () => {
    console.log(vCon(5, 10));
    results.innerText = (vCon(5, 10));

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

const controlTriangle = (a, b, c) => {
    if ((a + b > c) && (b + c > a) && (a + c > b)) {

        return true;
    }
    else {
        return false;
    }

}

console.log(controlTriangle(1, 1, 3));

const buttonJ = document.createElement('button');
buttonJ.innerText = 'Úloha 9 Not sure if triangle';
buttonJ.id = 'task-9';

buttonJ.addEventListener('click', () => {
    var a = 5;
    var b = 10;
    var c = 7;
    console.log(controlTriangle(a, b, c));
    results.innerText = 'Zadané délky stran jsou: ' + a + ', ' + b + ', ' + c + '. Možnost sestavit trojúhelník: ' + (controlTriangle(a, b, c)) + '.';

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

const heronsF = (a, b, c) => {
    if (controlTriangle(a, b, c) === true) {
        var s = ((a + b + c) / 2);
        var res1 = s * (s - a) * (s - b) * (s - c);
        var res2 = Math.sqrt(res1);
        return 'Obsah trojúhelníku podle Heronova vzorce je: ' + res2 + '.';
    }

    else {
        return 'Obsah trojúhelníku nelze vypočítat, zadány nevalidí vstupní hodnoty.';
    }

}

const buttonK = document.createElement('button');
buttonK.innerText = 'Úloha 10 Heroic performance';
buttonK.id = 'task-10';

buttonK.addEventListener('click', () => {
    console.log(heronsF(4, 10, 7));
    results.innerText = (heronsF(4, 10, 7));

});

buttons.appendChild(buttonK);
