import Vue from 'vue'
import App from './App.vue'
//三级联动组件--全局组件
import TypeNav from '@/components/TypeNav/TypeNav.vue';
Vue.component('TypeNav', TypeNav) //第一个参数全局组件的名字，第二个参数哪一个组件
import MyCarousel from '@/components/Carousel/MyCarousel.vue';
Vue.component('MyCarousel', MyCarousel)
import MyPagination from '@/components/Pagination/MyPagination.vue'
Vue.component('MyPagination', MyPagination)
import { MessageBox } from 'element-ui'
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert; //按需引入elementui挂在原型上
import bbb from '@/assets/images/bbb.gif'
//引入懒加载
import VueLazyload from 'vue-lazyload';
Vue.use(VueLazyload, {
    loading: bbb
})

//引入路由
import router from '@/router'
Vue.config.productionTip = false

//引入vuex
import store from '@/store'
import '@/mock/mockServe' //swiper轮播图
import 'swiper/css/swiper.css';
import * as API from '@/api' //此时API是一个对象，对象中包含了api中的所有函数，统一引入
new Vue({
    render: h => h(App),
    beforeCreate() {
        Vue.prototype.$bus = this;
        Vue.prototype.$API = API //并且挂载到原型对象上
    },
    //注册路由
    router,
    //注册vuex,组件实例的身上，会多一个$store的属性
    store
}).$mount('#app')