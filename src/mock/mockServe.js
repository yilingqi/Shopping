import Mock from 'mockjs'
import banner from './banner.json'
import floor from './floor.json'
//json数据格式引进来的时候  json没有对外暴露，但是可以引入
//webpack默认对外暴露图片 json

Mock.mock("/mock/banner", { code: 200, data: banner }) //第一个参数，是你请求的地址，第二个参数，请求数据
Mock.mock("/mock/floor", { code: 200, data: floor })