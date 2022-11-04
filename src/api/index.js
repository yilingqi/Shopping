//当前的模块，所有的api接口，进行统一管理
import requests from './request.js'
import mockRequests from './mockAjax.js'

//三级联动接口
///api/product/getBaseCategoryList   get请求，不需要携带参数
export const reqCategoryList = () => {
    //发请求axios发请求返回值是promise对象
    return requests({ url: '/product/getBaseCategoryList', method: 'get' });
}

//获取banner 等轮播图的接口
export const reqGetBannerList = () => mockRequests.get('/banner');
export const reqGetFloor = () => mockRequests.get('/floor');


//获取搜索模块数据 地址：/api/list post 带参数
//当前的接口给服务器传参，这个参数，至少是一个空对象，不然请求会失败
export const reqGetSearchInfo = (params) => {
    return requests({ url: '/list', method: 'post', data: params })
}


///api/item/{ skuId }  get

export const reqGoodsInfo = (skuId) => {
    return requests({ url: `/item/${ skuId }`, method: 'get' })
}

//购物车,或者更新某一个产品的个数
///api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrUpdateShopCart = (skuId, skuNum) => {
    return requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })
}

//购物车页面
export const reqCartList = () => {
        return requests({ url: '/cart/cartList', method: 'get' })
    }
    //删除购物车商品
export const reqDeleteCartById = (skuId) => {
        return requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })
    }
    //修改商品选中状态
export const reqUpdateCheckedById = (skuID, isChecked) => {
    return requests({ url: `/cart/checkCart/${skuID}/${isChecked}`, method: 'get' })
}

//获取验证码/api/user/passport/sendCode/phone
export const reqGetCode = (phone) => {
        return requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' })
    }
    //注册用户/api/user/passport/register//路径中没有提示带参，但是一定要传参
export const reqUserRegister = (data) => {
    return requests({ url: '/user/passport/register/', data: data, method: 'post' })
}

//登录接口/api/user/passport/login
export const reqUserLogin = (data) => {
        return requests({ url: '/user/passport/login', data, method: 'post' }) //这里的data是kv一致简写的
    }
    //获取用户信息，需要带着用户的token向服务器要用户信息
export const reqUserInfo = () => requests({ url: '/user/passport/auth/getUserInfo', method: 'get' })

export const reqLogout = () => requests({ url: '/user/passport/logout', method: 'get' })

//获取个人地址信息

export const reqAddressInfo = () => requests({ url: '/user/userAddress/auth/findUserAddressList', method: 'get' })

//获取订单交易页面信息

export const reqOrderInfo = () => requests({ url: '/order/auth/trade', method: 'get' })
    //提交订单信息
    //传的是query参数/api/order/auth/submitOrder?tradeNo={tradeNo} method=post 交易编号放路径中，其余信息另外传
export const reqSubmitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'post' })
    //获取订单支付页面信息
export const reqPayInfo = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' })

//查询订单支付状态
export const reqPayStatus = (orderId) => requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' })

//获取我的订单
export const reqMyOrderList = (page, limit) => requests({ url: `/order/auth/${page}/${limit}`, method: 'get' })