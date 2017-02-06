/**
 * Created by zhengqiguang on 2017/2/6.
 */
var merge = require("webpack-merge"),
    baseConf = require("./webpack.base.conf");

var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require("path");

var pwd = process.env.PWD;

module.exports = merge(baseConf, {
    output: {
        filename: "[hash].[name].js",
        path: path.resolve(pwd, "./dist"),
        publicPath: "/"
    },
    devtool: "source-map",
    plugins: [
        new HtmlWebpackPlugin({
            filename: "./page.html",
            template: "./src/page.ejs",
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            chunks: ["manifest", "vendor", "main"],
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: 'dependency'
        })

    ]
});

