<template>
  <div class="MyApp">
    <h1>{{title}}</h1>
    <p style="text-align: left;">
      <el-button type="success" icon="el-icon-edit">新增</el-button>
      <el-button type="danger" icon="el-icon-delete">删除</el-button>
    </p>
    <el-table border strip :data="rows">
      <el-table-column prop="blogId" label="编号"></el-table-column>
      <el-table-column prop="blogContent" label="内容"></el-table-column>
      <el-table-column prop="blogCreateDate" label="生日"></el-table-column>
    </el-table>
    <div class="page">
      <el-pagination  small layout="sizes,prev,next,pager,jumper,slot"
                      :page-sizes="[2,5,8,10]"
                      @current-change="handleCurrentChange"
                      @size-change="handleSizeChange"
                      :page-size="pageSize" :total="total"
                      :current-page="currentPage"

      ></el-pagination>
    </div>
  </div>
</template>

<script>
  export default{
    name: 'MyApp',
    data(){
      return {
        title:"微博列表",
        total:0,  // 总记录数
        pageSize:2, //每页显示的条数
        currentPage:1, //当前页
        rows:[],  //当前现实的记录信息

      }
    },
    methods:{
      show:function(page,pageSize){
        this.axios.get('http://localhost:9090/testssm2_0718/queryPages?pageNo='+page+'&pageSize='+pageSize).then(res=>{
          console.log("返回："+res.data)
          if(res.data.data){
            this.rows=res.data.data;
            this.total=res.data.totalRecords;
            this.currentPage=res.data.pageNo;
            this.pageSize=res.data.pageSize;
          }

        });
      },
      handleCurrentChange:function(val){
        this.currentPage=val;
        this.show(this.currentPage,this.pageSize);
      },
      handleSizeChange:function(val){
        this.pageSize=val;
        this.currentPage=1;
        this.show(this.currentPage,this.pageSize);
      }
    },
    mounted() {
      this.show(this.currentPage,this.pageSize);
    }
  }
</script>
<style>
  .MyApp{
    margin:10px auto;
    width:900px;
  }
  .page{
    margin-top:10px;
    width:500px;
    float:right;
  }
</style>
