<template>
  <div id="app">
<router-view></router-view>
    
  </div>
</template>
<script>


export default {
  name: 'app',
  data(){
    return{
      
    }
  },
  components: {
  
  }
}
</script>
<style lang="less">
body{
  margin: 0;
  padding: 0;
  // 隐藏滚动条
     ::-webkit-scrollbar {
     width: 0 !important;
   }
   ::-webkit-scrollbar {
     width: 0 !important;height: 0;
   }
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #eff0f4;
  font-size: 1.5vh;
  a{text-decoration:none;}

}
}



</style>
