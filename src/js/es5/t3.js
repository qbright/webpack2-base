/**
 * Created by zhengqiguang on 2017/2/21.
 */


require.ensure("./t4", function () {
    var t4 = require("./t4");
    t4();
});

module.exports = {

    tt: function () {
        console.log('tt');
    }
}
