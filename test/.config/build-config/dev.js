/**
 * Created by zhengqiguang on 2017/2/6.
 */

var merge = require("webpack-merge");
var configCommon = require("../build/configCommon");
var buildBaseConf = require("./base");

var entryList = buildBaseConf.build.entryList;

var devEntryList = {
    index: {
        HtmlPluginConf: {
            filename: "./index.html",
            template: "./index.ejs"
        }

    },
    index1: {
        HtmlPluginConf: {
            filename: "./index1.html",
            template: "./index1.ejs"
        }
    }

}


module.exports = merge(buildBaseConf, {
    static: {
        url: {
            ds: "http://ccc.yy.com"
        }
    },
    build: {
        entryList: configCommon.mergeTwoObjList(entryList, devEntryList)
    }
});

