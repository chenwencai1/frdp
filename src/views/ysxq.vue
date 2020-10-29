<template>
  <div class="ysxq">
    <div class="title title2">
      <div class="fh">
        <el-link @click="back()" icon="el-icon-arrow-left">返回</el-link>
      </div>
      <div class="title3">
        <span>{{title.lc}}楼</span>
        <span>诊间{{title.zj}}</span>
        <!--  <span>IP: {{title.ip}}</span> -->
        <span>当前医生: {{title.ysxm}}</span>
      </div>
      <div></div>
    </div>
    <el-container>
      <el-aside width="38vw">
        <div class="title title1">预约列表</div>

        <el-table :data="ysyylbList" style="width: 100%" height="15vh"   :row-class-name="tableRowClassName">
           <el-table-column type="index" label="序号" width="50">
              <template slot-scope="scope">
        {{ scope.$index &lt; 9?`0${scope.$index+1}`:(scope.$index+1)}}
      </template>
           </el-table-column>
          <el-table-column prop="xm" label="病人姓名" width="80"></el-table-column>
          <el-table-column prop="xb" label="性别" width="50"></el-table-column>
          <el-table-column prop="hznl" label="年龄" width="50"></el-table-column>
          <el-table-column :show-overflow-tooltip="flag" prop="czsj" label="预约时间" min-width="100"></el-table-column>
          <el-table-column :show-overflow-tooltip="flag" prop="yysj" label="预约就诊时间" min-width="100"></el-table-column>
          <el-table-column :show-overflow-tooltip="flag" prop="rs" label="预约类型" width="80"></el-table-column>
        </el-table> 

        <div class="dqysgxzb">
          <div class="title title1">当前医生各项指标</div>
          <el-row>
            <el-col :span="12">
              <div class="zhibiao">总人数：{{ysgxzbList.zrc}}</div>
            </el-col>
            <el-col :span="12">
              <div>就诊医生：{{ysgxzbList.jzys}}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div class>医生姓名：{{ysgxzbList.ysmc}}</div>
            </el-col>
            <el-col :span="12">
              <div class="zhibiao">均次费用：{{ysgxzbList.jcfy}}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div class="zhibiao">均次药费：{{ysgxzbList.jcfy}}</div>
            </el-col>
            <el-col :span="12">
              <div class>均次检验费：{{ysgxzbList.jcjyf}}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div class>平均接诊时间：{{ysgxzbList.pjjzsj}}</div>
            </el-col>
            <el-col :span="12">
              <div class="zhibiao">最长接诊时间：{{ysgxzbList.zcjzsj}}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div class="zhibiao">最短接诊时间：{{ysgxzbList.zdjzsj}}</div>
            </el-col>
          </el-row>
        </div>
        <!-- echarts -->
        <div>
          <div class="title title1">当前费用占比</div>
          <div class="echartsdiv">
            <div id="echarts" class="echarts" ref="echarts"></div>
          </div>
        </div>
      </el-aside>
      <el-main>
        <div class="title title1">接诊患者列表</div>
        <el-table :data="jzhzlbList" :row-class-name="tableRowClassName">
            <el-table-column type="index" label="序号" width="50">
              <template slot-scope="scope">
               
        {{ scope.$index &lt; 9?`0${scope.$index+1}`:(scope.$index+1)}}
      </template>
            </el-table-column>
          <el-table-column prop="xm" label="患者姓名" min-width="100"></el-table-column>
          <el-table-column :show-overflow-tooltip="flag" prop="brzd" label="患者诊断" min-width="120"></el-table-column>
          <el-table-column :show-overflow-tooltip="flag" prop="ghsj" label="挂号时间" min-width="100"></el-table-column>
          <el-table-column :show-overflow-tooltip="flag" prop="jzsj" label="就诊时间" min-width="100"></el-table-column>
          <el-table-column :show-overflow-tooltip="flag" prop="jssj" label="结束时间" min-width="100"></el-table-column>
          <el-table-column prop="zfy" label="总费用" min-width="60"></el-table-column>
          <el-table-column prop="ypf" label="药品费" min-width="60"></el-table-column>
          <el-table-column prop="jcf" label="检查费" min-width="60"></el-table-column>
          <el-table-column prop="hyf" label="化验费" min-width="60"></el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { ysyylb, ysgxzb, ysfyzb, yshzbrid } from "@/assets/index";

