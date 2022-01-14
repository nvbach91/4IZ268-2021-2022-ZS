import {SceneEnum} from "../SceneEnum.js";
import EscapeStringHelper from "../EscapeStringHelper.js";

export class LeaderboardScene extends Phaser.Scene {
    constructor() {
        super({
            key: SceneEnum.LEADERBOARDS
        })
    }
    init() {
    }

    preload() {
    }

    create() {
        this.add.image(500, 300, 'sky');

        let xhttp = new XMLHttpRequest();
        let that = this;

        let menu = this.add.text(425, 500, 'Back to menu', { fontSize: '26px', fill: '#fff'});
        menu.setInteractive();
        menu.on('pointerup', () => {
            this.scene.start(SceneEnum.MAIN_MENU);
        });
        document.getElementById('gameDiv').style.cursor = 'progress';
        this.loadLeaderboards(this).catch(e => console.log(e));
    }

    async loadLeaderboards(that) {
        let response = await fetch('http://pesa06sem.cz/leaderboards/www/');
        if (!response.ok) {
            document.getElementById('gameDiv').style.cursor = 'default';
            throw new Error(`HTTP error! status: ${response.status}`);
        } else {
            let parsed = JSON.parse(await response.text()).slice(0, 10);
            document.getElementById('gameDiv').style.cursor = 'default';
            let position = 1;
            parsed.forEach((item) => {
                let element = that.add.dom(position < 6 ? 50 : 550, 0).createFromCache('item');
                element.setPerspective(800);
                element.getChildByID('positionLabel').innerText = position;
                element.getChildByID('positionLabel').removeAttribute('id');
                element.getChildByID('nameLabel').innerText = EscapeStringHelper.escapeString(item.name) === '' ? 'no nickname' : EscapeStringHelper.escapeString(item.name);
                element.getChildByID('nameLabel').removeAttribute('id');
                element.getChildByID('scoreLabel').innerText = item.score;
                element.getChildByID('scoreLabel').removeAttribute('id');
                element.getChildByID('dateLabel').innerText = item.date;
                element.getChildByID('dateLabel').removeAttribute('id');
                that.tweens.add({
                    targets: element,
                    y: 100 + ((position - 1) % 5) * 80,
                    duration: 2000,
                    ease: 'Power3'
                });
                position+=1;
            });
        }
    }
}