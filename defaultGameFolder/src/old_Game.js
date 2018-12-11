import "@babel/polyfill";
import * as PIXI from 'pixi.js';
import pixi_spine from '../lib/pixi-spine.js';
import Stage from "./Stage";
import AssetManager from "./InitializeGame"


export default class Game {

    constructor(platform, element) {

        this.defaultAssetsFolder = "assets/"; // only for dev purpose in browser
        this.api = platform;

        if (this.api) {
            this.api.subscribe("DRRS_ON_APP_PAUSE", () => {
                PIXI.ticker.shared.stop();
            });
            this.api.subscribe("DRRS_ON_APP_RESUME", () => {
                PIXI.ticker.shared.start();
            });
        }


        this.assets_1 = {
            "images/menubg_1_new.jpg": "uri",

        };


        this.assets_2 = {
            "images/By-play.png": "uri",
            "images/disko-play.png": "uri",
            "images/eventyr-play.png": "uri"
        };

       

        //this.am = new AssetManager(this.api);


        this.myStage = new Stage(element);
        this.background = this.myStage.bg; //getting background container
        this.scene = this.myStage.actors;  // getting actor container
     

        /*
      
        this.api.assets.getBundle(this.assets_1, {from: 0,to: 100}).then((assets) => {
             this.api.sendMessage("DRRS_HIDE_LOADING_SCREEN");
            this.assets = assets;
        })
     
        */


     
        if (this.api) {

     
            this.api.assets.getBundle(this.assets_1, {
                from: 0,
                to: 50
            }).then((result) => {
                this.firstAssets = result;


                return this.api.assets.getBundle(this.assets_2, {from: 50,to: 100 });

            }).then(result => {

                this.api.sendMessage("DRRS_HIDE_LOADING_SCREEN"); // When finished loading all necessary assets

                this.lastImages = result;

                // *** When finished loading all necessary assets *** 

                let source = [this.firstAssets, this.lastImages]; //Array with all results

                this.allAssets = Object.assign.apply(Object, [{}].concat(source)); //concat all results and use it when calling assets

                //this.allAssets = Object.assign({}, this.firstAssets, this.lastImages); // or binds all results directly
                //or just dont do anything and call from for example "this.firstAssets" and use it when calling assets

                this.startGame();


            })

        } else {

            this.startGame();

        }

    } // END constructor

    startGame() {

        

        this.bg = PIXI.Sprite.fromImage(this.myAssets("images/menubg_1_new.jpg"));
        this.background.addChild(this.bg);


        this.byPlay = PIXI.Sprite.fromImage(this.myAssets("images/By-play.png"));
        //this.byPlay.cacheAsBitmap = true;
        this.byPlay.position.x = -120
        this.byPlay.position.y = 100;
        this.scene.addChild(this.byPlay);

        /*
        var bounds = this.byPlay.getBounds();
        var center = new PIXI.Point(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2);
        console.log(center.x + ", " + center.y);
*/
        // console.log("stage x: " + this.stage.x);

        // console.log(this.appWidth / this.appHeight, this.app.screen.width * (this.appWidth / this.appHeight));

        this.diskoPlay = PIXI.Sprite.fromImage(this.myAssets("images/disko-play.png"));
        this.diskoPlay.position.x = 370;
        this.diskoPlay.position.y = 100;
        this.scene.addChild(this.diskoPlay);


        this.eventyrPlay = PIXI.Sprite.fromImage(this.myAssets("images/eventyr-play.png"));
        this.eventyrPlay.position.x = 900;
        this.eventyrPlay.position.y = 100;
        this.scene.addChild(this.eventyrPlay);


        this.myStage.app.ticker.add(delta => this.update(delta));



    } //End startGame


    update(mDelta) {


    }

    myAssets(a) {

        let me;

        if (this.api) {

            me = this.allAssets[a];

        } else {

            me = this.defaultAssetsFolder + a

        }
        return me;

    }



}