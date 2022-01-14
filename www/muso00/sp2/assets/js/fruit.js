// třída fruit se stará o přidání potravy pro hada do hry.
class Fruit {
    /**
     * Konstruktor inicializuje proměnné třídy 'Fruit'
     * Je zde použita funkce floor, aby byla potrava
     * zarovnána s gridem
     */
    constructor() {
        this.x = floor(random(0, width) / gap) * gap; // souřadnice x
        this.y = floor(random(0, height) / gap) * gap; // souřadnice y
        this.color = 'rgb(71,97,33)'; // barva potravy
    }

    /**
     * Metoda se používá pro spawnutí potravy poté,
     * co ji had sní.
     */
    eat() {
        // definování souřadnic pro potravu
        this.x = floor(random(0, width) / gap) * gap;
        this.y = floor(random(0, height) / gap) * gap;

        // pokud se jídlo spawne přímo na hadovi..
        if (this.x == snake.x || this.y == snake.y) {
            // spawni znovu.
            this.eat;
        }
    };

    /**
     * Vestavěná funkce knihovny p5.js. Metoda je použita
     * pro zobrazení potravy a dalších tvarů na herním poli.
     */
    show() {
        fill(this.color); // barva
        noStroke(); // odstranění černého rámečku
        rect(this.x, this.y, gap, gap, 4); // definování tvaru
    };
}