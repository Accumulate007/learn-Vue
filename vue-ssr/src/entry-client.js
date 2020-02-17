/**
 * entry-client.js
 * 客户端入口文件
 */

const createApp = require('./app')


let { app, router } = createApp()



router.onReady(() => {
    app.$mount('#app')
})

 