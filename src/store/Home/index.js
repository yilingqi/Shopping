import { reqCategoryList, reqGetBannerList, reqGetFloor } from "@/api";

const state = {
    categoryList: [], //state初始值不要瞎写，服务器返回什么，就设置什么类型
    bannerList: [], //轮播图
    floorList: []
}
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList;
    },
    BANNERLIST(state, bannerList) {
        state.bannerList = bannerList;
    },
    FLOORLIST(state, floorList) {
        state.floorList = floorList;
    },
}
const actions = {
    //通过API里面的接口函数调用 ，向服务器发请求，获取服务器的数据
    async categoryList({ commit }) { //解构
        let result = await reqCategoryList(); //得到的是promise对象
        if (result.code == 200) {
            commit('CATEGORYLIST', result.data);
        }
    },
    //获取首页轮播图的数据
    async getBannerList({ commit }) {
        let result = await reqGetBannerList();
        if (result.code == 200) {
            commit('BANNERLIST', result.data);
        }
    },
    async getFloorList({ commit }) {
        let result = await reqGetFloor();
        if (result.code == 200) {
            commit('FLOORLIST', result.data);
        }
    }
}
const getters = {}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}