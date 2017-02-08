/**
 * Created by zhengqiguang on 2017/2/6.
 */




var configMap = {
    "development": require("../build-config/dev"),
    "production": require("../build-config/pub")
}

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require("path");

module.exports = {

    getConfig: function () {
        var evn = process.env.NODE_ENV;

        if (!configMap[evn]) {
            throw new Error(`don't found the config by EVN:${evn}`);
        }
        return configMap[evn];
    },
    getDefineString(str){
        return JSON.stringify(str);
    },
    getEntry(entryList){
        var entry = {};

        for (var key in entryList) {
            entry[key] = entryList[key]['entry'];
        }

        return entry;
    },
    getHtmlPlugin(entryList){
        var temp = [];

        for (var key in  entryList) {
            var htmlConf = entryList[key]["HtmlPluginConf"];

            temp.push({
                filename: htmlConf.filename,
                template: htmlConf.template,
                chunks: [key]
            });
        }

        return temp;
    },

    getAssetPath(_path){
        return path.posix.join(this.getConfig().build.assetPath, _path);

    },

    styleLoaders: function (extract) {
        var output = [];
        var loaders = this.cssLoaders(extract);
        for (var extension in loaders) {
            var loader = loaders[extension]
            output.push({
                test: new RegExp('\\.' + extension + '$'),
                use: loader
            })
        }


        return output

    },

    cssLoaders: function (extract) {
        return {
            css: this.generateLoaders(['css', 'postcss'], extract)

        }
    },
    generateLoaders(loaders, extract){
        var sourceLoader = loaders.map(function (loader) {
            if (/\?/.test(loader)) {
                loader = loader.replace(/\?/, '-loader?')
            } else {
                loader = loader + '-loader'
            }

            if (loader === "postcss-loader") {
                return {
                    loader: loader,
                    options: {
                        plugins: function () {
                            return [
                                require("autoprefixer")({
                                    browsers: ['last 10 versions']
                                })
                            ];
                        }
                    }
                }

            } else {
                return {
                    loader: loader,
                    options: {}
                }
            }

            return loader;
        });

        if (extract) {

            return ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: sourceLoader
            });

        } else {
            return ['style-loader'].concat(sourceLoader);
        }

    }


}