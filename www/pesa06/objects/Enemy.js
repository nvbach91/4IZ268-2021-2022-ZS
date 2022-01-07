import HealthBar from "./HealthBar.js";

export default class Enemy extends Phaser.GameObjects.Image {
    constructor(scene) {
        super(scene, 0, 0, 'sprites', 'enemy');
        this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
        this.hp = 0;
        this.path = null;
        this.hb = new HealthBar(scene, this.follower.vec.x - 35, this.follower.vec.y + 20);
    }

    startOnPath(path) {
        this.follower.t = 0;

        this.path = path;
        this.path.getPoint(this.follower.t, this.follower.vec);

        this.setPosition(this.follower.vec.x, this.follower.vec.y);

        this.hb.x = this.follower.vec.x - 40;
        this.hb.y = this.follower.vec.y + 20;
        this.hb.draw();
    }

    receiveDamage(damage) {
        this.hp -= damage;
        this.hb.decrease(damage);
        if (this.hp <= 0) {
            this.setActive(false);
            this.setVisible(false);
            return true;
        }
        return false;
    }

    setHp(hp) {
        this.hp = hp;
        this.hb.refreshHp(hp);
    }

    update(time, delta) {
        this.follower.t += (1/15000) * delta;
        this.path.getPoint(this.follower.t, this.follower.vec);

        this.setPosition(this.follower.vec.x, this.follower.vec.y);
        this.hb.x = this.follower.vec.x - 40;
        this.hb.y = this.follower.vec.y + 20;
        this.hb.draw();

        if (this.follower.t >= 1)
        {
            this.setActive(false);
            this.setVisible(false);
            this.setPosition(0, 0);
        }
    }
}