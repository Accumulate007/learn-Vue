const express = require('express')
const Vue = require('vue')
const fs = require('fs')
const path = require('path')
const vueServerRender = require('vue-server-renderer').createRenderer({
    template: fs.readFileSync(path.join(__dirname, './index.html'), 'utf-8')
})

const App = require('./src/entry-server')

const app = express()

app.get('*', async (req, res) => {
    res.status(200)
    res.setHeader('Content-Type', 'text/html;charset=utf-8')

    // 每次请求都会创建新的实例
    let app = await App({url: req.url})

    vueServerRender.renderToString(app).then((html) => {
        console.log(html)
        res.end(html)
    }).catch(err => {
        console.log(err)
    })
})


app.listen(4000, () => {
    console.log('Server start at localhost:4000 ...')
})

