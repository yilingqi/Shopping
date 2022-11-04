const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
    //代理跨域
    devServer: {
        proxy: {
            '/api': { //在路径带有/api时，代理服务器会工作，服务器与服务器是没有跨域问题的，但是浏览器和服务器有
                target: 'http://gmall-h5-api.atguigu.cn', //要获取数据的服务器的地址
                //pathRewrite:{'^/api':''}    不需要了，因为所有地址都带api了
            },
        },
    },
})