

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

console.log('Ahoj svete');


/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu s věkem Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů nebo interpolaci. Pro názvy proměnných 
 * používejte smysluplnou angličtinu.
 */
// Solution here

const pepesYearOfBirth = 1983;
const date =  new Date().getFullYear();
const result1 = date - pepesYearOfBirth;
const sentence1 = `Pepe was born in ${pepesYearOfBirth}. He is currently ${result1} years old.`;
console.log(sentence1);


/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9. 
 */
// Solution here

const celsiusTest1 = 38;
const fahrenheihtTest2 = 105;

const result2 = (celsiusTest1 * (9/5) ) + 32;
const sentence2 = `${celsiusTest1}°C = ${result2}°F`;

const result3 = (fahrenheihtTest2 - 32) * ( 5/9 );
const sentence3 = `${fahrenheihtTest2}°F = ${result3}°C`;

console.log(sentence2);
console.log(sentence3);


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

const printPepesAge = (birthYear) => {
    const date =  new Date().getFullYear();
    const result = date - birthYear;
    const sentence = `Pepe was born in ${birthYear}. He is currently ${result} years old.`;
    console.log(sentence);
};

const celsToFahr = (celsius) => {
    const result = (celsius * (9/5) ) + 32;
    const sentence = `${celsius}°C = ${result}°F`;
    console.log(sentence);
};
const FahrToCels = (fahrenheiht) => {
    const result = (fahrenheiht - 32) * ( 5/9 );
    const sentence = `${fahrenheiht}°F = ${result}°C`;
    console.log(sentence);
};

printPepesAge(pepesYearOfBirth);
const pepesYearOfBirth2 = 1849;
printPepesAge(pepesYearOfBirth2);

/**
 * Vytvoření tlačítek předchozích úloh
 */

const tasks = document.querySelector('#task-buttons');

const buttonPepe = document.createElement('button');
buttonPepe.innerText = 'Uloha 1 (Pepe\'s age)';
buttonPepe.id = 'task-1';
tasks.appendChild(buttonPepe);
buttonPepe.addEventListener('click',() => {
    printPepesAge(pepesYearOfBirth);
});

const buttonCels = document.createElement('button');
buttonCels.innerText = 'Uloha 2 (WTF, Celsius to Fahreinhaiht)';
buttonCels.id = 'task-2';
tasks.appendChild(buttonCels);
buttonCels.addEventListener('click',() => {
    celsToFahr(celsiusTest1);
});

