一、script和style模块引入方式的区别
在script中引入模块支持使用自定义路径方式:  ‘@/common/js/server’
在style中引入模块需要使用相对路径方式:	‘../../common/css/style’
这是因为script中模块引入是可以通过webpack配置项resolve中的alias参数进行自定义配置的
而style标签中的内容需要经过style-loader和css-loader进行解析处理，webpack中暂时没有这个配置


二、Vue对于标签合法性的验证
实际项目中出的问题:
<p>this is some words <h3>Title</h3></p>
在p标签中嵌套了h3标签，这是一个不符合w3c标签嵌套规则的写法，所以在编译模板的时候出错，无法编译。
w3c标签嵌套的几大规则为：
a.块级元素与块级元素平级，内联元素与内联元素平级
b.块级元素可以包含内联元素或某些块级元素，内联元素只能包含内联
c.这几个特殊的块级元素只能包含内联元素，不能包含块级元素：h1,h2,h3,h4,h5,h6,p,dt
d.块级元素不能放在p标签里
e.Li标签可以包含div,因为li和div标签都是装载内容的容器


三、组件缓存的方式
在Vue中经常会有些页面需要进行缓存，缓存的页面一般是那些实时交互要求不高的，数据请求不频繁的页面。
Vue中的组件缓存需要借助路由元信息meta字段， meta: {keepAlive: true}
<keep-alive>
  <router-view v-if="$route.meta.keepAlive"></router-view>
</keep-alive>


四、Axios的post传参问题
Axios是Vue官方推荐的ajax库，但是在实际使用中，此库的post方式传参出现了一点问题，按照官方文档的方式进行post传参会报504的状态码错误，这是参数传递的
问题。这里，post传参需要借助Node的querystring模块进行转化。
列如
let querystring = require('querystring');
Axios.post(url, querystring.stringify({
  a: '123',
  b: 'bbb'
}));
实际上经过转化后对象形式的params转化成了: a=123&b=bbb


五、proxyTable的跨域代理
在实际开发中往往会涉及到跨域问题,Vue-cli提供了跨域代理的支持。
在由Vue-cli生成的项目目录 config -> index.js文件中,有一项 dev 配置项，其下有一个proxyTable的配置参数，具体的配置方式如：
'/api': {
    target: 'http://192.168.51.34:8080',
    changeOrigin: true,
    pathRewrite: {
        '^/api': ''
    }
}
然后在项目中使用时就可以用 '/api' 这个字段代替 'http://192.168.51.34:8080',而且可以实现跨域成功。
原理就是，Vue使用了http-proxy-middleware这个插件实现了跨域的代理。


六、默认图片的使用方式
默认图片往往在个人中心用户头像的这个场景下必用的，在图片加载失败的时候可以提供一个替代，提高用户体验。
在Vue中使用默认图片，在script标签中，通过
const defaultImg = require('../img/header.png')
的方式引入默认图片，然后就可以在组件中通过 defaultImg 这个常量使用默认图片了。


七、数组项变更的不可监测性
Vue中的数据都是动态响应的，这得益于它使用的Object.defineProperty这个方法,把所有data选项上定义的数据都转换成getter和setter，这样就能实现变化数据的
实时响应。但是，这有一个例外，就是限制于JavaScript的能力，Vue无法对data中数组项的变化进行实时响应。例如
data: {
 a: 123,
 arr: [1,2,3]
 }
vm.a 的变化是可以实时响应的,但 vm.arr[0]的变化是无法实时响应的。


八、多级嵌套渲染的数据传递问题。
在多级嵌套渲染的需求里,最外层的 v-for="itemWrap in data", itemWrap项可以在内层被引用,所以内层的item需要设置自己的名字,避免命名上的重复进而引发
问题。


九、子组件和父组件向同一个方法传递参数的问题。
具体问题如下：
子组件绑定了一个事件insideHandle,在父组件中监听这个事件: @insideHandle="listen";
此时listen的参数是由insideHandle传递过来的,但是在父组件中又需要向listen传递一个参数,这个时候就造成了参数传递的冲突,父组件中传递的参数会覆盖掉从子
组件中派发出来的参数。
解决办法就是,这个时候就需要通过Vuex缓存insideHandle中派发的参数,然后在listen中再去获取。


十、缓存组件的钩子问题。







