import { reqGoodsInfo, reqAddOrUpdateShopCart } from "@/api";
import { getUUID } from '@/utils/uuid_token';
//封装游客模块
const state = {
    goodInfo: {}, //看文档
    uuid_token: getUUID()
}
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo
    },
}
const actions = {
    //获取信息的action
    async getGoodInfo({ commit }, skuId) {
        let result = await reqGoodsInfo(skuId)
        if (result.code == 200) {
            commit('GETGOODINFO', result.data)
        }
    },
    //将产品添加到购物车中
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) { //这里要加大括号
        let result = await reqAddOrUpdateShopCart(skuId, skuNum)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('failure'))
        } //这里不需要返回数组，所以不用写仓库了，但是成功与失败的结果在仓库这里
    }

}
const getters = {
    categoryView(state) {
        return state.goodInfo.categoryView || {}; //因为初始状态下是一个空对象，空对象的categoryName是一个undefined
        //如果服务器数据回来了，那么就不会报错了，也会进行替换，所以他至少要是一个空对象
    },
    skuInfo(state) {
        return state.goodInfo.skuInfo || {};
    },
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || [];
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}