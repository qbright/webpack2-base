var common = require("../build/common");


var webpack = require("webpack"),
    path = require("path");


//@test
var pwd = process.env.PWD;

module.exports = {
    entry: {
        main: "./src/app.js"
    },
    output: {
        filename: "[chunkhash].[name].js",
        path: path.resolve(pwd, "./dist"),
        publicPath: "/"
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