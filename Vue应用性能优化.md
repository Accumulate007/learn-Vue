
### 一、webpack打包工作原理
当打包我们的资源时，Webpack 创建了被成为依赖图（dependency graph）的东西，它是一个基于入口，链接我们所有文件的图。假设我们在webpack配置中指定了一个名
为main.js 的文件作为入口点，它将是依赖关系图的根。现在，我们将在此文件中导入的每个js模块将成为图中的节点，并且在此节点中导入的每个模块都将成为其节点。
Webpack 正是使用这个依赖关系图来检测输出的包中应该包含哪些文件。输出包只是一个包含依赖关系图中所有模块的 Javascript 文件。

### 二、延迟加载
顾名思义，延迟加载就是延迟加载应用程序的某些部分。换句话说，只有在我们真正需要的时候才加载它们。代码分割就是将应用程序分割成这些延迟加载的块。
我们可以使用webpack提供的动态导入(dynamic imports)来实现资源的延迟加载。
```
// main.js
const getModuleA = () => import('./module_a.js');

// 调用的时候加载资源
getModuleA();
```
webpack将动态导入模块的内容打包到一个单独的文件中，除非函数被调用，否则不会导入也不会下载文件。</br>
通过webpack提供的这个功能，我们可以实现对整个Vue单文件组件(Vue Single-File-Component)的延迟加载。
```
const lazyComponentA = () => import('./componentA.vue');

// 当组件被请求需要在模板中渲染的时候，才会调用lazyComponentA函数
<lazyComponentA v-if="bool"></lazyComponentA>
```
常见的Vue项目开发中，我们一般都会使用Vuex进行路由管理，我们在设置路由的时候也可以使用这种动态加载路由资源的方式。
```
const routes = [
    {path: '/foo', component: () => import(./routerComponentA.vue)}
];
```
webpack会配合路由的设置，拆分打包相应的资源。比如这个例子中，会产生一个foo.js的文件，只有在访问'/foo'路径的时候该资源才会被加载。</br>

### 三、webpack splitChunksPlugin优化打包公共资源
我们知道了动态加载的模式之后，其实还有一个问题，就是公共文件的加载。有些资源是每个组件都可能会用到的，这些资源该如何打包优化呢？</br>
```
// webpack.config.js
optimization: {
  splitChunks: {
    chunks: 'all'
    }
}
```
这样就可以将公共依赖打包到同一个文件中，避免了重复的下载。
