// computed/index.js
import Vue from 'vue';


const app = new Vue({
    el: '#root',
    template: `
        <div>
            <p>{{ msg }}</p>
            <p>{{ name }}</p>
            <p>{{ num }}</p>
            <p>{{ returnName }}</p>
            <p>{{ city }}</p>
        </div>
        `,
    data: {
        msg: 'computed && watch',
        name: 'jack',
        num: 55,
        city: 'hangzhou'
    },
    mounted() {
        setTimeout(() => {
            this.num += 78;
            this.city = '未来科技城';
        }, 5000);
    },
    computed: {
        returnName() {
            return 'Name is ' + this.name + ', age is: ' + this.num;
        }
    },
    watch: {
        // watch的两种写法
        num (newV, oldV) {
            let str = `the newV is ${newV}, the oldV is ${oldV}`;
            console.log(str);
        },
        city: {
            handler (n, o) {
                let str = `the city is ${o}, 3s later, it change to ${n}`;
                console.log(str);
            },
            immediate: true
        }
    }
})


/**
 * computed和watch
 */

