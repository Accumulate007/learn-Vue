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






