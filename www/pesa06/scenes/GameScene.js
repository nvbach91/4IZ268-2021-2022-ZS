import {SceneEnum} from "../SceneEnum.js";
import Enemy from "../objects/Enemy.js";
import NormalTurret from "../objects/NormalTurret.js";
import Bullet from "../objects/Bullet.js";
import Castle from "../objects/Castle.js";
import {TurretEnum} from "../TurretEnum.js";
import LongRangeTurret from "../objects/LongRangeTurret.js";
import FastTurret from "../objects/FastTurret.js";

export class GameScene extends Phaser.Scene {
    constructor() {
        super({
            key: SceneEnum.GAME
        })
        this.path = null;
        this.nextEnemy = 10000;
        this.enemies = null;
        this.selectedTurret = null;
        this.scoreText = null;
        this.blockedLocations = [[0, 10], [1, 10], [2, 10], [2, 9], [2, 8], [2, 7], [2, 6], [2, 5], [2, 4], [2, 3], [2, 2], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [6, 2], [6, 3], [5, 3], [4, 3], [4, 4], [4, 5], [4, 6], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [10, 6], [10, 5], [10, 4], [10, 3], [10, 2], [10, 1], [11, 1], [12, 1], [13, 1], [13, 2], [13, 3], [13, 4], [13, 5], [13, 6], [13, 7], [13, 8], [13, 9], [13, 10]];
    }

    init() {
    }

    preload() {
        window.score = 0;
        // load the game assets – enemy and turret atlas
        this.load.setBaseURL('../assets/');
        this.load.atlas('sprites', 'spritesheet.png', 'spritesheet.json');
        this.load.image('bullet', 'bullet.png');
        this.load.image('turret2', 'play2.jpg');
        this.load.image('turret3', 'turret3.png');
    }

    create() {
        // this graphics element is only for visualization,
        // its not related to our path
        let graphics = this.add.graphics();
        let sound = this.sound.add('music', {loop: true});
        sound.play({loop: true});

        window.gold = 350;

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
        window.scoreText = this.add.text(815, 450, 'Score: 0', { fontSize: '28px', fill: '#fff'});
        window.goldText = this.add.text(815, 550, 'Gold: ' + window.gold, { fontSize: '28px', fill: '#FFD700'});

        // visualize the path
        this.path.draw(graphics, 64);
        this.drawGrid(this.add.graphics());
        // this.add.rectangle(675, 525, 50, 50, 0x00ff00);

        this.normalTurrets = this.physics.add.group({
            classType: NormalTurret, runChildUpdate: true, immovable: true, allowGravity: false
        });
        this.longTurrets = this.physics.add.group({
            classType: LongRangeTurret, runChildUpdate: true, immovable: true, allowGravity: false
        });
        this.fastTurrets = this.physics.add.group({
            classType: FastTurret, runChildUpdate: true, immovable: true, allowGravity: false
        });

        this.input.on("pointerdown", (e) => {
            if (e.x > 800) {
                return;
            }
            if (this.selectedTurret === null) {
                return;
            }
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
            let newTurret = null;
            switch (this.selectedTurret) {
                case TurretEnum.NORMAL:
                    newTurret = this.normalTurrets.get();
                    break;
                case TurretEnum.FAST:
                    newTurret = this.fastTurrets.get();
                    break;
                default:
                    newTurret = this.longTurrets.get();
                    break;
            }
            if (window.gold < newTurret.price) {
                newTurret.setActive(false);
                newTurret.setVisible(false);
                console.log('not enough gold');
                return;
            }
            window.gold -= newTurret.price;
            window.goldText.setText('Gold: ' + window.gold);
            newTurret.initTurret(this.enemies, roundedX, roundedY, this.bullets);
            newTurret.setInteractive();
            newTurret.on("pointerdown", (e) => {
            })
            this.blockedLocations.push([Math.floor((roundedX - 25) / 50), Math.floor((roundedY - 25) / 50)]);
            this.selectedTurret = null;
        })

        this.enemies = this.physics.add.group({
            classType: Enemy, runChildUpdate: true, immovable: true, allowGravity: false
        });

        this.bullets = this.physics.add.group({
            classType: Bullet, runChildUpdate: true, immovable: true, allowGravity: false
        });

        this.castleGroup = this.physics.add.group({
            classType: Castle, runChildUpdate: true, immovable: true, allowGravity: false
        });

        let castle = this.castleGroup.get();
        castle.initLife();

        this.physics.add.overlap(this.enemies, this.bullets, this.dealDamage);
        this.physics.add.overlap(this.enemies, this.castleGroup, (enemy, castle) => {
            if (enemy.active === true && castle.active === true) {
                enemy.setActive(false);
                enemy.setVisible(false);
                enemy.hb.bar.clear();
                if (castle.receiveDamage()) {
                    console.log("game over");
                    sound.stop();
                    this.scene.start(SceneEnum.MAIN_MENU);
                }
            }
        });


        this.loadSideMenu();
    }

    loadSideMenu() {
        let turret1 = this.add.image(820, 100, 'sprites', 'turret');
        turret1.setInteractive();
        turret1.on("pointerup", () => {
            this.selectedTurret = TurretEnum.NORMAL;
        });
        this.add.text(860, 50, 'Damage: 50', { fontSize: '18px', fill: '#fff'});
        this.add.text(860, 75, 'Speed: 800ms', { fontSize: '18px', fill: '#fff'});
        this.add.text(860, 100, 'Range: 150', { fontSize: '18px', fill: '#fff'});
        this.add.text(860, 125, 'Price: 100', { fontSize: '18px', fill: '#fff'});
        let turret2 = this.add.image(820, 200, 'bullet');
        turret2.setInteractive();
        turret2.on("pointerup", () => {
            this.selectedTurret = TurretEnum.SLOW;
        });
        this.add.text(860, 175, 'Damage: 50', { fontSize: '18px', fill: '#fff'});
        this.add.text(860, 200, 'Speed: 1200ms', { fontSize: '18px', fill: '#fff'});
        this.add.text(860, 225, 'Range: 300', { fontSize: '18px', fill: '#fff'});
        this.add.text(860, 250, 'Price: 120', { fontSize: '18px', fill: '#fff'});
        let turret3 = this.add.image(820, 325, 'turret3');
        turret3.setScale(0.05);
        turret3.setInteractive();
        turret3.on("pointerup", () => {
            this.selectedTurret = TurretEnum.FAST;
        });
        this.add.text(860, 300, 'Damage: 20', { fontSize: '18px', fill: '#fff'});
        this.add.text(860, 325, 'Speed: 150ms', { fontSize: '18px', fill: '#fff'});
        this.add.text(860, 350, 'Range: 150', { fontSize: '18px', fill: '#fff'});
        this.add.text(860, 375, 'Price: 300', { fontSize: '18px', fill: '#fff'});
    }

    dealDamage(enemy, bullet) {
        console.log(window.score);
        if (window.score === undefined) {
            window.score = 0;
        }
        if (enemy.active === true && bullet.active === true) {
            bullet.setActive(false);
            bullet.setVisible(false);
            if (enemy.receiveDamage(bullet.damage)) {
                window.gold+=10;
                window.score++;
                window.scoreText.setText('Score: ' + window.score);
                window.goldText.setText('Gold: ' + window.gold);
            }
        }
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
                enemy.setHp(100 + window.score * 2);
                console.log("hp " + (100 + window.score * 2));

                this.nextEnemy = time + 1000;
            }
        }

    }
}