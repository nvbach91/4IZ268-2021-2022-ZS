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

const yearOfBirth = 1969;
let actualYear = new Date().getFullYear();

console.log('Pepovi je letos krasnych ' + (actualYear - yearOfBirth) + ' let.');



/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9. 
 */
// Solution here

let temperature = 25;

console.log(temperature + '°C = ' + (temperature * 9 / 5 + 32) + '°F resp. ' + temperature + '°F = ' + ((temperature - 32) * 5 / 9) + '°C');




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

const pepeAge = (year) => {

    let actualYear = new Date().getFullYear();

    console.log('Pepovi je letos krasnych ' + (actualYear - year) + ' let.');
};

const temperatureCelsiusFahrenheit = (temperature) => {
    console.log(temperature + '°C = ' + (temperature * 9 / 5 + 32) + '°F resp. ' + temperature + '°F = ' + ((temperature - 32) * 5 / 9) + '°C');
};

const divTasks = document.getElementById('task-buttons');
const buttonPepe = document.createElement('button');
buttonPepe.setAttribute("id", 'task-1');
buttonPepe.innerText = 'Uloha 1 - pepeAge';
buttonPepe.addEventListener('click', () => {
    pepeAge(1969);
});

divTasks.appendChild(buttonPepe);


const buttonTemperature = document.createElement('button');
buttonTemperature.setAttribute("id", 'task-2');
buttonTemperature.innerText = 'Uloha 2 - temperature';
buttonTemperature.addEventListener('click', () => {
    temperatureCelsiusFahrenheit(25);
});

divTasks.appendChild(buttonTemperature);




/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla.
 * Výsledek vypište v procentech do předem vytvořeného místa na stránce pro výsledky, např. 21 je 50% z 42. Pro
 * zkrácení / zaokrouhlení desetinných míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2);
 * Pozor na dělení nulou!
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3
 */
// Solution here
const divResults = document.getElementById('result');
const share = (number1, number2) => {
    const paragraph = document.createElement('p');

    if (number2 === 0) {
        paragraph.innerText = 'Deleni nulou!'
    } else {
        const share = (number1 / number2) * 100;
        paragraph.innerText = number1 + ' je ' + share.toFixed(1) + '% z ' + number2 + '.';
    };

    divResults.appendChild(paragraph);
};

const buttonShare = document.createElement('button');
buttonShare.setAttribute("id", 'task-4');
buttonShare.innerText = 'Uloha 4 - share';
buttonShare.addEventListener('click', () => {
    share(21, 42);
});

divTasks.appendChild(buttonShare);



/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vypíše, který z nich je větší, do předem vytvořeného
 * místa na strácne. Pokud se čísla rovnají, vypište, že se rovnají.
 *
 * Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky, atd., tj. vytvoříte tlačítko s událostí pro každou
 * kombinaci argumentů a zkuste ji párkrát zavolat kliknutím na toto tlačítko. Tlačítka vytvářejte podle pokynu v
 * úloze č. 3. Argumenty pro volání funkce zadávejte staticky.
 */
// Solution here

const whoIsBigger = (a, b) => {
    const paragraph = document.createElement('p');
    if (a > b) {
        paragraph.innerText = a + ' je větší než ' + b + '.';
    } else if (b > a) {
        paragraph.innerText = b + ' je větší než ' + a + '.';
    } else {
        paragraph.innerText = a + ' se rovná ' + b;
    };

    divResults.appendChild(paragraph);
};

const buttonBigger = document.createElement('button');
buttonBigger.setAttribute("id", 'task-5');
buttonBigger.innerText = 'Uloha 5 - whoIsBigger';
buttonBigger.addEventListener('click', () => {
    whoIsBigger(10, 50);
    whoIsBigger(10.5555, 11.1);
    whoIsBigger(3 / 5, 3 / 4);
});

divTasks.appendChild(buttonBigger);



/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší
 * nebo rovno 730, včetě nuly. Používejte for cyklus.
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */
// Solution here



const thirteen = () => {
    const paragraph = document.createElement('p');
    let stringThirteen = '';
    for (let i = 0; i <= 730; i = i + 13) {
        stringThirteen += i + ' ';
    };
    paragraph.innerText = stringThirteen;
    divResults.appendChild(paragraph);
};

const buttonThirteen = document.createElement('button');
buttonThirteen.setAttribute("id", 'task-6');
buttonThirteen.innerText = 'Uloha 6 - thirteen';
buttonThirteen.addEventListener('click', () => {
    thirteen();
});

divTasks.appendChild(buttonThirteen);


/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu.
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
 * staticky.
 */
// Solution here
const circleArea = (r) => {
    const paragraph = document.createElement('p');
    paragraph.innerText = (Math.PI * r * r);
    divResults.appendChild(paragraph);
};

const buttonArea = document.createElement('button');
buttonArea.setAttribute("id", 'task-7');
buttonArea.innerText = 'Uloha 7 - circleArea';
buttonArea.addEventListener('click', () => {
    circleArea(10);
});

divTasks.appendChild(buttonArea);




/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr.
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
 * staticky.
 */
// Solution here

const coneVolume = (h, r) => {
    const paragraph = document.createElement('p');
    paragraph.innerText = (Math.PI * r * r * h * (1 / 3));
    divResults.appendChild(paragraph);
};

const buttonCone = document.createElement('button');
buttonCone.setAttribute("id", 'task-8');
buttonCone.innerText = 'Uloha 8 - coneVolume';
buttonCone.addEventListener('click', () => {
    coneVolume(10, 5)
});

divTasks.appendChild(buttonCone);

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
    const paragraph = document.createElement('p');

    if (a + b > c && a + c > b && b + c > a && a > 0 && b > 0 && c > 0) {
        paragraph.innerText = (a + ' ' + b + ' ' + c + ' true');
        divResults.appendChild(paragraph);
        return true;
    } else {
        paragraph.innerText = (a + ' ' + b + ' ' + c + ' false');
        divResults.appendChild(paragraph);
        return false;
    }


};

const buttonTriangle = document.createElement('button');
buttonTriangle.setAttribute("id", 'task-9');
buttonTriangle.innerText = 'Uloha 9 - isTriangle';
buttonTriangle.addEventListener('click', () => {
    isTriangle(2, 4, 5);
    isTriangle(-2, 10, 5);
    isTriangle(1, 1, 2);
});

divTasks.appendChild(buttonTriangle);




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

const triangleHeron = (a, b, c) => {
    const paragraph = document.createElement('p');
    const s = (a + b + c) / 2;

    if (a + b > c && a + c > b && b + c > a && a > 0 && b > 0 && c > 0) {
        paragraph.innerText = (Math.sqrt(s * (s - a) * (s - b) * (s - c)));
    } else {
        paragraph.innerText = ('Not a triangle!');
    }

    divResults.appendChild(paragraph);
};

const buttonHeron = document.createElement('button');
buttonHeron.setAttribute("id", 'task-9');
buttonHeron.innerText = 'Uloha 10 - triangleHeron';
buttonHeron.addEventListener('click', () => {
    triangleHeron(2, 4, 5);
    triangleHeron(-2, 10, 5);
    triangleHeron(2, 3, 4);
    triangleHeron(10, 10, 10);
});

divTasks.appendChild(buttonHeron);

