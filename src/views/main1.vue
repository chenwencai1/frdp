<template>
  <div id="main1">
<el-carousel indicator-position="none" height="100vh" :interval="intervalNum"  :autoplay="flag" :initial-index="index">
      <el-carousel-item v-for="item in page" :key="item" >
     <div v-if="item===1"><index></index></div>
      <div v-if="item===2"><floor></floor> </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
import index from '@/views/index.vue'
import floor from '@/views/floor.vue'

export default {
  name: 'main1',
  data(){
    return{
      page:[1,2],
      flag:false, // 自动轮播
      intervalNum:3000, // 自动轮播间隔
      index:0,// 跑马灯起始展示位置
    }
  },
  components: {
    index,
    floor
  },
  created(){
    this.index=this.$store.state.padindex
  }
}
</script>
<style lang="less">
/deep/.el-table th {
  height: 5.5vh;
  line-height: 5.5vh;
  padding: 0;
  font-size: 1.5vh;
  // text-align: center;
}
/deep/.el-table td {
  height: 5.5vh;
  line-height: 5.5vh;
  padding: 0;
  font-size: 1.5vh;
  // text-align: center;
}
</style>
