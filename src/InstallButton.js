export class InstallButton extends PIXI.Sprite {
    constructor(x, y, texture, clickTarget) {
        super(texture);
        this.anchor.set(0.5);
        this.x = x;
        this.y = y;
        this.clickTarget = clickTarget;
        this.interactive = true;
        this.buttonMode = true;
        this.alpha = 0
        this.on('pointerdown', this.onClick);
        gsap.to(this.scale, .6, {x: .95, y: .95, ease: Power1.easeInOut, repeat: -1, yoyo: true} );
    }
    onClick() {
        window.open(this.clickTarget)
    }
}