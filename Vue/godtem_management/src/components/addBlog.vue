<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="内容">
        <el-input v-model="content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addBlog">立即添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import Qs from 'qs'
  let data = {
    "blogContent": "admin"
  }
  export default {
    data() {
      return {
        content: ""
      };
    },
    methods: {
      addBlog() {
        this.axios
          .post("http://localhost:9090/testssm2_0718/addBlog1",
            JSON.stringify({"content":this.content}))
          .then(result => {
            if (result.status === 200) {
              console.log("返回数据："+result.data)
              console.log("新增主键编号："+result.data.blog.blogId)
              alert("添加成功！");
              this.content = "";
            } else {
              // 失败了
              alert("添加失败！");
            }
          });


      }
    }
  };
</script>
