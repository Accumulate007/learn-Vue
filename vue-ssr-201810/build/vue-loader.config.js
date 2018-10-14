
module.exports = (isDev) => {
    return {
        preserveWhitepace: true,      // 去除空格
        extractCSS: !isDev,           // 将css样式单独打包
        cssModules: {
            localIdentName: '[path]-[name]-[hash:base64:5]',
            camelCase: true
        },
        // hotReload: false,           // 根据环境变量生成
        loaders: {
            // 'docs': 
        }
    }
}
