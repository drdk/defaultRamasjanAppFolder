import "@babel/polyfill";
import Game from "./Game";
import JsonDesktop from "./JsonDesktop";
import SpineManager from './SpineManager';


export default class InitializeGame {

    constructor(platform, element) {


        this.jsonManifest = "manifest.json";

        this.api = platform;
        this.element = element;


        if (this.api) {

            this.json = {};
            this.json[this.jsonManifest] = "text";

            this.api.assets.getBundle(this.json).then((myJson) => {

                this.json = myJson;
                this.jsonData = JSON.parse(this.json[this.jsonManifest]);
                this.sd = this.jsonData.data; // json structure

                // *** START: connects data from json ***

                this.menubg = {};
                this.menubg[this.sd.introbackground] = "uri";

                this.frontmenuimg = {};
                for (let menu = 0; menu < this.sd.frontmenuitems.length; menu++) {
                    this.frontmenuimg[this.sd.frontmenuitems[menu].img] = "uri"
                }

                SpineManager.addSpine(this.sd.spines);

                // *** END: connects data from json ***


                return this.api.assets.getBundle(this.menubg, {
                    from: 10,
                    to: 20
                });
            }).then(result => {

                this.assets_1 = result;

                return this.api.assets.getBundle(this.frontmenuimg, {
                    from: 20,
                    to: 50
                });
            }).then(result => {

                this.assets_2 = result;

                return this.spinePromise = SpineManager.loadSpines(this.api, {
                    from: 50,
                    to: 100
                });
            }).then(result => {

                this.collectspinePromise = result;
                this.api.sendMessage("DRRS_HIDE_LOADING_SCREEN"); // When finished loading all necessary assets close the loading screen

                let finaleResult = [ //Array with all results
                    this.assets_1,
                    this.assets_2,
                    this.collectspinePromise
                ];

                this.allAssets = Object.assign.apply(Object, [{}].concat(finaleResult)); //concat all results and use it when calling assets
                //console.log(this.allAssets[0].by);

                //this.allAssets = Object.assign({}, this.firstAssets, this.lastImages); // or binds all results directly
                //or just dont do anything and call from for example "this.firstAssets" and use it when calling assets

                let game = new Game(this.allAssets, this.sd, this.api, this.element);

            })

        } else { //***  desktop ***


            JsonDesktop.get({
                url: "assets/" + this.jsonManifest
            }).then(mData => {

                let manifest = JSON.parse(mData);

                SpineManager.addSpine(manifest.data.spines);
                this.spinePromiseBrowser = SpineManager.loadSpines(this.api, {
                    from: 50,
                    to: 100
                });

                this.spinePromiseBrowser.then(result => {
                    this.collectspinePromiseBrowser = result;

                    let game = new Game(this.collectspinePromiseBrowser, manifest.data, this.api, this.element);

                })

            });

        } //END IF




    } // END constructor


}