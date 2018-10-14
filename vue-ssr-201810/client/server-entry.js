// server-entry.js
// 服务端webpack入口文件

import crateApp from './create-app.js'

export default context => {
    return new Promise((resolve, reject) => {
        const {app, router} = createApp()
        router.push(context,url)

        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents()
            if(!matchedComponents.length) {
                return reject(new Error('no component matched'))
            }
            resolve(app)
        })
    })
}
