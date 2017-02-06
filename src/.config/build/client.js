/**
 * Created by zhengqiguang on 2017/2/6.
 */
require('eventsource-polyfill')
var hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true')

hotClient.subscribe(function (event) {
    if (event.action === 'reload') {
        window.location.reload()
    }
})
