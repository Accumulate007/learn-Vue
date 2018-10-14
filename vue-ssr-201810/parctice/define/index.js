// define/index.js
import Vue from 'vue';


const compoent = {
    props: {
        name: {
            default: 'jack',
            type: String,
            require: true
        }
    },
    template: '<div>{{text}}, name: {{name}}</div>',
    data () {
        return {
            text: 'This is component'
        }
    },
    mounted () {
        console.log('component mouted...'); // 先调用

        //
        console.log('this.$parent:', this.$parent);
    }
}

// 组件的继承
const component2 = {
    extends: compoent,
    data() {
        return {
            text: 'text from component2, 222...'
        }
    }
}


const CompVue = Vue.extend(compoent);

new CompVue({
    el: '#root',
    propsData: {
        name: 'hangzhou'
    },
    data: {
        text: '覆盖内部的text'
    },
    mounted () {
        console.log('CompVue mouted///'); // 后调用
    }
})
