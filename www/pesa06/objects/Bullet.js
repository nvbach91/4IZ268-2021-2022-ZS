export default class Bullet extends Phaser.GameObjects.Image {
    constructor(scene) {
        super(scene, 0, 0, 'bullet');
        this.x = 0;
        this.y = 0;
        this.lifespan = 0;
        this.speed = Phaser.Math.GetSpeed(1200, 1);
        this.damage = 0;
    }

    fire(x, y, angle, damage) {
        this.damage = damage;
        this.setActive(true);
        this.setVisible(true);
        this.setPosition(x, y);

        this.dx = Math.cos(angle);
        this.dy = Math.sin(angle);
        this.lifespan = 1000;
    }

    update(time, delta)
    {
        this.lifespan -= delta;

        this.x += this.dx * (this.speed * delta);
        this.y += this.dy * (this.speed * delta);

        if (this.lifespan <= 0)
        {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}