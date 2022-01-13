// třída Head se stará o přidání hlavy hada
class Head {
    /**
    * Konstruktor inicializuje proměnné třídy 'Head'
    * Funkce floor, aby byla hlava
    * zarovnána s gridem
    */
    constructor() {
        // spawnutí hada doprostřed herního pole
        this.x = floor((width / 2) / gap) * gap; // souřadnice x
        this.y = floor((height / 2) / gap) * gap; // souřadnice y
        this.dir = 'up'; // směr
        this.score = 0; // na počátku hry je skore 0
        this.tails = []; // pole, které bude pbsahovat všechny články ocasu
        this.color = 'rgb(23, 31, 10)' // barva hlavy hada
    }

    /**
     * Přidání směrů hada.
     * Metoda pohybuje hada v daném
     * směru v závislosti na mezeře (gap).
     */
    update() {
        if (this.dir == 'left') {
            this.x -= gap;
        } else if (this.dir == 'right') {
            this.x += gap;
        } else if (this.dir == 'up') {
            this.y -= gap;
        } else if (this.dir == 'down') {
            this.y += gap;
        }
    };

    /**
     * Metoda se stará o reset všech
     * proměnných po skončení hry.
     */
    respawn() {
        // přesunutí hada na střed plátna
        this.x = floor(width / (2 * gap)) * gap;
        this.y = floor(height / (2 * gap)) * gap;
        // defaultní směr je nahoru
        this.dir = 'up';
        // skóre je 0
        this.score = 0;
        // had nemá žádné články
        this.tails = [];
        // defaultní rychlost hry
        frameRate(vel);
    };

    /**
     * Metoda zajišťuje stav, kdy had narazí do jakéhokoliv 
     * z článků svého ocasu, tj. kousne se.
     * @returns true, pokud dojde ke kolizi hada s ocasem
     */
    tailCollision() {
        // pro každý článek ocasu hada...
        for (let i = 0; i < this.tails.length; i++) {
            // pokud se pozice hlavy = pozici jakéhokoliv článku ocasu, tak...
            if (this.x == this.tails[i].x && this.y == this.tails[i].y) {
                // vrať true
                return true;
            }
        }
    };

    /**
     * Kontrola kolize hada s objektem, resp. potravou
     * 
     * pokud má hlava hada stejné souřadnice, 
     * jako potrava, vrať true
     * 
     * pokud je pozice hada mimo herní pole,
     * vrať false
     * @param {*} obj objekt, např. potrava
     * @returns true, pokud dojde ke kolizi hlavy hada s objektem
     */
    collision(obj) {
        // pokud jsou souřadnice hada totožné se souřadnicemi potravy, tak...
        if (this.x == obj.x && this.y == obj.y) {
            // vrať true
            return true;
        };
        // pokud je pozice hada mimo canvas, tak...
        if (this.x >= width || this.x < 0 || this.y >= height || this.y < 0) {
            // vrať false
            return false;
        }
    };

    /**
     * Vestavěná funkce knihovny p5.js. Metoda je použita
     * pro zobrazení hlavy hada a dalších tvarů na herním poli.
     */
    show() {
        fill(this.color); // barva hlavy
        rect(this.x, this.y, gap, gap, 4); // definování tvaru
    };
}