export default {
  name: "Ysxq",
  data() {
    return {
      flag:true,
      ysid: this.$route.query.ysid, // 医师id
      ysyylbList: [], // 医生预约列表
      ysgxzbList: [], // 医生各项指标
      ysfyzbList: [], // 医生费用占比
      jzhzlbList: [], // 接诊患者列表
      title: this.$route.query,
    };
  },
  watch:{
    ysfyzbList(){
      this.openEcharts();
    }
  },
  methods: {
    // 获取医生预约列表
    getysyylb() {
      let params={ysid:this.ysid}
      //let params = {};
      ysyylb(params).then((res) => {
        //console.log(res, "获取医生预约列表");
        if (parseInt(res.code) === 200) {
          this.ysyylbList = res.data;
        } else {
          this.$message.error(res.msg);
        }
      });
    },

    // 获取医生各项指标
    getysgxzb() {
      let params={jzys:this.ysid}
      //let params = {};
      ysgxzb(params).then((res) => {
        if (parseInt(res.code) === 200) {
          this.ysgxzbList = res.data[0];
         
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    // 获取医生费用占比
    getysfyzb() {
      let params={jzys:this.ysid}
      //let params = {};
      ysfyzb(params).then((res) => {
        
        if (parseInt(res.code) === 200) {
          let obj={}
          obj.name="出诊占比"
          obj.value=parseFloat(res.data[0].czzb)
         
          this.ysfyzbList.push(obj) 
          let obj1={}
            obj1.name="化验占比"
          obj1.value=parseFloat(res.data[0].hyzb)
          this.ysfyzbList.push(obj1) 
          let obj2={}
           obj2.name="检查占比","药品占比"
          obj2.value=parseFloat(res.data[0].jczb)
          this.ysfyzbList.push(obj2) 
          let obj3={}
          obj3.name="药品占比"
          obj3.value=parseFloat(res.data[0].ypzb)
          this.ysfyzbList.push(obj3) 
        
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    // 获取接诊患者列表
    getyshzbrid() {
       let params={jzys:this.ysid}
     // let params = {};
      yshzbrid(params).then((res) => {
        if (parseInt(res.code) === 200) {
          this.jzhzlbList = res.data;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    tableRowClassName({ rowIndex }) {
      if (rowIndex % 2 === 0) {
        return "warning-row";
      }
      return "";
    },
    // 返回首页
    back() {
      this.$store.commit("updatapadindex", 1);
      this.$router.go(-1);
    },
    // echarts

    openEcharts() {
      let bing = this.$echarts.init(this.$refs.echarts);
    let dataOption = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          icon: "circle",
          orient: "vertical",
          right: '5%',
          top: '30%',
          data: ['出诊占比', '化验占比','检查占比','药品占比'],

          formatter: (name) => {
            const itemValueArr = this.ysfyzbList.filter((el) => el.name == name);
            // const itemValueAll = this.ysfyzbList.reduce((total, num) => {
            //   return total + parseFloat(num.value);
            // }, 0);
            return `${name} | ${itemValueArr[0].value}%`;
          },
        },

        color: [
         "#5c4197",
          "#23b6b6",
          
          "#3757a6",
          "#5daa3e",
          "#ea5322",
          "#f0a726",
           "#eaeaea",
        ],
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            center: ["35%", "50%"], //饼图的位置
            avoidLabelOverlap: true,
            label: {
              show: true,
              position: "outer",
              formatter: "{d}%",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "20",
               
              },
            },
            labelLine: {
              show: true,
              length: 10,
              length2: 50,
            },
            data: this.ysfyzbList,
          },
        ],
      };
      bing.setOption(dataOption);
    },
  },
  created() {
    this.getysyylb();
    this.getysgxzb();
    this.getysfyzb();
    this.getyshzbrid();
  },
  mounted() {
    this.openEcharts();
  },
};
</script>
<style lang="less" scoped>
.ysxq {
  margin: 0 auto;
  .title2 {
    display: flex;
    justify-content: space-between;
    background-color: #3757a6;
    height: 6.5vh;
    line-height: 6.5vh;
  }
  .title {
    font-size: 2.8vh;
    color: #ffffff;
    .fh {
      padding-left: 1.5vh;
      font-size: 1.8vh;
      /deep/.el-link.el-link--default {
        color: #ffffff;
      }
    }
    .title3 {
      width: 35vw;
      display: flex;
      justify-content: space-between;
    }
  }
  .title1 {
    height: 5.5vh;
    line-height: 5.5vh;
    background-color: #7f94c6;
  }
  
  .el-aside {
    background-color: #d3dce6;
    color: #333;
    // height: 93vh;
    padding: 0 1vh 0 0;
  }

  .el-main {
    background-color: #ffffff;
    color: #333;
    padding: 0;
  }
  /deep/.el-table .warning-row {
    background-color: #ebeef6;
  }

  .dqysgxzb {
    background-color: #ffffff;
    padding-bottom: 1vh;
    .el-col {
      height: 5.5vh;
      line-height: 5.5vh;
      padding: 0 0 0 1vh;
      text-align: left;
    }
    .zhibiao {
      background-color: #ebeef6;
    }
  }

  /deep/.el-table th {
    height: 4.5vh;
    line-height: 4.5vh;
    padding: 0;
    font-size: 1.5vh;
    //text-align: center;
  }
  /deep/.el-table td {
    height: 5.5vh;
    line-height: 5.5vh;
    padding: 0;
    font-size: 1.5vh;
    //text-align: center;
  }
  .echartsdiv {
    width: 100%;
    background-color: #ffffff;
  }
  .echarts {
    width: 37vw;
    height: 32vh;
  }
}
</style>