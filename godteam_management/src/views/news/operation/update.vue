<template>
  <div>
    <el-button id="myadd" type="primary" plain icon="el-icon-edit" size="mini"
               @click="news_create(),dialogVisible=true">修改</el-button>
    <el-dialog title="修改新闻" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <span>
          <el-form status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="标题" >
              <el-input type="text" v-model="news.newsTitle"></el-input>
          </el-form-item>
          <el-form-item label="出版社" >
              <el-input type="text" v-model="news.chubanshe"></el-input>
          </el-form-item>
          <el-form-item label="发表人" >
              <el-input type="text" v-model="news.fabiaoname" disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="类型" >
              <el-select v-model="news.ntype" placeholder="请选择">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="主体">
              <el-input type="textarea" v-model="news.newsBody"></el-input>
          </el-form-item>
        </el-form>
        </span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="news_update">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
    export default {
      name: "update",
      props: {
        row_data: {type: String},
        news_funcotion: {type: Function}
      },
      data() {
        return {
          options: [
            {value: 1, label: '每日新闻'},
            {value: 2, label: '招联公告'},
            {value: 3, label: '消费者权益'}
          ],
          count: {news_id: 0},
          dialogVisible: false,
          news: {}
        }
      },
      methods: {
        news_create(){
          this.count.news_id = this.row_data;
          this.axios.post("http://localhost:10086/news_select_ById",this.count).then(result=>{
            this.news = result.data;
          });
        },
        news_update(){
          this.axios.post("http://localhost:10086/news_update_save",this.news).then(result=>{
            this.dialogVisible = false;
            this.open1();
            this.news_funcotion();
          });
        },
        handleClose(done) {
          this.$confirm('确认关闭？').then(_ => {
            done();
          }).catch(_ => {});
        },
        open1() {
          this.$notify({
            title: '成功',
            message: '修改成功！',
            type: 'success',
            duration: 1000
          });
        },
      }
    }
</script>

<style scoped>
  #myadd{

  }
</style>
