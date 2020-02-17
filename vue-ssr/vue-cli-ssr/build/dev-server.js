// dev-server.js

const serverConf = require('./webpack.server.conf')
const fs = require('fs')
const webpack = require('webpack')
const path = require('path')
const Mfs = require('memory-fs')    // 读取内存文件
const axios = require('axios')


module.exports = (cb) => {
    
    const webpackCompiler = webpack(serverConf)

    let mfs = new Mfs()

    webpackCompiler.outputFileSystem = mfs

    webpackCompiler.watch({}, async (error, stats) => {
        if(error) {
            console.log(error)
            return
        }
        stats = stats.toJson()
        stats.errors.forEach((err) => {
            console.log(err)
        })
        stats.warning.forEach((err) => {
            console.log(err)
        })

        // server bundle json文件
        let serverBundlePath = path.join(
            serverConf.output.path,
            'vue-ssr-server-bundle.json'
        )

        let serverBundle = JSON.parse(mfs.readFileSync(serverBundlePath, 'utf-8'))

        // client bundle json文件
        let clientBundle = await axios.get('http://localhost:8080/vue-ssr-client-manifest.json')

        // 模板
        let template = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf-8')

        cb(serverBundle, clientBundle, template)
    })
}
