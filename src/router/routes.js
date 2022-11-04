//路由配置信息
import Home from '@/pages/Home/MyHome.vue'
import Login from '@/pages/Login/MyLogin.vue'
import Register from '@/pages/Register/MyRegister.vue'
import Search from '@/pages/Search/MySearch.vue'
import Detail from '@/pages/Detail/MyDetail.vue'
import AddCartSuccess from '@/pages/AddCartSuccess/AddCartSuccess.vue'
import ShopCar from '@/pages/ShopCar/ShopCar.vue'
import Trade from '@/pages/Trade/MyTrade.vue'
import Pay from '@/pages/Pay/MyPay.vue'
import PaySuccess from '@/pages/PaySuccess/PaySuccess.vue'
import Center from '@/pages/Center/MyCenter.vue'
import MyOrder from '@/pages/Center/MyOrder/MyOrder.vue'
import GroupOrder from '@/pages/Center/GroupOrder/GroupOrder.vue'
//把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更高效了
//const foo=()=>{
//return import('@/pages/Home/MyHome.vue')  
//}

//{
//  path: '/home',
//  component: foo,
//  meta: {
//     footerShow: true
//  }
export default [{
        path: '/home',
        component: Home,
        meta: {
            footerShow: true
        }
    },
    {
        path: '/login',
        component: Login,
        meta: {
            footerShow: false
        }
    }, {
        path: '/register',
        component: Register,
        meta: {
            footerShow: false
        }
    }, {
        //parmas方法传参的话要进行占位 path:'/search/:keyword'
        path: '/search/:keyword?',
        component: Search,
        meta: {
            footerShow: true
        },
        name: 'search' //用对象方法传参需要配置一个名字
    },
    //重定向
    {
        path: '*',
        redirect: '/home'
    },
    {
        path: '/detail/:skuid?',
        component: Detail,
        meta: {
            footerShow: true
        }
    },
    {
        path: '/addcartsuccess',
        name: 'addcartsuccess',
        component: AddCartSuccess,
        meta: {
            footerShow: true
        }
    },
    {
        path: '/shopcar',
        name: 'shopcar',
        component: ShopCar,
        meta: {
            footerShow: true
        }
    },
    {
        path: '/trade',
        name: 'trade',
        component: Trade,
        meta: {
            footerShow: true
        },
        beforeEnter: (to, from, next) => {
            if (from.path == '/shopcar') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: '/pay',
        name: 'pay',
        component: Pay,
        meta: {
            footerShow: true
        },
        beforeEnter: (to, from, next) => {
            if (from.path == '/trade') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: '/paysuccess',
        name: 'paysuccess',
        component: PaySuccess,
        meta: {
            footerShow: true
        },
    },
    {
        path: '/center',
        name: 'center',
        component: Center,
        meta: {
            footerShow: true
        },
        //子路由
        children: [
            //一级路由有/，二级不用带
            {
                path: 'myorder',
                component: MyOrder
            },
            {
                path: 'grouporder',
                conponent: GroupOrder
            },
            {
                path: '/center',
                redirect: '/center/myorder' //路由重定向
            }
        ]
    },
]