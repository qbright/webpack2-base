/**
 * Created by zhengqiguang on 2017/2/7.
 */

process.env.NODE_ENV = "test";

var common = require("../build/common");

var webpack = require("webpack");
var pubConf = require("../webpack-config/webpack.test.conf");
var buildConf = common.getConfig();
var ora = require("ora");
var path = require("path");

var spinner = ora("building for production test...");
spinner.start();

var p = path.resolve(buildConf.build.output.path, buildConf.build.assetPath);
common.removeDistDir(`${p}/*`);

if (buildConf.build.staticPath && buildConf.build.staticAssetPath) {
    common.copyStatic(buildConf.build.staticPath, buildConf.build.staticAssetPath);
}


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
