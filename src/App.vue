<template>
  <div>
    <Header></Header>
      <!--路由组件出口-->
      <router-view></router-view>
    <Footer v-show="$route.meta.footerShow"></Footer>
  </div>
</template>

<script>
import Header from './components/Header/MyHeader.vue'
import Footer from './components/Footer/MyFooter.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted(){
     //通知vuex发请求，将数据存储在仓库中
     this.$store.dispatch('Home/categoryList');//派发一个action||获取商品分类的三级列表的数据
  }
}
</script>

<style scoped>

</style>
