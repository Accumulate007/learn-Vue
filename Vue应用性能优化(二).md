### 一、Vue代码层面优化
1.合理使用v-if和v-show<br/>

2.合理使用computed和watch：computed是计算属性，依赖于其它属性值，是有缓存的。只有当其它属性发生改变的时候，获取computed才会时
才会重新求值。而watch是对于数据的监听，只要数据发生变化，就会执行相应的监听回调。<br/>

3.使用v-for时要为每个子项item设置相应的key。<br/>

4.使用v-for的时候避免同时使用v-if。v-for的优先级要高于v-if，如果每次遍历都需要进行判断，会影响程序性能。<br/>

5.纯粹数据展示不会有任何改变的页面，可以使用Object.freeze()冻结Vue对于数据的劫持。<br/>
```
export default {
	data() {
		return {
			users: {}
		}
	}
	created() {
		let users = Axios.get('/api/users');
		this.users = Object.freeze(users);
	}
}
```

6.使用vue-lazyload实现图片的懒加载<br/>
```
// main.js中引入
import VueLazyLoad from 'vue-lazyload';

Vue.use(VueLazyLoad);

// 在组件中使用
<img v-lazy="/img/a.png" />
```

7.路由懒加载<br/>
```
const foo = () => import('./Foo.vue');

const router = new VueRouter({
	routes: [
		{path: '/foo', component: Foo}
	]
})
```

8.第三方插件的按需引入(以element-ui为例)<br/>
```
// 首先安装babel-plugin-component
npm install babel-plugin-component -D

// 修改.babelrc配置
{
	"presets": [["es2015", { "modules": false }]],
	"plugins": [
		[
			"component",
			{
				"libraryName": "element-ui",,
				"styleLibraryName": "theme-chalk"
			}
		]
	]
}

// main.js中引入需要的组件
import Vue form 'Vue'
import {Button, Select} from 'element-ui'

Vue.use(Button);
Vue.use(Select);
```




