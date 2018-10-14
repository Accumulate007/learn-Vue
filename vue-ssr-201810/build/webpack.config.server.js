// webpack.config.server.js
// 用于服务的打包
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base.js')
const ExtractPlugin = require('extract-text-webpack-plugin')

// vue服务端渲染必须要引用的文件
const VueServerPlugin = require('vue-server-renderer/server-plugin')

let config
config = merge(baseConfig, {
    target: 'node', // 打包后的文件用于Node端运行
    entry: path.join(__dirname, '../client/server-entry.js'),
    output: {
        libraryTarget: 'commonjs2',
        filename: 'server-entry.js',
        path: path.join(__dirname, '../server-build')
    },
    externals: Object.keys(require('../package.json').dependencies),    //排除不需要打包的依赖
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.styl/,
                use: ExtractPlugin.extract({
                    fallback: 'vue-style-loader',
                    use: [
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                        sourceMap: true,
                        }
                    },
                    'stylus-loader'
                    ]
                })
            }
        ]
    },
    plugins: [
        new ExtractPlugin('styles.[contentHash:8].css'),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV ||  'development'),
            'process.env.VUE_ENV': '"server"'
        }),
        new VueServerPlugin()
    ]
})

module.exports = config



