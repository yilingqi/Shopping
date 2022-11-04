<template>
  <div class="swiper-container" ref="floor1Swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="carousel in list" :key="carousel.id">
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "MyCarousel",
  props: ["list"],
  watch: {
    //监听bannerList数组的变化 由空数组变为有数据
    list: {
      immediate: true,
      handler(newvalue, oldvalue) {
        //当handler方法执行的时候，代表组件身上的这个属性已经有了，但是只能保证数据已经有了，不能保证v-for解析完了
        //遍历也需要时间
        //nexttick：在下次dom更新循环结束之后执行延迟回调，在修改数据之后 立即调用这个方法
        this.$nextTick(() => {
          //当你执行这个回调的时候，保证服务器的数据已经回来了，v-for也执行完毕了
          var mySwiper = new Swiper(this.$refs.floor1Swiper, {
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              clickable: true, //点击小球切换图片
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    }, 
  },
};
</script>


<style scoped>
</style>