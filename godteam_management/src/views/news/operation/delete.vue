<template>
  <div>
    <el-button id="btn_delete" type="button" @click="news_delete_click">删除</el-button>
  </div>
</template>

<script>
    export default {
      name: "delete",
      props: {
        news_nid: {
          type: String
        },
        news_funcotion: {
          type: Function
        }
      },
      data() {
        return {
          array_tid: []
        }
      },
      methods: {
        open() {
          this.$confirm('此操作将永久删除该, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        },
        news_delete_click(){
          this.array_tid = this.news_nid.split(',');
          this.axios.post("http://localhost:10086/news_delete",this.array_tid).then(result=>{
            alert(result.data)
            this.news_funcotion();
          });
        }
      }
    }
</script>

<style scoped>
  #btn_delete{
    background: #008cd5;
    borer: 0;
    height: 37px;
    padding: 8px 17px;
    border-radius: 3px;
    color: #fff;
    float: left;
    margin-bottom: 20px;

  }
</style>
