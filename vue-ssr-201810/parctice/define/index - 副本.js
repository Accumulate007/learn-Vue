// define/index.js
import Vue from 'vue';


const compoent = {
    props: {
        active: {
            default: true,
            type: Boolean
        },
        name: {
            default: 'jack',
            type: String,
            require: true
        },
        smallName: String
    },
    template: '<div>{{text}}, this is active: {{active}},name: {{name}}, smallName:{{smallName}}</div>',
    data () {
        return {
            text: 'This is component bar'
        }
    }
}

// 全局定义组件
// Vue.component('CompOne', compoent);


const app = new Vue({
    components: {
        CompOne: compoent
    },
    data: {
        prop1: ''
    },
    el: '#root',
    template: `
        <div>
            <comp-one small-name="litter" :active="false"></comp-one>
            <p>aaa</p>
            <comp-one small-name="huge"></comp-one>
        </div>
    `
})

