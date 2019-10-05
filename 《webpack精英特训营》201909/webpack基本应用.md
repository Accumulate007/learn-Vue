wbepack是一个基于NodeJS的模块打包器，主要有两个核心的功能：

1.模块转换器：用于把模块原内容按照需求转换成新内容，可以加载非JS模块；

2.扩展插件：在webpack构建流程中的特定时机注入扩展逻辑来改变构建结果，或做其它你想要的事情。

### 1.创建一个webpack项目

#### 1.1初始化一个项目
首先要创建一个项目的文件夹，本文就以webpack-project指代项目的文件夹。创建好文件夹后，进入该文件夹，并初始化npm。
```javascript
npm init
```
#### 1.2安装webpack
从webpack4.0版本开始，不仅要安装webpack，还需要安装webpack-cli。webpack-cli的作用在于解析配置参数，并传递给webpack。
```javascript
npm install webpack webpack-cli -D
```
安装好webpack之后，我们还需要在webpack-project目录下创建一个src文件夹，用于存放真正的项目代码。并且，我们在src目录下创建一个index.js文件，在运行webpack的时候，需要一个入口文件，webpack默认会寻找项目目录下'src/index.js'的文件作为入口文件。至此，一个最基础的基于webpack的项目就搭好了。
```javascript
├── src   # 源码目录
│   ├
│   └── index.js
|—— package.json
```

### 2.webpack初体验

#### 2.1编写代码
有了上面我们搭建好的项目结构后，就可以体验wbepack的打包功能了。我们给src目录下的index.js文件添加一些代码。
```javascript
// index.js

let str = 'hello,this is index.js';
console.log(str);
```

#### 2.2通过npx运行webpack
在index.js文件中添加代码之后，我们在命令行工具中运行以下命令。
```javascript
npx webpack --mode development
```
运行后我们会发现，在项目目录下多了一个'dist'文件夹，并且在dist文件夹下还生成了一个'main.js'文件。这就是webpack的作用，它通过入口文件index.js，寻找相关依赖，并将所有的依赖都打包成了这个main.js文件。

这样并不能直观的看到效果，因为打包后的结果是一个JS文件。我们在'dist'目录下创建一个'index.html'文件，并且在index.html文件中引入这个打包后的main.js文件，这样我们就能在浏览器中运行index.html文件，并且查看我们书写的代码了。在浏览器中运行index.html文件后我们在控制台中发现，打印了'hello,this is index.js'这句话，说明打包后的文件没有问题。

npx是npm 5.2之后增加的一个命令，通过运行'npx webpack'，可以帮你执行'node_modules/bin'路径下的对应程序。而'--mode development'则是传递给webpack的配置参数，代表了打包的方式是开发模式。上面说过，webpack4.0版本后同时需要安装一个webpack-cli，这里'--mode'传递的配置参数就是由webpack-cli进行解析并传递给webpack的。

### 3.配置package.json中的scripts
如果我们每次运行wbepack都需要在命令行中输入一段命令，进行打包，以及打包参数的配置，那就太麻烦了。我们需要在一个特定的地方，把相对应的配置都书写好，然后通过一个简单的命令映射到这个配置，执行相关的打包，这样不就更加简洁高效了吗。

package.json文件夹中"scripts"参数就是做这个事情的。打开package.json文件。
```javascript
"scripts": {
  "dev": "webpack --mode development"
}
```
我们将上面npx运行的命令，设置在"scripts"中，并且给这行命令一个映射的名称"dev"，代表的是我们在开发环境中进行的打包。

"scripts"中设置的命令，都可以通过"npm run xxx"的方式进行运行。所以，我们在命令行工具中运行
```javascript
npm run dev
```
运行的结果跟之前我们运行npx是一样的，在dist文件夹下生成了打包后的文件main.js。

### 4.认识webpack.config.js
在之前我们使用webpack的过程中，只是简单的通过命令行传递了诸如"--mode development"这样的配置，但其实webpack是一个非常庞大复杂的打包工具，有着繁多的配置项。这么多的配置功能，显然是不可能通过命令行的方式进行配置的。所以webpack需要一个单独的配置文件，这个文件就是webpack.config.js。

在我们运行webpack进行打包的时候，webpack默认会去寻找项目根目录下的webpack.config.js文件，并读取该文件中相关的配置参数。我们在项目目录下添加该文件。
```javascript
├── src   # 源码目录
│   ├
│   └── index.js
|—— webpack.config.js
|—— package.json
```

