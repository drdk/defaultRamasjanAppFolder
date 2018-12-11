import * as PIXI from 'pixi.js';

class SpineManager {
    constructor() {


        if (!SpineManager.instance) {
            SpineManager.instance = this;
        }
        return SpineManager.instance;

    }

    addSpine(spineNameOrArray) {

        this.allSpines = {};

        this.allStringNames = [];

        for (let i = 0; i < spineNameOrArray.length; i++) {
            this.allSpines["spines/" + spineNameOrArray[i] + ".png"] = "uri";
            this.allSpines["spines/" + spineNameOrArray[i] + ".json"] = "text";
            this.allSpines["spines/" + spineNameOrArray[i] + ".atlas"] = "uri";
            this.allStringNames.push(spineNameOrArray[i])

        }

    }

    loadSpines(api, loadPercent) {

        this.spineDatas = {};

        //if (Object.keys(this.allSpines).length === 0 && this.allSpines.constructor === Object) return;
        if (api) {
            let promise = new Promise((resolve, reject) => {
                let self = this;

                console.log(self);
                api.assets.getBundle(this.allSpines, loadPercent).then(function (result) {


                    let lengthOf_allStringNames = self.allStringNames.length;

                    let s = 0;
                    (function loadNextSpine() {

                        if (s < lengthOf_allStringNames) {

                            let image = new Image();

                            image.onload = () => {

                                let atlasAsset = result["spines/" + self.allStringNames[s] + ".atlas"];
                                let unwantedText = "data:;base64,";
                                atlasAsset = atlasAsset.replace(unwantedText, "");

                                let rawSkeletonData = result["spines/" + self.allStringNames[s] + ".json"];
                                let rawAtlasData = atob(atlasAsset);

                                let spineAtlas = new PIXI.spine.core.TextureAtlas(rawAtlasData, function (line, callback) {
                                    var baseTexture = new PIXI.BaseTexture(image);
                                    callback(baseTexture);
                                });

                                let spineAtlasLoader = new PIXI.spine.core.AtlasAttachmentLoader(spineAtlas);
                                let spineJsonParser = new PIXI.spine.core.SkeletonJson(spineAtlasLoader);
                                //console.log("spineJsonParser", spineJsonParser)
                                let spineData = spineJsonParser.readSkeletonData(rawSkeletonData);
                                self.spineDatas[self.allStringNames[s]] = spineData;

                                console.log(self.spineDatas);

                                s++;
                                loadNextSpine();

                            }
                            image.src = result["spines/" + self.allStringNames[s] + ".png"];
                        } else {
                            resolve(self.spineDatas);

                        }
                    })();
                }); // END this._platform.assets.getBundle

            });

            return promise;
        } else {
            let p = new Promise((resolve, reject) => {

                console.log('im in a browser');

                const myPixiLoader = new PIXI.loaders.Loader();
                for (let i = 0; i < this.allStringNames.length; i++) {
                    let name = this.allStringNames[i];
                    let path = "assets/spines/" + this.allStringNames[i] + ".json";

                    myPixiLoader.add(name, path);
                }
                myPixiLoader.load((loader, ressources) => {
                    this.allStringNames.forEach((name) => {
                        this.spineDatas[name] = ressources[name]["spineData"];
                    });
                    console.log("here");
                    resolve(this.spineDatas);
                });
            });
            //console.log("before return p desktop");
            return p;
        }
    }
}

const instance = new SpineManager();
export default instance;