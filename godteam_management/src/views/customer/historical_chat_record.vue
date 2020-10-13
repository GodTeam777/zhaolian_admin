<template>
    <div>
      <div style="margin-left: 20%;background-color: rgba(185,203,192,0.89);height: 300px;margin-top:20px;width: 10%;float: left;border: 0px solid red;">

        <p v-for="(i,key,index) in tonames" :key="index" @click="qiehuan(i)" style="margin-top: 0px;font-size:13px;cursor:pointer;border-right: 0px;height: 40px;width: 100%;background-color: Window;border: 1px solid rgba(185,203,192,0.89);line-height: 40px">
          用户：{{i}}<el-badge v-if="yanzhen(i)" is-dot></el-badge>
        </p>
      </div>
      <div class="message">
        <div v-for="(value,key,index) in messageList" :key="index" style="">
          <el-tag v-if="value.formName==name" type="success" style="float:right;">我：{{value.msg}}<br/>{{value.date}}</el-tag>
          <br />
          <br />
          <el-tag v-if="value.formName==toname" style="float:left">{{value.formName}}：{{value.msg}}<br/>{{value.date}}</el-tag>
          <br />
          <br />
        </div>
      </div>
      <div id="demo">
        <textarea v-model="messageValue" style="height: 60px;margin-left: 30%;width: 30%"></textarea>
        <span style="position: absolute;margin-top: 2%;"><el-button type="primary" @click="sendMessage">发送</el-button></span>

      </div>

    </div>
</template>

<script>
  export default {
    data() {
      return {
        name: "kefu", // 昵称
        tonames:[],//所有发送消息的用户
        toname:"",//发给谁的名称
        messageList: [], // 消息列表
        messageValue: "", // 消息内容
        timer1:'',//定时器,
        timer2:'',//定时器,
        isa:'1',
        listname:[],
      };
    },
    methods:{
      //发送
      sendMessage(){
        if(this.messageValue!=null){
          this.axios({url:"http://localhost:10086/sendmsg_end",method:"post",withCredentials:true,
            data:{formName:this.name,toName:this.toname,msg:this.messageValue}}).then(res=>{})
        }
        this.messageValue="";
      },
      //获得
      getMessage(){
        this.axios({url:"http://localhost:10086/getmsg",method:"get",withCredentials:true}).then(res=>{

          //console.log("获得数据："+res.data);
          for(let i in res.data){
            if(i!="name"&&i!="value"&&i==this.toname){
              this.messageList=res.data[i];
            }
          }
          console.log("获得数据："+this.messageList.length);
        })

      },
      gettoname(){
        var names=[];
        this.axios({url:"http://localhost:10086/getmsg",method:"get",withCredentials:true}).then(res=>{
          console.log("获得用户数据："+res.data);
          for(let i in res.data){
            if(i!="name"&&i!="value"){
              names.push(i);
            }
          }
        })
        this.tonames=names;
      },
      qiehuan(i){
        this.toname=i;
        //document.getElementById(i).style.display="none";
        this.listname.push(i);
      },
      yanzhen(i){
        var sg=true;
        for (var j = 0; j <this.listname.length ; j++) {
          if(i==this.listname[j]){
            sg= false;
            break;
          }
        }
        return sg;
      }
    },
    mounted(){
      this.timer1= window.setInterval(this.getMessage,2000)
      this.timer2= window.setInterval(this.gettoname,2000)

    },
    beforeDestroy() {
      clearTimeout(this.timer1);
      clearTimeout(this.timer2);
    }
  }
</script>

<style scoped>
    #demo{
      margin-top:20px;
      width: 100%;
      height: 60px;
      background-color: #5a5e66;
      float: left;
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
    .message {
      position: relative;
      overflow:auto;
      top: 20px;
      width: 40%;
      height: 300px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
      padding: 5px;
      float: left;
    }
</style>
