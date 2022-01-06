export default class Turret extends Phaser.GameObjects.Image {
    constructor(scene) {
        super(scene, 0, 0, 'sprites', 'turret');
        this.nextTic = 0;
    }
}