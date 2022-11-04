<template>
  <div>
    <TypeNav/>
    <div class="main">
      <div class="py-container">
        <!--bread 面包屑 根据搜索条件动态展示，searchParams有就展示-->
         <!--所以可以v-if 或v-show-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>        
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-if="searchParams.categoryName">
              {{searchParams.categoryName}}<i @click="removeCategoryName">×</i>
            </li>
            <!--搜索框关键字的面包屑-->
            <li class="with-x" v-if="searchParams.keyword">
              {{searchParams.keyword}}<i @click="removeKeyword">×</i>
            </li>
            <!--品牌面包屑-->
            <li class="with-x" v-if="searchParams.trademark">
              {{searchParams.trademark.split(':')[1]}}<i @click="removeTradeMark">×</i><!--这里用split以：切割，取第1个-->
            </li>
            <!--属性面包屑-->
            <li class="with-x" v-for="(attr,index) in searchParams.props" :key="index">
              {{attr.split(":")[1]}}<i @click="removeAttr(index)">×</i><!--点击谁就要删除谁（在数组里面），所以需要返回一个值-->
            </li>
          </ul>
        </div>

        <!--selector   search路由子组件-->
        <SearchSelector @tradeMarkInfo='tradeMarkInfo' @attrInfo='attrInfo'/><!--子给父传东西绑定一个自定义事件  -->

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!--价格结构-->
              <ul class="sui-nav">
                <li :class="{active:isOne}" @click="changeOrder('1')">
                  <!--默认综合有背景高亮的结果，但是高亮效果不是写死的，它是根据order属性中是否包含1或2来动态渲染出来的-->
                  <a >综合<span v-show="isOne" class="iconfont" :class="{'icon-up':isAsc,'icon-down':isDesc}"></span></a><!--箭头是谁有高亮谁显示箭头-->
                </li>
                <li :class="{active:isTwo}" @click="changeOrder('2')">
                  <a >价格<span v-show="isTwo" class="iconfont" :class="{'icon-up':isAsc,'icon-down':isDesc}"></span></a>
                </li>
              </ul>
            </div>
          </div>
          <!--商品列表-->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${good.id}`" > <!--因为要带参数过去，所以所以用模板字符串解析-->
                      <img v-lazy="good.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥ &nbsp</em>
                      <i>{{good.price}}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">{{good.title}}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!--分页器-->
          <MyPagination :pageNo="searchParams.pageNo" :total="total" :continues="5" :pageSize="searchParams.pageSize" @getPageNo="getPageNo"></MyPagination>
          <!--因为孩子要告诉父亲是第几页被点击了，所以是子给父传递数据，需要用到自定义事件-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters,mapState} from 'vuex'
  import SearchSelector from './SearchSelector/SearchSelector'
  export default {
    name: 'MySearch',
    beforeMount(){
     // this.searchParams.category1Id=this.$route.query.category1Id
      //this.searchParams.category2Id=this.$route.query.category3Id
      //this.searchParams.category3Id=this.$route.query.category3Id
      //this.searchParams.keyword=this.$route.params.keyword
      Object.assign(this.searchParams,this.$route.query,this.$route.params)//整理参数
    },
    mounted(){
      this.getData()
    },
    data(){
      return{
        //带给服务器的参数，需要动态绑定
        searchParams:{
          "category1Id": "",//一级分类id
          "category2Id": "",
          "category3Id": "",
          "categoryName": "",//用户选择n级分类的名称
          "keyword": "",//input关键字
          "order": "1:desc",//排序排序方式 
                      //  1: 综合,2: 价格 asc: 升序,desc: 降序  
                      //示例: "1:desc"初始值应该是综合，降序
          "pageNo": 1,//当前是第几页，默认是1
          "pageSize": 10,//每一页有多少数据
          "props": [],//平台售卖属性带的参数
          "trademark": ""//品牌
        }
      }
    },
   computed:{
    ...mapGetters('Search',['goodsList']),//仓库getters不分模块
    ...mapState({
      total:state=>state.Search.searchList.total//从仓库里面拿数据
    }),//获取search模块的数据总数
    isOne(){
        return this.searchParams.order.indexOf('1')!=-1
      },
      isTwo(){
        return this.searchParams.order.indexOf('2')!=-1
      },
      isAsc(){
        return this.searchParams.order.indexOf('asc')!=-1
      },
      isDesc(){
        return this.searchParams.order.indexOf('desc')!=-1
      }
   },
    components: {
      SearchSelector
    },
    methods:{
      //向服务器发送请求，根据参数不同，返回不同的数据展示
      getData(){
        this.$store.dispatch('Search/getSearchList',this.searchParams)
      },
      removeCategoryName(){
       this.searchParams.categoryName=undefined
       this.searchParams.category1Id=undefined
       this.searchParams.category2Id=undefined
       this.searchParams.category3Id=undefined//变成undefined就不会带给服务器了
       if(this.$route.params){
        this.$router.push({name:'search',params:this.$route.params})
       }
      },//但是这种情况下，路径不会改变，所以要自己跳自己的路径
      removeKeyword(){
        this.searchParams.keyword=undefined//修改参数后再发请求
        this.getData()
        //通知兄弟组件删除关键字
        this.$bus.$emit("clear")//事件名字叫clear
        if(this.$route.query){
          this.$router.push({name:'search',query:this.$route.query})
        }
      },
      tradeMarkInfo(trademark){
        //自定义事件的回调
        this.searchParams.trademark=`${trademark.tmId}:${trademark.tmName}`//使用模板字符串，这么写是因为文档里面要求的格式是这样的
        this.getData()
      },
      removeTradeMark(){
        this.searchParams.trademark=''
        this.getData()
      },
      attrInfo(attr,attri){
        //整理参数
        let props=`${attr.attrId}:${attri}:${attr.attrName}`//生成一个模板字符串
        if(this.searchParams.props.indexOf(props)==-1){
          this.searchParams.props.push(props);
        }//push进数组
        this.getData()
      },
      removeAttr(index){
       //拿到要删除的数据的index值
       this.searchParams.props.splice(index,1)//删除index值的那个数据
       this.getData()
      },
      //排序操作
      changeOrder(flag){
         let originFlag=this.searchParams.order.split(':')[0]
         let originSort=this.searchParams.order.split(':')[1]
         let newOrder=''
         if(flag==originFlag){
              newOrder=`${originFlag}:${originSort=="desc"?'asc':'desc'}`
         }else{//点击的是同一个，改顺序，不是同一个，改综合或价格
              newOrder=`${flag}:${"desc"}`
         } 
         //将新的order赋给searchParams
         this.searchParams.order=newOrder
         this.getData()
      },
      getPageNo(pageNo){
        //整理参数
        this.searchParams.pageNo=pageNo
        this.getData()
      }
    },
    watch:{
       //监听属性
       $route(newvalue, oldvalue){
        Object.assign(this.searchParams,this.$route.query,this.$route.params)
       this.getData()
       //因为123id不重叠，所以我们在下一次之前，要清空
       this.searchParams.category1Id=undefined
       this.searchParams.category2Id=undefined
       this.searchParams.category3Id=undefined
       }//不是this.$route

    }

  }
</script>

<style lang="less" scoped>
  .main {
    margin: 10px 0;

    .py-container {
      width: 1200px;
      margin: 0 auto;

      .bread {
        margin-bottom: 5px;
        overflow: hidden;

        .sui-breadcrumb {
          padding: 3px 15px;
          margin: 0;
          font-weight: 400;
          border-radius: 3px;
          float: left;

          li {
            display: inline-block;
            line-height: 18px;

            a {
              color: #666;
              text-decoration: none;

              &:hover {
                color: #4cb9fc;
              }
            }
          }
        }

        .sui-tag {
          margin-top: -5px;
          list-style: none;
          font-size: 0;
          line-height: 0;
          padding: 5px 0 0;
          margin-bottom: 18px;
          float: left;

          .with-x {
            font-size: 12px;
            margin: 0 5px 5px 0;
            display: inline-block;
            overflow: hidden;
            color: #000;
            background: #f7f7f7;
            padding: 0 7px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #dedede;
            white-space: nowrap;
            transition: color 400ms;
            cursor: pointer;

            i {
              margin-left: 10px;
              cursor: pointer;
              font: 400 14px tahoma;
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }

            &:hover {
              color: #28a3ef;
            }
          }
        }
      }

      .details {
        margin-bottom: 5px;

        .sui-navbar {
          overflow: visible;
          margin-bottom: 0;

          .filter {
            min-height: 40px;
            padding-right: 20px;
            background: #fbfbfb;
            border: 1px solid #e2e2e2;
            padding-left: 0;
            border-radius: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;

              li {
                float: left;
                line-height: 18px;

                a {
                  display: block;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                }

                &.active {
                  a {
                    background: #e1251b;
                    color: #fff;
                  }
                }
              }
            }
          }
        }

        .goods-list {
          margin: 20px 0;

          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              height: 100%;
              width: 20%;
              margin-top: 10px;
              line-height: 28px;

              .list-wrap {
                .p-img {
                  padding-left: 15px;
                  width: 215px;
                  height: 255px;

                  a {
                    color: #666;

                    img {
                      max-width: 100%;
                      height: auto;
                      vertical-align: middle;
                    }
                  }
                }

                .price {
                  padding-left: 15px;
                  font-size: 18px;
                  color: #c81623;

                  strong {
                    font-weight: 700;

                    i {
                      margin-left: -5px;
                    }
                  }
                }

                .attr {
                  padding-left: 15px;
                  width: 85%;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;

                  a {
                    color: #333;
                    text-decoration: none;
                  }
                }

                .commit {
                  padding-left: 15px;
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;

                  span {
                    font-weight: 700;
                    color: #646fb0;
                  }
                }

                .operate {
                  padding: 12px 15px;

                  .sui-btn {
                    display: inline-block;
                    padding: 2px 14px;
                    box-sizing: border-box;
                    margin-bottom: 0;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 0;
                    background-color: transparent;
                    margin-right: 15px;
                  }

                  .btn-bordered {
                    min-width: 85px;
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;

                    &:hover {
                      border: 1px solid #666;
                      color: #fff !important;
                      background-color: #666;
                      text-decoration: none;
                    }
                  }

                  .btn-danger {
                    border: 1px solid #e1251b;
                    color: #e1251b;

                    &:hover {
                      border: 1px solid #e1251b;
                      background-color: #e1251b;
                      color: white !important;
                      text-decoration: none;
                    }
                  }
                }
              }
            }
          }
        }

        .page {
          width: 733px;
          height: 66px;
          overflow: hidden;
          float: right;

          .sui-pagination {
            margin: 18px 0;

            ul {
              margin-left: 0;
              margin-bottom: 0;
              vertical-align: middle;
              width: 490px;
              float: left;

              li {
                line-height: 18px;
                display: inline-block;

                a {
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  border: 1px solid #e0e9ee;
                  margin-left: -1px;
                  font-size: 14px;
                  padding: 9px 18px;
                  color: #333;
                }

                &.active {
                  a {
                    background-color: #fff;
                    color: #e1251b;
                    border-color: #fff;
                    cursor: default;
                  }
                }

                &.prev {
                  a {
                    background-color: #fafafa;
                  }
                }

                &.disabled {
                  a {
                    color: #999;
                    cursor: default;
                  }
                }

                &.dotted {
                  span {
                    margin-left: -1px;
                    position: relative;
                    float: left;
                    line-height: 18px;
                    text-decoration: none;
                    background-color: #fff;
                    font-size: 14px;
                    border: 0;
                    padding: 9px 18px;
                    color: #333;
                  }
                }

                &.next {
                  a {
                    background-color: #fafafa;
                  }
                }
              }
            }

            div {
              color: #333;
              font-size: 14px;
              float: right;
              width: 241px;
            }
          }
        }
      }
    }
  }
</style>