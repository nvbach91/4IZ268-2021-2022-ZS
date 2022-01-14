import {SceneEnum} from "../SceneEnum.js";
import Enemy from "../objects/Enemy.js";
import NormalTurret from "../objects/NormalTurret.js";
import Bullet from "../objects/Bullet.js";
import Castle from "../objects/Castle.js";
import {TurretEnum} from "../TurretEnum.js";
import LongRangeTurret from "../objects/LongRangeTurret.js";
import FastTurret from "../objects/FastTurret.js";
import EscapeStringHelper from "../EscapeStringHelper.js";

export class GameScene extends Phaser.Scene {
    constructor() {
        super({
            key: SceneEnum.GAME
        })
        this.path = null;
        this.nextEnemy = 10000;
        this.enemies = null;
        this.selectedTurret = null;
        this.selectedTurretHighlight = null;
        this.scoreText = null;
        this.blockedLocations = [[0, 9], [1, 9], [2, 9], [2, 8], [2, 7], [2, 6], [2, 5], [2, 4], [2, 3], [2, 2], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [6, 2], [6, 3], [5, 3], [4, 3], [4, 4], [4, 5], [4, 6], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [10, 6], [10, 5], [10, 4], [10, 3], [10, 2], [10, 1], [11, 1], [12, 1], [13, 1], [13, 2], [13, 3], [13, 4], [13, 5], [13, 6], [13, 7], [13, 8], [13, 9], [13, 10]];
    }

    init() {
    }

    preload() {
        // load the game assets – enemy and turret atlas
        this.load.setBaseURL('./assets/');
        this.load.image('bullet', 'bullet.png');
        this.load.image('longTurret', 'tower2_transparent.png');
        this.load.image('normalTurret', 'tower3_transparent.png');
        this.load.image('fastTurret', 'tower1_transparent.png');
        this.load.image('castle', 'castle.png');
        this.load.image('pepe', 'pepe.png');
    }

