Vue组件间通信，是Vue使用中的一个重点内容，有五花八门的方式可以实现父子、祖孙之间组件的通信。miaov的这门公开课主要介绍了三种组件间通信方式：
1.props/自定义事件<br/>
2.事件总线(Event Bus)<br/>
3.Vuex<br/>
简单总结下本课程介绍的方法。

### props/自定义事件
在使用.vue单文件组件的过程中，props几乎是必然会使用的一种方式，vue中父子组件的通信首当其冲就是采用props的方式。这种方式的使用也非常简单方便。
假设我们在父组件APP.vue中，引入了子组件HelloWorld.vue
```
// APP.vue

<template>
  <HelloWorld msg="work hard chen" name="jack"/>
</template>
```
我们直接可以通过组件属性的方式，给子组件HelloWorld.vue传递参数msg和name。然后，在HelloWorld.vue组件中通过props接收使用。
```
// HelloWorld.vue

export default {
  name: 'HelloWorld',
  props: {
    msg: String,
    name: String
    }
 }
```
这个过程是父组件向子组件传递数据，那么子组件该怎么向父组件传递数据？这就要用到自定义事件$emit了。<br/>
首先在子组件中触发一个自定义事件。
```
// HelloWorld.vue

<template>
  <p @click="clickName">My name is {{ name }}</p>
</template>

<script>
export default {
  methods: {
    clickName() {
       this.$emit('click-name');  // 触发自定义事件
    }
  }
}
</script>
```
在父组件中监听子组件中派发的自定义事件。
```
// APP.vue

<template>
  <HelloWorld msg="work hard chen" name="jack" @my-click="myClickHandler"/>
</template>

<script>
export default {
  methods: {
    myClickHandler() {
       console.log('get my-click event...');
    }
  }
}
</script>
```

### 事件总线(Event Bus)
事件总线的理念是通过借用某个对象来注册和监听事件，例如Vue构造函数的实例上，就有$emit(注册)和$on(监听)两个方法。因此我们可以借用Vue的根实例来实现
事件总线的组件间传参方式。假设有两个组件Bus.vue和Car.vue，并非父子组件，可能嵌套的层级很深。
```
// Bus.vue

<template>
  <p @click="myClickHandler">Bus</p>
</template>

<script>
export default {
  methods: {
    myClickHandler() {
       // 通过借用根实例this.$root上的$emit方法派发 bus-msg 事件，这样根实例的所有子实例，都可以实现监听
       this.$root.$emit('bus-msg', 'msg from Bus.vue');
    }
  }
}
</script>
```
在Car.vue组件中监听Bus.vue组件中派发的全局事件。
```
// Car.vue

<script>
export default {
  created() {
    this.$root.$on('bus-msg', (value) => {
      console.log(value); // 'msg from Bus.vue'
    })
  }
}
</script>
```
这是通过借用根实例的方式实现事件总线的方式，其实还可以另外新建一个Vue实例来实现。在项目的入口main.js文件中。
```
// main.js

Vue.use({
  install: function(Vue) {
    Vue.prototype.$eventBus = new Vue();  // 新new一个Vue实例，并将其挂载到Vue的原型上
  }
});

// Bus.vue

<script>
export default {
  methods: {
    myClickHandler() {
       this.$eventBus.$emit('bus-msg-02', '$eventBus from Bus.vue');  // 注册一个事件
    }
  }
}
</script>

// Car.vue

<script>
export default {
  created() {
    // 监听 Bus.vue 注册的事件
    this.$eventBus.$on('bus-msg-02', (value) => {
      console.log(value); // '$eventBus from Bus.vue'
    })
  }
}
</script>
```




















