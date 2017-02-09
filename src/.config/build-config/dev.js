/**
 * Created by zhengqiguang on 2017/2/6.
 */

var merge = require("webpack-merge");
var configCommon = require("./configCommon");
var buildBaseConf = require("./base");

var entryList = buildBaseConf.build.entryList;

var devEntryList = {
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

