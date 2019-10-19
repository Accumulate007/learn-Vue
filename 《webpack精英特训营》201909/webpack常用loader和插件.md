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









