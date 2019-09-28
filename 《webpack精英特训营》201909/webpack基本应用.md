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



