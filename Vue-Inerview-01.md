原文一共有30道Vue相关的面试题，选择了其中的一些题目作为阅读记录。

#### 1.谈谈对SPA单页应用的理解，它的优缺点分别是什么？
单页应用全称Single-page Application，在页面初始话的时候就加载了对应的HTML、CSS和JavaScript。一旦页面加载完成，SPA不会因为用户的操作而跳转或重新加载
页面，取而代之的是通过路由机制实现HTML内容的替换。

优点：

-用户体验好，速度快，内容的改变不需要重新加载页面，避免了不必要的跳转和渲染；

-SPA相对服务器的压力小一些；

-前后端分离，职责清晰，前端负责进行交互逻辑，后端负责处理数据

缺点：

-初次加载耗时较多；

-无法实现浏览器的前进后退功能：因为单页应用全部都是在一个HTML页面内；

-不利于SEO：因为所有内容都在一个页面内动态的加载显示。

#### 2.Vue父组件和子组件的生命周期钩子函数的执行顺序？
Vue父子组件生命周期狗子函数分为四种情况：

-1.渲染加载过程：父 beforeCreate -> 父 created -> 父 beforeMount -> 子 beforeCreate -> 子 created -> 子 beforeMount -> 子 mounted -> 父 mounted。

-2.子组件更新过程：父 beforeUpdate -> 子 beforeUpdate -> 子 updated -> 父 updated。

-3.父组件更新过程：父 beforeUpdate -> 父 updated。

-4.销毁过程：父 beforeDestroy -> 子 beforeDestroy -> 子 destroyed -> 父 destroyed。










