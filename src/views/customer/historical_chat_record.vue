<template>
    <div>
      <div id="demo">
        <a id="a">历史记录</a>
        <el-button id="ssk2" type="primary" icon="el-icon-search"></el-button>
        <input  id="ssk" v-model="input" placeholder="   请输入内容" ></input>

        <!--<h2>历史记录</h2>-->
      </div>

      <div>
      <el-radio-group v-model="tabPosition" style="margin-bottom: 50px;">
        <!--<el-radio-button label="top">top</el-radio-button>-->
        <!--<el-radio-button label="right">right</el-radio-button>-->
        <!--<el-radio-button label="bottom">bottom</el-radio-button>-->
        <!--<el-radio-button label="left">left</el-radio-button>-->
      </el-radio-group>

      <el-tabs :tab-position="tabPosition" style="height:100%;">
        <el-tab-pane label="全部" >
          <div>暂无历史记录</div>
        </el-tab-pane>
        <el-tab-pane label="今日" >
          <div>暂无历史记录</div>

        </el-tab-pane>
        <el-tab-pane label="昨日">暂无历史记录</el-tab-pane>
        <el-tab-pane label="过去7天">暂无历史记录</el-tab-pane>
        <el-tab-pane label="本月">暂无历史记录</el-tab-pane>
        <el-tab-pane label="八月">暂无历史记录</el-tab-pane>
        <el-tab-pane label="七月">暂无历史记录</el-tab-pane>
        <el-tab-pane label="六月">暂无历史记录</el-tab-pane>
      </el-tabs>
      </div>

    </div>
</template>

<script>
  export default {
    data() {
      return {
        tabPosition: 'left',
        input: ''
      };
    }
  };
</script>

<style scoped>
    #demo{
      width: 100%;
      height: 60px;
      background-color: #5a5e66;
    }
    #a{
      color: #fbfdff;
      font-size: 30px;
      position: absolute;
      left: 30px;
      top: 10px;
    }
  #ssk{
    color: #000000;
    width: 600px;
    height: 40px;
    position: absolute;
    left: 540px;
    top: 10px;
    background-color: #1890ff ;
    outline: 0;
    border-radius: 10px;
    border: 0px  solid;

  }
    #ssk2{
      font-size: 18px;
      position: absolute;
      left: 500px;
      top: 10px;
    }

    ::-webkit-input-placeholder{
      color:#fbfdff;
      font-size:16px;
    }
</style>
