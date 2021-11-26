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
 const body = document.querySelector('body');

 const header = document.createElement('h1');
 header.innerHTML = "JavaScript is awesome!";

 const divForButton = document.createElement('div');
 divForButton.setAttribute("id", "task-button");
 
 const divForResult = document.createElement('div')
 divForResult.setAttribute("id", "result")
 
 body.append(header, divForButton, divForResult);

console.log('Ahoj světe')

/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu s věkem Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů nebo interpolaci. Pro názvy proměnných 
 * používejte smysluplnou angličtinu.
 */
// Solution here
const currentYear = new Date().getFullYear();
const yearOfBirth = 1999;
console.log("Pepe was born in " + yearOfBirth + " and that makes him " + (currentYear - yearOfBirth) + " years old");



/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9. 
 */
// Solution here
let celsius = (5/9) * (68-32);
let fahrenheit = (20 * 9/5 + 32);

console.log("20°C = " + fahrenheit + " °F");
console.log("68°F = " + celsius + " °C");


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
function getAge(year) {
    
    age = 2021 - year
    return "Pepe's age is " + age;
}
console.log(getAge(1999));

function toCelsius(fahrenheit) {
    return (5/9) * (fahrenheit-32);
}
function toFahrenheit(celsius) {
    return (celsius * 9/5 + 32);
}

const btnGetAge = document.createElement('button');
btnGetAge.setAttribute("id", "task-1");
btnGetAge.innerText = "Get Pepe's age";

const btnConvertToCelsius = document.createElement('button');
btnConvertToCelsius.setAttribute("id", "task-2");
btnConvertToCelsius.innerText = "Convert to Celsius";

const btnConvertToFahrenheit = document.createElement('button');
btnConvertToFahrenheit.setAttribute("id", "task-3");
btnConvertToFahrenheit.innerText = "Convert to Fahrenheit";

divForButton.append(btnGetAge, btnConvertToCelsius, btnConvertToFahrenheit);

document.getElementById('task-1').addEventListener("click", function() {
    let inputValue = 1999;
    divForResult.innerText = "Pepe was born in " + inputValue + " and is " + getAge(inputValue) + " years old";
  });

document.getElementById('task-2').addEventListener("click", function() {
    let inputValue = 35;
    divForResult.innerText = inputValue + " °F equals to " + toCelsius(inputValue) + " °C";
  });

  document.getElementById('task-3').addEventListener("click", function() {
    let inputValue = 26;
    divForResult.innerText = inputValue + " °C equals to " + toFahrenheit(inputValue) + " °F";
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
function countShare(dividend, divisor) {
    if(dividend == 0) {
        return "Dividing by zero is prohibited"
    } else {
        share = (divisor / dividend) * 100;
        return share.toFixed() + " %";
    }
    
}

const btnGetShare = document.createElement('button');
btnGetShare.setAttribute("id", "task-4");
btnGetShare.innerText = "%CENSORED%";

divForButton.appendChild(btnGetShare);

document.getElementById("task-4").addEventListener("click", function() {
    let inputDivisor = 21;
    let inputDividend = 42;
    divForResult.innerText = countShare(inputDividend, inputDivisor);
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
function whichIsBigger(x, y) {
    if(x > y) { 
        return x;
    } else if(x < y) {
        return y;
    }
    return "Numbers are equal"
}

const btnGetBigger = document.createElement('button');
btnGetBigger.setAttribute("id", "task-5");
btnGetBigger.innerText = "Kdo s koho";

divForButton.appendChild(btnGetBigger);

document.getElementById("task-5").addEventListener("click", function() {
    let inputX = 32/2;
    let inputY = 25.2;
    divForResult.innerText = whichIsBigger(inputX, inputY);
});

/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for cyklus. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */
// Solution here
function multiplesOf13() {
    let result_array = [];
    for (let i = 0; i * 13 <= 730; i++) {
      console.log(i * 13);
      result_array.push(i * 13);
    }
    return result_array;
  }

const btnForTask = document.createElement('button');
btnForTask.setAttribute("id", "task-6");
btnForTask.innerText = "I can cleary see the pattern";

divForButton.appendChild(btnForTask);

document.getElementById("task-6").addEventListener("click", function() {
    divForResult.innerText = multiplesOf13();
});


/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here
function countCircleArea(radius) {
    let area = radius * radius * Math.PI;
    return area;
}

const btnCountArea = document.createElement('button');
btnCountArea.setAttribute("id", "task-7");
btnCountArea.innerText = "Around and about";

divForButton.appendChild(btnCountArea);

document.getElementById("task-7").addEventListener("click", function() {
    let radius = 12;
    divForResult.innerText = countCircleArea(radius);
});

/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here
function countConeVolume(height, radius) {
    let volume = Math.PI * radius * radius * height / 3;
    return volume;
}

const btnCountConeVolume = document.createElement('button');
btnCountConeVolume.setAttribute("id", "task-8");
btnCountConeVolume.innerText = "Another dimension";

divForButton.appendChild(btnCountConeVolume);

document.getElementById("task-8").addEventListener("click", function() {
    let height = 5;
    let radius = 3;
    divForResult.innerText = countConeVolume(height, radius);
});


/** 
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z 
 * dodaných 3 délek na argumentu funkce dá postavit trojúhelník, tj. vypíše tyto 3 délky stran a, b, a c
 * a výsledek buď ano/ne, true/yes nebo false/no. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here
function isTriangle (a, b, c) {
    if((a + b < c) || (b + c < a) || (a + c < b)) {
        console.log("a = " + a + ", b = " + b + ", c = " + c + " false");
        return false;
    } 
    console.log("a = " + a + ", b = " + b + ", c = " + c + " true");
    return true;
    
}

const btnCreateTriangle = document.createElement('button');
btnCreateTriangle.setAttribute("id", "task-9");
btnCreateTriangle.innerText = "Not sure if triangle";

divForButton.appendChild(btnCreateTriangle);

document.getElementById("task-9").addEventListener("click", function() {
    let a = 25;
    let b = 5;
    let c = 5;
    divForResult.innerText = isTriangle(a, b, c);
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


function heroicPerfomance(a, b, c) {

    if(isItTriangle(a, b, c)) {
        let s = (a + b + c) / 2;
        let area = Math.sqrt(s * (s - a) * ( s - b) * (s - c));
        return area;
    } else {
        return "Input values are invalid";
    }
    
}

const btnHeroicPerfomance = document.createElement('button');
btnHeroicPerfomance.setAttribute("id", "task-10");
btnHeroicPerfomance.innerText = "Heroic perfomance";

divForButton.appendChild(btnHeroicPerfomance);

document.getElementById("task-10").addEventListener("click", function() {
    let a = 7;
    let b = 6;
    let c = 6;
    divForResult.innerText = heroicPerfomance(a, b, c);
});