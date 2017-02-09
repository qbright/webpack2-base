/**
 * Created by zhengqiguang on 2017/2/7.
 */
var merge = require("webpack-merge");

module.exports = {

    mergeTwoObjList(o1, o2){
        var tempList = {};
        var keys = Object.keys(o1);

        for (var i = 0, key; key = keys[i]; i++) {
            tempList[key] = merge(o1[key], o2[key]);
        }
        return tempList;
    }
}
