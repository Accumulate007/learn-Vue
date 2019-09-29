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

#### 3.父组件中如何监听子组件的生命周期？
**方式一**
```javascript
// Parent.vue
<Child @mounted="doSomething"/>

// Child.vue
mounted() {
  this.$emit('mounted');
}

```

**方式二**
```javascript
// Parent.vue
<Child @hook:mounted="doSomething"/>

doSomething() {
  console.log('Parent.vue do some thing...');
}

// Child.vue
mounted() {
  console.log('Chile.vue call mounted~~~');
}
```


#### 4.谈谈对keep-alive组件的理解
keep-alive 是 Vue 内置的一个组件，可以使被包含的组件保留状态，避免重新渲染 ，其有以下特性

1).一般结合路由和动态组件一起使用，用于缓存组件；

2).提供 include 和 exclude 属性，两者都支持字符串或正则表达式， include 表示只有名称匹配的组件会被缓存，exclude 表示任何名称匹配的组件都不会被缓存 ，其中 exclude 的优先级比 include 高；

3).对应两个钩子函数 activated 和 deactivated ，当组件被激活时，触发钩子函数 activated，当组件被移除时，触发钩子函数 deactivated。

#### 5.v-model 的原理
我们在 vue 项目中主要使用 v-model 指令在表单 input、textarea、select 等元素上创建双向数据绑定，我们知道 v-model 本质上不过是语法糖，v-model 在内部为不同的输入元素使用不同的属性并抛出不同的事件：

-input 和 textarea 元素使用 value 属性和 input 事件；

-checkbox 和 radio 使用 checked 属性和 change 事件；

-select 字段将 value 作为 prop 并将 change 作为事件

```javascript
<input v-model='something'>

// 相当于
<input v-bind:value="something" v-on:input="something = $event.target.value">
```

如果在自定义组件中，v-model 默认会利用名为 value 的 prop 和名为 input 的事件(一个组件只能使用一个v-modle)，如下所示：
```javascript
// 父组件
<ModelChild v-model="message"></ModelChild>

// 子组件
<div>{{value}}</div>

props:{
    value: String
},
methods: {
  test1(){
     this.$emit('input', '小红')
  },
},
```

#### 6.Vue组件的通信方式有哪些，分别适用于什么情况？
1).props/emit(): 适用于父子组件通信

2).ref与$parent/$children：适用于父子组件通信

3).EventBus($emit/$on)：适用于父子、隔代、兄弟组件通信

4).$attrs/$listeners：适用于隔代组件通信

5).provide / inject：适用于隔代组件通信

6).Vuex: 适用于父子、隔代、兄弟组件通信
 
#### 7.vue-router 中常用的 hash 和 history 路由模式实现原理
hash 路由模式的实现主要是基于下面几个特性：

1）.URL 中 hash 值只是客户端的一种状态，也就是说当向服务器端发出请求时，hash 部分不会被发送

2）.hash 值的改变，都会在浏览器的访问历史中增加一个记录。因此我们能通过浏览器的回退、前进按钮控制hash 的切换

3）.可以通过 a 标签，并设置 href 属性，当用户点击这个标签后，URL 的 hash 值会发生改变；或者使用 JavaScript 来对 loaction.hash 进行赋值，改变 URL 的 hash 值

4）.我们可以使用 hashchange 事件来监听 hash 值的变化，从而对页面进行跳转










