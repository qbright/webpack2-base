/**
 * Created by zhengqiguang on 2017/2/7.
 */
var merge = require("webpack-merge"),
    baseConf = require("./webpack.base.conf");

module.exports = merge(baseConf, {
    output: {
        filename: "[name].[chunkhash].js"
    },
    devtool: "nosources-source-map",
    plugins: []
});
