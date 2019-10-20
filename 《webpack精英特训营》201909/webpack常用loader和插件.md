### 1.处理CSS文件

#### 1.1解析CSS样式
我们在.js文件中引入css样式文件，像这样
```javascript
import './style.css'
```
在打包的时候会报错，因为webpack默认只能处理js文件，所以我们需要对应的loader对css文件进行解析。

这里用到了'style-loader'(用于将样式文件插入HTML)和'css-loader'(用于解析css文件)。
```javascript
npm install style-loader css-loader --save-dev
```
安装完成后在webpack中配置
```javascript
{
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
}
```

#### 1.2抽离CSS样式文件
在webpack打包中，默认的css样式文件会被打包进最终的bundle.js文件，这样就会导致最终的打包文件过大，而且样式文件难以管理。我们可以使用相应的loader来将最终打包的css文件和js文件分离。
```javascript
npm install mini-css-extract-plugin --D
```
然后在配置中使用(我们只在生产环境的打包中进行CSS样式文件的分离)
```javascript
{
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          !isDev && MiniCssExtractPlugin.loader,
          'style-loader', 
          'css-loader'
          ]
      }
    ]
  },
  plugins: [
    !isDev && new MiniCssExtractPlugin({
      filename: "css/[name].css"
    })
  ]
}
```

#### 1.3CSS预处理器
不同的css预处理器要安装不同的loader来进行解析，常见的有
- sass: sass-loader node-sass
- less: less-loader less
- stylus: stylus-loader stylus

使用sass
```javascript
{
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          !isDev && MiniCssExtractPlugin.loader,
          'style-loader', 
          'css-loader',
          'sass-loader'
          ]
      }
    ]
  }
}
```
在css文件中可能会使用@import语法引用css文件,被引用的css文件中可能还会导入scss
```javascript
{
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          !isDev && MiniCssExtractPlugin.loader,
          'style-loader', 
          {
            loader: 'css-loader',
            options: {
              importLoaders:1 // 引入的文件需要调用sass-loader来处理
            }
          },
          'sass-loader'
          ]
      }
    ]
  }
}
```

#### 1.4处理样式前缀
使用postcss-loader增加特定浏览器的样式前缀
```javascript
npm install postcss-loader autoprefixer --D
```

- 使用方式一：在webpack中进行配置

在处理css前先增加前缀
```javascript
{
    test: /\.css$/,
    use: [
    !isDev && MiniCssExtractPlugin.loader,
    isDev && 'style-loader',
    {
        loader:"postcss-loader",
        options:{
            plugins:[require('autoprefixer')]
        }
    },
    "css-loader",
    "sass-loader"
    ].filter(Boolean)
},
```

- 使用方式二：创建postcss的配置文件postcss.config.js
```javascript
module.exports = {
  plugins: [
    require('autoprefixer')
  ]
}
```

#### 1.5压缩CSS文件
在生产环境下的打包，我们需要对CSS文件进行压缩，减小文件的体积。这需要使用到两个loader
```javascript
npm i optimize-css-assets-webpack-plugin terser-webpack-plugin --save-dev
```
在webpack.prod.js文件中配置压缩
```javascript
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');

{
  optimization:{
    minimizer:[new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
  }
}
```

#### 1.6生成文件hash
- Hash整个项目的hash值
- chunkhash 根据入口产生hash值
- contentHash 根据每个文件的内容产生的hash值
```javascript
{
  plugins: [
    !isDev && new MiniCssExtractPlugin({
      filename: "css/[name].[contentHash].css"
    })
  ]
}
```

### 2.处理文件类型

#### 2.1处理引用的图片
```javascript
{
  module: {
    rules: [
      {
        test: /\.jpe?g|png|gif/,
        use: {
          loader: 'file-loader',
          optioins: {
            name:`img/[name].[ext]`
          }
        }
      }
    ]
  }
}
```

#### 2.2处理icon
```javascript
{
  module: {
    rules: [
      {
        test: /woff|ttf|eot|svg|otf/,
        use: {
          loader: 'file-loader'
        }
      }
    ]
  }
}
```

#### 2.2将满足条件的小图片转换成base64格式
```javascript
{
  module: {
    rules: [
      {
        test: /\.jpe?g|png|gif/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100*1024,
            name: `img/[name].[ext]`
          }
        }
      }
    ]
  }
}
```

### 3.处理JS模块

#### 3.1使用babel将ES6编译成ES5
使用babel编译ES6的代码，需要用到三个插件
- @babel/core：是babel中的核心模块
- @babel/preset-env：的作用是es6转化es5插件的插件集合
- babel-loader是webpack和loader的桥梁

安装完毕后，增加babel的配置文件 .babelrc
```javascript
{
    "presets": [
       ["@babel/preset-env"]
    ]
}
```
配置loader
```javascript
{
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
}
```

#### 3.2添加ESLint
安装eslint
```javascript
npm i eslint

// 安装完毕后初始化配置文件
npx eslint --init
```
配置loader
```javascript
{
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce:"pre",  // 表示在所有loader执行前执行
        use:'eslint-loader'
      }
    ]
  }
}
```

#### 3.2source-map
source-map相关字段说明
- cheap：忽略打包后的列信息，不使用loader中的sourcemap
- module：没有列信息，使用loader中的sourcemap(没有列信息)
- eval：生成代码每个模块都被eval执行,每一个打包后的模块后面都增加了包含sourceURL
- source-map：产生map文件
- inline：不会生成独立的 .map文件,会以dataURL形式插入

在webpack中配置(只在生产环境下的打包生成source-map)
```javascript
{
  devtool: isDev ? 'cheap-module-eval-source-map' : false
}
```












