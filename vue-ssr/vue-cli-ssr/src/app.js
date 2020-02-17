import Vue from 'vue'
import createRouter from './router'
import App from './app.vue'

// 每次请求都创建新的实例
export default (context) => {
    const router = createRouter()
    const vueApp = new Vue({
        router,
        components: { App },
        template: '<App/>'
      })

    return {
        app: vueApp,
        router
    }
}

