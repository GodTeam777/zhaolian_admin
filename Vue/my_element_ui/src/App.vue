<template>
  <div id="app">
    <el-row>
      <el-col :span="4">
        <ul>
          <li><router-link to="/">首页</router-link></li>
          <li><router-link to="/MyBase">基本组件</router-link></li>
          <li><router-link to="/MyPage">分页插件</router-link></li>
          <li><router-link to="/MyTable">table插件</router-link></li>
          <li><router-link to="/MyRequest">基本请求</router-link></li>
          <li><router-link to="/MyApp">table分页应用</router-link></li>
        </ul>
      </el-col>
      <el-col :span="20">
        <router-view/>
      </el-col>
    </el-row>
  </div>
</template>


<script>
  export default {
    name: 'App'
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  ul{
    list-style:none;
    text-align:left;
  }
</style>
