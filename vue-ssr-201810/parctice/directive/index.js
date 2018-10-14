// directive/index.js
import Vue from 'vue';


const app = new Vue({
    el: '#root',
    template: `
        <div>
            <p>{{ msg }}</p>
        </div>
        `,
    data: {
        msg: 'directive1008'
    }
})


/**
 * directive(vue原生指令)
 * v-text
 * v-html
 * v-show(display)
 * v-if(会对DOM进行删减), v-else, v-else-if
 * v-for
 * v-on
 * v-bind
 * v-model(用于原生输入控件)
 * v-pre(不解析标签内的任何元素)
 * v-once(数据绑定的内容只执行一次)
 */





