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
















