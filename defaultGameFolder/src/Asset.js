export default class Asset {

    constructor(api, mAssets) {

        this.api = api;
        this.mAssets = mAssets;

    }


    get(a) {

        let me;

        if (this.api) {

            me = this.mAssets[a];

        } else {

            me = "assets/" + a

        }
        return me;

    }


}