// server-render.js

module.exports = async (ctx, renderer, template) {
    ctx.headers['Content-Type'] = 'text/html'

    const context = {url: ctx.path}

    try{
        const appString = renderer.renderToString(context)
        const html = ejs.render(template, {
            appString,
            style: context.renderStyles(),
            scripts: context.renderScripts()
        })

        ctx.body = html
    }catch(err) {
        console.log('render error: ', err)
        throw err
    }
}









