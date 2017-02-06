/**
 * Created by zhengqiguang on 2017/1/18.
 */

var webpack = require("webpack");
var path = require("path");

module.exports = function (env) {
    return {
        entry: {
            main: "./src/app.js",
            vendor: "moment"
        },
        output: {
            filename: "[chunkhash].[name].js",
            path: path.resolve(__dirname, "dist")
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                name: "vendor",
                minChunks: function (module) {
                    return module.context && (module.context.indexOf("node_modules") !== -1);
                }

            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: "manifest",
                chunks: ["vendor"]
            })
        ]
    }
}


