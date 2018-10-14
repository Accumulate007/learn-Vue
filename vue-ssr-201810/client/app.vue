<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>
    <p>This is count: {{count}}</p>
    <h4>this is getters, {{fullName}}</h4>
    <h3>this is:{{textA}}, a getters: {{textPlus}}</h3>
    <!--<todo></todo>-->
    <!--<router-link :to="{name: 'thisIsApp'}">to app</router-link>-->
    <router-link to="/app/123">to app</router-link>
    <router-link to="/login">to login</router-link>
    <transition name="fade">
      <router-view></router-view>
    </transition>
    <Footer></Footer>
    <router-view name="messi"></router-view>
  </div>
</template>

<script>
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
import Todo from './views/todo/todo.vue'
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

export default {
  metaInfo: {
    title: 'app.vue......Messi play football'
  },
  components: {
    Header,
    Footer,
    Todo
  },
  mounted() {
    // 路由信息对象
    console.log('this.$route: ', this.$route);

    // setTimeout(() => {
    //   this.$store.commit('updateCount', 2018);
    // }, 2000);

    // 使用actions
    // this.$store.dispatch('updateCountAsync', {
    //   num: 2018,
    //   time: 3000
    // });

    this.updateCountAsync({
      num: 2019,
      time: 2000
    })

    this['a/updateText']('new a text..')
  },
  computed: {
    // count() {
    //   return this.$store.state.count;
    // },
    // fullName() {
    //   return this.$store.getters.fullName;
    // }
    ...mapState(['count']),
    ...mapGetters({
      'fullName': 'fullName',
      'textPlus': 'a/textPlus'
    }),
    // store中modules的使用
    textA() {
      return this.$store.state.a.text;
    }
  },
  methods: {
    ...mapActions(['updateCountAsync']),
    ...mapMutations(['updateCount', 'a/updateText'])
  }
}
</script>

<style lang="stylus" scoped>
#app{
  position absolute
  left 0
  right 0
  top 0
  bottom 0
}
#cover{
  position absolute
  left 0
  top 0
  right 0
  bottom 0
  background-color #999
  opacity .9
  z-index -1
}
</style>


