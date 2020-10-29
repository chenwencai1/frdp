<template>
  <div class="index">
    <el-row :gutter="5">
      <el-col :span="16">
        <el-container>
          <el-header class="title1">普通候诊</el-header>
          <el-container>
            <el-main class="mainDiv">
              <div class="div1 div3">
                <div style="height:18vh;width:24vw" ref="pthz"></div>
              </div>
              <div class="div1 div2">
                <span class="mzrc">门诊人次</span>
                <div class="mzrc1">{{mz.mzrc}}</div>

                <div class="spanf">
                  <span>同期&emsp;{{mz.mzrcTq}}</span>
                  <span>同比&emsp;{{mz.mztcTb}}%</span>
                  <span></span>
                </div>
              </div>
              <div class="row">
                <div class="div4">
                  <span class="mzrc">候诊人数</span>
                  <div class="mzrc1">{{mz.hzrc}}</div>
                  <span class="spanf">就诊人次&emsp;{{mz.jzrc}}</span>
                </div>
                <div class="div4 div5">
                  <span class="mzrc">医生人数</span>
                  <div class="mzrc1">{{mz.ysrs}}</div>
                  <span class="spanf">同期人数&emsp;{{mz.tqrs}}</span>
                </div>
              </div>
            </el-main>
            <el-aside width="60%">
              <div style="width:38vw;height:41vh" ref="pthzks"></div>
            </el-aside>
          </el-container>
        </el-container>
      </el-col>
      <el-col :span="8">
        <el-container>
          <el-header class="title2">医疗类型</el-header>
          <el-main>
            <div style="height:41vh;width:33vw" ref="yllx"></div>
          </el-main>
        </el-container>
      </el-col>
    </el-row>
    <el-row :gutter="5">
      <el-col :span="16">
        <el-container>
          <el-header class="title3">门诊预约</el-header>
          <el-main>
            <el-table
              :data="mzyyksOption"
              height="41vh"
              :row-class-name="tableRowClassName"
              style="width: 100%"
            >
              <el-table-column prop="ksmc" label="科室" min-width="200"></el-table-column>
              <el-table-column prop="czys" label="出诊医生数" min-width="100"></el-table-column>
              <el-table-column prop="mzrs" label="门诊人次" min-width="100"></el-table-column>
              <el-table-column prop="yyrs" label="预约人次" min-width="100"></el-table-column>
              <el-table-column prop="yyjzl" label="预约就诊率" min-width="120"></el-table-column>
            </el-table>
          </el-main>
        </el-container>
      </el-col>
      <el-col :span="8">
        <el-container>
          <el-header class="title4">病种分析</el-header>
          <el-main>
            <div style="width:33vw;height:41vh" ref="bzfx"></div>
          </el-main>
        </el-container>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { pthzrc, pthzks, yllx, mzyyks, bzfx } from "@/assets/index";
