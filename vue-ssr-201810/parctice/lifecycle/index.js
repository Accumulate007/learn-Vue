// liftcycle/index.js
import Vue from 'vue';


const app = new Vue({
    el: '#root',
    // template会替换el的节点
    template: '<div>{{msg}}</div>',
    data: {
        msg: 'lifecycle'
    },
    beforeCreate() {
        // 即便生成的DOM不插入挂载点，也必然会执行beforeCreate和created
        // 这两个生命周期钩子中，无法进行DOM操作
        console.log('beforeCreate', this);

        console.log(this.$el);      // undefined
    },
    created() {
        console.log('created', this);

        console.log(this.$el);      // undefined
    },
    beforeMount() {
        // 把生成的DOM插入挂载点的过程，就是beforeMount和mounted
        console.log('beforeMount', this);
    },
    mounted() {
        // DOM相关的操作一般放在mounted中，数据相关的操作可以放在created中
        console.log('mounted', this);
    },
    beforeUpdate() {
        // 当data里面的数据发生改变的时候，会相应执行beforeUpdate和updated
        console.log('beforeUpdate', this);
    },
    updated() {
        console.log('updated', this);
    },
    activated() {
        // 当keep-alive的组件被激活的时候，依次执行activated和deactivated
        console.log('activated', this);
    },
    deactivated() {
        console.log('deactivated', this);
    },
    beforeDestroy() {
        // 当组件被销毁的时候，会依次执行beforeDestroy和destroyed
        console.log('beforeDestroy', this);
    },
    destroyed() {
        console.log('destroyed', this);
    },
    render(h) {
        // throw new TypeError('renderError can catch me');
        console.log('render function invoked, between beforeMount && mounted...');
        return h('div', {}, 'render function');
    },
    renderError(h, error) {
        // 只会捕获当前组件的render错误，不会收集子组件的render错误
        return h('div', {}, error.stack);
    },
    errorCaptured(h, error) {
        // 可用于收集线上错误
        // 可捕获子组件的错误，因此可用于根组件上
        return h('div', {}, error.stack);
    }
})


/**
 * Vue组件生命周期
 */


// setInterval(() => {
//     app.msg += 't';
// }, 2000)


// 销毁组件
// setTimeout(() => {
//     app.$destroy();
// }, 1000);
