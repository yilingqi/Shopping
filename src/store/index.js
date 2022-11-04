import Vue from 'vue'
import Vuex from 'vuex'

//需要先use
Vue.use(Vuex);

// //state:仓库存储数据的地方
// const state = {}
//     //mutations：修改state的唯一手段
// const mutations = {}
//     //actions：处理actions的地方，可以书写自己的业务逻辑，也可以异步
// const actions = {}
//     //getters：理解为计算属性，获取仓库数据更加方便
// const getters = {}
//     //
//引入小仓库
import Home from './Home'
import Search from './Search'
import Detail from './Detail'
import ShopCar from './ShopCar'
import User from './User'
import Trade from './Trade'
export default new Vuex.Store({

    modules: {
        Home,
        Search,
        Detail,
        ShopCar,
        User,
        Trade
    }
})