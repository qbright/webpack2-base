/**
 * Created by zhengqiguang on 2017/2/7.
 */

process.env.NODE_ENV = "watch";

var common = require("../build/common");

var webpack = require("webpack");
var watchConf = require("../webpack-config/webpack.watch.conf");
var buildConf = common.getConfig();
var ora = require("ora");

var spinner = ora("building for develop watch...");

spinner.start();

common.removeDistDir(`${buildConf.build.output.path}/*`);

if (buildConf.build.staticPath && buildConf.build.staticAssetPath) {
    common.copyStatic(buildConf.build.staticPath, buildConf.build.staticAssetPath);
}

var compiler = webpack(watchConf);

compiler.watch({ // watch options:
    aggregateTimeout: 300, // wait so long for more changes
    poll: false// use polling instead of native watchers
    // pass a number to set the polling interval
}, function (err, stats) {
    if (err) throw err
    process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n')
});