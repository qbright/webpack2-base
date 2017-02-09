/**
 * Created by zhengqiguang on 2017/2/6.
 */

var merge = require("webpack-merge");
var configCommon = require("./configCommon");
var buildBaseConf = require("./base");

var entryList = buildBaseConf.build.entryList;

var pubEntryList = {
    index: {
        HtmlPluginConf: {
            filename: "./index-test.html"
        }

    }

}


module.exports = merge(buildBaseConf, {
    static: {
        url: {
            ds: "http://test.ccc.yy.com"
        }
    },
    build: {
        entryList: configCommon.mergeTwoObjList(entryList, pubEntryList)
    }
});

