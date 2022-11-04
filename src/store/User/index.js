import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from "@/api";
import { setToken, getToken, removeToken } from '@/utils/token'

const state = {
    code: '',
    user_token: getToken(),
    userInfo: {},
}
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    USERLOGIN(state, token) {
        state.user_token = token
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    CLEAR(state) {
        state.userInfo = {},
            state.user_token = '',
            removeToken() //清空用户相关信息
    }
}
const actions = {
        //获取验证码
        async getCode({ commit }, phone) {
            //这里是把验证码返回了但是是以result的形式，不是发送到手机
            let result = await reqGetCode(phone)
            if (result.code == 200) {
                commit('GETCODE', result.data)

                return 'ok'
            } else {
                return Promise.reject(new Error('fail'))
            }
        },
        async userRegister({ commit }, user) {
            let result = await reqUserRegister(user)
            if (result.code == 200) {
                console.log('ok')
                return '注册成功'
            } else {
                return Promise.reject(new Error('fail'))

            }
        },
        async userLogin({ commit }, user) {
            let result = await reqUserLogin(user) //这个result会返回一个token，每个人都是唯一的
            if (result.code == 200) {
                commit('USERLOGIN', result.data.token)
                    //持久化存储token
                    // localStorage.setItem('TOKEN', result.data.token);
                setToken(result.data.token)
                return 'ok'
            } else {
                return Promise.reject(new Error('fail'))
            }
        },
        async getUserInfo({ commit }) {
            let result = await reqUserInfo()
            if (result.code == 200) {
                commit('GETUSERINFO', result.data)
                return 'ok'
            } else {
                return Promise.reject(new Error('fail'))
            }
        },
        async userLogout({ commit }) {
            let result = await reqLogout()
            if (result.code == 200) {
                commit('CLEAR')
                return 'ok'
            } else {
                return Promise.reject(new Error('fail'))
            }
        }
    }
    //简化仓库数据，将来组件获取数据方便一点
const getters = {

}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}