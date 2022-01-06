import {MenuScene} from "./scenes/MenuScene.js";
import {GameScene} from "./scenes/GameScene.js";

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 200}
        }
    },
    scene: [
        MenuScene, GameScene
    ]
};

let game = new Phaser.Game(config);