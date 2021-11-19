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

console.log('Hello world!');

// vyber elementu body a dosazeni do promenne body
const body = document.querySelector('body');
// vyber elementu h1 a dosazeni do promenne "headline"
const headline = document.createElement('h1');

// dozazeni textu "JavaScript is awesome!" do nadpisu
headline.innerText = 'JavaScript is awesome!';

//umisti headline do body
body.appendChild(headline);

const buttons = document.getElementById('task-buttons');
const results = document.getElementById('result');

const appendResult = (resultToAppend) => {
    let string = document.createElement('p');
    string.innerText = resultToAppend;
    results.appendChild(string);
}



/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu ohledně věku Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů. Pro názvy proměnných používejte smysluplnou 
 * angličtinu.
 */
const currentYear = new Date().getFullYear();
const pepesDateOfBirth = 1999;
console.log('Pepemu je ' + (currentYear - pepesDateOfBirth) + ' let.');



/**
 * 2) WTF (wow, that's fun). Vypište teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Výpočet probíhá takto:
 *     z C na F: vynásobit devíti, vydělit pěti a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit pěti a vydělit devítkou. 
 */
const celsiusAmount = 20;
const fahrenheitAmount = 451;

const celsiusToFahrenheit = celsiusAmount * 9 / 5 + 32;
const fahrenheitToCelsius = (fahrenheitAmount - 32) * 5 / 9;

console.log(celsiusAmount + ' stupnu celsia je ' + celsiusToFahrenheit + ' stupnu fahrenheita.')
console.log(fahrenheitAmount + ' stupnu fahrenheita je ' + fahrenheitToCelsius + ' stupnu celsia.')



/**
 * 3) Funkce function fonction funktio. Vemte předchozí úlohy a udělejte z nich funkce. Tj. vytvořte funkce, 
 * které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli. 
 * Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce. 
 */
// Pepe
const getPepesAge = (pepesDateOfBirth) => {
    const pepesAge = currentYear - pepesDateOfBirth;
    return 'Pepemu je ' + pepesAge + ' let.';
};

console.log('Pepovi je ' + getPepesAge(2000) + ' let.');
console.log('Pepovi je ' + getPepesAge(1974) + ' let.');
console.log('Pepovi je ' + getPepesAge(1829) + ' let.');
console.log('Pepovi je ' + getPepesAge(2004) + ' let.');

const btn_pepe = document.createElement('button');
btn_pepe.innerText = '01: Pepe\'s age';
btn_pepe.id = 't01';
buttons.appendChild(btn_pepe);
btn_pepe.addEventListener('click', () => {
    appendResult(getPepesAge(1950));
});



// Prevodnik stupnu
const getFahrenheitFromCelisus = (celsiusAmount) => {
    const fahrenheitFromCelsius = celsiusAmount * 9 / 5 + 32;
    return celsiusAmount + ' °C = ' + fahrenheitFromCelsius + ' °F';
};

console.log(getFahrenheitFromCelisus(26));
console.log(getFahrenheitFromCelisus(233));
console.log(getFahrenheitFromCelisus(35));

const btn_CtoF = document.createElement('button');
btn_CtoF.innerText = '02a: Celsius to Fahrenheit';
btn_CtoF.id = 't02a';
buttons.appendChild(btn_CtoF);
btn_CtoF.addEventListener('click', () => {
    appendResult(getFahrenheitFromCelisus(26));
});


const getCelsiusFromFahrenheit = (fahrenheitAmount) => {
    const celsiusFromFahrenheit = (fahrenheitAmount - 32) * 5 / 9;
    return fahrenheitAmount + ' °F = ' + celsiusFromFahrenheit + ' °C';
};

console.log(getCelsiusFromFahrenheit(451));
console.log(getCelsiusFromFahrenheit(100));
console.log(getCelsiusFromFahrenheit(32));

const btn_FtoC = document.createElement('button');
btn_FtoC.innerText = '02b: Fahrenheit to Celsius';
btn_FtoC.id = 't02b';
buttons.appendChild(btn_FtoC);
btn_FtoC.addEventListener('click', () => {
    appendResult(getCelsiusFromFahrenheit(451));
});



/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla. 
 * Výsledek vypište v procentech do předem vytvořeného místa na stránce pro výsledky, např. 21 je 50% z 42. Pro 
 * zkrácení / zaokrouhlení desetinných míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); 
 * Pozor na dělení nulou! 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3
 */

const countPercentage = (a, b) => {
    if (b === 0) {
        return 'Deleni nulou!'
    } else {
        const resultPerc = (a / b * 100).toFixed(2);
        return 'Podil cisla ' + a + ' z cisla ' + b + ' je ' + resultPerc + '%';
    }
};

console.log(countPercentage(46, 0));

const btn_percentage = document.createElement('button');
btn_percentage.innerText = '03: Count percentage';
btn_percentage.id = 't03';
buttons.appendChild(btn_percentage);
btn_percentage.addEventListener('click', () => {
    appendResult(countPercentage(46, 66));
});


