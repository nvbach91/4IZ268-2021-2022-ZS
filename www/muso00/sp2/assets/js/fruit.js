// třídá fruit se stará o přidání potravy pro hada do hry.
class Fruit {
    /**
     * Konstruktor inicializuje proměnné třídy 'Fruit'
     * Je zde použita funkce floor, aby byla potrava
     * zarovnána s gridem
     */
    constructor() {
        this.x = floor(random(0, width) / gap) * gap;
        this.y = floor(random(0, height) / gap) * gap;
    }

    // metoda pro snězení potravy
    eat() {
        this.x = floor(random(0, width) / gap) * gap;
        this.y = floor(random(0, height) / gap) * gap;

        // pokud se jídlo spawne přímo na hadovi..
        if (this.x == snake.x || this.y == snake.y) {
            // spawni znovu.
            this.eat;
        }
    };

    //TODO: animace
    // metoda pro zobrazení potravy
    show() {
        fill(71,97,33);
        rect(this.x, this.y, gap, gap, 4);
    };
};