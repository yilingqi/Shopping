//配置路由的地方

import Vue from 'vue';
import VueRouter, { RouterLink } from 'vue-router';
import routes from './routes.js'
import store from '@/store'
//使用插件

Vue.use(VueRouter)
    //引入路由组件



//重写push和replace解决多次传同样参数跳转报错问题
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
VueRouter.prototype.push = function(location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => {}, () => {});
    }
}
VueRouter.prototype.replace = function(location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(this, location, () => {}, () => {});
    }
}

//配置路由，并暴露
let router = new VueRouter({
        routes, //kv一致，所以不用复写
        scrollBehavior() {
            return { y: 0 };
        } //滚动行为,让滚动条在路由跳转的时候重新回到最上方

    })
    //可以使用全局守卫，在路由跳转之前检测是否能跳转
router.beforeEach(async(to, form, next) => {
    //to:跳转到哪一个路由
    //from:可以获取到从哪一个路由来的
    //next：放行，是一个函数
    //next('/login')放行到指定路由
    let token = store.state.User.user_token
    let name = store.state.User.userInfo.name
    if (token) {
        //用户已经登录
        if (to.path == '/login') {
            next('/home')
        } else {
            //已经登陆了，去的 不是login，如果有用户名
            if (name) {
                next()
            } else {
                //则要派发action，让它有用户信息（就是token过期了之类的）
                //之前是在home那边派发action，跳转到其他页面的时候，一刷新，用户信息就会丢失
                try {
                    //获取用户信息成功
                    await store.dispatch('User/getUserInfo')
                    next()
                } catch (error) {
                    //token失效了，已经没有用户信息了，所以要清除token，退出登录，重新登陆
                    await store.dispatch('User/userLogout')
                    next('/login')
                }
            }

        }
    } else {
        //未登录,后期不能去交易相关，个人中心相关，pay paysuccess  center
        //去了跳转到登陆页面
        let toPath = to.path;
        if (toPath == '/trade' || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
            next('/login?redirect=' + toPath) //跳到没登录的时候想跳的路劲
        } else {
            next()
        }

    }
})
export default router;