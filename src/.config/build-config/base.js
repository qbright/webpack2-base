/**
 * Created by zhengqiguang on 2017/2/6.
 */

var path = require("path");
var pwd = process.env.PWD;


module.exports = {
    devServerPort: 8080,
    serverUrl: "",
    serverHotReload: false,
    openBrowser: false,
    productSourceMap: false,
    static: {
        url: {
            ds: "http://www.ddd.com"
        }
    },
    build: {
        output: {
            path: path.resolve(pwd, "./dist"), //构建目录
            publicPath: "/" //资源定位目录
        },
        entryList: {
            index: {
                entry: "./js/app.js",

                HtmlPluginConf: {}
            },
            index1: {
                entry: "./js/bar.js",
                HtmlPluginConf: {}
            }
        }

    }

}