const buttonFahr = document.createElement('button');
buttonFahr.innerText = 'Uloha 2 (WTF, Fahreinhaiht to Celsius)';
buttonFahr.id = 'task-2';
tasks.appendChild(buttonFahr);
buttonFahr.addEventListener('click',() => {
    FahrToCels(fahrenheihtTest2);
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

const firstNumTest1 = 21;
const secondNumTest1 = 42;
const firstNumTest2 = 15;
const secondNumTest2 = 0;

const division = (firstNum,secondNum) => {
    let sentence = '';
    if (secondNum === 0) {
        sentence = 'Nelze delit nulou!';
    } else {
        let result = (firstNum/secondNum).toFixed(2);
        result = result*100;
        sentence = `${firstNum} je ${result}% z ${secondNum}.`;
    }
    return sentence;
};

console.log(division(firstNumTest1,secondNumTest1));
console.log(division(firstNumTest2,secondNumTest2));

const buttonDiv = document.createElement('button');
buttonDiv.innerText = 'Uloha 4 (%CENSORED%)';
buttonDiv.id = 'task-4';
tasks.appendChild(buttonDiv);

const p = document.createElement('p');
const results = document.querySelector('#result');

results.appendChild(p);

buttonDiv.addEventListener('click',() => {
    p.innerText = division(firstNumTest1,secondNumTest1);
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

const comparator = (firstNum, secondNum) => {
    let sentence = '';
    if(firstNum > secondNum) {
        sentence = `Cislo ${firstNum} je vetsi nez cislo ${secondNum}.`;
    } else if (firstNum < secondNum) {
        sentence = `Cislo ${firstNum} je mensi nez cislo ${secondNum}`;
    } else {
        sentence = `Cisla ${firstNum} a ${secondNum} se rovnaji.`;
    }
    return sentence;
}

const cmpSmallerButton = document.createElement('button');
const cmpBiggerButton = document.createElement('button');
const cmpEqualsButton = document.createElement('button');

cmpSmallerButton.innerText = 'Uloha 5 (Kdo s koho, mensi)';
cmpSmallerButton.id = 'task-5';
tasks.appendChild(cmpSmallerButton);
cmpSmallerButton.addEventListener('click',() => {
    p.innerText = comparator(1,2);
});

cmpBiggerButton.innerText = 'Uloha 5 (Kdo s koho, vetsi)';
cmpBiggerButton.id = 'task-5';
tasks.appendChild(cmpBiggerButton);
cmpBiggerButton.addEventListener('click',() => {
    p.innerText = comparator(1.131000001,1.131);
});

cmpEqualsButton.innerText = 'Uloha 5 (Kdo s koho, rovnost)';
cmpEqualsButton.id = 'task-5';
tasks.appendChild(cmpEqualsButton);
cmpEqualsButton.addEventListener('click',() => {
    p.innerText = comparator(3/7,3/7);
});


/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for cyklus. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */
// Solution here

const cycling = () => {
    let sentence = '';
    for (let i = 0; i <= 730; i += 13) {
        sentence += i + '\n';
    }
    return sentence;
};

const thirteenButton = document.createElement('button');
thirteenButton.id = 'task-6';
thirteenButton.innerText = 'Uloha 6 (I can cleary see the pattern)';
tasks.appendChild(thirteenButton);

thirteenButton.addEventListener('click', () => {
    p.innerText = cycling();
});


/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here

const circleArea = (radius) => {
    let sentence = '';
    const result = (Math.PI * Math.pow(radius,2)).toFixed(3);
    sentence = `obsah kruznice o polomeru ${radius} jednotek je roven ${result} jednotek^2 (zaokrouhleno na 3 desetinna mista).`;
    return sentence;
};

const circleButton = document.createElement('button');
circleButton.id = 'task-7';
circleButton.innerText = 'Uloha 7 (Around and about)';
tasks.appendChild(circleButton);
circleButton.addEventListener('click', () => {
    p.innerText = circleArea(7);
});


/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here

const coneVolume = (height, radius) => {
    let sentence = '';
    const result = ((1/3)*Math.PI*Math.pow(radius,2)*height).toFixed(3);
    sentence = `objem kuzelu o polomeru ${radius} jednotek a vysce ${height} jednotek je roven ${result} jednotek^3 (zaokrouhleno na 3 desetinna mista).`;
    return sentence;
};

const coneButton = document.createElement('button');
coneButton.id = 'task-8';
coneButton.innerText = 'Uloha 8 (Another dimension)';
tasks.appendChild(coneButton);
coneButton.addEventListener('click', () => {
    p.innerText = coneVolume(7,10);
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

const isTriangle = (a,b,c) => {
    if ((a+b > c) && (a+c > b) && (c+b > a)) {
        return true;
    } else {
        return false;
    }
};

const triangleButton = document.createElement('button');
triangleButton.id = 'task-9';
triangleButton.innerText = 'Uloha 9 (Not sure if triangle, or just some random values)';
tasks.appendChild(triangleButton);
triangleButton.addEventListener('click', () => {
    p.innerText = isTriangle(4,3,6);
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

const heronTriangle = (a,b,c) => {
    let sentence = '';
    const isTriangle = (a,b,c) => {
        if ((a+b > c) && (a+c > b) && (c+b > a)) {
            return true;
        } else {
            return false;
        }
    };

    if (isTriangle === false) {
        sentence = `Chybova hlaska: strany ${a}, ${b} a ${c} netvori trojuhelnik.`;
    } else {
        const s = (a+b+c)/2;
        const result = Math.sqrt(s*(s-a)*(s-b)*(s-c));
        sentence = `Obsah trojuhelniku se stranami a=${a}, b=${b} a c=${c} je roven ${result} jednotek^2.`;
    }
    return sentence;
};

const heronButton = document.createElement('button');
heronButton.id = 'task-10';
heronButton.innerText = 'Uloha 10 (Heroic performance)';
tasks.appendChild(heronButton);
heronButton.addEventListener('click', () => {
    p.innerText = heronTriangle(4,5,6);
});
