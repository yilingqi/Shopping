//对axios进行二次封装
import axios from 'axios';
import nprogress from 'nprogress'; //引入进度条
import 'nprogress/nprogress.css'
//nprogress的start 和 done方法表示了进度条的开始和结束

//利用axios对象的方法create，去创建一个axios实例
//request就是axios，但是我们可以配置一下
const mockRequests = axios.create({
    //里面可以放配置对象
    baseURL: '/mock', //就是在基本路径的基础上（http：//xxx.xxx.xxx：8080）的后面自动加上/api，发请求的时候，路径中会出现api
    timeout: 5000, //代表请求超时5s后表示请求失败
});

//请求拦截器：在发请求的时候，请求拦截器可以检测到，在请求发出去之前，可以做一些事情
mockRequests.interceptors.request.use((config) => {
    //config是一个配置对象，里面有一个headers请求头属性
    nprogress.start();
    return config;
});

//响应拦截器
mockRequests.interceptors.response.use((res) => {
        //成功的回调函数：服务器响应数据回来，响应拦截器可以检测到，可以做一些事情
        nprogress.done();
        return res.data
    }, (error) => {
        //服务器响应失败
        return Promise.reject(new error('failure'));

    })
    //在里面可以传入成功的回调，或者失败的回调

//暴露
export default mockRequests;