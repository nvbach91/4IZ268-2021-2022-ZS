import Turret from "./Turret.js";

export default class NormalTurret extends Turret {
    constructor(scene) {
        super(scene, 'sprites', 'turret');
        this.damage = 50;
        this.range = 150;
        this.price = 100;
        this.attackSpeed = 800;
    }

}