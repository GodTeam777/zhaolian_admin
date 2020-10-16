<template>
<div>
  <div class="add">

    <el-row>
      <el-col :span="4">    <!--搜索框-->
        <el-input placeholder="请输入用户名" v-model="news_params.search_name" class="input-with-select" style="width: 300px;" >
          <el-button slot="append" icon="el-icon-search" @click="btnsearch_name"></el-button>
        </el-input>
      </el-col>
      <el-col :span="16">1</el-col>
      <el-col :span="4"> <el-button  type="primary"  style="width: 150px;height: 40px" plain icon="el-icon-circle-plus" size="mini"
                                     @click="dialogVisible = true" @click.prevent="(scope.$index, scope.row)"
      >添加客服</el-button></el-col>
    </el-row>

  </div>

  <div >
  <el-table
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    fit
    :data="list" border style="width: 100%" ref="multipleTable" tooltip-effect="dark">
    <el-table-column prop="usersid" label="编号" sortable align="center" width="100%" ></el-table-column>
    <el-table-column prop="uname" label="昵称"  align="center"  ></el-table-column>
    <el-table-column prop="sex" label="性别" align="center" ></el-table-column>
    <el-table-column prop="birthday" label="出生日期"  :formatter="dateFormat" align="center" ></el-table-column>
    <el-table-column prop="petname" label="账号" align="center" ></el-table-column>
    <el-table-column prop="phone" label="电话号码" align="center" ></el-table-column>
    <el-table-column label="操作"   align="center" >
      <template slot-scope="scope" align="center">
        <el-button  v-show="scope.row.status==1" type="danger" icon="el-icon-warning" size="mini" round
                     @click.prevent="UpdateStatus(scope.$index, scope.row)"
        >禁用客服</el-button>
        &nbsp; &nbsp;&nbsp;&nbsp;<span v-show="scope.row.status==0" ><el-button type="danger"  size="mini" round
          @click.prevent="(scope.$index, scope.row)" disabled="disabled" style=";width: 90px">已禁用</el-button></span>
      </template>
    </el-table-column>
  </el-table>
  </div>
  <!--修改额度-->
  <div>
    <el-dialog
      title="添加客服"
      :visible.sync="dialogVisible"
      width="40%"

    >
      <el-form ref="form" label-width="80px">
        <el-form-item label="昵称:">
          <el-input   v-model="listAdd.uname"></el-input>
        </el-form-item>
        <el-form-item label="性别:">
          <el-radio v-model="listAdd.sex" label="男">男</el-radio>
          <el-radio v-model="listAdd.sex" label="女">女</el-radio>
        </el-form-item>

        <el-form-item label="电话号码:">
          <el-input v-model="listAdd.phone"></el-input>
        </el-form-item>
        <el-form-item label="账户名称:">
          <el-input v-model="listAdd.petname"></el-input>
        </el-form-item>
        <el-form-item label="登录密码:">
          <el-input v-model="listAdd.uspws"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="round" @click="AddService">立即添加</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
  <div class="page">
    <el-pagination  small layout="sizes,prev,next,pager,jumper,slot"
                    :page-sizes="[2,5,8,10]"
                    @current-change="handleCurrentChange"
                    @size-change="handleSizeChange"
                    :page-size="Size" :total="total"
                    :current-page="news_params.pageNumber"
                    align="right"
    ></el-pagination>
  </div>
</div>
</template>

<script>
    export default {
      data(){
        return {
          dialogVisible: false,//点击弹窗
        list:[],//存放查询记录
          total:0,  // 总记录数
          Size:2, //每页显示的条数
          currentPage:1, //当前页
          news_params:{
            pageNumber: 1,
            pageSize: 2,
            search_name: '',
          },
          listAdd:{
            uname:'',sex:'',phone:'',petname:'',uspws:''
          }
        }
      },

      methods:{
        //全部查询
        show:function(page,pageSize){
          this.axios.post('http://localhost:10086/queryPagesService',this.news_params).then(res=>{
            console.log("返回："+res.data)
            this.list=res.data.data;
            this.total=res.data.totalRecords;
            this.Size=res.data.pageSize;
            console.log("----------------："+res.data.totalRecords)

            this.news_params.pageNumber=res.data.pageNo;
          });
        },
        handleCurrentChange:function(val){
          this.news_params.pageNumber = val;
          this.show();
        },
        handleSizeChange:function(val){
          this.news_params.pageSize = val;
          this.show();
        },
        //时间格式化
        dateFormat: function(row, column) {
          var date = row[column.property];
          if (date == undefined) {
            return "未填";
          }
          return this.$moment(date).format("YYYY-MM-DD");
        },
        UpdateStatus:function(index, row){
          row.status=0//禁用
          this.$confirm('是否禁用,一经处理不可改变?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
            this.axios.post("http://localhost:10086/UpdateKefu",
              JSON.stringify({"usersid":row.usersid,"status":row.status}))
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消操作'
            });
            location.reload();
          });
        },

        //添加客服
        AddService:function(){
              this.axios
                .post('http://localhost:10086/AddService',this.listAdd).then(result=>{
                if (result.status === 200) {
                  // alert("修改成功！");
                  this.$notify({
                    title: '成功',
                    message: '添加成功',
                    type: 'success',
                  },2000);
                  //页面刷新
                  location.reload();
                } else {
                  // 失败了
                  alert("添加失败！");
                }
              })
        },
        //组合查询
        btnsearch_name(){
         this.show();
        },
      },


      mounted() {
        this.show(this.currentPage,this.pageSize);
      }
    }
</script>

<style scoped>
  .add {
    border: 1px solid #eee;
    margin: 10px 0;
    padding: 15px;
  }
</style>
