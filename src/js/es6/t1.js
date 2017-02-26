/**
 * Created by zhengqiguang on 2017/2/21.
 */

export let bar = function () {
    console.log("t1");
}

export let dd =  {
    t:function(){
        console.log(this,"tttttt");
        this.d();
    },
    d:function(){
        console.log(this,"ccccccccccc");
    }
}

