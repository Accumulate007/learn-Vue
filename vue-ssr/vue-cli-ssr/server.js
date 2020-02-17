
const devServer = require('./build/dev-server')

const express = require('express')
const fs = require('fs')
const path = require('path')
const vueRenderer = require('vue-server-renderer')
const app = express()

app.get('*', async (req, res) => {
    res.status(200)
    res.setHeader('Content-Type', 'text/html;charset=utf-8')

    let renderer = devServer(function(serverBundle, clientBundle, template) {
        vueRenderer.createBundleRenderer(serverBundle, {
            template,
            clientManifest: clientBundle,
            runInNewContext: false
        })
    })

    renderer.renderToString({
        url: req.url
    }).then((html) => {
        console.log(html)
        res.end(html)
    }).catch(error => {
        console.log(error)
    })
})


app.listen(4000, () => {
    console.log('Server start at localhost:4000 ...')
})














