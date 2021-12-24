// třída Head se stará o přidání hlavy hada
class Head {
    /**
    * Konstruktor inicializuje proměnné třídy 'Head'
    * Funkce floor, aby byla hlava
    * zarovnána s gridem
    */
    constructor() {
        // spawnutí hada doprostřed herního pole
        this.x = floor((width / 2) / gap) * gap;
        this.y = floor((height / 2) / gap) * gap;
        this.dir = 'up'; // směr
        this.score = 0;
        this.tails =[]; // pole, které bude pbsahovat všechny články ocasu
    };

    // posouvá hada daným směrem
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

    // respawn hada a vyčištění skore
    respawn() {
        this.x = floor(width / (2 * gap)) * gap;
        this.y = floor(height / (2 * gap)) * gap;
        this.dir = 'up';
        this.score = 0;
        this.tails =[];
        frameRate(vel);
    };

    // metoda pro kolizi ocasu s hlavou
    tail_collision() {
        for (let i = 0; i < this.tails.length; i++) {
            // pokud se pozice hlavy = pozici jakéhokoliv článku ocasu, tak...
            if (this.x == this.tails[i].x && this.y == this.tails[i].y) {
                // vrať true
                return true;
            }
        }
    }

    /**
     * Kolize hada s potravou
     * 
     * pokud má hlava hada stejnou 
     * pozici jako potrava vrať true
     * 
     * pokud je pozice hada mimo herní pole,
     * vrať false
     * @param {*} obj potrava
     * @returns true, pokud dojde ke kolizi hlavy hada s potravou
     */
    collision(obj) {
        if (this.x == obj.x && this.y == obj.y) {
            return true;
        };
        if (this.x >= width || this.x < 0 || this.y >= height || this.y <0) {
            return false;
        }
    }


    // zobrazení hlavy na herním poli
    show() {
        fill(23, 31, 10); //barva hlavy
        rect(this.x, this.y, gap, gap, 4); // obdélník
    };
};