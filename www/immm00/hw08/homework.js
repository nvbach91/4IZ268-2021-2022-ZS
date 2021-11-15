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

const task_buttons = document.getElementById('task-buttons');
const result = document.getElementById('result');

console.log('Ahoj světe');

/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu s věkem Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů nebo interpolaci. Pro názvy proměnných 
 * používejte smysluplnou angličtinu.
 */
// Solution here


const current_year = new Date().getFullYear();
const birth_year = 2000;
console.log(current_year - birth_year);


/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9. 
 */
// Solution here

const celsius = 100;
const fahrenheit = 100;
console.log(celsius * 9 / 5 + 32);
console.log((fahrenheit - 32) * 5 / 9);

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

function get_age(birth_year) {
    console.log(new Date().getFullYear() - birth_year);
    return new Date().getFullYear() - birth_year;
}

const button1 = document.createElement('button');
button1.innerText='Pepe\'s age';
button1.id='task-1';
button1.addEventListener('click', () => {
    result.innerText=(get_age(2000));
});
task_buttons.appendChild(button1);


function to_celsius(F) {
    console.log((F - 32) * 5 / 9);
    return (F - 32) * 5 / 9;
}

const button2 = document.createElement('button');
button2.innerText='To Celsius';
button2.id='task-2C';
button2.addEventListener('click', () => {
    result.innerText=(to_celsius(100));
});
task_buttons.appendChild(button2);

function to_fahrenheit(C) {
    console.log(C * 9 / 5 + 32);
    return C * 9 / 5 + 32;
}

const button3 = document.createElement('button');
button3.innerText='To Fahrenheit';
button3.id='task-2F';
button3.addEventListener('click', () => {
    result.innerText=(to_fahrenheit(32));
});
task_buttons.appendChild(button3);



/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla. 
 * Výsledek vypište v procentech do předem vytvořeného místa na stránce pro výsledky, např. 21 je 50% z 42. Pro 
 * zkrácení / zaokrouhlení desetinných míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); 
 * Pozor na dělení nulou! 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3
 */
// Solution here

function get_percentage_of(a, b) {
    if (b != 0) {
        console.log(((a / b) * 100).toFixed(2));
        return ((a / b) * 100).toFixed(2);
    } else{
        console.log('error: division by 0');
        return 'error: division by 0';
    }
}

const button4 = document.createElement('button');
button4.innerText='%CENSORED%';
button4.id='task-4';
button4.addEventListener('click', () => {
    result.innerText=(get_percentage_of(21, 42) + '%');
});
task_buttons.appendChild(button4);



/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vypíše, který z nich je větší, do předem vytvořeného
 * místa na strácne. Pokud se čísla rovnají, vypište, že se rovnají.
 *
 * Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky, atd., tj. vytvoříte tlačítko s událostí pro každou
 * kombinaci argumentů a zkuste ji párkrát zavolat kliknutím na toto tlačítko. Tlačítka vytvářejte podle pokynu v
 * úloze č. 3. Argumenty pro volání funkce zadávejte staticky.
 */
// Solution here

function get_greater(a,b){
    if(a>b){
        console.log(a + ' or ' + b + ': ' + a);
        return a;
    } else if (a<b){
        console.log(a + ' or ' + b + ': ' + b);
        return b;
    } else{
        console.log(a + ' or ' + b + ': equals');
        return 'A equals B';
    }
}

const button5 = document.createElement('button');
button5.innerText='Kdo s koho';
button5.id='task-5';
button5.addEventListener('click', () => {
    result.innerText=(get_greater(10,10));
});
task_buttons.appendChild(button5);


/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší
 * nebo rovno 730, včetě nuly. Používejte for cyklus.
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */
// Solution here

function nasobky_13_mensi_rovno_730(){
    let result_array = [];
    for(let i=0;i<=730/13;i++){
        console.log(i*13);
        result_array.push(i*13);
    }
    return result_array;
}

const button6 = document.createElement('button');
button6.innerText='I can cleary see the pattern';
button6.id='task-6';
button6.addEventListener('click', () => {
    result.innerText=(nasobky_13_mensi_rovno_730());
});
task_buttons.appendChild(button6);


/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu.
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
 * staticky.
 */
// Solution here

function get_circle_area(radius){
    console.log(Math.PI*radius*radius);
    return Math.PI*radius*radius;
}

const button7 = document.createElement('button');
button7.innerText='Aroud and about';
button7.id='task-7';
button7.addEventListener('click', () => {
    result.innerText=(get_circle_area(10));
});
task_buttons.appendChild(button7);

/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr.
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
 * staticky.
 */
// Solution here

function get_kuzel_volume(height, radius){
    console.log((1/3)*Math.PI*radius*radius*height);
    return (1/3)*Math.PI*radius*radius*height;
}

const button8 = document.createElement('button');
button8.innerText='Another dimension';
button8.id='task-6';
button8.addEventListener('click', () => {
    result.innerText=(get_kuzel_volume(10,10));
});
task_buttons.appendChild(button8);



/**
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z
 * dodaných 3 délek na argumentu funkce dá postavit trojúhelník, tj. vypíše tyto 3 délky stran a, b, a c
 * a výsledek buď ano/ne, true/yes nebo false/no.
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
 * staticky.
 */
// Solution here


function check_if_triangle(a,b,c){
    if(a+b<c | a+c<b | b+c<a){
        console.log('a=' + a + ', b= ' + b + ', c= ' + c + ': '+'false');
        return false;
    } else {
        console.log('a=' + a + ', b= ' + b + ', c= ' + c + ': '+'true')
        return true;
    }
}

const button9 = document.createElement('button');
button9.innerText='Not sure if traingle, ...';
button9.id='task-9';
button9.addEventListener('click', () => {
    result.innerText=(check_if_triangle(1,1,10));
});
task_buttons.appendChild(button9);


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

function get_triangle_area(a,b,c){
    if(!check_if_triangle(a,b,c)){
        console.log('not a triangle');
        return('not a triangle')
    } else {
        const s = (a+b+c)/2;
        console.log(Math.sqrt(s*(s-a)*(s-b)*(s-c)));
        return Math.sqrt(s*(s-a)*(s-b)*(s-c));
    }
}

const button10 = document.createElement('button');
button10.innerText='Heroic performance';
button10.id='task-6';
button10.addEventListener('click', () => {
    result.innerText=(get_triangle_area(10,10,10));
});
task_buttons.appendChild(button10);