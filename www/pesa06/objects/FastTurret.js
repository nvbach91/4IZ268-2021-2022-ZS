import Turret from "./Turret.js";

export default class FastTurret extends Turret {
    constructor(scene) {
        super(scene, 'turret3');
        this.damage = 20;
        this.range = 150;
        this.price = 300;
        this.attackSpeed = 150;
        this.setScale(0.1);
    }

}