    create() {
        this.score = 0;
        // this graphics element is only for visualization,
        // its not related to our path
        let graphics = this.add.graphics();
        let sound = this.sound.add('music', {loop: true});
        sound.play({loop: true});

        this.gold = 350;

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
        this.scoreText = this.add.text(815, 450, 'Score: 0', {fontSize: '28px', fill: '#fff'});
        this.goldText = this.add.text(815, 500, `Gold: ${this.gold}`, {fontSize: '28px', fill: '#FFD700'});
        let backToMenu = this.add.text(815, 550, 'Main menu', {fontSize: '28px', fill: '#fff'});
        backToMenu.setInteractive();
        backToMenu.on('pointerup', () => {
            let date = new Date();
            let xhr = new XMLHttpRequest();
            let formData = new FormData();
            let dateFormattedString = `${date.getFullYear()}-${(date.getMonth() + 1).toString(10).padStart(2, '0')}-${date.getDate().toString(10).padStart(2, '0')} ${date.getHours().toString(10).padStart(2, '0')}:${date.getMinutes().toString(10).padStart(2, '0')}:${date.getSeconds().toString(10).padStart(2, '0')}`;
            formData.append('name', window.localStorage.getItem('name') === null ? '' : EscapeStringHelper.escapeString(window.localStorage.getItem('name')));
            formData.append('score', this.score);
            formData.append('date', dateFormattedString);
            xhr.open('POST', 'http://pesa06sem.cz/leaderboards/www/api.leaderboards/push', true);
            xhr.send(formData);
            sound.stop();
            this.scene.start(SceneEnum.MAIN_MENU);
        });

        this.path.draw(graphics, 64);
        this.drawGrid(this.add.graphics());

        this.normalTurrets = this.physics.add.group({
            classType: NormalTurret, runChildUpdate: true, immovable: true, allowGravity: false
        });
        this.longTurrets = this.physics.add.group({
            classType: LongRangeTurret, runChildUpdate: true, immovable: true, allowGravity: false
        });
        this.fastTurrets = this.physics.add.group({
            classType: FastTurret, runChildUpdate: true, immovable: true, allowGravity: false
        });

        this.input.on('pointerdown', (e) => {
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
            if (this.checkTurretGroup(this.normalTurrets, roundedX, roundedY)) {
                return;
            }
            if (this.checkTurretGroup(this.longTurrets, roundedX, roundedY)) {
                return;
            }
            if (this.checkTurretGroup(this.fastTurrets, roundedX, roundedY)) {
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
            if (this.gold < newTurret.price) {
                newTurret.destroy();
                console.log('not enough gold');
                return;
            }

            newTurret.initTurret(this.enemies, roundedX, roundedY, this.bullets);
            newTurret.setInteractive();
            newTurret.on('pointerdown', (e) => {
                let circle = this.add.circle(newTurret.x, newTurret.y, newTurret.range);
                circle.setStrokeStyle(1, 0xefc53f);
                let price = newTurret.price * newTurret.level;
                let upgrade = this.add.text(roundedX - 10, roundedY, `Upgrade (${price})`, {
                    fontSize: '12px',
                    fill: '#fff'
                })
                    .setOrigin(0.5)
                    .setPadding(10)
                    .setStyle({backgroundColor: '#111'})
                    .setInteractive({useHandCursor: true})
                    .on('pointerdown', () => {
                        if (this.gold < price) {
                            console.log('not enough gold');
                            return;
                        }
                        if (newTurret.level >= 10) {
                            console.log('level already 10');
                            return;
                        }
                        newTurret.level++;
                        newTurret.damage += newTurret.baseDamage;
                        this.gold -= price;
                        this.goldText.setText(`Gold: ${this.gold}`);
                        circle.destroy();
                        upgrade.destroy();
                        level.destroy();
                        damage.destroy();
                    });
                let level = this.add.text(roundedX - 30, roundedY - 45, `Level: ${newTurret.level}`, {
                    fontSize: '12px',
                    fill: '#fff'
                })
                let damage = this.add.text(roundedX - 30, roundedY - 30, `Damage: ${newTurret.damage}`, {
                    fontSize: '12px',
                    fill: '#fff'
                })
                setTimeout(() => {
                    circle.destroy();
                    upgrade.destroy();
                    level.destroy();
                    damage.destroy();
                }, 2000);
            });
            this.selectedTurret = null;
            this.selectedTurretHighlight.destroy();
            this.selectedTurretHighlight = null;
            this.gold -= newTurret.price;
            this.goldText.setText(`Gold: ${this.gold}`);
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

        this.physics.add.overlap(this.enemies, this.bullets, (enemy, bullet) => {
            if (this.score === undefined) {
                this.score = 0;
            }
            if (enemy.active === true && bullet.active === true) {
                bullet.setActive(false);
                bullet.setVisible(false);
                if (enemy.receiveDamage(bullet.damage)) {
                    this.gold += 10;
                    this.score++;
                    this.scoreText.setText(`Score: ${this.score}`);
                    this.goldText.setText(`Gold: ${this.gold}`);
                }
            }
        });
        this.physics.add.overlap(this.enemies, this.castleGroup, (enemy, castle) => {
            if (enemy.active === true && castle.active === true) {
                enemy.setActive(false);
                enemy.setVisible(false);
                enemy.hb.bar.clear();
                if (castle.receiveDamage()) {
                    let date = new Date();
                    let xhr = new XMLHttpRequest();
                    let formData = new FormData();
                    let dateFormattedString = `${date.getFullYear()}-${(date.getMonth() + 1).toString(10).padStart(2, '0')}-${date.getDate().toString(10).padStart(2, '0')} ${date.getHours().toString(10).padStart(2, '0')}:${date.getMinutes().toString(10).padStart(2, '0')}:${date.getSeconds().toString(10).padStart(2, '0')}`;
                    formData.append('name', window.localStorage.getItem('name') === null ? '' : EscapeStringHelper.escapeString(window.localStorage.getItem('name')));
                    formData.append('score', this.score);
                    formData.append('date', dateFormattedString);
                    xhr.open('POST', 'http://pesa06sem.cz/leaderboards/www/api.leaderboards/push', true);
                    xhr.send(formData);
                    alert(`Game over! Your final score was ${this.score}`);
                    sound.stop();
                    this.scene.start(SceneEnum.MAIN_MENU);
                }
            }
        });


        this.loadSideMenu();
    }

    checkTurretGroup(group, wantedX, wantedY) {
        let found = false;
        group.getChildren().forEach((t) => {
            if (found) {
                return found;
            }
            if (t.x === wantedX && t.y === wantedY) {
                found = true;
                return true;
            }
        });
        return found;
    }

    loadSideMenu() {
        let normalTurret = this.add.image(820, 100, 'normalTurret');
        normalTurret.setInteractive();
        normalTurret.setScale(0.15);
        normalTurret.on('pointerup', () => {
            if (this.selectedTurretHighlight !== null) {
                this.selectedTurretHighlight.destroy();
            }
            this.selectedTurretHighlight = this.add.circle(820, 100, 25);
            this.selectedTurretHighlight.setStrokeStyle(2, '0xffffff');
            this.selectedTurret = TurretEnum.NORMAL;
        });
        this.add.text(860, 50, 'Damage: 50', {fontSize: '18px', fill: '#fff'});
        this.add.text(860, 75, 'Speed: 700ms', {fontSize: '18px', fill: '#fff'});
        this.add.text(860, 100, 'Range: 200', {fontSize: '18px', fill: '#fff'});
        this.add.text(860, 125, 'Price: 100', {fontSize: '18px', fill: '#fff'});
        let longRangeTurret = this.add.image(820, 200, 'longTurret');
        longRangeTurret.setScale(0.15);
        longRangeTurret.setInteractive();
        longRangeTurret.on('pointerup', () => {
            if (this.selectedTurretHighlight !== null) {
                this.selectedTurretHighlight.destroy();
            }
            this.selectedTurretHighlight = this.add.circle(820, 200, 25);
            this.selectedTurretHighlight.setStrokeStyle(2, '0xffffff');
            this.selectedTurret = TurretEnum.SLOW;
        });
        this.add.text(860, 175, 'Damage: 50', {fontSize: '18px', fill: '#fff'});
        this.add.text(860, 200, 'Speed: 1200ms', {fontSize: '18px', fill: '#fff'});
        this.add.text(860, 225, 'Range: 300', {fontSize: '18px', fill: '#fff'});
        this.add.text(860, 250, 'Price: 120', {fontSize: '18px', fill: '#fff'});
        let fastTurret = this.add.image(820, 325, 'fastTurret');
        fastTurret.setScale(0.15);
        fastTurret.setInteractive();
        fastTurret.on('pointerup', () => {
            if (this.selectedTurretHighlight !== null) {
                this.selectedTurretHighlight.destroy();
            }
            this.selectedTurretHighlight = this.add.circle(820, 325, 25);
            this.selectedTurretHighlight.setStrokeStyle(2, '0xffffff');
            this.selectedTurret = TurretEnum.FAST;
        });
        this.add.text(860, 300, 'Damage: 20', {fontSize: '18px', fill: '#fff'});
        this.add.text(860, 325, 'Speed: 150ms', {fontSize: '18px', fill: '#fff'});
        this.add.text(860, 350, 'Range: 150', {fontSize: '18px', fill: '#fff'});
        this.add.text(860, 375, 'Price: 300', {fontSize: '18px', fill: '#fff'});
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
                enemy.setHp(100 + this.score * 2);

                this.nextEnemy = time + 1000;
            }
        }

    }
}