#### 4.1书写方式一
webpack.config.js文件中默认导出一个对象，该对象包含了所有webpack相关的自定义配置。
```javascript
module.exports = {
  entry: "",  // 定义入口文件
  output: {
    filename: "main.js",  // 定义打包后的文件名
    path: ""              // 定义打包后文件的输出路径
  },
  module: {
    // 配置loader的使用
  },
  plugins: [
    // 配置plugin的使用
  ]
}
```
以上就是webpack.config.js最基本的配置格式，包含了四个最重要的配置项：入口、出口、loader和plugins。可以说webpack的使用基本就是围绕着这几个配置项目进行不同的使用的。

#### 4.2书写方式二
webpack.config.js中的导出对象，还可以使用函数返回的书写方式。并且这个函数还包含了一些默认的参数，我们可以从这个参数中获取一些配置信息。

并且通过这种方式，我们可以将webpack.config.js拆分成三个文件：
- 1)基础通用配置(base)，对应的文件webpack.base.js
- 2)开发环境配置(dev)，对应的文件webpack.dev.js
- 3)生产环境配置(prod)，对应的文件webpack.prod.js

我们在项目根目录下新建一个build文件夹，并且将这个三个webpack的配置文件放入到其中。在我们运行webpack的时候，统一去执行webpack.base.js中的配置，该文件中的配置代码如下。

```javascript
const dev = require('./webpack.dev.js');
const prod = require('./webpack.prod.js');

module.exports = (env) => {
  // env是一个环境变量
  let isDev = env.development;  // 这里的env.development参数，是在package.json文件中scripts配置项中传递的
  
  const base = {
    entry: "",
    output: "",
    module: {},
    plugins: []
  }
  
  if(isDev) {
    return merge(base, dev);
  } else {
    return merge(base, prod);
  }
}
```

对应的，我们在package.json中"scripts"的配置如下。
```javascript
"scripts": {
    "dev": "webpack --env.development --config ./build/webpack.base.js",
    "build": "webpack --env.production --config ./build/webpack.base.js"
  }
```
这样我们在命令行中运行"npm run dev"就会执行开发环境下的打包，而运行"npm run build"则会执行生产环境下的打包。

至此，关于webpack的基本使用就介绍完毕。我们之前说了，webpack的使用，其实就是各种loader和plugin的组合使用，在熟悉了webpack的基本配置和使用之后，就可以学习各种loader和plugin的使用来辅助开发和优化应用了。

### 五、plugin的使用
在webpack的配置项中，有一个plugins选项，该选项是一个数组，用于配置项目所需要的插件。plugins中的插件，是按照注册的先后顺序进行执行的，之所以我们要特意说这点，是因为loader的执行顺序恰好是相反的。

#### 5.1 使用webpack-dev-server提供本地开发服务
我们在本地开发的时候，需要有一个本地的静态资源的代理，方便于我们进行开发和调试。webpack-dev-server就是这样一款插件，首先安装它。
```javascript
npm install webpack-dev-server --D
```
因为是开发环境下使用的插件，安装完毕之后，我们在webpack.dev.js文件中进行配置。
```javascript
const path = require('path');

module.exports = {
  devServer: {
    prot: 3000, // 指定端口号
    compress: true, // 开启gzip，可以提升页面返回速度
    contentBase: path.resolve(__dirname, '../dist'),   // webpack会代理在dist目录下的资源
  }
}
```
安装设置完毕之后，我们需要在package.json文件中设置"scripts"如下:
```javascript
"scripts": {
    "dev": "webpack-dev-server --env.development --config ./build/webpack.base"
}
```
这样当我们在命令行工具中运行"npm run dev"就可以启动开发代理了。启动后在浏览器中输入 "http://localhost:3000" 就可以访问相应的静态资源。

#### 5.2 使用html-webpack-plugin提供打包模板
wbepack打包后的文件是一个js文件，我们需要在一个HTML文件中引入这个js文件去使用它。但是目前为止，我们知道webpack打包是无法生成html文件的，这就需要插件来帮助完成这个功能。我们首先安装插件:
```javascript
npm install html-webpack-plugin --D
```
安装完毕插件之后，我们在项目根目录下创建一个public文件夹，在该文件夹下我们新建一个index.html文件，html-webpack-plugin插件就会以该html文件为基础生成打包后的html文件。

在webpack.base.js中配置使用html-webpack-plugin：
```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env) => {
  plugins: [
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../public/index.html'),  // 设置模板路径
        filename: 'index.html', // 打包后的文件名
        minify: {
          removeAttributeQuotes: true,    // 不用双引号
          collapseWhitespace: true,   // 折叠成一行
        }
     })
  ]
}
```
其实webpack中plugin的使用都比较类似，分为三步：

1).在配置文件中引入该plugin

2).在plugins选项中new一个插件

3).配置插件的参数


### 六、loader的使用
loader的使用

