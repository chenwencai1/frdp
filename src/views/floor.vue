<template>
  <div class="floor">
    <el-tabs v-model="lcValue" type="card" tab-position="left" :stretch="true">
      <el-tab-pane
        :key="item.lc"
        v-for="(item) in lcTab"
        :label="item.lc"
        :name="item.lc"
      >
        <ysCardCom :cardData="item.list"></ysCardCom>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ysCardCom from "@/components/yscard.vue";
import {ysxx} from "@/assets/index"
export default {
  name: "Floor",
  components: { ysCardCom },
  data() {
  
    return {
      ysCard: [],
      // tab数据
      lcValue: "1",
     lcTabs : [],// 只有楼层名字的数组
     lcTab:[] // 包括楼层的名字和该楼层所有的医师信息
    };
  },
  methods:{
    // 获取医师信息
  
    getysxx(){
        let params={}
      ysxx(params).then(res=>{
        if(parseInt(res.code)===200){
          this.ysCard=res.data
          // 处理数据,获取有多少楼层
          res.data.forEach(item=>{
            if(!this.lcTabs.includes(item.lc)){
               this.lcTabs.push(item.lc)
               let obj={}
               obj.lc=item.lc
               this.lcTab.push(obj)
            }
            
          })
          // 楼层不是按照数字楼层返回
         //this.lcTabs= this.lcTabs.sort((a,b)=>(a.lc-b.lc))
         
         // 根据楼层归纳医师
         this.lcTab.forEach(item=>{
           item.list=[]
           this.ysCard.forEach(item1=>{
             if(item1.lc===item.lc){
               item.list.push(item1)
             }
           })
         })
         this.lcValue=this.lcTab[0].lc
        // console.log(this.lcTab)
        }else{
          this.$message.error(res.msg)
        }
        
      })
    }
  },
  created(){
    this.getysxx()
  }
};
</script>
<style lang="less" scoped>
.floor {
  /deep/.el-tabs--left {
    height: 100vh;
  }
  /deep/.el-tabs--left .el-tabs__header.is-left {
    margin-right: 0;
  }
  /deep/.el-tabs--left .el-tabs__nav-wrap.is-left {
    width: 4.6vw;
   // margin-right: 0.5vw;
    background-color: #7f94c6;
    
  }
  /deep/.el-tabs--left.el-tabs--card .el-tabs__nav {
    display: flex;
    flex-direction: column-reverse;
    border-radius: 0;
    border: none;
    margin-left: -3vh;
  }
  /deep/.el-tabs__item {
    border: none !important;
    color: #ffffff;
    font-size: 1.5vh;
  }
  /deep/.el-tabs__item.is-active {
    background-color: blue;
    width: 6vw;
    border: none !important;
  }
}
</style>