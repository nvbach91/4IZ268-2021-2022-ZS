import {MenuScene} from "./scenes/MenuScene.js";
import {GameScene} from "./scenes/GameScene.js";

let config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 600,
    parent: 'gameDiv',
    dom: {
        createContainer: true
    },
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