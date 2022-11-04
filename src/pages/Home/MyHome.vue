<template>
  <div>
    <!--三级联动全局组件，已经注册为全局组件，不需要再引入-->
  <TypeNav></TypeNav> 
  <ListContainer></ListContainer>
  <ReCommend></ReCommend>
  <RankList></RankList>
  <GuessLike></GuessLike>
  <TwoFloor v-for="(floor) in floorList" :key="floor.id" :list="floor"></TwoFloor>
  <BrandList></BrandList>

  </div>
</template>

<script>
import ListContainer from '@/pages/Home/ListContainer/ListContainer.vue'
import ReCommend from '@/pages/Home/ReCommend/ReCommend.vue'
import RankList from '@/pages/Home/RankList/RankList.vue'
import GuessLike from '@/pages/Home/GuessLike/GuessLike.vue'
import TwoFloor from '@/pages/Home/TwoFloor/TwoFloor.vue'
import BrandList from '@/pages/Home/BrandList/BrandList.vue'
import {mapState} from 'vuex'
export default {
    components:{
      ListContainer,
      ReCommend,
      RankList,
      GuessLike,
      TwoFloor,
      BrandList
    },
    mounted(){
      this.$store.dispatch('Home/getFloorList')
    },
    computed:{
    ...mapState({
         floorList:state=>state.Home.floorList
        })
    },
}
</script>

<style>

</style>