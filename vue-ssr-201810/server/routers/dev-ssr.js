// dev-ssr.js
const Router = require('koa-router')
const axios = require('axios')
const path = require('path')
const fs = require('fs')
const MemoryFS = require('memory-fs')   // 不把文件写入磁盘，而是写入内存
const webpack = require('webpack')
const VueServerRenderer = require('vue-server-renderer')

const serverRender = require('./server-render')
const serverConfig = require('../../build/webpack.config.server.js')


const serverCompiler = webpack(serverConfig)
const mfs = new MemoryFS()

serverCompiler.outputFileSystem = mfs

let bundle
serverCompiler.watch({}, (err, stats) => {
    if(err) throw err
    stats = stats.toJson()
    stats.errors.forEach(err => {
        console.log(err)
    })
    stats.warnings.forEach(warn => {
        console.warn(warn)
    })

    const bundlePath = path.join(serverConfig.output.path, 'vue-ssr-server-bundle.json')
    bundle = JSON.parse(mfs.readFileSync(bundelPath, 'utf-8'))

    let nowTime = new Date();
    console.log('new bundle generated at: ' + String(nowTime))
})

const handleSSR = async (ctx) => {
    if(!bundle) {
        ctx.body = 'wait for a moment...'
        return
    }
    
    const clientMainfestResp = await axios.get(
        'http://127.0.0.1:8000/vue-ssr-client-manifest.json'
    )
    const clientMainfest = clientMainfestResp.data

    const template = fs.readFileSync(path.join(__dirname, '../server.template.ejs'), 
        'utf-8'
    )

    const renderer = VueServerRenderer
        .createBundleRenderer(bundle, {
            inject: false,
            clientMainfest
        })
    
    await serverRender(ctx, render, template)
}

const router = new Router()

router.get('*', handleSSR)

module.exports = router
