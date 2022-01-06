export default class Enemy extends Phaser.GameObjects.Image {
    Enemy(scene) {
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sprites', 'enemy');
        // this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
        this.hp = 0;
        this.path = null;
    }
    follower = { t: 0, vec: new Phaser.Math.Vector2() };

    startOnPath(path) {
        this.follower.t = 0;
        this.hp = 100;

        path.getPoint(this.follower.t, this.follower.vec);

        this.setPosition(this.follower.vec.x, this.follower.vec.y);

        this.path = path;
    }

    update(time, delta) {
        this.follower.t += (1/10000) * delta;
        path.getPoint(this.follower.t, this.follower.vec);

        this.setPosition(this.follower.vec.x, this.follower.vec.y);

        if (this.follower.t >= 1)
        {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}