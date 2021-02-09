import {clickHammer} from './index'
export class Hammer extends PIXI.Sprite {
    constructor(x, y, texture) {
        super(texture);
        this.anchor.set(0.5);
        this.x = x;
        this.y = y;
        this.visible = false
        this.interactive = true;
        this.buttonMode = true;
        this.on('pointerdown', this.onChoice);
    }
    onChoice() {
        this.visible = false
        clickHammer()
    }
}