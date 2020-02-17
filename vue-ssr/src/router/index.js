const vueRouter = require('vue-router')
const Vue = require('vue')


Vue.use(vueRouter)


// 每次请求都是新的router
module.exports = () => {
    const router = new vueRouter({
        mode: 'history',
        routes: [
            {
                path: '/',
                name: 'home',
                component: {
                    template: `
                        <h2>这是首页，Home</h2>
                    `
                }
            },
            {
                path: '/about',
                name: 'about',
                component: {
                    template: `
                        <h2>这是关于我页面，About</h2>
                    `
                }
            }
        ]
    })

    return router
}

