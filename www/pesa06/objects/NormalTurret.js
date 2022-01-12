import Turret from "./Turret.js";

export default class NormalTurret extends Turret {
    constructor(scene) {
        super(scene, 'normalTurret');
        this.damage = 50;
        this.baseDamage = 50;
        this.range = 200;
        this.price = 100;
        this.attackSpeed = 700;
        this.setScale(0.12);
    }

}