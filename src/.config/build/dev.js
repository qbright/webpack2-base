/**
 * Created by zhengqiguang on 2017/2/6.
 */
process.env.NODE_ENV = "development";


var webpack = require("webpack");
var express = require("express");
var common = require("./common");
var opn = require("opn");
var os = require("os");

var devConf = require("../webpack-config/webpack.dev.conf");
var buildDevConf = common.getConfig();


var app = express();


if (buildDevConf.serverHotReload) {
    Object.keys(devConf.entry).forEach(function (name) {
        devConf.entry[name] = ['./.config/build/client'].concat(devConf.entry[name])
    });

    devConf.plugins = devConf.plugins.concat([
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]);

}


var compiler = webpack(devConf);

var devMiddleware = require("webpack-dev-middleware")(compiler, {
    publicPath: devConf.output.publicPath,
    stats: {
        colors: true,
        chunks: false
    }
});


if (buildDevConf.serverHotReload) {


    var hotMiddleware = require("webpack-hot-middleware")(compiler);

    compiler.plugin("compilation", function (compilation) {
        compilation.plugin("html-webpack-plugin-after-emit", function (data, cb) {
            hotMiddleware.publish({action: "reload"});
            cb();
        });
    })
    app.use(hotMiddleware);
}

app.use(require("connect-history-api-fallback")());


// 如果存在 staticPath ,将其映射到 host:port/static
if (buildDevConf.build.staticPath) {
    app.use("/static", express.static(buildDevConf.build.staticPath));
}

app.use(devMiddleware);

module.exports = app.listen(buildDevConf.devServerPort, function (err) {
    if (err) {
        console.error(err);
        return;
    }

    var uri = `${(buildDevConf.serverUrl || "http://localhost")}:${buildDevConf.devServerPort}`;

    console.log(`Listening at ${uri}\n`);

    console.log(`Publish path at ${devConf.output.publicPath}`);

    if (!buildDevConf.openBrowser) {
        return;
    }

    var chromeVar = (os.platform() == "darwin" && "google chrome") || (os.platform() == "win32" && "chrome");

    opn(uri, {
        app: [chromeVar, "--incognito"]
    })

});