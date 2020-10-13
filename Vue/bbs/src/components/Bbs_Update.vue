<template>
    <div>
      <el-button @click="topic_create(),dialogVisible=true">修改</el-button>
      <el-dialog title="修改帖子" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <span>
          <el-form status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="标题" prop="pass">
    <el-input type="text" v-model="topic.title" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="帖子内容" prop="checkPass">
    <el-input type="textarea" v-model="topic.content" autocomplete="off"></el-input>
  </el-form-item>
</el-form>
        </span>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="topic_update">确 定</el-button>
  </span>
      </el-dialog>
    </div>
</template>

<script>
    export default {
      name: "Bbs_Update",
        props: {
            row_data: {
                type: String
            },
            topic_funcotion: {
                type: Function
            }
        },
        data() {
            return {
                count: {
                    tid: 0
                },
                dialogVisible: false,
                topic: {
                    tid: 0,
                    title : '',
                    content: ''
                }
            }
        },
        methods: {
            topic_create(){
                this.count.tid = this.row_data;
                this.axios.post("http://localhost:8080/topic_byId",this.count).then(result=>{
                    this.topic.tid = result.data.tid;
                    this.topic.title = result.data.title;
                    this.topic.content = result.data.content;
                });
            },
            topic_update(){
                this.axios.post("http://localhost:8080/topic_update",this.topic).then(result=>{
                    alert(result.data);
                    this.dialogVisible = false;
                    this.topic_funcotion();
                });
            },
            handleClose(done) {
                this.$confirm('确认关闭？').then(_ => {
                    done();
                }).catch(_ => {});
            }
        }
    }
</script>

<style scoped>

</style>
