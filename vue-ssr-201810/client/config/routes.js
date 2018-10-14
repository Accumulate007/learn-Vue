import Todo from '../views/todo/todo.vue';
import Login from '../views/login/login.vue';

export default [
    {
        path: '/',
        redirect: '/app'
    },
    {
        path: '/app/:id',
        // props: (route) => ({'id': route.query.id}),
        // 使用命名视图
        components: {
            default: Todo,
            'messi': Login
        },
        name: 'thisIsApp',
        meta: {
            metaMsg: 'this meta from /app'
        },
        // children: [
        //     {
        //         path: 'hangzhou',
        //         component: Login
        //     }
        // ]
    },
    {
        path: '/login',
        // component: Login,
        // 异步加载组件资源(按需加载),提高首屏加载性能
        // 需要安装babel-plugin-syntax-dynamic-import插件支持语法
        component: () => import('../views/login/login.vue'),
        beforeEnter(to, from, next) {
            console.log('before enter login, do this..');
            next();
        }
    }
];