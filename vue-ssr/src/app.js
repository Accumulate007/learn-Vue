const Vue = require('vue')
const createRouter = require('./router')



// 每次请求都创建新的实例
module.exports = (context) => {
    const router = createRouter()
    const vueApp = new Vue({
        router,
        data: {
            message: 'Vue SSR, 2020-02-16',
            url: context.url
        },
        template: `
            <div>
                <h1>Good good study</h1>
                <ul>
                    <li>
                        <router-link to="/">首页</router-link>
                    </li>
                    <li>
                        <router-link to="/about">关于我</router-link>
                    </li>
                </ul>
                <p>Today is 02-16</p>
                <h5 style="color:red;">您访问的路径是：{{url}}</h5>
                <router-view></router-view>
            </div>
        `
    })

    return {
        app: vueApp,
        router
    }
}

