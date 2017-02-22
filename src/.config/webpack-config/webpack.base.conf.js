var common = require("../build/common");


var merge = require("webpack-merge"),
    webpack = require("webpack"),
    path = require("path"),
    HtmlWebpackPlugin = require('html-webpack-plugin');

var buildConf = common.getConfig();

var entries = common.getEntry(buildConf.build.entryList);
var htmlPlugins = common.getHtmlPlugin(buildConf.build.entryList);
var ExtractTextPlugin = require('extract-text-webpack-plugin');


var staticTplMap = common.getTplMap(buildConf.staticTplDir);

/** plugins **/
var commonHtmlPluginConfig = {
    inject: true,
    minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
    },
    chunks: ["manifest", "vendor"],
    chunksSortMode: 'dependency',
    static_tpl: staticTplMap
}


/** you can push new plugin on the array **/
var plugins = [
    new webpack.DefinePlugin({
        'process.env': common.getDefineString(process.env.NODE_ENV),
        'process.static': common.getDefineString(buildConf.static)
    }),
    new ExtractTextPlugin({
            filename: common.getAssetPath('css/[name].[hash:7].css')
        }
    ),
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
    })
];
for (var i = 0, h; h = htmlPlugins[i]; i++) {
    plugins.push(new HtmlWebpackPlugin(merge(commonHtmlPluginConfig, h)));
}


/** plugin **/


/** rules(loaders) **/

var rules = [
    {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
            loader: 'babel-loader',
            query: {
                cacheDirectory: true
            }
        }]
    },
    {
        test: /(\.tpl|\.ejs)$/,
        use: ["ejs-compiled-loader"]
    },
    {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
            {
                loader: "url-loader",
                query: {
                    limit: 10000,
                    name: common.getAssetPath('img/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
            {
                loader: "url-loader",
                query: {
                    limit: 10000,
                    name: common.getAssetPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    }
]


module.exports = {
    entry: entries,
    output: {
        filename: common.getAssetPath("./js/[name].[chunkhash:7].js"),
        path: buildConf.build.output.path,
        publicPath: buildConf.build.output.publicPath
    },
    // resolve: {//TODO 研究下什么用
    //     extensions: ['.js', ''],
    //     fallback: [path.join(__dirname, '../node_modules')],
    //     alias: {}
    // },
    // resolveLoader: {
    //     fallback: [path.join(__dirname, '../node_modules')]
    // },
    module: {
        rules: rules
    },
    plugins: plugins
}