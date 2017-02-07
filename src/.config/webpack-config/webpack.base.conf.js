var common = require("../build/common");


var merge = require("webpack-merge"),
    webpack = require("webpack"),
    path = require("path"),
    HtmlWebpackPlugin = require('html-webpack-plugin');

var buildConf = common.getConfig();

var entries = common.getEntry(buildConf.build.entryList);
var htmlPlugins = common.getHtmlPlugin(buildConf.build.entryList);

var commonHtmlPluginConfig = {
    inject: true,
    minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
    },
    chunks: ["manifest", "vendor"],
    chunksSortMode: 'dependency'
}


var plugins = [
    new webpack.DefinePlugin({
        'process.env': common.getDefineString(process.env.NODE_ENV),
        'process.static': common.getDefineString(buildConf.static)
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: "vendor",
        minChunks: function (module) {

            //@TODO 切分不同模块的 vendor
            return module.context && (module.context.indexOf("node_modules") !== -1);
        }
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: "manifest",
        chunks: ["vendor"]
    })];

for (var i = 0, h; h = htmlPlugins[i]; i++) {
    plugins.push(new HtmlWebpackPlugin(merge(commonHtmlPluginConfig, h)));
}

console.log(11111111111,entries);

module.exports = {
    entry: entries,
    output: {
        filename: "[name].[chunkhash].js",
        path: buildConf.build.output.path,
        publicPath: buildConf.build.output.publicPath
    },
    plugins: plugins
}