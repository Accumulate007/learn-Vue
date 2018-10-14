import Router from 'vue-router';

import routes from './routes';


// 解决服务端渲染内存溢出问题，每次返回一个新的路由对象
// 在有服务端渲染，或者需要SEO的情况下，会使用history模式
export default () => {
    return new Router({
        mode: 'history',
        routes,
        // base: '/base/',
        // linkActiveClass: 'active-link-chen',    // 部分匹配
        // linkExactActiveClass: 'exact-active-link-chen', // 完全匹配
        scrollBehavior (to, from, savedPosition) {
            // 自定义页面滚动行为
            if(savedPosition) {
                return savedPosition;
            }else{
                return {
                    x: 0,
                    y: 0
                }
            }
        },
        // parseQuery (query) {
        //     console.log('query:', query);
        // },
        // stringifyQuery(obj) {
        //     console.log('obj: ', obj);
        // },
        // fallback: true, // 在不支持history模式的浏览器下自动切换到hash模式
    })
}

