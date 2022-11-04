<template>
  <div class="pagination">
    <button :disabled="pageNo==1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
    <button v-if="startNumAndEndNum.start>1" @click="$emit('getPageNo',1)" :class="{active:pageNo==1}">1</button><!--算出来的start>1就要-->
    <button v-if="startNumAndEndNum.start>2">···</button>

    <button v-for="(page,index) in startNumAndEndNum.end" :key="index" v-if="page>=startNumAndEndNum.start" @click="$emit('getPageNo',page) " :class="{active:pageNo==page}">{{page}}</button>

    <button v-if="startNumAndEndNum.end<totalPage-1">···</button>
    <button v-if="startNumAndEndNum.end<totalPage" @click="$emit('getPageNo',totalPage)" :class="{active:pageNo==totalPage}">{{totalPage}}</button>
    <button :disabled="pageNo==totalPage" @click="$emit('getPageNo',pageNo+1)">下一页</button>
     <!--全部的$emit都是要给父组件传参的-->
    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>
  
  <script>
export default {
  name: "MyPagination",
  props:[
    "pageNo", 
    "total", 
    "continues",
    "pageSize"
  ],
  computed:{
    //把总共有多少页计算出来
    totalPage(){
        return Math.ceil(this.total/this.pageSize);
    },
    startNumAndEndNum(){
        //先定义起始数据和结束数据的变量,连续页码数字最少是5
         let start=0,end=0;
         //如果出现不正常的现象，即不满continues页
         if(this.continues>this.totalPage)
         {
            start=1
            end=this.totalPage
         }else{
            start=this.pageNo-parseInt(this.continues/2)
            end=this.pageNo+parseInt(this.continues/2)
            if(start<1){
                start=1
                end=this.continues
            }
            if(end>this.totalPage){
                start=this.totalPage-this.continues+1
                end=this.totalPage;
            }
         }
         return {start,end}
    },
  },
}
</script>
  
  <style lang="less" scoped>
.pagination {
    text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>