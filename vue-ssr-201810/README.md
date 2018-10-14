#本套课程详细讲解了Vue+Vue-Router+Vuex的常用API，以及Vue-SSR(服务端渲染)的实现

# About
这是慕课网上[Vue+Webpack打造todo应用](https://www.imooc.com/learn/935)课程的源码

# 使用方法
```
git clone https://github.com/Jokcy/vue-todo-tech.git
```
进入项目目录，运行
```
npm install
```
然后执行
```
npm run dev
```
开始开发项目

### 使用vue-style-loader代替style-loader实现css的热更新
npm install vue-style-loader D

### 使用rimraf实现旧打包文件的自动删除
每次打包之前，都会把之前打包的文件删除，然后生成新的打包后的文件，免除了手动删除的繁琐操作。

### 使用eslint进行代码风格校验
进行ESLint默认配置文件.eslintrc
使用 eslint-plutin-html让Eslint具备识别.vue文件中的JavaScript代码

### 使用ESLint自动修复代码中的格式问题
"lint-fix": "eslint --fix --ext .js --ext .jsx --ext .vue client/"

### 使用.editorconfig文件配置编辑器解析当前项目的规则
编辑器需要安装 editorConfig插件

### node_modules/vue/dist中,带runtime版本的vue文件，是不能在Vue({})中使用template选项的
要使用template选项，就在开发中使用vue.esm.js版本



