class Tail {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.color = 'rgb(43, 51, 25)'
    };

    show() {
        fill(this.color);
        rect(this.x, this.y, gap, gap, 4 );
    }
}