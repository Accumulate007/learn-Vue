// instance/index.js
import Vue from 'vue';


const app = new Vue({
    // el: '#root',
    // template会替换el的节点
    template: '<div ref="huge">{{msg}}</div>',
    data: {
        msg: 'abc',
        obj: {}
    },
    watch: {
        msg (newV, oldV) {
            console.log('newV is: ' + newV + ', oldV is: ' + oldV);
        }
    }
})

app.$mount('#root');

app.msg = 'abcXYZ';

/**
 * Vue实例上的属性
 */

/*
console.log(app.$data);
console.log(app.$props);
console.log(app.$el);
console.log(app.$options);
*/

// render方法会覆盖template
// app.$options.render = (h) => {
//     return h('div', {}, 'new render function');
// }

/*
console.log(app.$root === app); // true
console.log(app.$children);
console.log(app.$slots);
console.log(app.$scopedSlots);
console.log(app.$refs);
console.log(app.$isServer)
*/

/**
 * Vue实例上的方法
 */

/*
// 作用等同于options选项中的watch
const unWatch = app.$watch('msg', (newMsg, oldMsg) => {
    console.log('newMsg is: ' + newMsg + ', oldMsg is: ' + oldMsg);
})
app.msg = 'abc->new';
// 注销监听
// unWatch();
*/

/*
// 事件监听和触发
app.$on('testEvent', (a, b) => {
    let msg = `${a},<---a,b--->${b}`;
    console.log('this words from testEVent......')
})
app.$emit('testEvent', 'abc', '789');

// 只触发一次
app.$once('testEvent', (a, b) => {
    let msg = `${a},<---a,b--->${b}`;
    console.log('this words from testEVent......')
})
*/

// 强制组件重新渲染(一般不使用)
// app.$forceUpdate();

// 添加可相应的属性
// app.$set(app.obj, 'name', 'jack');

// DOM节点渲染完毕之后调用该方法
app.$nextTick(() => {
    console.log('看到这句话的时候，DOM已经更新完毕了！');
})