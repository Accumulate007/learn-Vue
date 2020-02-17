/**
 * entry-server.js
 * 服务端入口
 */

import createApp from './app'

// 给外部express服务使用
exprot default (context) => {
    return new Promise((resolve, reject) => {
        let {app, router} = createApp(context)
        router.push(context.url)

        // 所有异步组件准备完成后触发
        router.onReady(() => {
            // 访问路径，肯定会匹配到组件
            let matchedComponents = router.getMatchedComponents()
            if(matchedComponents.length > 0) {
                resolve(app)
            } else {
                return reject({
                    code: 404
                })
            }
        }, reject)
    })
}











