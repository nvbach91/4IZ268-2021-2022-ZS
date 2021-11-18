/**
 * 0) Pre-preparacion.
 * - Vytvořte HTML stránku s nadpisem h1 "JavaScript is awesome!" 
 * - Na stránce vytvořte místo pro umístění jednotlivých spouštěčů úkolů - tlačítek (tj. div, který má id s hodnotou "task-buttons"). 
 * - Na stránce vytvořte místo pro výpis výsledků úkolů (div, který má id s hodnotou "result").
 * 
 * - Připojte tento homework.js soubor k vytvořené HTML stránce pomocí tagu <script> (viz LAB) a vyzkoušejte
 * console.log('Ahoj světe');
 */

 console.log('Ahoj Světe');
 const taskButtons = document.getElementById('task-buttons');
 const result = document.getElementById('result');
 
 /**
  * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu s věkem Pepy, pokud znáte jeho rok narození, 
  * který je uložený v proměnné a pro výpis použijte zřetězení stringů nebo interpolaci. Pro názvy proměnných 
  * používejte smysluplnou angličtinu.
  */
 // Solution here
 const birthday = 2005;
 const Year = new Date().getFullYear();
 console.log(Year - birthday);
 /**
  * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
  * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
  *     z C na F: vynásobit 9, vydělit 5 a přičíst 32. 
  *     z F na C: odečíst 32, vynásobit 5 a vydělit 9. 
  */
 // Solution here
 const celsius = 20;
 const fahrenheiht = 68;
 console.log("Celsius to Fahrenheiht :");
 console.log(celsius * 9 / 5 + 32);
 console.log("Fahrenheiht to Celsius :");
 console.log((fahrenheiht - 32) * 5 / 9);
 
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
 
 function age(birthday) {
     const Year2 = new Date().getFullYear();
     return ("Age : " + (Year2 - birthday));
 }
 
 const button1 = document.createElement('button');
 button1.innerText = 'Age';
 button1.id = 'task1';
 button1.addEventListener('click', () => {
     result.innerText = (age((2000)));
 });
 taskButtons.appendChild(button1);
 
 function ctf(Celsius) {
     return ("Celsius to Fahrenheit: " + (Celsius * 9 / 5 + 32));
 }
 
 const button2 = document.createElement('button');
 button2.innerText = 'Celsius to Fahrenheit';
 button2.id = 'task2';
 button2.addEventListener('click', () => {
     result.innerText = (ctf(25));
 });
 taskButtons.appendChild(button2);
 
 function ftc(Fahrenheiht) {
     return ("Fahrenheit to Celsius: " + (Fahrenheiht - 32) * 5 / 9);
 }
 
 const button3 = document.createElement('button');
 button3.innerText = 'Fahrenheit to Celsius';
 button3.id = 'task3';
 button3.addEventListener('click', () => {
     result.innerText = (ftc(68));
 });
 taskButtons.appendChild(button3);
 
 /**
  * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla. 
  * Výsledek vypište v procentech do předem vytvořeného místa na stránce pro výsledky, např. 21 je 50% z 42. Pro 
  * zkrácení / zaokrouhlení desetinných míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); 
  * Pozor na dělení nulou! 
  * 
  * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3
  */
 // Solution here
 
 
 
 function percentage(number1, number2) {
     if (number2 == 0) {
         return ("Dělení nulou");
 
     }
     else {
         const result = (number1 / number2 * 100);
         return (number1 + " je " + result.toFixed(0) + "%" + " z " + number2);
     }
 }
 
 const button4 = document.createElement('button');
 button4.innerText = 'Percentage';
 button4.id = 'task4';
 button4.addEventListener('click', () => {
     result.innerText = (percentage(30, 15));
 });
 taskButtons.appendChild(button4);
 
 /**
  * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vypíše, který z nich je větší, do předem vytvořeného 
  * místa na strácne. Pokud se čísla rovnají, vypište, že se rovnají. 
  * 
  * Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky, atd., tj. vytvoříte tlačítko s událostí pro každou
  * kombinaci argumentů a zkuste ji párkrát zavolat kliknutím na toto tlačítko. Tlačítka vytvářejte podle pokynu v 
  * úloze č. 3. Argumenty pro volání funkce zadávejte staticky.
  */
 // Solution here
 
 function compare(number1, number2) {
     if (number1 == number2) {
         return ("Čísla se rovnají");
     } 
     else {
         if (number1 > number2) {
 
             return (number1 + " je Větší");
         }
 
         else {
             return (number2 + " je Větší");
         }
 
     }
 
 }
 
 const button5 = document.createElement('button');
 button5.innerText = 'Compare';
 button5.id = 'task5';
 button5.addEventListener('click', () => {
     result.innerText = (40, 40);
 });
 taskButtons.appendChild(button5);
 
 /**
  * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
  * nebo rovno 730, včetě nuly. Používejte for cyklus. 
  * 
  * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
  */
 // Solution here
 
 function multiply() {
     let a = "";
     for (let i = 0; i <= 730 / 13; i++) {
         a += i * 13 + ", ";
     }
     return a;
 }
 
 const button6 = document.createElement('button');
 button6.innerText = 'Multiply';
 button6.id = 'task6';
 button6.addEventListener('click', () => {
     result.innerText = (multiply());
 });
 taskButtons.appendChild(button6);
 /**
  * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
  *
  * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
  * staticky.
  */
 // Solution here
 
 function square(radius) {
     var aa = Math.PI * Math.pow(radius, 2);
     return ("Area of a circle is: " + aa.toFixed(2));
 }
 
 const button7 = document.createElement('button');
 button7.innerText = 'Square';
 button7.id = 'task7';
 button7.addEventListener('click', () => {
     result.innerText = (square(5));
 });
 taskButtons.appendChild(button7);
 
 /**
  * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
  * 
  * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
  * staticky.
  */
 // Solution here
 
 function calculateConeVolume(height, radius) {
     var aa = 1 / 3 * Math.PI * Math.pow(radius, 2) * height;
     return ("Volume of cone: " + aa.toFixed(2));
 }
 const button8 = document.createElement('button');
 button8.innerText = 'Cone';
 button8.id = 'task8';
 button8.addEventListener('click', () => {
     result.innerText = (calculateConeVolume(4, 6));
 });
 taskButtons.appendChild(button8);
 
 /** 
  * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z 
  * dodaných 3 délek na argumentu funkce dá postavit trojúhelník, tj. vypíše tyto 3 délky stran a, b, a c
  * a výsledek buď ano/ne, true/yes nebo false/no. Z funkce vraťte hodnotu true/false
  * 
  * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
  * staticky.
  */
 // Solution here
 
 function isTriangle(s1, s2, s3) {
     var flag = false;
     if (s1 + s2 > s3) {
         flag = true;
     }
     if (s1 + s3 > s2) {
         flag = true;
     }
     if (s2 + s3 > s1) {
         flag = true;
     }
     if (flag = true) {
         return (flag);
     }
     if (flag = false) {
         return (flag);
     }
 }
 
 const button9 = document.createElement('button');
 button9.innerText = 'Triangle';
 button9.id = 'task9';
 button9.addEventListener('click', () => {
     result.innerText = (isTriangle(3, 4, 5));
 });
 taskButtons.appendChild(button9);
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
 function calculateTriangleArea(s1, s2, s3) {
     if (isTriangle(s1, s2, s3)) {
         const s = (s1 + s2 + s3) / 2;
         let res = s * ((s - s1) * (s - s2) * (s - s3));
         let res2 = Math.sqrt(res);
         return res2.toFixed(2);
     }
     else {
         return "Chyba";
     }
 
 }
 
 const button10 = document.createElement('button');
 button10.innerText = 'Heron';
 button10.id = 'task10';
 button10.addEventListener('click', () => {
     result.innerText = (calculateTriangleArea(3, 3, 3))
 });
 taskButtons.appendChild(button10);
 