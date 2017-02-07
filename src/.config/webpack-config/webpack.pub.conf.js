/**
 * Created by zhengqiguang on 2017/2/7.
 */
var merge = require("webpack-merge"),
    baseConf = require("./webpack.base.conf"),
    common = require("../build/common");

module.exports = merge(baseConf, {
    output: {
        filename: common.getAssetPath("./js/[name].[chunkhash:7].js")
    },
    module: {
        rules: common.styleLoaders(true)
    },
    devtool: "nosources-source-map",
    plugins: []
});
