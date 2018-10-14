// data-binding/index.js
import Vue from 'vue';


const app = new Vue({
    el: '#root',
    // template会替换el的节点
    template: `
        <div :style="styles">
            {{ msg }}
        </div>
        `,
    data: {
        msg: 'mustache语法中只能访问data中的数据，以及JavaScript内置的全局变量，比如Date等',
        styles: {
            color: 'pink',
            fontSize: '20px',
            appearance: 'none'
        }
    }
})


/**
 * Vue数据绑定
 */

