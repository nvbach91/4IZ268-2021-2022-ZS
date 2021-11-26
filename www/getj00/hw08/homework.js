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
console.log("Ahoj, světe!");
let doTasks = [() => {document.getElementById("result").innerHTML = "";}]; //result clearing function to align indices
let output = document.getElementById("result");

/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu s věkem Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů nebo interpolaci. Pro názvy proměnných 
 * používejte smysluplnou angličtinu.
 */
doTasks.push(() => {
    let age = Math.round(Math.random() * 100 + 5);
    console.log("Pepovi je " + age + " let.");
    output.innerHTML += "<p>Pepovi je " + age + " let.</p>";
});


/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9. 
 */

// There are no input boxes
doTasks.push(() => {
    let cels = Math.round(Math.random() * 100 - 50);
    console.log(cels + "°C = " + Math.round(cels*9/5+32) + "°F");
    let fahr = Math.round(Math.random() * 200 - 50);
    console.log(fahr + "°F = " + Math.round((fahr-32)*5/9) + "°C");
});


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

const pepeAge = (age) => {
    console.log("Pepovi je " + age + " let.");
    output.innerHTML += "<p>Pepovi je " + age + " let.</p>";
}
const celsToFahr = (cels) => {
    console.log(cels + "°C = " + Math.round(cels*9/5+32) + "°F");;
}
const fahrToCels = (fahr) => {
    console.log(fahr + "°F = " + Math.round((fahr-32)*5/9) + "°C");;
}

doTasks.push(() => {
    pepeAge(20);pepeAge(30);pepeAge(40);
    for(let i = -50; i <= 50; i += 10){
        celsToFahr(i);
    }
    for(let i = -50; i <= 150; i += 20){
        fahrToCels(i);
    }
});


/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla. 
 * Výsledek vypište v procentech do předem vytvořeného místa na stránce pro výsledky, např. 21 je 50% z 42. Pro 
 * zkrácení / zaokrouhlení desetinných míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); 
 * Pozor na dělení nulou! 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3
 */

const ratio = (numerator, denominator) => {
    if(denominator === 0){return;}
    output.innerHTML += "<p>" + numerator.toFixed(3) + " je " + (100*numerator/denominator).toFixed(3) + " % z " + denominator.toFixed(3) + "</p>";
}

doTasks.push(() => {
    ratio(Math.random(), Math.random());
});


/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vypíše, který z nich je větší, do předem vytvořeného 
 * místa na strácne. Pokud se čísla rovnají, vypište, že se rovnají. 
 * 
 * Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky, atd., tj. vytvoříte tlačítko s událostí pro každou
 * kombinaci argumentů a zkuste ji párkrát zavolat kliknutím na toto tlačítko. Tlačítka vytvářejte podle pokynu v 
 * úloze č. 3. Argumenty pro volání funkce zadávejte staticky.
 */

const maximum = (a,b) => {
    if(a>b){
        output.innerHTML += "<p>" + a + "</p>";
    }else if(a<b){
        output.innerHTML += "<p>" + b + "</p>";
    }else{
        output.innerHTML += "<p>Čísla se rovnají.</p>";
    }
}

doTasks.push(() => {
    let a = Math.round(Math.random()*10);
    let b = Math.round(Math.random()*10);
    console.log("Generated: " + a + ", " + b);
    maximum(a,b);
});


/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for cyklus. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */
const multiples13until = (limit) => {
    output.innerHTML += "<p>";
    for(let i = 0; i <= limit/13; ++i){
        output.innerHTML += i*13 + ", ";
    }
    output.innerHTML += "</p>";
} 

doTasks.push(() => {
    multiples13until(730);
});


/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Technically speaking, a circle ring doesn't have any area as it's just a curve.
const circleArea = (radius) => {
    return Math.PI*radius*radius;
}

doTasks.push(() => {
    let r = Math.round(Math.random()*10);
    output.innerHTML += "<p> r = " + r + "; S = " + circleArea(r).toFixed(3) + "</p>";
});


/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */

const coneVolume = (radius,height) => {
    return 2*Math.PI*radius*height;
}

doTasks.push(() => {
    let r = Math.round(Math.random()*10);
    let h = Math.round(Math.random()*20);
    console.log("Generated: " + r + ", " + h);
    output.innerHTML += "<p> r = " + r + "; h = " + h + "; V = " + coneVolume(r,h).toFixed(3) + "</p>";
});


/** 
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z 
 * dodaných 3 délek na argumentu funkce dá postavit trojúhelník, tj. vypíše tyto 3 délky stran a, b, a c
 * a výsledek buď ano/ne, true/yes nebo false/no. Z funkce vraťte hodnotu true/false
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */

const triangleInequality = (a,b,c) => {
    return (a+b>c && a+c>b && b+c>a);
}

doTasks.push(() => {
    let a = Math.round(Math.random()*20);
    let b = Math.round(Math.random()*20);
    let c = Math.round(Math.random()*20);
    output.innerHTML += "<p> Trojúhelník se stranami " + a + ", " + b + " a " + c + " " + ( triangleInequality(a,b,c)?"existuje":"neexistuje" ) + ".</p>";
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

const heronsFormula = (a,b,c) => {
    if(triangleInequality(a,b,c)){
        let s = (a+b+c)/2;
        return Math.sqrt(s*(s-a)*(s-b)*(s-c));
    }else{
        return -1;
    }
}

doTasks.push(() => {
    let a = Math.round(Math.random()*20);
    let b = Math.round(Math.random()*20);
    let c = Math.round(Math.random()*20);
    let textStart = "<p> Trojúhelník se stranami " + a + ", " + b + " a " + c;
    let result = heronsFormula(a,b,c).toFixed(3);
    if(result !== -1){
        output.innerHTML += textStart + " má obsah " + result + ".</p>";
    }else{
        output.innerHTML += textStart + " není skutečný.</p>";
    }
    
});


// Add listeners (don't contaminate HTML with other languages)
document.getElementById("clear").addEventListener("click", doTasks[0]);
for(let i = 1; i <= 10; ++i){
    document.getElementById("task" + i).addEventListener("click", doTasks[i]);
}

