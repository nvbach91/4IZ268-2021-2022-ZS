import {MenuScene} from "./scenes/MenuScene.js";
import {GameScene} from "./scenes/GameScene.js";
import {LeaderboardScene} from "./scenes/LeaderboardScene.js";

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
        MenuScene, GameScene, LeaderboardScene
    ]
};

let game = new Phaser.Game(config);