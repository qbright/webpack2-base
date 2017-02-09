/**
 * Created by zhengqiguang on 2017/2/7.
 */
var merge = require("webpack-merge"),
    baseConf = require("./webpack.base.conf"),
    common = require("../build/common");


var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
module.exports = merge(baseConf, {
    output: {
        filename: common.getAssetPath("./js/[name].[chunkhash:7].js")
    },
    module: {
        rules: common.styleLoaders(true, true).concat([
            {
                test: /\.jpe?g|\.png|\.gif$/,
                use: [{
                    loader: "img-loader",
                    query: {
                        minimize: true,
                        optimizationLevel: 5,
                        progressive: true
                    }
                }]
            }
        ])
    },
// devtool: "nosources-source-map",
    plugins: [
        new UglifyJSPlugin({
            compress: {
                warnings: false
            }
        })
    ]
});
