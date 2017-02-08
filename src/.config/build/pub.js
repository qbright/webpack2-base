/**
 * Created by zhengqiguang on 2017/2/7.
 */

process.env.NODE_ENV = "production";

var common = require("../build/common");

var webpack = require("webpack");
var pubConf = require("../webpack-config/webpack.pub.conf");
var buildConf = common.getConfig();
var ora = require("ora");

var spinner = ora("building for production...");
spinner.start();

//TODO删除构建目录内容

webpack(pubConf, function (err, stats) {
    spinner.stop();
    if (err) throw err
    process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n');
});
