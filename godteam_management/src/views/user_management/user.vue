<template>
  <div >
    <el-table
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      fit
      :data="list" border style="width: 100%" ref="multipleTable" tooltip-effect="dark">
      <!--勾选框-->
            <el-table-column type="selection" width="50"></el-table-column>
      <!--索引-->
      <!-- <el-table-column type="index" :index="indexMethod"></el-table-column> -->
      <el-table-column prop="usersid" label="个人编号" sortable align="center"></el-table-column>
      <el-table-column prop="uname" label="个人姓名"  align="center" ></el-table-column>
      <el-table-column prop="sex" label="个人性别" align="center"></el-table-column>
      <el-table-column prop="birthday" label="出生日期"  :formatter="dateFormat" align="center"></el-table-column>
      <el-table-column prop="smalldai" label="贷款额度"   align="center"></el-table-column>
      <el-table-column prop="petname" label="昵称" align="center"></el-table-column>
    </el-table>
    <div class="page">
      <el-pagination  small layout="sizes,prev,next,pager,jumper,slot"
                      :page-sizes="[2,5,8,10]"
                      @current-change="handleCurrentChange"
                      @size-change="handleSizeChange"
                      :page-size="pageSize" :total="total"
                      :current-page="currentPage"
                      align="right"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        title:"用户管理",
        total:0,  // 总记录数
        pageSize:8, //每页显示的条数
        currentPage:1, //当前页
        list:[],  //当前现实的记录信息

      }
    },
    methods:{
      show:function(page,pageSize){
        this.axios.get('http://localhost:10086/queryPagesUsers?pageNo='+page+'&pageSize='+pageSize).then(res=>{
          console.log("返回："+res.data)
          if(res.data.data){
            this.list=res.data.data;
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
      },
      //时间格式化
      dateFormat: function(row, column) {
        var date = row[column.property];
        if (date == undefined) {
          return "未填";
        }
        return this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
      },
    },
    mounted() {
      this.show(this.currentPage,this.pageSize);
    }
  }
</script>

<style scoped>

</style>
