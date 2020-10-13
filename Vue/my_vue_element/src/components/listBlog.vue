<template>
  <div>
    <!--搜索框-->
    <el-row>
      <el-col :span="3" class="grid">
        <el-input v-model="input" placeholder="请输入id" size="mini"></el-input>
      </el-col>
      <el-col :span="1" class="grid">
        <el-button type="success" icon="el-icon-search" size="mini" @click.prevent="search()">搜索</el-button>
      </el-col>
    </el-row>
    <br>
    <!--表格数据及操作-->
    <!-- 加载设置 -->
    <el-table
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      fit
      :data="list" border style="width: 100%" ref="multipleTable" tooltip-effect="dark">
      <!--勾选框-->
      <!-- <el-table-column type="selection" width="55"></el-table-column> -->
      <!--索引-->
      <!-- <el-table-column type="index" :index="indexMethod"></el-table-column> -->
      <el-table-column prop="blogId" label="编号" sortable></el-table-column>
      <el-table-column prop="blogContent" label="内容"></el-table-column>
      <el-table-column prop="blogCreateDate" label="生日" :formatter="dateFormat" sortable></el-table-column>

      <el-table-column label="编辑">
        <template slot-scope="scope">
          <router-link to="/updateBlog">
            <el-button type="primary" icon="el-icon-edit" size="mini"
                       @click.prevent="updateBlog(scope.$index, scope.row)">编辑</el-button>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="删除">
        <template slot-scope="scope">
          <el-button type="danger" icon="el-icon-delete" size="mini"
                     @click.prevent="deleteBlog(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--新增按钮-->
    <el-col :span="1" class="grid">
      <router-link to="/addBlog">
        <el-button type="success" icon="el-icon-circle-plus-outline" size="mini" round>新增</el-button>
      </router-link>
    </el-col>
  </div>
</template>
<script>
  export default {
    created() {
      console.log("组件初始化结束，准备开始全部查询。")
      this.listAllBlog();
    },
    data() {
      return {
        //查询输入框数据
        input: 0,
        list: [] // 存放列表数据
      };
    },
    methods: {
      listAllBlog() {
        console.log("开始全部查询：listAllBlog")

        this.axios.post('http://localhost:8080/my_vue_DaiMa/getAllBlogs').then(result=>{
          console.log("返回："+result.data)
          console.log("返回状态码："+result.status)
          if (result.status === 200) {
            // 成功了
            this.list = result.data;
            console.log("正确返回数据："+result.data);
          } else {
            // 失败了
            alert("获取数据失败！");
          }

        });
      },
      //时间格式化
      dateFormat: function(row, column) {
        var date = row[column.property];
        if (date == undefined) {
          return "未填";
        }
        return this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
      },
      updateBlog(index, row) {
        console.log("当前记录主键编号："+row.blogId)
        this.$router.push({
          path: '/updateBlog/'+row.blogId
        });
      },
      deleteBlog(index, row) {
        console.log("被删除记录主键编号："+row.blogId)
        this.axios.post("http://localhost:8080/testssm2_0718/deleteBlogById",
          JSON.stringify({id : row.blogId})).then(result => {
          console.log("删除返回的结果："+result.data.flag)
          console.log("删除返回的状态码："+result.status)
          if (result.status === 200) {
            // 删除成功
            this.listAllBlog();
            alert("删除成功！");
          } else {
            alert("删除失败！");
          }
        });
      }
    }
  };
</script>
