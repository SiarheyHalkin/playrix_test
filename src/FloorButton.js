import {clickFloorButton} from './index'
export class FloorButton extends PIXI.Sprite {
    constructor(x, y, texture, num) {
        super(texture);
        this.anchor.set(0.5);
        this.x = x;
        this.y = y;
        this.num = num;
        this.visible = false
        this.interactive = true;
        this.buttonMode = true;
        this.on('pointerdown', this.onChoice);
    }
    onChoice() {
        gsap.from(this.scale, .6, {x: .96, y: .96, ease: Back.easeOut});
        clickFloorButton(this.num)
    }
}
