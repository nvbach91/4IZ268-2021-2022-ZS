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

const pepeAge = new Date().getFullYear() - Math.floor(Math.random() * 2021);

//const mySentence = 'Pepe´s age is ' + pepeAge;
const mySentence = `Pepe´s age is ${pepeAge}`;

console.log(mySentence);


/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9. 
 */
// Solution here
const temperatureInCelsius = 50;

const temperatureFromCToF = temperatureInCelsius * 9 / 5 + 32;
//const temperatureFromFToC = (temperatureFromFToC - 32) *5 / 9;

console.log(temperatureInCelsius + '°C = ' + temperatureFromCToF + '°F');

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


//Definice funkce - věk Pepy
const pepe = (bornYear) => {
    const age = new Date().getFullYear() - bornYear;
    if (bornYear >= 0) {
        const concatenate = 'Pepe´s age is ' + age + ' because he was born in ' + bornYear + 'AD';
        return concatenate;
    } else {
        const concatenate = 'Pepe´s age is ' + age + ' because he was born in ' + bornYear*(-1) + 'BC';
        return concatenate;
    }
};

//Vytváření tlačítka pro Pepu
const button1 = document.getElementById('task-1').addEventListener('click', function () {

    const bornYear = (Math.random() < 0.5 ? -1 : 1) * Math.floor(Math.random() * 2021);

    const paragraph = document.createElement('p');
    paragraph.innerText = pepe(bornYear);
    document.getElementById('result').appendChild(paragraph);
});




//Definice funkce - konverze jednotek
const temperatureFromFToC = (temperatureInF) => {
    if (temperatureInF > -459.67) {
        const conversion = (temperatureInF - 32) * 5 / 9;
        return temperatureInF + '°F = ' + Math.round(conversion) + '°C';
    } else {
        return `Temperature ${temperatureInF}°F is out of range (Nothing can be colder than absolute zero!).`;
    }
};

//Vytváření tlačítka pro konverzi
const button2 = document.getElementById('task-2');

