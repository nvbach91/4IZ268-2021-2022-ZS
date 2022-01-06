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
        this.path = this.add.path(0, 400);
        this.path.lineTo(120, 400);
        this.path.lineTo(120, 80);
        this.path.lineTo(300, 80);
        this.path.lineTo(300, 180);
        this.path.lineTo(220, 180);
        this.path.lineTo(220, 400);
        this.path.lineTo(450, 400);
        this.path.lineTo(450, 50);
        this.path.lineTo(580, 50);
        this.path.lineTo(580, 400);

        graphics.lineStyle(40, 0xffffff, 1);
        // visualize the path
        this.path.draw(graphics);


        this.enemies = this.physics.add.group({ classType: Enemy, runChildUpdate: true });
    }

    update(time, delta) {
        if (time > this.nextEnemy) {
            var enemy = this.enemies.get();
            if (enemy) {
                enemy.setActive(true);
                enemy.setVisible(true);
                enemy.startOnPath(path);

                this.nextEnemy = time + 2000;
            }
        }
    }
}