<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="主键编号">
        <el-input v-model="id" disabled></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <el-input v-model="content"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="updateBlog">立即修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        id: "",
        content: ""
      };
    },
    created() {
      console.log("传递的博客编号为："+this.$route.params.id);
      this.axios.get
      ("http://localhost:9090/testssm2_0718/queryBlogById?id=" + this.$route.params.id)
        .then(result => {
          if (result.status === 200) {
            console.log("按编号查询学生成功了："+result.data)
            // 成功了
            this.id = result.data.blogId;
            this.content = result.data.blogContent;
          } else {
            // 失败了
            alert("获取数据失败！");
          }
        });
    },
    methods: {
      updateBlog() {
        this.axios
          .post("http://localhost:9090/testssm2_0718/updateBlog",
            JSON.stringify({"blogId": this.id,"blogContent":this.content}))
          .then(result => {
            console.log("修改结果："+result.data.flag);
            console.log("修改返回的状态码："+result.status)
            if (result.status === 200) {
              alert("修改成功！");
            } else {
              // 失败了
              alert("修改失败！");
            }
          });
      }
    }
  };
</script>
