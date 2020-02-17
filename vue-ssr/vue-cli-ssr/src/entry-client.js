/**
 * entry-client.js
 * 客户端入口
 */

import createApp from './app'

let { app, router } = createApp()



router.onReady(() => {
    app.$mount('#app')
})

