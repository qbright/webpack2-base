/**
 * Created by zhengqiguang on 2017/2/6.
 */




var configMap = {
    "development": require("../build-config/dev"),
    "production": require("../build-config/pub")
}

module.exports = {

    getConfig: function () {
        var evn = process.env.NODE_ENV;

        if (!configMap[evn]) {
            throw new Error(`don't found the config by EVN:${evn}`);
        }
        return configMap[evn];
    },
    getDefineString(str){
        return JSON.stringify(str);
    },
    getEntry(entryList){
        var entry = {};

        for (var key in entryList) {
            entry[key] = entryList[key]['entry'];
        }

        return entry;
    },
    getHtmlPlugin(entryList){
        var temp = [];

        for (var key in  entryList) {
            var htmlConf = entryList[key]["HtmlPluginConf"];

            temp.push({
                filename: htmlConf.filename,
                template: htmlConf.template,
                chunks: [key]
            });
        }

        return temp;
    }

}