import {SceneEnum} from "../SceneEnum.js";
import Enemy from "../objects/Enemy.js";

export class GameScene extends Phaser.Scene {
    constructor() {
        super({
            key: SceneEnum.GAME
        })
        this.path = null;
        this.nextEnemy = 500;
        this.enemies = null;
    }

    init() {
    }

    preload() {
        // load the game assets – enemy and turret atlas
        this.load.setBaseURL('../assets/');
        this.load.atlas('sprites', 'spritesheet.png', 'spritesheet.json');
        this.load.image('bullet', 'bullet.png');
    }

    create() {
        // this graphics element is only for visualization,
        // its not related to our path
        let graphics = this.add.graphics();

        // the path for our enemies
        // parameters are the start x and y of our path
        this.path = this.add.path(0, 475);
        this.path.lineTo(125, 475);
        this.path.lineTo(125, 75);
        this.path.lineTo(325, 75);
        this.path.lineTo(325, 175);
        this.path.lineTo(225, 175);
        this.path.lineTo(225, 375);
        this.path.lineTo(525, 375);
        this.path.lineTo(525, 75);
        this.path.lineTo(675, 75);
        this.path.lineTo(675, 525);

        graphics.lineStyle(5, 0xffffff, 1);
        // visualize the path
        this.path.draw(graphics);

        this.drawGrid(graphics);


        this.enemies = this.physics.add.group({ classType: Enemy, runChildUpdate: true , immovable: true, allowGravity: false});
    }

    drawGrid(graphics) {
        graphics.lineStyle(1, 0x0000ff, 0.8);
        for(var i = 0; i < 12; i++) {
            graphics.moveTo(0, i * 50);
            graphics.lineTo(800, i * 50);
        }
        for(var j = 0; j < 16; j++) {
            graphics.moveTo(j * 50, 0);
            graphics.lineTo(j * 50, 600);
        }
        graphics.strokePath();
    }

    update(time, delta) {
        if (time > this.nextEnemy) {
            let enemy = this.enemies.get();
            if (enemy) {
                enemy.setActive(true);
                enemy.setVisible(true);
                enemy.startOnPath(this.path);

                this.nextEnemy = time + 2000;
            }
        }
    }
}