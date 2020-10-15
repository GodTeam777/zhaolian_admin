<template>
    <div>
      <el-button id="myadd" type="primary" @click="dialogVisible = true">新增</el-button>
      <el-dialog title="新增新闻" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span>
      <el-form label-width="80px">
          <el-form-item label="标题" >
              <el-input type="text" v-model="news.newsTitle"></el-input>
          </el-form-item>
          <el-form-item label="出版社" >
              <el-input type="text" v-model="news.chubanshe"></el-input>
          </el-form-item>
          <el-form-item label="发表人" >
              <el-input type="text" v-model="news.fabiaoname"></el-input>
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
          <el-button type="primary" @click="news_save">保存</el-button>
          <el-button type="primary" @click="dialogVisible = false">取消</el-button>
      </span>
      </el-dialog>
    </div>
</template>

<script>
    export default {
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
            fabiaoname: '',
            newsBody: '',
            ntype: ''
          }
        }
      },
      methods: {
        news_save() {
          alert("发帖标题："+this.news.ntype);
          this.axios.post('http://localhost:10086/news_insert_save',this.news).then(result => {
            alert(result.data);
            this.dialogVisible = false;
            this.news_funcotion();
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
