import * as PIXI from 'pixi.js';

export default class Stage {

    constructor(element, api) {

        this.element = element;

        this.targetWidth = 1644;
        this.targetHeight = 768;
        this.targetCenter = 1024; // centers interactive area for objects (not background)

        this.appWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        this.appHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        this.scaleFactor = this.appWidth / this.targetWidth;

        this.app = new PIXI.Application({
            autoResize: true,
            resolution: devicePixelRatio,
            backgroundColor: 0xffffff,
            width: this.appWidth,
            height: this.appHeight,
            antialias: true,
            resolution: window.devicePixelRatio || 1

        });

        this.element.appendChild(this.app.view);


        if (api) {
            api.subscribe("DRRS_ON_APP_PAUSE", () => {
                PIXI.ticker.shared.stop();
            });
            api.subscribe("DRRS_ON_APP_RESUME", () => {
                PIXI.ticker.shared.start();
            });
        }
        

        this.bg = new PIXI.Container();
        this.bg.x = this.appWidth / 2;
        this.bg.y = this.appHeight / 2;
        this.bg.pivot.x = this.targetWidth * 0.5;
        this.bg.pivot.y = this.targetHeight * 0.5;
        this.app.stage.addChild(this.bg);
        this.bg.interactiveChildren = false;
        this.bg.getBounds();
        this.bg.scale.x = this.bg.scale.y = this.scaleFactor;
        this.bg.scale.y = this.bg.scale.x = this.appHeight / this.targetHeight;

        this.actors = new PIXI.Container();
        this.actors.x = this.appWidth / 2
        this.actors.y = 0;
        this.actors.pivot.x = this.targetCenter * 0.5;
        //this.actors.pivot.y = this.targetCenter * 0.5;
        this.app.stage.addChild(this.actors);
        this.actors.getBounds();
        this.actors.scale.x = this.actors.scale.y = this.scaleFactor;
        this.actors.scale.y = this.actors.scale.x = this.scaleFactor;

        this.app.renderer.resize(this.appWidth, this.appHeight);

       
        
    }

}