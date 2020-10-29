<template>
  <div>
    <div class="yscard">
      <el-row>
        <el-col :span="3.5" v-for="(item,index) in ysxxAry" :key="item.ysid">
          <router-link :to="{ path: '/ysxq', query: item}">
            <el-card :body-style="bodyStyle" :v-if="item.ysid">
              <div class="ystitle">
                <span class="spanindex">{{index+1&lt;10?`0${index+1}`:(index+1)}}</span>
              <!--  <span class="spanindex">{{item.zj}}</span> -->
                <span class="spanName">{{item.ysxm}}</span>
                <span class="spanZw">{{item.yszc}}</span>
              </div>
              <div class="ysSj">
               <!--  <span>未知</span> ~
                <span>未知</span> -->
              </div>
              <div class="mzys">
                <div class="ysjs">
                  <span>
                    <span class="ysjssw">门诊：</span>
                    {{item.mzrc}}
                  </span>
                  <span>
                    <span class="ysjssw">预约：</span>
                    {{item.yyrc}}
                  </span>
                </div>
                <div class="ysjs">
                  <span>
                    <span class="ysjssw">已接诊：</span>
                    {{item.yjzrc}}
                  </span>
                  <span>
                    <span class="ysjssw">候诊：</span>
                    {{item.hzrc}}
                  </span>
                </div>
                <div class="ysjs">
                  <span>
                    <span class="ysjssw">平均时间：</span>
                    {{item.pjsj}}
                  </span>
                </div>
              </div>
              <div class="divx"></div>
              <div class="mzys">
                
                <div class="ysjs">
                  <span>
                  <span class="ysjssw">均次费用：</span>

                  {{item.jcfy}}
                  </span>
                </div>
                <div class="ysjs">
                  <span>
                  <span class="ysjssw">均次药费：</span>
                  {{item.jcyf}}
                  </span>
                </div>

                <div class="ysjs">
                  <span>
                  <span class="ysjssw">药占比：</span>
                  {{item.yzb}}%
                  </span>
                </div>
              </div>
              <div class="yssjxx">
                手机：{{item.dh}}
               
              </div>
            </el-card>
           
          </router-link>
         
        
        </el-col>
      </el-row>
    </div>
    <div class="ksgd">
    <div class="ksdiv">
      <span
        v-for="item in arys"
        :key="item.ks"
        @click="updateks(item.ks)"
        class="span"
        :class="[item.ks === flagClass?flag:'']"
      >{{item.ks}}</span>
    </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "ysCard",
  props: ["cardData"],
  data() {
    return {
      ysxxAry:[], // 当前科室渲染的医师信息
      ary: [], // 只有科室
      arys: [], // 有科室以及该科室下的所有医生
      ysAry: [], // 父组件传递过来的数据，未处理
      flag: "action", // 控制科室选中样式
      flagClass: "",
      bodyStyle: { padding: 0, width: "12.9vw", height: "30.5vh" }, // 卡片样式
     /*  ceshushuju:{ lc: 5, zj: 3, ip: "172.30.105.105", dqys: "左师" }, */
    };
  },
  methods: {
   
    // 处理科室数据
    handleks(){
      
// 将props中医师信息赋值给this.ysAry
    this.ysAry = [...this.cardData];

    this.ysAry.forEach(item=>{
      if(!this.ary.includes(item.ks)){
        this.ary.push(item.ks)
        let obj={}
        obj.ks=item.ks
        this.arys.push(obj)
      }
    })
 
    this.arys.forEach(item=>{
      item.list=[]
      this.ysAry.forEach(item1=>{
        if(item.ks===item1.ks){
          item.list.push(item1)
        }
      })
    })
       //console.log(this.arys)
        // 默认选中第一个科室
    this.flagClass = this.arys[0].ks;
    this.ysxxAry=this.arys[0].list
    },
    // 点击科室改变数据渲染
    updateks(ks) {
      // 选中科室添加样式
      this.flagClass = ks;
      
      this.arys.forEach((item) => {
        // 循环医师数组，选择科室为ks的信息作为新的数组，赋值给this.ysAry
        if (item.ks === ks) {
          this.ysxxAry=item.list
        }
      });
     
    },
  },
  created() {
    this.handleks();
   
  },
};
</script>
<style lang="less" scoped>
.yscard {
  margin: 0 auto;
/*   width: 94vw;
  height: 88vh; */
   text-align: left;
  .el-card {
    border-radius: 0;
    margin: 0 0 0.5vw 0.5vw;
  }
  .ystitle {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 5.5vh;
    background-color: #7f94c6;
    color: #ffffff;

    .spanindex {
      height: 5.5vh;
      line-height: 5.5vh;
      width: 5.5vh;
      font-size: 3.3vh;
      background-color: #5b75b6;
    }
    .spanName {
      //font-size: 2.7vh;
      line-height: 5.5vh;
    }
    .spanZw {
      padding-right: 1vh;
      font-size: 1.5vh;
      line-height: 5.5vh;
    }
  }
  
  .ysSj {
    height: 3.7vh;
    background-color: #ebeef6;
    color: #5b75b6;
    line-height: 3.7vh;
    text-align: center;
  }
  .mzys{
    height: 8.5vh;
    padding:0.4vh 1vh;
  }
  .ysjs {
    display: flex;
    justify-content: space-between;
    padding: 0.3vh 0;
    color: #000000;
  }
  .ysjssw {
    color: #666666;
  }
  .yssjxx{
    color: #ffffff;
    height:3vh ;
    padding: 0 1vh;
    background-color: #7f94c6;
  }
}
.ksgd{
  position: fixed;
  bottom: 0;
  left: 5vw;
  width: 100%;
  .ksdiv {
  display: flex;
  flex-direction: row;
  //padding-left:1vh;
  color: #ffffff;
  background-color: cornflowerblue;
  font-size: 14px;
  font-weight: 500;
  .span {
    display: inline-block;
    padding: 1vh;
  }
  .action {
    //height: 6vh;
    background-color: #3757a6;
  }
}
}

.divx {
  height: 1px;
  background-color: #5b75bc;
  border: none;
}
</style>