<template>
    <!-- 商品分类导航 -->
    <div class="type-nav">
            <div class="container">
              <div @mouseleave="leaveShow" @mouseenter="enterShow"><!--事件的委派-->
                <h2 class="all">全部商品分类</h2>
                <transition name="sort">
                  <div class="sort" v-show="show">
                    <div class="all-sort-list2"  @click="goSearch">
                        <div class="item" v-for="(c1,index) in categoryList" :key="c1.categoryId" :class="{cur:currentIndex==index}">
                            <h3 @mouseenter="changeIndex(index)">
                                <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
                            </h3>
                            <div class="item-list clearfix" :style="{display:currentIndex==index?'block':'none'}">
                                <div class="subitem" v-for="(c2) in c1.categoryChild" :key="c2.categoryId">
                                    <dl class="fore">
                                        <dt>
                                            <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                                        </dt>
                                        <dd>
                                            <em v-for="(c3) in c2.categoryChild" :key="c3.categoryId">
                                                <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                                            </em>   
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </transition>
              </div>
                <nav class="nav">
                    <a href="###">服装城</a>
                    <a href="###">美妆馆</a>
                    <a href="###">尚品汇超市</a>
                    <a href="###">全球购</a>
                    <a href="###">闪购</a>
                    <a href="###">团购</a>
                    <a href="###">有趣</a>
                    <a href="###">秒杀</a>
                </nav>
              
            </div>
        </div>
  </template>
  
  <script>
  import {mapState} from 'vuex'
  //import _ from 'lodash'//是把lodash里面全部的函数都引入了，最好按需引入
  import {throttle} from 'lodash'
  export default {
    name: 'TypeNav',
    data(){
      return{
         currentIndex:-1,
         show:true
      }
     
    },
    //组件挂载完毕，可以向服务器发请求
    mounted(){
       //如果路径不是home
       if(this.$route.path!='/home'){
         this.show=false
          }
    },
    computed:{
        ...mapState({
            //右侧需要的是一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
            //注入一个参数state，其实即为大仓库中的数据
            categoryList:(state)=>{
                    return state.Home.categoryList;
            }//返回的是一个对象
        })
    },
    methods:{
      //throttle函数尽量别用箭头函数，可能会出现上下文this问题
      changeIndex:throttle(function(index){//因为是按需引入，所以_.就不需要了，但如果是全部引入，就要写 changeIndex:_.throttle(function(index){
        this.currentIndex=index
      },50),//节流操作，这种写法是es5的写法，采用kv形式
      leaveIndex(){
        this.currentIndex=-1
      },
      goSearch(event){
      //  用event对象可以获取到当前触发事件的节点（可能是div h3 a，但我们只需要a）
      //节点有一个dataset属性，可以获取节点的自定义属性与属性值
      //element.dataset返回的是一个对象
          let element =event.target;//获取当前节点（<dl></dl>等）
          //解构
          let {categoryname,category1id,category2id,category3id}=element.dataset;//我们写的是驼峰且是data-categoryName，但是浏览器里面是小写没有data-
          if(categoryname){
                //还要区分开是一级分类，还是二级分类，还是三级分类的a标签
                //同样通过自定义标签解决，一级共用一个自定义属性
                 //整理参数
                 let location={name:'search'}
                 let query ={categoryName:categoryname}
                 //因为不知道id是哪一级id，所以在下面进行判断之后动态添加
                if(category1id){//一定要注意id的大小写！！！
                      query.category1Id=category1id
                }else if(category2id){
                  query.category2Id=category2id
                }else{
                  query.category3Id=category3id
                }
                //整理完参数，要把location对象和query对象整理到一起，所以给location对象手动添加一个query参数

                //如果有params参数，要一起带过去
                if(this.$route.params){
                   location.params=this.$route.params
                }
                location.query=query
                this.$router.push(location)
          }
      },
      enterShow(){//当鼠标进入的时候，让商品列表显示
        this.show=true;
      },
      leaveShow(){//当鼠标离开的时候，让商品列表隐藏
        //在非home组件内
        if(this.$route.path!='/home'){
          this.show=false
        }
        this.currentIndex=-1;
      }
    }
  }
  </script>
  
  <style  lang="less" scoped>
  .type-nav {
    border-bottom: 2px solid #e1251b;
  
    .container {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      position: relative;
  
      .all {
        width: 210px;
        height: 45px;
        background-color: #e1251b;
        line-height: 45px;
        text-align: center;
        color: #fff;
        font-size: 14px;
        font-weight: bold;
      }
  
      .nav {
        a {
          height: 45px;
          margin: 0 22px;
          line-height: 45px;
          font-size: 16px;
          color: #333;
        }
      }
  
      .sort {
        position: absolute;
        left: 0;
        top: 45px;
        width: 210px;
        height: 461px;
        position: absolute;
        background: #fafafa;
        z-index: 999;
  
        .all-sort-list2 {
          .item {
            h3 {
              line-height: 27px;
              font-size: 14px;
              font-weight: 400;
              overflow: hidden;
              padding: 0 20px;
              margin: 0;
  
              a {
                color: #333;
              }
            }
  
            .item-list {
              display: none;
              position: absolute;
              width: 734px;
              min-height: 460px;
              _height: 200px;
              background: #f7f7f7;
              left: 210px;
              border: 1px solid #ddd;
              top: 0;
              z-index: 9999 !important;
  
              .subitem {
                float: left;
                width: 650px;
                padding: 0 4px 0 8px;
  
                dl {
                  border-top: 1px solid #eee;
                  padding: 6px 0;
                  overflow: hidden;
                  zoom: 1;
  
                  &.fore {
                    border-top: 0;
                  }
  
                  dt {
                    float: left;
                    width: 54px;
                    line-height: 22px;
                    text-align: right;
                    padding: 3px 6px 0 0;
                    font-weight: 700;
                  }
  
                  dd {
                    float: left;
                    width: 415px;
                    padding: 3px 0 0;
                    overflow: hidden;
  
                    em {
                      float: left;
                      height: 14px;
                      line-height: 14px;
                      padding: 0 8px;
                      margin-top: 5px;
                      border-left: 1px solid #ccc;
                    }
                  }
                }
              }
            }
          }
          .cur{
            background-color: skyblue;
          }
          
        }
      }
      //过渡动画的样式
      .sort-enter{
        height: 0;

      }//过渡动画开始状态（进入）
      .sort-enter-to{
        height: 461px;

      }//过渡动画结束状态（进入）
      .sort-enter-active{
        transition:all .3s linear;//所有元素 0.5s 匀速
      }//定义过渡动画的时间，速率
      //离开也能写
    }
  }
  </style>
  