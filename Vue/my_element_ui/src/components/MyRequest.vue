<template>
  <div class="MyRequest">
    <el-button round type="success" @click="sendRequest">打开跨域请求</el-button>
    <p>返回：{{msg}}</p>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        msg : "new request"
      }
    },
    methods: {
      sendRequest:function(page,pageSize){
        console.log("发起新的请求：")
        this.axios.get('http://localhost:9090/testssm2_0718/newer').then(res=>{
          console.log("返回数据："+res.data)
          this.msg = res.data
        });
      }
    }
  }
</script>
