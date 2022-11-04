import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from "@/api";

const state = {
    cartList: []
}
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    }
}
const actions = {
    async getCartList({ commit }) {
        let result = await reqCartList()
        if (result.code == 200) {
            commit('GETCARTLIST', result.data)
        }
    },
    //删除购物车某一个商品
    async deleteCartListById({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId)
            //因为这个请求是没有返回值的，但是组件里边需要知道是否返回成功，所以不用commit，直接return ok
        if (result.code == 200) {
            return 'ok'
        }

    },
    //修改购物车商品的状态
    async updateCheckedById({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateCheckedById(skuId, isChecked)
        if (result.code == 200) {

            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        } //不需要返回值
    },
    //删除全部勾选产品
    deleteAllCheckedCart({ dispatch, getters }) { //context是上下文（小仓库）,里面有仓库和actions getters之类的对象
        //可以commit提交mutations修改state，getters属性，dispatch派发action，state
        //删除东西其实还是调用的之前的删除的东西的函数
        let PromiseAll = []; //这里定义一个数组用来存储promise的返回值
        getters.cartList.cartInfoList.forEach((item) => {
            let promise = item.isChecked == 1 ? dispatch('deleteCartListById', item.skuId) : ''
            PromiseAll.push(promise)
        });
        return Promise.all(PromiseAll) //用Promise.all来遍历看看食不是所有promise的返回值都是成功的，如果有一个不是成功的，那就返回false
    },
    //修改全部产品的状态，调用的 async updateCheckedById({ commit }, { skuId, isChecked }) {
    updateAllCartChecked({ dispatch, state }, isChecked) {
        let PromiseAll = []
        state.cartList[0].cartInfoList.forEach((item) => {
            let promise = dispatch('updateCheckedById', { skuId: item.skuId, isChecked: isChecked })
            PromiseAll.push(promise)
        })
        return Promise.all(PromiseAll)
    }
}
const getters = {
    cartList(state) {
        return state.cartList[0] || []
    },

}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}