// import axios from 'axios'
export default {
  name: "index",
  data() {
    return {
      mz: [], // 普通候诊门诊数据
      pthzks: [], // 普通候诊科室
      yllxOption: [], // 医疗类型
      bzfxOption: [], // 病种分析
      mzyyksOption: [], // 门诊预约数据
    };
  },
  watch: {
    mz() {
      //console.log('普通候诊')
      this.showbing();
    },
    pthzks() {
      // console.log('普通候诊科室')
      this.showks();
    },
    yllxOption() {
      // console.log('医疗类型')
      this.showyllx();
    },
    bzfxOption() {
      // console.log('病种分析')
      this.showbzfx();
    },
  },
  methods: {
    // 普通候诊
    getPthzrc() {
      let params = {};
      pthzrc(params).then((res) => {
        if (parseInt(res.code) === 200) {
          this.mz = res.data[0];
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    // 普通候诊饼图
    showbing() {
      let ary = [
        { name: "候诊", value: this.mz.hzrc },
        { name: "就诊", value: this.mz.jzrc },
      ]; // 候诊和就诊数据
      // 基于准备好的dom，初始化echarts实例
      let pthzbt = this.$echarts.init(this.$refs.pthz);
      let pthzOption = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          icon: "circle",
          orient: "vertical",
          right: "10%",
          top: "35%",
          data: ["就诊", "候诊"],

          formatter: (name) => {
            const itemValueArr = ary.filter((el) => el.name == name);
            const itemValueAll = ary.reduce((total, num) => {
              return total + parseFloat(num.value);
            }, 0);
            return `${name} | ${(
              (itemValueArr[0].value / itemValueAll) *
              100
            ).toFixed(2)}%`;
          },
        },

        color: [
          "#eaeaea",
          "#23b6b6",
          "#5c4197",
          "#3757a6",
          "#5daa3e",
          "#ea5322",
          "#f0a726",
        ],
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            center: ["40%", "50%"], //饼图的位置
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: "inside",
              formatter: "{a|{d}%}",
              rich: {
                a: {
                  height: 35,
                  width: 35,
                  fontWeight: "normal",
                  borderRadius: 50,
                  backgroundColor: "#ffffff",
                },
              },
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "18",
                fontWeight: "normal",
              },
            },
            labelLine: {
              show: false,
            },
            data: ary,
          },
        ],
      };

      pthzbt.setOption(pthzOption);
    },
    // 普通候诊科室
    getks() {
      let params = {};
      pthzks(params).then((res) => {
        if (parseInt(res.code) === 200) {
          this.pthzks = res.data;
          // 根据就诊人数排序
          this.pthzks.sort((a, b) => parseInt(b.jzrs) - parseInt(a.jzrs));
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    // 普通候诊科室柱状图
    showks() {
      let ksname = [],
        ksjzrc = [],
        kshzrc = [],
        ksysrs = [];
      this.pthzks.forEach((item) => {
        ksname.push(item.ksmc);
        ksjzrc.push(item.jzrs);
        kshzrc.push(item.hzrs);
        ksysrs.push(item.ysrs);
      });

      // 基于准备好的dom，初始化echarts实例
      let pthzksref = this.$echarts.init(this.$refs.pthzks);

      let pthzksOption = {
        title: {
          text: "科室",
          textStyle: {
            color: "#000000",
            fontWeight: "normal",
            fontSize: 18,
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        legend: {
          icon: "roundRect",
          data: ["就诊人次", "候诊人次", "医生人数"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "1%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
          show: false,
        },
        yAxis: {
          type: "category",
          offset: 10,
          data: ksname.slice(0, 8).reverse(), // 默认展示前7条数据
          splitLine: {
            show: false, // 网格线是否显示
            // 改变样bai式
            lineStyle: {
              color: "#EDEDED", // 修改网格线颜色
            },
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            formatter: function (value) {
              let val = "";
              if (value.length > 4) {
                val = value.substring(0, 4) + "...";
              } else {
                val = value;
              }
              return val;
            },
          },
        },
        color: [
          "#23b6b6",
          "#eaeaea",
          "#ffffff",
          "#3757a6",
          "#5daa3e",
          "#ea5322",
          "#f0a726",
        ],
        series: [
          {
            name: "就诊人次",
            type: "bar",
            stack: "总量",
            label: {
              show: true,
              position: "insideRight",
            },
            data: ksjzrc.slice(0, 8).reverse(),
          },
          {
            name: "候诊人次",
            type: "bar",
            stack: "总量",
            label: {
              show: true,
              position: "insideRight",
              color: "#000000",
            },
            data: kshzrc.slice(0, 7),
          },
          {
            name: "医生人数",
            type: "bar",
            stack: "总量",
            label: {
              show: true,
              position: "insideRight",
              color: "#000000",
            },
            data: ksysrs.slice(0, 7),
          },
        ],
      };

      pthzksref.setOption(pthzksOption);
    },
    // 医疗类型
    getyllx() {
      let params = {};
      yllx(params).then((res) => {
        if (parseInt(res.code) === 200) {
          this.yllxOption = res.data;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    showyllx() {
      let yllxmc = []; // 医疗类型名称

      this.yllxOption.forEach((item) => {
        yllxmc.push(item.name);
      });
      // 基于准备好的dom，初始化echarts实例
      let yllx = this.$echarts.init(this.$refs.yllx);
      let yllxOp = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          icon: "circle",
          orient: "horizontal",
          /*  width:400,
          itemGap:5, */
          // itemWidth :200,
          bottom: 10,
          data: yllxmc,

          formatter: (name) => {
            const itemValueArr = this.yllxOption.filter(
              (el) => el.name == name
            );
            const itemValueAll = this.yllxOption.reduce((total, num) => {
              return total + parseFloat(num.value);
            }, 0);
            return `${name} | ${(
              (itemValueArr[0].value / itemValueAll) *
              100
            ).toFixed(0)}%`;
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
            center: ["50%", "45%"], //饼图的位置
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
                // fontWeight: "bold",
              },
            },
            labelLine: {
              show: true,
              length: 10,
              length2: 50,
            },
            data: this.yllxOption,
          },
        ],
      };

      yllx.setOption(yllxOp);
    },
    // 门诊预约科室
    getmzyyks() {
      let params = {};
      mzyyks(params).then((res) => {
        if (parseInt(res.code) === 200) {
          this.mzyyksOption = res.data;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    // 病种分析
    getbzfx() {
      let params = {};
      bzfx(params).then((res) => {
        if (parseInt(res.code) === 200) {
          this.bzfxOption = res.data;
          this.bzfxOption.sort((a, b) => parseInt(b.rs) - parseInt(a.rs));
        }
      });
    },
    showbzfx() {
      //console.log(this.bzfxOption)
      let name = [],
        /*  */ rc = [];
      this.bzfxOption.forEach((item) => {
        name.push(item.zdmc);
        rc.push(item.rs);
      });
      // 基于准备好的dom，初始化echarts实例
      let bzfx = this.$echarts.init(this.$refs.bzfx);

      let bafxsu = {
        title: {
          text: "诊断名称",
          textStyle: {
            color: "#000000",
            fontWeight: "normal",
            //fontSize:18
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        legend: {
          icon: "roundRect",
          data: ["人次"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
          show: false,
        },
        yAxis: {
          type: "category",
          offset: 10,
          data: name.slice(0, 8).reverse(), // 默认展示前7条数据
          splitLine: {
            show: false, // 网格线是否显示
            // 改变样bai式
            lineStyle: {
              color: "#EDEDED", // 修改网格线颜色
            },
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            formatter: function (value) {
              let val = "";
              if (value.length > 4) {
                val = value.substring(0, 4) + "...";
              } else {
                val = value;
              }
              return val;
            },
          },
        },
        series: [
          {
            name: "人次",
            type: "bar",
            stack: "总量",
            label: {
              show: true,
              position: "insideRight",
            },
            itemStyle: {
             color: function (params) {
                  let colorList = [
                   
                    "#5daa3e",
                    "#5daa3e",
                    "#5daa3e",
                    "#5daa3e",
                    "#5daa3e",
                    "#5daa3e",
                     "#f0a726",
                     "#ea5322",
                   
                  ];
                  return colorList[params.dataIndex];
                },
            },
            data: rc.slice(0, 8).reverse(),
          },
        ],
      };

      bzfx.setOption(bafxsu);
    },
    // 自定义表格行样式
    tableRowClassName({ rowIndex }) {
      if (rowIndex % 2 === 0) {
        return "warning-row";
      }
      return "";
    },
  },
  created() {
    // 获取普通候诊人次信息
    this.getPthzrc();
    this.getks();
    this.getyllx();
    this.getmzyyks();
    this.getbzfx();
  },
  mounted() {
    this.showbing();
    this.showks();
    this.showyllx();
    this.showbzfx();
  },
};
</script>
<style lang="less" scoped>
.index {
  margin: 0 auto;
  font-size: 1.5vh;
  /deep/.el-table .warning-row {
    background-color: #ebeef6;
  }
}
.el-row {
  margin-bottom: 1vh;
  &:last-child {
    margin-bottom: 0;
  }
}

.el-header {
  height: 6vh !important;
  color: #ffffff;
  text-align: center;
  line-height: 6vh;
}
.title1 {
  background-color: #23b6b6;
}
.title2 {
  background-color: #5c4197;
}
.title3 {
  background-color: #3757a6;
}
.title4 {
  background-color: #5daa3e;
}
.el-main {
  height: 43vh;
  background-color: #fbfbfb;
  text-align: left;
  color: #333;
  padding: 0;
}
.el-aside {
  height: 43vh;
  margin-left: 1vh;
  background-color: #fbfbfb;
}
.mainDiv {
  background-color: #eff0f4;
  .div1 {
    background-color: #fbfbfb;
  }
  .div2 {
    height: 11.5vh;
    margin-top: 1vh;
    padding: 1vh 0 0 1vh;
  }
  .div3 {
    height: 18vh;
    line-height: 18vh;
  }
  .div4 {
    width: 49%;
    padding: 1vh 0 0 1vh;
    background-color: #fbfbfb;
  }
  .div5 {
    margin-left: 1vh;
  }
}
.row {
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 1vh 0 0 0;
}
.mzrc {
  color: #201f1f;
  font-size: 1vh;
}
.mzrc1 {
  width: 100%;
  border-bottom: #eaeaea 1px solid;
  color: #23b6b6;
  font-size: 3vh;
}

.spanf {
  display: flex;
  justify-content: space-between;
  padding: 1vh 0;
  //font-size: 18px;
}

/deep/.el-table th {
  height: 4.5vh;
  line-height: 4.5vh;
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