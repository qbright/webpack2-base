/**
 * Created by zhengqiguang on 2017/2/8.
 */

process.env.NODE_ENV = "production";

var common = require("./build/common");


var buildConf = common.getConfig();


console.log(buildConf);

