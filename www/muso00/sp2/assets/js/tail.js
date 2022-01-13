// třída fruit se stará o přidání ocasu hada do hry.
class Tail {
    /**
     * Konstruktor inicializuje proměnné třídy 'Tail'
     */
    constructor(x, y) {
        this.x = x; // souřadnice x
        this.y = y; // souřadnice y
        this.color = 'rgb(43, 51, 25)'; // barva
    }

    /**
     * Vestavěná funkce knihovny p5.js. Metoda je použita
     * pro zobrazení ocasu a dalších tvarů na herním poli.
     */
    show() {
        fill(this.color); // obarvení ocasu
        rect(this.x, this.y, gap, gap, 4); // definice tvaru článků ocasu
    };
}