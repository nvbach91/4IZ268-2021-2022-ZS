import {SceneEnum} from "../SceneEnum.js";

export class MenuScene extends Phaser.Scene {
    constructor() {
        super({
            key: SceneEnum.MAIN_MENU
        })
    }
    init() {
    }

    preload() {
        this.load.setBaseURL('../assets/');
        this.load.audio('music', 'music.mp3');
        this.load.image('play', 'play2.jpg');

        this.load.image('sky', 'space3.png');
        this.load.image('logo', 'phaser3-logo.png');
        this.load.image('red', 'red.png');
    }

    create() {
        this.add.image(400, 300, 'sky');

        let particles = this.add.particles('red');

        let emitter = particles.createEmitter({
            speed: 100,
            scale: {start: 1, end: 0},
            blendMode: 'ADD'
        });

        let logo = this.physics.add.image(400, 100, 'logo');

        let play = this.add.image(400, 300, 'play');
        play.setScale(0.1);
        play.setInteractive();
        play.on("pointerup", () => {
            this.scene.start(SceneEnum.GAME);
        });

        logo.setVelocity(100, 200);
        logo.setBounce(1, 1);
        logo.setCollideWorldBounds(true);

        emitter.startFollow(logo);

    }
}