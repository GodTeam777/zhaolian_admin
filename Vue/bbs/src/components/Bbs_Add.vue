<template>
  <div id="add">
      <el-button id="myadd" type="primary" @click="dialogVisible = true">新增</el-button>
      <el-dialog title="新增主贴" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span>
      <el-form label-width="80px">
          <el-form-item label="标题" >
              <el-input type="text" v-model="topic.title"></el-input>
          </el-form-item>
          <el-form-item label="发帖内容">
              <el-input type="textarea" v-model="topic.content"></el-input>
          </el-form-item>
      </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="topic_add">保存</el-button>
          <el-button type="primary" @click="dialogVisible = false">取消</el-button>
      </span>
      </el-dialog>
  </div>

</template>

<script>
  import Qs from 'qs'
  export default {
        name: "Bbs_Add",
        props: {
            topic_funcotion: {
                type: Function
            }
        },
        data() {
            return {
                dialogVisible: false,
                topic: {
                  title: '',
                  content: ''
                }
            };
        },
        methods: {
            handleClose(done) {
                this.$confirm('确认关闭？').then(_ => {
                    done();
                }).catch(_ => {});
            },
            topic_add(){
                alert("发帖："+this.topic.title);
                this.axios.post('http://localhost:8080/topic_add',this.topic)
              // this.axios({
              //       // headers: {
              //       //     //'Content-Type': 'application/json'
              //       // },
              //       url: 'http://localhost:8080/topic_add',
              //       method: 'post',
              //       data: this.topic
              //         //JSON.stringify(this.topic)
              // })
              .then(result=>{
                  alert(result.data.message);
                  this.dialogVisible = false;
                  this.topic_funcotion();

              });
            }
        }
    }
</script>

<style scoped>
  button {
    background: #008cd5;
    borer: 0;
    height: 37px;
    padding: 8px 17px;
    border-radius: 3px;
    color: #fff;

  }
  #myadd{
    float: left;
    margin-right: 10px;
  }
</style>
