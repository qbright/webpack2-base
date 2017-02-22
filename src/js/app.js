/**
 * Created by zhengqiguang on 2017/1/18.
 */

// import "../style/style.css";

import {bar} from "./es6/t1";
import T2 from "./es6/t2";

bar();
T2();


// var t1 = require("./es5/t1");
// var t2 = require("./es5/t2");
//
//
// var t2_t = require("./es5/t2");
//
// t1.bar();
//
// t2();
//
// t2_t();
//
System.import("./es6/t3").then(T3=> {
    console.log(T3);

});

// require.ensure("./es5/t3", function () {
//     var t3 = require("./es5/t3");
//
//     t3.tt();
//
//
// });

console.log(123)

console.log("hello");