button2.addEventListener('click', function () {

    const temperature = (Math.random() < 0.5 ? -1 : 1) * Math.floor(Math.random() * 2021);

    const paragraph = document.createElement('p');
    paragraph.innerText = temperatureFromFToC(temperature);
    document.getElementById('result').appendChild(paragraph);
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

const button3 = document.createElement('button');
button3.innerText = 'Uloha 4 (%CENSORED%)';
document.getElementById('task-buttons').appendChild(button3);

button3.addEventListener('click', function () {
    let num1 = (Math.random() < 0.5 ? -1 : 1) * Math.floor(Math.random() * 2021);
    let num2 = (Math.random() < 0.5 ? -1 : 1) * Math.floor(Math.random() * 2021);
    const ratio = (num1, num2) => {
        if (num2 != 0) {
            const result = num1 / num2 * 100;
            return `Číslo ${num1} je ${result.toFixed(2)}% z ${num2}.`;
        } else {
            return 'Nelze dělit nulou.';
        }
    };
    document.getElementById('result').appendChild(document.createElement('p')).innerText = ratio(num1, num2);
});



// Button builder pro použití v následujících úlohách
const addButton = (id, text) => {
    const btn = document.createElement('button');
    btn.id = id;
    btn.innerText = text;
    document.getElementById('task-buttons').appendChild(btn);
    /*btn.addEventListener('click', function() {
        document.getElementById('result').appendChild(document.createElement('p')).innerText = func;
    });*/
    return btn;
};


//Připojí výsledky k dokumentu
const listener = (func) => {
    document.getElementById('result').appendChild(document.createElement('p')).innerText = func;
};

//Funkce pro náhodné generování celých čísel (tzn. včetně desetinných čísel)
const randomNum = () => {
    return ((Math.random() < 0.5 ? -1 : 1) * Math.random() * 2021).toFixed(2);
};

//Funkce pro náhodné generování přirozených čísel (pouze Integer)
const randomInt = () => {
    return (Math.random() < 0.5 ? -1 : 1) * Math.floor(Math.random() * 2021);
};


/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vypíše, který z nich je větší, do předem vytvořeného 
 * místa na strácne. Pokud se čísla rovnají, vypište, že se rovnají. 
 * 
 * Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky, atd., tj. vytvoříte tlačítko s událostí pro každou
 * kombinaci argumentů a zkuste ji párkrát zavolat kliknutím na toto tlačítko. Tlačítka vytvářejte podle pokynu v 
 * úloze č. 3. Argumenty pro volání funkce zadávejte staticky.
 */
// Solution here


const compareNum = (ranNum1, ranNum2) => {
    if (ranNum1 < ranNum2) {
        return `${ranNum1} < ${ranNum2}. Číslo ${ranNum1} je menší než ${ranNum2}.`
    } else if (ranNum1 > ranNum2) {
        return `${ranNum1} > ${ranNum2}. Číslo ${ranNum1} je větší než ${ranNum2}.`
    } else {
        return `${ranNum1} = ${ranNum2}. Čísla se rovnají.`
    };
};

addButton('task-5', 'Uloha 5 (Kdo s koho)').addEventListener('click', function () {
    listener(compareNum(randomNum(), randomInt()));
    listener(compareNum(randomNum(), randomNum()));
    listener(compareNum(randomNum(), (randomInt() / randomNum()).toFixed(2)));
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
        result = 13 * i;
        listener(result);
    };
};

addButton('task-6', 'Uloha 6 (I can cleary see the pattern)').addEventListener('click', function () {
    pattern();
});



/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu.
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
 * staticky.
 */
// Solution here

const circleArea = (radius) => {
    if (radius > 0) {
        return `Circle with radius ${radius} has area of ${(Math.PI * radius ** 2).toFixed(2)}`;
    } else {
        return `Radius ${radius} is invalid. Circle cannot have negative radius!`;
    }
};

addButton('task-7', 'Uloha 7 (Around and about)').addEventListener('click', function () {
    listener(circleArea(randomNum()));
});


/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr.
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
 * staticky.
 */
// Solution here

const coneVolume = (height, radius) => {
    if (height > 0 && radius > 0) {
        volume = (Math.PI * radius ** 2 * (height / 3)).toFixed(2);
        return `Volume of a cone with height ${height} and radius ${radius} is ${volume}.`
    } else if (height <= 0) {
        return `Height ${height} cannot be negative.`
    } else {
        return `Radius ${radius} cannot be negative.`
    }
};

addButton('task-8', 'Uloha 8 (Another dimension)').addEventListener('click', function () {
    listener(coneVolume(randomNum(), randomNum()));
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

const triangle = (a, b, c) => {
    Math.abs(a); Math.abs(b); Math.abs(c);
    if (a + b > c && a + c > b && b + c > a) {
        return `A is ${a}, b is ${b}, c is ${c}, so it is ` + true + '.'
    } else {
        return `A is ${a}, b is ${b}, c is ${c}, so it is ` + false + '.'
    };
};

addButton('task-9', 'Uloha 9 (Not sure if triangle, or just some random values)').addEventListener('click', function () {
    listener(triangle(Math.abs(randomNum()), Math.abs(randomNum()), Math.abs(randomNum())));
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

const heron = (a, b, c) => {
    result = document.getElementById('result');
    let text = 'hero';
    if (triangle(a, b, c).includes('true')) {
        const semi = (a + b + c) / 2;
        const area = Math.sqrt(semi * (semi - a) * (semi - b) * (semi - c)).toFixed(2);
        text = `Triangle with sides: ${a}, ${b}, ${c} has area of ${area}.`;
    } else {
        text = `A is ${a}, b is ${b}, c is ${c}, so it is not a valid triangle.`;
    }
    const paragraph = document.createElement('p');
    paragraph.innerText = text;
    result.appendChild(paragraph);
};

addButton('task-10', 'Uloha 10 Heroic performance').addEventListener('click', function () { 
    heron(Math.abs(randomNum()), Math.abs(randomNum()), Math.abs(randomNum())) 
});




