/**
 * Created by zhengqiguang on 2017/2/6.
 */

var path = require("path");
var pwd = process.env.PWD;


module.exports = {
    devServerPort: 8080, // dev 服务器端口
    serverUrl: "", //dev 服务器打开域名,默认为 http://localhost
    serverHotReload: false, //dev 服务器热重载
    openBrowser: false, //是否自动打开浏览器
    productSourceMap: false, //pub 是否生成 source map
    extractCss: true, // 是否导出 css 文件
    staticTplDir: path.resolve(pwd, "./static-tpl"),
    static: {
        url: {
            ds: "http://www.ddd.com"
        }
    },
    build: {
        staticPath: path.resolve(pwd, "./static"), //静态资源目录
        staticAssetPath: path.resolve(pwd, "./dist/static"), //静态资源发布目录
        assetPath: "./",// 相对于构建目录的子目录,用于指定构建 js,css的目录
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