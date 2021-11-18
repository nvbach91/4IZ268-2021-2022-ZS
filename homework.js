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

/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu s věkem Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů nebo interpolaci. Pro názvy proměnných 
 * používejte smysluplnou angličtinu.
 */
const pepa_year = 1980;
const pepa_age = new Date().getFullYear()-pepa_year;
console.log('Pepa was born in ' + pepa_year + '. He is ' + pepa_age + ' years old.');



/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9. 
 */
const c = 30;
const c_to_f = c*9/5+32; 
const f_to_c = (c_to_f-32)*5/9;
console.log(c + '°С = ' + c_to_f + '°F resp. ' + c_to_f + '°F = ' + f_to_c + '°C');



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

 const buttons_container = document.querySelector('#task-buttons');
 const results_container = document.querySelector('#result');


const get_age=(pepa_year)=>{
    const pepa_age = new Date().getFullYear()-pepa_year;
    return 'Pepa was born in ' + pepa_year + '. He is ' + pepa_age + ' years old.';
}
const button1 = document.createElement('button');
button1.innerText = "Pepe's age";
button1.id = 'task-1';
buttons_container.appendChild(button1);
button1.addEventListener('click', ()=>{
    write_result(get_age(1980));
});
function write_result(text) {
    const result1 = document.createElement('p');
    result1.innerText = text;
    results_container.appendChild(result1);
}   




const convert=(c)=>{
    const c_to_f = c*9/5+32; 
    const f_to_c = (c_to_f-32)*5/9;
    return c + '°С = ' + c_to_f + '°F resp. ' + c_to_f + '°F = ' + f_to_c + '°C';
}
const button2 = document.createElement('button');
button2.innerText = "WTF";
button2.id = 'task-2';
buttons_container.appendChild(button2);
button2.addEventListener('click', ()=>{
    write_result(convert(30));
});
function write_result(text) {
    const result2 = document.createElement('p');
    result2.innerText = text;
    results_container.appendChild(result2);
}   



/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla. 
 * Výsledek vypište v procentech do předem vytvořeného místa na stránce pro výsledky, např. 21 je 50% z 42. Pro 
 * zkrácení / zaokrouhlení desetinných míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); 
 * Pozor na dělení nulou! 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3
 */
function get_percentage(a,b){
    if (b==0){
        return 'Dělení nulou!';
    }
    result = a/b*100;
    return a + " je " + result.toFixed(0) + "% ze " + b;
}
const button3 = document.createElement('button');
button3.innerText = "%CENSORED%";
button3.id = 'task-4';
buttons_container.appendChild(button3);
button3.addEventListener('click', ()=>{
    write_result(get_percentage(20,100));
});
function write_result(text) {
    const result3 = document.createElement('p');
    result3.innerText = text;
    results_container.appendChild(result3);
}




/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vypíše, který z nich je větší, do předem vytvořeného 
 * místa na strácne. Pokud se čísla rovnají, vypište, že se rovnají. 
 * 
 * Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky, atd., tj. vytvoříte tlačítko s událostí pro každou
 * kombinaci argumentů a zkuste ji párkrát zavolat kliknutím na toto tlačítko. Tlačítka vytvářejte podle pokynu v 
 * úloze č. 3. Argumenty pro volání funkce zadávejte staticky.
 */
function compare(a,b){
    if (a>b){
        return a + ' je větší než ' + b;
    } else if (a==b){
        return a + ' se rovná ' + b;
    } else{
        return b + ' je větší než ' + a;
    }
}
const button4 = document.createElement('button');
button4.innerText = "Kdo s koho";
button4.id = 'task-5';
buttons_container.appendChild(button4);
button4.addEventListener('click', ()=>{
    write_result(compare(20,30));
});
function write_result(text) {
    const result4 = document.createElement('p');
    result4.innerText = text;
    results_container.appendChild(result4);
}




/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for cyklus. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */
function show_multiple(){
    let all = [];
    for (let i=0; i<=730; i++){
        if (i%13==0){
            all.push(i);
        }
    }
    return all;
}
const button5 = document.createElement('button');
button5.innerText = "I can cleary see the pattern";
button5.id = 'task-6';
buttons_container.appendChild(button5);
button5.addEventListener('click', ()=>{
    write_result(show_multiple());
});
function write_result(text) {
    const result5 = document.createElement('p');
    result5.innerText = text;
    results_container.appendChild(result5);
}



/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
function count_area(radius){
    return 'Obsah kružnice s poloměrem ' + radius + ' = ' + Math.PI.toFixed(5)*Math.pow(radius,2);
}
const button6 = document.createElement('button');
button6.innerText = "Around and about";
button6.id = 'task-7';
buttons_container.appendChild(button6);
button6.addEventListener('click', ()=>{
    write_result(count_area(10));
});
function write_result(text) {
    const result6 = document.createElement('p');
    result6.innerText = text;
    results_container.appendChild(result6);
}




/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
function count_cone(h,r){
    return 'Objem kuželu = ' + 1/3*Math.PI*Math.pow(r,2)*h;
}
const button7 = document.createElement('button');
button7.innerText = "Another dimension";
button7.id = 'task-8';
buttons_container.appendChild(button7);
button7.addEventListener('click', ()=>{
    write_result(count_cone(2,5));
});
function write_result(text) {
    const result7 = document.createElement('p');
    result7.innerText = text;
    results_container.appendChild(result7);
}




/** 
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z 
 * dodaných 3 délek na argumentu funkce dá postavit trojúhelník, tj. vypíše tyto 3 délky stran a, b, a c
 * a výsledek buď ano/ne, true/yes nebo false/no. Z funkce vraťte hodnotu true/false
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
function count_triangle(a,b,c){
    if (a+b>c && b+c>a && c+a>b){
        return true;
    } else{
        return false;
    }
}
const button8 = document.createElement('button');
button8.innerText = "Not sure if triangle";
button8.id = 'task-9';
buttons_container.appendChild(button8);
button8.addEventListener('click', ()=>{
    write_result(count_triangle(3,3,3));
});
function write_result(text) {
    const result8 = document.createElement('p');
    result8.innerText = text;
    results_container.appendChild(result8);
}



/**
 * 10) Heroic performance. Vytvořte funkci, která vypočte a vypíše obsah trojúhelníka podle Heronova vzorce, 
 * tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci v úloze č. 9, tj. počítejte pouze, 
 * když to má smysl. Hint: funkce pro odmocninu je Math.sqrt().
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
function count_heron(a,b,c){
    if (a+b>c && b+c>a && c+a>b){
        const p = (a+b+c)/2;
        const s = Math.sqrt(p*(p-a)*(p-b)*(p-c));
        return s; 
    } else{
        return false;
    }
}
const button9 = document.createElement('button');
button9.innerText = "Heroic performance";
button9.id = 'task-10';
buttons_container.appendChild(button9);
button9.addEventListener('click', ()=>{
    write_result(count_heron(3,3,3));
});
function write_result(text) {
    const result9 = document.createElement('p');
    result9.innerText = text;
    results_container.appendChild(result9);
}
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