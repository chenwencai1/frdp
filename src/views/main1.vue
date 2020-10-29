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
      flag:false,
      intervalNum:5000,
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

</style>
