import Vue from 'vue'
import App from './app.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import './assets/styles/global.styl'
import createRouter from './config/router'
import createStore from './store/store.js'

Vue.use(VueRouter);
Vue.use(Vuex);

const router = createRouter();
const store = createStore();


// 订阅mutation的变化
store.subscribe((mutation, state) => {
  console.log(mutation.type + ' is working...', mutation.payload);
})

// 订阅action的变化
store.subscribeAction((action, state) => {
  console.log(action.type + ' is working...', action.payload);
})



// 路由导航守卫(全局)
router.beforeEach((to, from, next) => {
  console.log('.......beforeEach..111');
  next();
})

router.beforeResolve((to, from, next) => {
  console.log('.......beforeResolve..222');
  next();
})

router.afterEach((to, from, next) => {
  console.log('.......afterEach..333');
})

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#root')
