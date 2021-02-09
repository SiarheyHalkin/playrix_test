import {InstallButton} from './InstallButton.js'
import {FloorButton} from './FloorButton.js'
import {OkButton} from './OkButton.js'
import {Hammer} from './Hammer.js'
import { gsap } from "./gsap.min";

const w = 1390, h = 640, bgColor = '0xDDDDDD', log = console.log, clickTarget = 'https://play.google.com/store/apps/details?id=com.playrix.homescapes&hl=ru&gl=US',
      loader = new PIXI.Loader(), container = new PIXI.Container()
let  floorButton = [], floorButtonActive = [], floorButtonIcon = [], stair = [], railing = [], carpet = [], okButton = [],
     installButton, resources, oldStair, hammer, logo, blackRect, final

const app = new PIXI.Application({
    backgroundColor: bgColor, width: window.innerWidth, height: window.innerHeight
});
window.addEventListener('resize', resize);
function resize() {
	app.renderer.resize(window.innerWidth, window.innerHeight);
    container.scale.set(window.innerWidth/1390)
}
app.loader.baseUrl = './images';
document.body.appendChild(app.view);
//
app.loader
    .add('back', 'back.jpg')
    .add('installButton', 'installButton.png')
    .add('floorButton', 'floor_button_default.png')
    .add('floorButtonActive', 'floor_button_active.png')
    .add('okButton', 'ok_button.png')
    .add('hammer', 'hammer.png')
    .add('decor', 'decor.png')
    .add('flower', 'flower.png')
    .add('stairOld', 'stair_old.png')
    .add('carpet', 'carpet_0.png')
    .add('railing', 'railing_0.png')
    .add('logo', 'logo.png')
    .add('final', 'final.png')

