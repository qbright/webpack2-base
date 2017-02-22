/**
 * Created by zhengqiguang on 2017/2/21.
 */
import {bar1} from "../bar";

bar1();

export let bar = function () {
    console.log("t3");
}

export let foo = function () {
    console.log(123);
}

System.import("./t4").then(T4=> {
    T4.bar();
});