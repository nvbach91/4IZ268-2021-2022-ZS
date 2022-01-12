import HealthBar from "./HealthBar.js";

export default class Castle extends Phaser.GameObjects.Image {
    constructor(scene) {
        super(scene, 675, 525, 'castle');
        this.life = 100;
        this.setScale(0.22);

        this.hb = new HealthBar(scene, 635, 560);
        scene.add.existing(this.hb);
    }

    receiveDamage() {
        this.life -= 10;
        this.hb.decrease(10);
        if (this.life <= 0) {
            this.setActive(false);
            this.setVisible(false);
            return true;
        }
        return false;
    }

    initLife() {
        this.life = 100;
    }

    update(time, delta) {

    }
}