app.loader.onProgress.add(showProgress);
app.loader.onError.add(reportError);
app.loader.onComplete.add(doneLoading);
app.loader.load();
function showProgress(e) {
    log(e.progress + '%')
}
function reportError(e) {
    log('Error: ' + e.message)
}
function doneLoading() {
    log('DONE LOADING!');
    createBack();
    resize()
    app.ticker.add(update);

}
function createBack() {
    resources = app.loader.resources
    app.stage.addChild(container);
    blackRect = new PIXI.Graphics();
    blackRect.beginFill(0x000, 1);
    blackRect.drawRect(-695, -695, 1390, 1390);
    blackRect.endFill();
    logo = PIXI.Sprite.from('./images/logo.png');
    logo.anchor.set(0.5);
    logo.position.set(-520, -250);
    logo.alpha = 0
    let back = PIXI.Sprite.from('./images/back.jpg');
    back.anchor.set(0.5);
    let decor = PIXI.Sprite.from('./images/decor.png');
    decor.anchor.set(0.5);
    let austin = PIXI.Sprite.from('./images/austin.png');
    austin.position.set(0, -210);
    let flower = PIXI.Sprite.from('./images/flower.png');
    flower.position.set(427, 118);
    oldStair = PIXI.Sprite.from('./images/stair_old.png');
    oldStair.position.set(138, -330);
    final = PIXI.Sprite.from('./images/final.png');
    final.anchor.set(0.5);
    final.position.set(0, -70);
    final.alpha = 0
    final.scale.set(.5)
    final.rotation = -.2

    installButton = new InstallButton(0, 240, resources['installButton'].texture,  clickTarget);


    hammer = new Hammer(415, 0, resources['hammer'].texture);

    container.addChild(back, decor, logo, austin, oldStair);

    gsap.to(blackRect, .8, {alpha: 0, ease: Power2.easeOut, delay: .9});
    gsap.to(installButton, .3, {alpha: 1, ease: Power2.easeOut, delay: .9});

    let i = 0
    while(i<3){
        stair[i] = PIXI.Sprite.from('./images/stair_' + i + '.png');
        stair[i].position.set(oldStair.x, oldStair.y)
        railing[i] = PIXI.Sprite.from('./images/railing_' + i + '.png');
        carpet[i] = PIXI.Sprite.from('./images/carpet_' + i + '.png');
        container.addChild(stair[i])
        stair[i].addChild(railing[i], carpet[i])
        stair[i].alpha = 0

        floorButton[i] = new FloorButton(0, 0, resources['floorButton'].texture, i);
        floorButtonActive[i] = PIXI.Sprite.from('./images/floor_button_active.png');
        floorButtonIcon[i] = PIXI.Sprite.from('./images/item_stair_' + i + '.png');
        floorButtonActive[i].anchor.set(.5)
        floorButtonIcon[i].anchor.set(.5)
        floorButtonIcon[i].x = 6
        floorButtonIcon[i].y = -12
        floorButtonActive[i].visible  = false
        floorButton[i].addChild(floorButtonActive[i], floorButtonIcon[i])
        container.addChild(floorButton[i])
        floorButton[i].x = 215 + 130*i
        floorButton[i].y = -240

        okButton[i] = new OkButton(0, 0, resources['okButton'].texture, i);
        okButton[i].x = floorButton[i].x
        okButton[i].y = floorButton[i].y + 90
        container.addChild(okButton[i])
        i++
    }
    container.addChild(hammer,flower, blackRect, installButton, final);
    gsap.delayedCall(1.5,startPlayable)
}
function startPlayable(){
    hammer.visible = true
    gsap.to(logo, .1, {alpha: 1, ease: Power2.easeOut});
    gsap.from(logo.scale, .3, {x: .5, y: .5, ease: Back.easeOut});
    gsap.from(hammer, .1, {alpha: 0, ease: Power2.easeOut, delay: .4});
    gsap.from(hammer, .5, {y: -50, ease: Bounce.easeOut, delay: .4});
}
export function clickFloorButton(num){
    let i = 0;
    while(i<3){
        floorButton[i].interactive = false
        if(i === num){
            floorButtonActive[i].visible = true
            gsap.from(floorButtonActive[i], .3, {alpha: 0});
            okButton[i].visible = true
            gsap.from(okButton[i], .2, {alpha: 0});
            gsap.to(stair[i], .4, {alpha: 1, ease: Power2.easeOut});
            gsap.from(stair[i], .4, {y: stair[i].y - 110, ease: Power2.easeOut});
            gsap.from(carpet[i], .4, {alpha: 0, ease: Power2.easeOut, delay: .2});
            gsap.from(carpet[i], .4, {y: -110, ease: Power2.easeOut, delay: .2});
            gsap.from(railing[i], .4, {alpha: 0, ease: Power2.easeOut, delay: .3});
            gsap.from(railing[i], .4, {y: -110, ease: Power2.easeOut, delay: .3});
        }else{
            floorButtonActive[i].visible = false
            okButton[i].visible = false
            stair[i].alpha = 0
        }
        i++
    }
    oldStair.visible = false
    gsap.delayedCall(.6, function(){
        let n = 0
        while(n<3){
            floorButton[n].interactive = true
            n++
        }
    })
}
export function clickOkButton(num){
    let i = 0;
    while(i<3){
        floorButton[i].interactive = false
        okButton[i].visible = false
        gsap.to(floorButton[i].scale, .4, {x: .2, y: .2, ease: Back.easeIn,delay: .05*i});
        gsap.to(floorButton[i], .4, {alpha: 0, ease: Back.easeIn,delay: .05*i});
        i++
    }
    gsap.to(blackRect, .4, {alpha: .7, delay: .5});
    gsap.to(final, .4, {alpha: 1, delay: .5});
    gsap.to(final.scale, .4, {x: 1, y: 1, ease: Back.easeOut, delay: .5});
    gsap.to(final, .4, {rotation: 0, ease: Back.easeOut, delay: .5});
}
export function clickHammer(){
    let i = 0;
    while(i<3){
        floorButton[i].visible = true
        gsap.from(floorButton[i], .2, {alpha: 0, delay: .1*i});
        gsap.from(floorButton[i].scale, 1.4, {x: .5, y: .5, ease: Elastic.easeOut, delay: .1*i});
        i++
    }
}
function update(delta) {
    container.x = app.renderer.width / 2 ;
    container.y = app.renderer.height / 2;
}