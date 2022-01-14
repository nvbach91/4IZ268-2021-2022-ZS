import Turret from "./Turret.js";

export default class LongRangeTurret extends Turret {
    constructor(scene) {
        super(scene, 'longTurret');
        this.damage = 50;
        this.baseDamage = 50;
        this.range = 300;
        this.price = 120;
        this.attackSpeed = 1200;
        this.setScale(0.12);
    }

}