/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí ten větší z nich. Pokud se čísla 
 * rovnají, vypište, že se rovnají. Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky. Zkuste 
 * je párkrát zavolat v kódu a výsledky uložit do proměnných. 
 */
const getGreater = (a, b) => {
    if (a < b) {
        return b + ' (' + a + ' vs ' + b + ')';
    }
    if (a > b) {
        return a + ' (' + a + ' vs ' + b + ')';
    }
    return 'a = b'
};

console.log(getGreater(26, 26));

const btn_greater = document.createElement('button');
btn_greater.innerText = '04: Get greater';
btn_greater.id = 't04';
buttons.appendChild(btn_greater);
btn_greater.addEventListener('click', () => {
    appendResult(getGreater(98, 22));
});



/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for cyklus. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */


for (let i = 0; i <= 730; i += 13) {
    console.log(i);
};

const getPattern = (nmb) => {
    let txt = '';
    for (let i = 0; nmb * i <= 730; i++) {
        txt += nmb * i + ' ';
    } return txt;
};

const btn_cycle = document.createElement('button');
btn_cycle.innerText = '05: Pattern';
btn_cycle.id = 't05';
buttons.appendChild(btn_cycle);
btn_cycle.addEventListener('click', () => {
    appendResult(getPattern(13));
});



/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
const countCircleArea = (radius) => {
    const circleArea = Math.PI * radius ^ 2;
    return 'Obsah kruhu s polomerem ' + radius + ' je ' + circleArea + '.';
};

console.log(countCircleArea(36));

const btn_circleArea = document.createElement('button');
btn_circleArea.innerText = '06: Circle area';
btn_circleArea.id = 't06';
buttons.appendChild(btn_circleArea);
btn_circleArea.addEventListener('click', () => {
    appendResult(countCircleArea(36));
});



/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
const countConeVolume = (height, radius) => {
    const result = Math.PI * radius ^ 2 * height / 3;
    //const result = (1/3) * Math.PI * radius^2 * height;
    return 'Objem kuzelu o vysce ' + height + ' a polomeru ' + radius + ' je ' + result + '.';
};

console.log(countConeVolume(10, 12));

const btn_coneVolume = document.createElement('button');
btn_coneVolume.innerText = '07: Cone volume';
btn_coneVolume.id = 't07';
buttons.appendChild(btn_coneVolume);
btn_coneVolume.addEventListener('click', () => {
    appendResult(countConeVolume(10, 12));
});



/** 
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z 
 * dodaných 3 délek na argumentu funkce dá postavit trojúhelník, tj. vypíše tyto 3 délky stran a, b, a c
 * a výsledek buď ano/ne, true/yes nebo false/no. Z funkce vraťte hodnotu true/false
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */

const isTriangle = (a, b, c) => {
    if (a <= 0 || b <= 0 || c <= 0) {
        return 'all values must to be greater than 0';
    } else if (a + b > c && a + c > b && b + c > a) {
        return 'a= ' + a + ', b= ' + b + ', c= ' + c + ' \| TRUE';
    } else {
        return 'a= ' + a + ', b= ' + b + ', c= ' + c + ' \| FALSE';
    }
};

console.log(isTriangle(29, 28, 18));
console.log(isTriangle(29, 0, 18));
console.log(isTriangle(29, 300, 18));

const btn_triangle = document.createElement('button');
btn_triangle.innerText = '08: Triangle';
btn_triangle.id = 't08';
buttons.appendChild(btn_triangle);
btn_triangle.addEventListener('click', () => {
    appendResult(isTriangle(8, 12, 10));
});



/**
 * 10) Heroic performance. Vytvořte funkci, která vypočte a vypíše obsah trojúhelníka podle Heronova vzorce, 
 * tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci v úloze č. 9, tj. počítejte pouze, 
 * když to má smysl. Hint: funkce pro odmocninu je Math.sqrt().
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */

const countHeronsFormula = (a, b, c) => {
    if (isTriangle(a, b, c) === 'all values must to be greater than 0' 
    || isTriangle(a, b, c) === 'a= ' + a + ', b= ' + b + ', c= ' + c + ' \| FALSE') {
        return 'not a triangle';
    }
    const x = (a + b + c) / 2;
    const tr_area = Math.sqrt(x * (x - a) * (x - b) * (x - c));
    return 'a= ' + a + ', b= ' + b + ', c= ' + c + ' | Heron\s formula = ' + tr_area.toFixed(3);
};

console.log(countHeronsFormula(2, 3, 3));
console.log(countHeronsFormula(2, 0, 3));

const btn_heron = document.createElement('button');
btn_heron.innerText = '09: Heron\'s formula';
btn_heron.id = 't09';
buttons.appendChild(btn_heron);
btn_heron.addEventListener('click', () => {
    appendResult(countHeronsFormula(6, 8, 10));
});