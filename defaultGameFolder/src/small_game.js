import "@babel/polyfill";
import * as PIXI from 'pixi.js';
import pixi_spine from '../lib/pixi-spine.js';
import Stage from "./Stage";


export default class Game {

    constructor(platform, element) {

        this.api = platform; //set the Ramasjang api for further use
        this.element = element //set the Ramasjang canvas for further use

        this.app = new PIXI.Application({
            autoResize: true,
            resolution: devicePixelRatio,
            backgroundColor: 0xffffff,
            width: 1644,
            height: 768,
            resolution: window.devicePixelRatio || 1

        });

        this.element.appendChild(this.app.view);


        this.assets_1 = {
            "images/menubg_1_new.jpg": "uri"
        };

        if (this.api) {// check if you is on the Ramasjang api

            this.api.assets.getBundle(this.assets_1, { // promise
                from: 0,
                to: 100
            }).then((result) => {

                this.api.sendMessage("DRRS_HIDE_LOADING_SCREEN"); // When finished loading all necessary assets close the loading screen

                this.firstAssets = result;// set result for further use or just use result

                this.bg = PIXI.Sprite.fromImage(this.firstAssets("images/myBG.jpg"));
                this.app.stage.addChild(this.bg);


            })
        }else{ // desktop

            this.bg = PIXI.Sprite.fromImage("assets/images/myBG.jpg");//full path to assets
            this.app.stage.addChild(this.bg);


        }


    } //end constructor

} //end Class: Game