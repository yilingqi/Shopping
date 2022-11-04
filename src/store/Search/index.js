import { reqGetSearchInfo } from "@/api";

const state = {
    searchList: {} //根据派发action的结果来看，返回的是一个对象，所以初始设置为{}
}
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList
    }
}
const actions = {
        //要获取search模块数据
        async getSearchList({ commit }, params = {}) { //commit是上下文,第二个参数是传过来的值,默认是一个空对象，你没传就是一个空对象，传了就是你传的
            let result = await reqGetSearchInfo(params) //调用这个函数至少要传一个空对象即parmas至少是一个空对象，不然会失败
            if (result.code == 200) {
                commit('GETSEARCHLIST', result.data)
            }
        }
    }
    //简化仓库数据，将来组件获取数据方便一点
const getters = {
    goodsList(state) { //参数就是当前search的仓库state
        return state.searchList.goodsList || [] //假如没有网，请求没有发出去，会变成undefined，会报错,所以至少要返回一个空数组
    },
    trademarkList(state) {
        return state.searchList.trademarkList || [] //返回空数组是为了不报错
    },
    attrsList(state) {
        return state.searchList.attrsList || []
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}