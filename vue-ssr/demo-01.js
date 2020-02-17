const express = require('express')
const Vue = require('vue')
const vueServerRender = require('vue-server-renderer').createRenderer()

const app = express()


const vueApp = new Vue({
    data: {
        message: 'Vue SSR, 2020-02-16'
    },
    template: `
        <div>
            <h1>Good good study</h1>
            <p>Today is 02-16</p>
        </div>
    `
})


app.get('*', (req, res) => {
    res.status(200)
    res.setHeader('Content-Type', 'text/html;charset=utf-8')

    vueServerRender.renderToString(vueApp).then((html) => {
        console.log(html)
        res.end(html)
    }).catch(err => {
        console.log(err)
    })
})




app.listen(4000, () => {
    console.log('Server start at localhost:4000 ...')
})

