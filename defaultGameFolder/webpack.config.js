const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
//var UnminifiedWebpackPlugin = require('unminified-webpack-plugin');

module.exports = {
    mode: 'development',
    watch: true,


    plugins: [

       /*
        new UglifyJsPlugin({

            uglifyOptions: {

                compress: {
                    drop_console: true,
                    warnings: false
                },
                
                output: {
                    comments: false,
                    beautify: false

                }

            }


        })
        */
        /*
        new UnminifiedWebpackPlugin({
            postfix:''
        })
        */
       
    ],




    entry: ["@babel/polyfill", "./src/app.js"],
    module: {
        rules: [
            {
            test: /\.js$/,
            exclude: [/(node_modules)/, 
                        path.resolve(__dirname, 'browser.js'), 
                        path.resolve(__dirname, 'bootstrap.js')],
            use: {
                loader: "babel-loader",
                options: {  
                    presets: ['@babel/preset-env']
                  }
            }
            
            }
        ]
    },
    devtool: 'inline-source-map',
    output: {
        filename:   "bundle.js",
        path: path.resolve(__dirname + "/dist")
         
    }
};