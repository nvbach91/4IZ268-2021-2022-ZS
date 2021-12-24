var config = {
    type: Phaser.AUTO,
    parent: 'content',
    width: 640,
    height: 512,
    scene: {
        key: 'main',
        preload: preload,
        create: create
    }
};
var game = new Phaser.Game(config);
var path;
function preload() {
    // load the game assets – enemy and turret atlas
}

function create() {
    // this graphics element is only for visualization,
    // its not related to our path
    var graphics = this.add.graphics();

    // the path for our enemies
    // parameters are the start x and y of our path
    path = this.add.path(0, 400);
    path.lineTo(120, 400);
    path.lineTo(120, 80);
    path.lineTo(300, 80);
    path.lineTo(300, 180);
    path.lineTo(220, 180);
    path.lineTo(220, 400);
    path.lineTo(450, 400);
    path.lineTo(450, 50);
    path.lineTo(580, 50);
    path.lineTo(580, 400);

    graphics.lineStyle(40, 0xffffff, 1);
    // visualize the path
    path.draw(graphics);
}