import {SceneEnum} from "../SceneEnum.js";

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
        menu.on("pointerup", () => {
            this.scene.start(SceneEnum.MAIN_MENU);
        });

        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                let parsed = JSON.parse(this.responseText).slice(0, 10);
                let position = 1;
                parsed.forEach((item) => {
                    let element = that.add.dom(position < 6 ? 50 : 550, 0).createFromCache('item');
                    element.setPerspective(800);
                    element.getChildByID('positionLabel').innerHTML = position;
                    element.getChildByID('nameLabel').innerHTML = item.name === '' ? 'no nickname' : item.name;
                    element.getChildByID('scoreLabel').innerHTML = item.score;
                    element.getChildByID('dateLabel').innerHTML = item.date;
                    that.tweens.add({
                        targets: element,
                        y: 100 + ((position - 1) % 5) * 80,
                        duration: 2000,
                        ease: 'Power3'
                    });
                    position+=1;
                })
            }
        }
        xhttp.open("GET", "http://pesa06sem.cz/leaderboards/www/", true);
        xhttp.send();


    }
}