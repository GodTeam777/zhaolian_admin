<template>
    <div>
      <el-button id="myadd" type="primary" style="width: 150px;height: 35px" plain icon="el-icon-circle-plus" size="mini"
                 @click="dialogVisible = true">添加新闻</el-button>
      <el-dialog title="新增新闻" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span>
      <el-form label-width="80px" ref="ruleForm">
          <el-form-item label="标题" >
              <el-input type="text" v-model="news.newsTitle"></el-input><span type="success" :plain="true"></span>
          </el-form-item>
          <el-form-item label="出版社" >
              <el-input type="text" v-model="news.chubanshe"></el-input>
          </el-form-item>
          <el-form-item label="类型" >
              <el-select v-model="news.ntype" placeholder="请选择">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="主体">
              <el-input type="textarea" v-model="news.newsBody" rows="10"></el-input>
          </el-form-item>
      </el-form>
      </span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="news_save">保存</el-button>
          <el-button type="primary" @click="dialogVisible = false">取消</el-button>
      </span>
      </el-dialog>
    </div>
</template>

<script>
    export default {
      created() {
        this.$refs.ruleForm.resetFields();
      },
      name: "insert",
      props: {
        news_funcotion: {
          type: Function
        }
      },
      data() {
        return {
          options: [
            {value: 1, label: '每日新闻'},
            {value: 2, label: '招联公告'},
            {value: 3, label: '消费者权益'}
          ],
          dialogVisible: false,
          news: {
            newsTitle: '',
            chubanshe: '',
            newsBody: '',
            ntype: ''
          }
        }
      },
      methods: {
        news_save() {
          if (this.news.newsTitle == "") {
            this.open2("标题不能为空！")
            return false;
          }
          if (this.news.chubanshe == "") {
            this.open2("出版社不能为空！")
            return false;
          }
          if (this.news.ntype == "") {
            this.open2("类型不能为空！")
            return false;
          }
          if (this.news.newsBody == "") {
            this.open2("主体不能为空！")
            return false;
          }

          this.axios.post('http://localhost:10086/news_insert_save',this.news).then(result => {
            this.open1();
            this.news.newsTitle = "";
            this.news.chubanshe = "";
            this.news.newsBody = "";
            this.news.ntype = "";
            this.dialogVisible = false;
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
            message: '新增成功！',
            type: 'success',
            duration: 1000
          });
        },
        open2(val) {
          this.$notify({
            title: '警告',
            message: val,
            type: 'warning',
            duration: 1000
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
    position: absolute;
    top: 0px;
    left: 1000px;
  }
</style>
