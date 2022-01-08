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
        this.load.html('item', 'leaderboardItem.html');

        this.load.image('sky', 'space3.png');
        this.load.image('logo', 'phaser3-logo.png');
        this.load.image('red', 'red.png');
        this.load.html('nameform', 'nameForm.html');
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

        let play = this.add.text(400, 400, 'Play', { fontSize: '26px', fill: '#fff'});
        play.setInteractive();
        play.on("pointerup", () => {
            this.scene.start(SceneEnum.GAME);
        });

        let leaderboard = this.add.text(350, 500, 'Leaderboard', { fontSize: '26px', fill: '#fff'});
        leaderboard.setInteractive();
        leaderboard.on("pointerup", () => {
            this.scene.start(SceneEnum.LEADERBOARDS);
        });

        logo.setVelocity(100, 200);
        logo.setBounce(1, 1);
        logo.setCollideWorldBounds(true);

        emitter.startFollow(logo);

        this.parent = document.getElementById("gameDiv");

        let element = this.add.dom(400, 0).createFromCache('nameform');
        element.setPerspective(800);
        element.addListener('click');
        let saveButton = element.getChildByName('saveNameButton');
        let input = element.getChildByName('textInput');
        if (window.localStorage.getItem('name') !== null && window.localStorage.getItem('name') !== undefined) {
            input.value = window.localStorage.getItem('name');
        }
        saveButton.addEventListener('click', (e) => {
            if (input.value !== '') {
                window.localStorage.setItem('name', input.value);
            }
        });
        this.tweens.add({
            targets: element,
            y: 200,
            duration: 2000,
            ease: 'Power3'
        });
    }
}