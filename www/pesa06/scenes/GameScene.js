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
        this.turrets = [[]];
        this.blockedLocations = [[0, 10], [1, 10], [2, 10], [2, 9], [2, 8], [2, 7], [2, 6], [2, 5], [2, 4], [2, 3], [2, 2], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [6, 2], [6, 3], [5, 3], [4, 3], [4, 4], [4, 5], [4, 6], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [10, 6], [10, 5], [10, 4], [10, 3], [10, 2], [10, 1], [11, 1], [12, 1], [13, 1], [13, 2], [13, 3], [13, 4], [13, 5], [13, 6], [13, 7], [13, 8], [13, 9], [13, 10]];
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

        graphics.lineStyle(3, 0xffffff, 1);
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

        // visualize the path
        this.path.draw(graphics, 64);
        this.drawGrid(this.add.graphics());
        this.add.rectangle(675, 525, 50, 50, 0x00ff00);

        this.input.on("pointerup", (e) => {
            let roundedX = Math.round(e.x / 50) * 50;
            if (e.x % 50 > 25) {
                roundedX -= 25;
            } else {
                roundedX += 25;
            }
            let roundedY = Math.round(e.y / 50) * 50;
            if (e.y % 50 > 25) {
                roundedY -= 25;
            } else {
                roundedY += 25;
            }
            let found = false;
            let stringifiedArrayToCheck = JSON.stringify([Math.floor((roundedX - 25) / 50), Math.floor((roundedY - 25) / 50)]);
            this.blockedLocations.forEach((e) => {
                console.log(e);
                if (found) {
                    return;
                }
                if (JSON.stringify(e) === stringifiedArrayToCheck) {
                    found = true;
                }
            });
            if (found) {
                return;
            }
            this.turrets[Math.floor((roundedX - 25) / 50)][Math.floor((roundedY - 25) / 50)] = this.add.rectangle(roundedX, roundedY, 50, 50, 0x00ffff);
            this.blockedLocations.push([Math.floor((roundedX - 25) / 50), Math.floor((roundedY - 25) / 50)]);
        })


        this.enemies = this.physics.add.group({
            classType: Enemy, runChildUpdate: true, immovable: true, allowGravity: false
        });
    }

    drawGrid(graphics) {
        graphics.lineStyle(1, 0x0000ff, 0.8);
        for (var i = 0; i < 12; i++) {
            graphics.moveTo(0, i * 50);
            graphics.lineTo(800, i * 50);
        }
        for (var j = 0; j < 16; j++) {
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