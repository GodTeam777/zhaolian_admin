<template>
  <div >
    <el-table
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      fit
      :data="list" border style="width: 100%" ref="multipleTable" tooltip-effect="dark">
      <!--勾选框-->
<!--      <el-table-column type="selection" width="55"></el-table-column>-->
      <!--索引-->
      <!-- <el-table-column type="index" :index="indexMethod"></el-table-column> -->
      <el-table-column prop="cid" label="编号"  sortable align="center"></el-table-column>
      <el-table-column prop="ndate" label="认证时间" :formatter="dateFormat" sortable align="center"></el-table-column>
      <el-table-column prop="carbrand" label="车辆品牌" align="center"></el-table-column>
      <el-table-column prop="carid" label="车辆牌照"align="center"></el-table-column>

      <el-table-column prop="caraddress" label="登记地点"   align="center"></el-table-column>
      <el-table-column  label="车辆实图" align="center"><img width="100%" :src="cpath" alt="暂无图片"></el-table-column>
      <el-table-column prop="status" label="状态" align="center">
        <template slot-scope="scope">
          <!--    v-show显示隐藏-->
          <span v-show="scope.row.status==2" ><el-button type="success"  size="mini"
                                                         @click.prevent="updatetrue(scope.$index, scope.row)" disabled="disabled" style=";width: 100px">已通过</el-button></span>
          <span v-show="scope.row.status==1" ><el-button type="danger"  size="mini"
                                                         @click.prevent="updatefalse(scope.$index, scope.row)" disabled="disabled" style=";width: 100px">不通过</el-button></span>
          <el-button v-show="scope.row.status==0" type="success" icon="el-icon-check" size="mini"
                     @click.prevent="updatetrue(scope.$index, scope.row)" class="updateblock">通过</el-button>

          <el-button v-show="scope.row.status==0" type="danger" icon="el-icon-close" size="mini"
                     @click.prevent="updatefalse(scope.$index, scope.row)" class="updateblock">不通过</el-button>
        </template>
      </el-table-column>
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
        title:"车辆认证",
        total:0,  // 总记录数
        pageSize:2, //每页显示的条数
        currentPage:1, //当前页
        list:[],  //当前现实的记录信息

      }
    },
    methods:{
      show:function(page,pageSize){
        this.axios.get('http://localhost:10086/queryPagesCar?pageNo='+page+'&pageSize='+pageSize).then(res=>{
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
        return this.$moment(date).format("YYYY-MM-DD");
      },
      //执行修改状态
      updatetrue(index, row) {
        //代表通过
        row.status=2
        this.$confirm('给予通过?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.axios.post("http://localhost:10086/updateCar",
            JSON.stringify({"cid":row.cid,"status":row.status}))
          this.$message({
            type: 'success',
            message: '成功通过!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消通过'
          });
        });
      },
      updatefalse(index, row) {
        //不通过
        row.status=1
        this.$confirm('不予通过?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',

        }).then(() => {
          this.axios.post("http://localhost:10086/updateCarfalse",
            JSON.stringify({"cid":row.cid,"status":row.status}))
          this.$message({
            type: 'success',
            message: '操作成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消操作'
          });
        });

      }
    },
    mounted() {
      this.show(this.currentPage,this.pageSize);
    }
  }
</script>
