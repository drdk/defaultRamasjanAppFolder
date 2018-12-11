import "@babel/polyfill";
import * as PIXI from 'pixi.js';
import pixi_spine from '../lib/pixi-spine.js';
import howler from '../lib/howler';
import TweenMax from '../lib/gsap/TweenMax';
import TweenLite from '../lib/gsap/TweenLite';
import Stage from "./Stage";
import Asset from "./Asset";

export default class Game {

    constructor(myPreloadedAssets, assetsPath, api, element) {

        this.sd = assetsPath;
        this.element = element;
        this.api = api;
        this.mpAssets = myPreloadedAssets;
         this.asset = new Asset(api, myPreloadedAssets);

        this.buildGame();
    }


    buildGame() {

        this.myStage = new Stage(this.element, this.api); //setting up stage with canvas
        this.background = this.myStage.bg; //getting background container
        this.scene = this.myStage.actors; // getting actor container


        this.bg = PIXI.Sprite.fromImage(this.asset.get(this.sd.introbackground));
        this.background.addChild(this.bg);

        let menuItemsLength = this.sd.frontmenuitems.length;


        for (let i = 0; i < menuItemsLength; i++) {

            this.menuItem = PIXI.Sprite.fromImage(this.asset.get(this.sd.frontmenuitems[i].img));
            this.menuItem.id = i;
            this.menuItem.position.x = this.sd.frontmenuitems[i].x
            this.menuItem.position.y = this.sd.frontmenuitems[i].y
            this.scene.addChild(this.menuItem);

            this.menuItem.interactive = true;
            this.menuItem.buttonMode = true;
            this.menuItem.on('pointerdown', this._doCloseMenu.bind(this))

        }



        this.leftBomb = new PIXI.spine.Spine(this.mpAssets.by); //res.ghost.spineData
        this.leftBomb.position.set(300, 500);
        this.leftBomb.rotation = 0.5;
        this.leftBomb.state.setAnimation(0, "explode", false);
        this.scene.addChild(this.leftBomb);

        this.mmm = new PIXI.spine.Spine(this.mpAssets.eventyr); //res.ghost.spineData
        this.mmm.position.set(800, 500);
        this.mmm.rotation = -0.5;
        this.mmm.state.setAnimation(0, "explode", false);
        this.scene.addChild(this.mmm);





    }

    _doCloseMenu(e) {

        this.myCurrentTarget = e.currentTarget.id;
        console.log(this.myCurrentTarget);

    }



}