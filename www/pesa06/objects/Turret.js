export default class Turret extends Phaser.GameObjects.Image {
    constructor(scene, sprite, obj) {
        super(scene, 0, 0, sprite, obj);
        this.nextTic = 0;
        this.range = 0;
        this.damage = 0;
        this.price = 0;
        this.enemies = null;
        this.attackSpeed = 0;
        this.x = 0;
        this.y = 0;
        this.level = 1;
    }

    findTarget(x, y, distance) {
        let enemyUnits = this.enemies.getChildren();
        for(let i = 0; i < enemyUnits.length; i++) {
            if(enemyUnits[i].active && Phaser.Math.Distance.Between(x, y, enemyUnits[i].x, enemyUnits[i].y) < distance)
                return enemyUnits[i];
        }
        return false;
    }

    fire() {
        let enemy = this.findTarget(this.x, this.y, this.range);
        if(enemy) {
            var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y);
            let bullet = this.bullets.get();
            if (bullet) {
                bullet.fire(this.x, this.y, angle, this.damage);
            }
        }
    }


    initTurret(enemies, x, y, bullets) {
        this.enemies = enemies;
        this.x = x;
        this.y = y;
        this.bullets = bullets;
    }

    update(time, delta) {
        if (time > this.nextTic) {
            this.fire();
            this.nextTic = time + this.attackSpeed;
        }
    }

}