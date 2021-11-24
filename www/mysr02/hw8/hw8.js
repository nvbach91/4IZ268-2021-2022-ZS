
/* HOMEWORK */
window.onload = () => {
    const taskButtons = document.querySelector("#task-buttons");
    const result = document.querySelector("#result");

    function createButton(text, id) {
        const button = document.createElement("button");
        button.innerText = text;
        button.id = id;
        button.style = 'margin: 10px';
        return button;
    }

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
    const birthYear = 2018;
    const pepesAge = (new Date()).getFullYear() - birthYear;
    console.log(`Pepe's age is ${pepesAge}.`);

    /**
     * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak.
     * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
     *     z C na F: vynásobit 9, vydělit 5 a přičíst 32.
     *     z F na C: odečíst 32, vynásobit 5 a vydělit 9.
     */
    const celsius = 13;
    const fahrenheiht = ((celsius * 9) / 5) + 32;
    console.log(`${celsius}°C = ${fahrenheiht}°F`);

    const celsiusFromFahrenheiht = ((fahrenheiht - 32) * 5) / 9;
    console.log(`${fahrenheiht}°F = ${celsiusFromFahrenheiht}°C`);

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
    const START_UNIX_YEAR = 1970;
    const getAge = (birthDate) => {
        if (!(birthDate instanceof Date)) {
            throw new Error('Birthdate must be instance of Date!');
        }
        if (birthDate.getTime() > Date.now()) {
            throw new Error('BirthDate must be in past!');
        }
        return (new Date(Date.now() - birthDate.getTime())).getFullYear() - START_UNIX_YEAR;
    };

    const getFahrenheihtFromCelsius = (celsius) => ((celsius * 9) / 5) + 32;

    const getCelsiusFromFahrenheiht = (fahrenheiht) => ((fahrenheiht - 32) * 5) / 9;

    const button1 = createButton('Pepe\'s age', 'pepe');
    button1.addEventListener('click', () => {
        result.innerText = getAge(new Date('2019-07-11'));
    });

    const button2 = createButton('Celsius', 'celsius');
    button2.addEventListener('click', () => {
        result.innerText = getFahrenheihtFromCelsius(10);
    });

    const button3 = createButton('Fahrenheiht', 'fahrenheiht');
    button3.addEventListener('click', () => {
        result.innerText = getFahrenheihtFromCelsius(50);
    });
    taskButtons.append(button1, button2, button3);

    /**
     * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla.
     * Výsledek vypište v procentech do předem vytvořeného místa na stránce pro výsledky, např. 21 je 50% z 42. Pro
     * zkrácení / zaokrouhlení desetinných míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2);
     * Pozor na dělení nulou!
     *
     * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3
     */
    const percentage = (x, y) => {
        if (y === 0) throw new Error(`Second parameter can't be zero!`);
        return x / y * 100;
    };
    console.log(`21 is ${percentage(21, 42).toFixed(0)}% of 42`);

    /**
     * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vypíše, který z nich je větší, do předem vytvořeného
     * místa na strácne. Pokud se čísla rovnají, vypište, že se rovnají.
     *
     * Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky, atd., tj. vytvoříte tlačítko s událostí pro každou
     * kombinaci argumentů a zkuste ji párkrát zavolat kliknutím na toto tlačítko. Tlačítka vytvářejte podle pokynu v
     * úloze č. 3. Argumenty pro volání funkce zadávejte staticky.
     */
    const selectBiggerNumber = (x, y) => x > y ? x : y;

    const button4 = createButton('selectBiggerNumber1', 'selectBiggerNumber1');
    button4.addEventListener('click', () => {
        result.innerText = selectBiggerNumber(10, 20);
    });
    const button5 = createButton('selectBiggerNumber2', 'selectBiggerNumber1');
    button5.addEventListener('click', () => {
        result.innerText = selectBiggerNumber(10 / 3, 11 / 4).toFixed(2);
    });
    const button6 = createButton('selectBiggerNumber3', 'selectBiggerNumber1');
    button6.addEventListener('click', () => {
        result.innerText = selectBiggerNumber(10.11, 13.78);
    });
    taskButtons.append(button4, button5, button6);

    /**
     * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší
     * nebo rovno 730, včetě nuly. Používejte for cyklus.
     *
     * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
     */
    const multiples13 = () => {
        const allMultiples = [];
        for (let i = 0; i < 730; i += 13) {
            allMultiples.push(i);
        }
        return allMultiples;
    };

    const button7 = createButton('Multiples13', 'multiples13');
    button7.addEventListener('click', () => {
        result.innerText = multiples13().join(', ');
    });
    taskButtons.append(button7);

    /**
     * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu.
     *
     * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
     * staticky.
     */

    const calculateCircleArea = (radius) => Math.PI * Math.pow(radius, 2);

    const button8 = createButton('Around and about', 'circleArea');
    button8.addEventListener('click', () => {
        result.innerText = calculateCircleArea(13).toFixed(2);
    });
    taskButtons.append(button8);

    /**
     * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr.
     *
     * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
     * staticky.
     */

    const calculateConeVolume = (height, radius) => Math.PI * Math.pow(radius, 2) * (height / 3);

    const button9 = createButton('Another dimension', 'coneVolume');
    button9.addEventListener('click', () => {
        result.innerText = calculateConeVolume(132, 13).toFixed(2);
    });
    taskButtons.append(button9);

    /**
     * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z
     * dodaných 3 délek na argumentu funkce dá postavit trojúhelník, tj. vypíše tyto 3 délky stran a, b, a c
     * a výsledek buď ano/ne, true/yes nebo false/no. Z funkce vraťte hodnotu true/false
     *
     * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
     * staticky.
     */
    const isValidTriangle = (a, b, c) => (a + b) > c && (a + c) > b && (b + c) > a;

    const button10 = createButton('Valid triangle', 'validTriangle');
    button10.addEventListener('click', () => {
        result.innerText = isValidTriangle(13, 13, 13) ? 'Valid' : 'Invalid';
    });
    taskButtons.append(button10);

    const button11 = createButton('Invalid triangle', 'invalidTriangle');
    button11.addEventListener('click', () => {
        result.innerText = isValidTriangle(130, 13, 13) ? 'Valid' : 'Invalid';
    });
    taskButtons.append(button11);

    /**
     * 10) Heroic performance. Vytvořte funkci, která vypočte a vypíše obsah trojúhelníka podle Heronova vzorce,
     * tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci v úloze č. 9, tj. počítejte pouze,
     * když to má smysl. Hint: funkce pro odmocninu je Math.sqrt().
     *
     * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
     * staticky.
     */

    const calculateTriangleArea = (a, b, c) => {
        if (!isValidTriangle(a, b, c)) {
            throw new Error('Invalid triangle!');
        }
        const s = (a + b + c) / 2;
        return Math.sqrt(s * (s - a) * (s - b) * (s - c));
    };

    const button12 = createButton('Heroic performance', 'heroicPerformance');
    button12.addEventListener('click', () => {
        result.innerText = calculateTriangleArea(13, 13, 13).toFixed(2);
    });
    taskButtons.append(button12);
};
