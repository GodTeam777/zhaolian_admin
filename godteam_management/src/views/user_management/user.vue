<template>
  <div>
    <div>
      <!--搜索框-->
      <el-input placeholder="请输入用户名" v-model="userName" class="input-with-select" style="width: 300px;" >
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
    </div>
  <div >
    <el-table
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      fit
      :data="list" border style="width: 100%" ref="multipleTable" tooltip-effect="dark">
      <!--索引-->
<!--      <el-table-column type="index" :index="indexMethod" @click.prevent="tangchaung"></el-table-column>-->
      <el-table-column prop="usersid" label="个人编号" sortable align="center"></el-table-column>
      <el-table-column prop="uname" label="个人姓名"  align="center" ></el-table-column>
      <el-table-column prop="sex" label="个人性别" align="center"></el-table-column>
      <el-table-column prop="birthday" label="出生日期"  :formatter="dateFormat" align="center"></el-table-column>
      <el-table-column prop="smalldai" label="贷款额度"   align="center"></el-table-column>
      <el-table-column prop="petname" label="昵称" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
      <template slot-scope="scope" align="center">
        <el-button  type="success" icon="el-icon-search" size="mini"
                     @click="dialogVisible = true" @click.prevent="tangchaung(scope.$index, scope.row)"
        >查看详情</el-button>
      </template>
      </el-table-column>
    </el-table>
    <div>
      <el-dialog
        title="详细信息"
        :visible.sync="dialogVisible"
        width="60%"
        :before-close="handleClose">
        <el-row>
          <el-col :span="4"><h3>基本信息</h3></el-col>
          <el-col :span="20"></el-col>
        </el-row>
        <el-row>
          <el-col :span="4">用户姓名:{{listall.name}}</el-col>
          <el-col :span="20"></el-col>
        </el-row>
        <el-row>
          <el-col :span="4">身份证号:{{listall.idcard}}</el-col>
          <el-col :span="20"></el-col>
        </el-row>
        <el-row>
          <el-col :span="4">身份图片:<img width="100%" :src="listall.front" alt="暂无图片"></el-col>
          <el-col :span="20"></el-col>
        </el-row>
        <el-row>
          <el-col :span="24"><hr  width="1120px"color='#BFBFBF' SIZE=1></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><h3>学历信息</h3></el-col>
          <el-col :span="20"></el-col>
        </el-row>
        <el-row>
          <el-col :span="4">学院名称:{{listedu.schoolname}}</el-col>
          <el-col :span="20"></el-col>
        </el-row>
        <el-row>
        <el-col :span="4" >入学时间:{{listedu.beginDate}}</el-col>
        <el-col :span="20"></el-col>
      </el-row>
        <el-row>
          <el-col :span="4">毕业时间:{{listedu.endDate}}</el-col>
          <el-col :span="20"></el-col>
        </el-row>
        <el-row>
          <el-col :span="4">学历学位:{{listedu.degree}}</el-col>
          <el-col :span="20"></el-col>
        </el-row>
        <el-row>
          <el-col :span="4">学历图片:<img width="100%" :src="listedu.spath" alt="暂无图片"></el-col>
          <el-col :span="20"></el-col>
        </el-row>
        <el-row>
          <el-col :span="4">认证时间:{{listedu.ndate}}</el-col>
          <el-col :span="20"></el-col>
        </el-row>
        <el-row>
          <el-col :span="24"><hr  width="1120px"color='#BFBFBF' SIZE=1></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><h3>车辆信息</h3></el-col>
          <el-col :span="20"></el-col>
        </el-row>
        <el-row>
          <el-col :span="4">车辆品牌:{{listcar.carbrand}}</el-col>
          <el-col :span="20"></el-col>
        </el-row>
        <el-row>
          <el-col :span="4">车辆车牌:{{listcar.carid}}</el-col>
          <el-col :span="20"></el-col>
        </el-row>
        <el-row>
          <el-col :span="4">车辆归属地:{{listcar.caraddress}}</el-col>
          <el-col :span="20"></el-col>
        </el-row>
        <el-row>
          <el-col :span="4">车辆图片:<img width="100%" :src="listcar.cpath" alt="暂无图片"></el-col>
          <el-col :span="20"></el-col>
        </el-row>
        <el-row>
          <el-col :span="4">认证时间:{{listcar.ndate}}</el-col>
          <el-col :span="20"></el-col>
        </el-row>
        <el-row>
          <el-col :span="24"><hr  width="1120px"color='#BFBFBF' SIZE=1></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><h3>房屋信息</h3></el-col>
          <el-col :span="20"></el-col>
        </el-row>
        <el-row>
          <el-col :span="4">房主姓名:{{listhome.hname}}</el-col>
          <el-col :span="20"></el-col>
        </el-row>
        <el-row>
          <el-col :span="4">房屋地址:{{listhome.haddress}}</el-col>
          <el-col :span="20"></el-col>
        </el-row>
        <el-row>
          <el-col :span="4">认证时间:{{listhome.hdate}}</el-col>
          <el-col :span="20"></el-col>
        </el-row>
        <el-row>
          <el-col :span="4">房屋图片:<img width="100%" :src="listhome.hpath" alt="暂无图片"></el-col>
          <el-col :span="20"></el-col>
        </el-row>
      </el-dialog></div>

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
  </div></div>
</template>
<script>
  export default{
    data(){
      return {
        hid:'',//房屋信息
        cid:'',//车辆id
        edusersid:'',//学历id
        id:'',//银行卡id
        dialogVisible: false,//点击弹窗
        userName:"",
        total:0,  // 总记录数
        pageSize:8, //每页显示的条数
        currentPage:1, //当前页
        list:[],  //当前现实的记录信息
        listall:[],//存放银行卡信息
        listedu:[],//存放学历信息
        listcar:[],//存放车辆信息
        listhome:[],//存放房屋信息
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
        return this.$moment(date).format("YYYY-MM-DD");
      },
      //发送请求
      tangchaung:function(index, row) {
        this.axios.post
          // eslint-disable-next-line no-unexpected-multiline
          ("http://localhost:10086/selectByid",{
            id:row.cardid,edusersid:row.edusersid,cid:row.cid,hid:row.hid
          }).then(res=>{
          console.log("返回："+res.data)
          this.listall=res.data.all;//接收银行信息
          this.listedu=res.data.education;//接收学历信息
          this.listcar=res.data.car;//接收学历信息
          this.listhome=res.data.home;//接收房屋信息
        }).catch(reason => {
          this.listall='';
        this.listedu='';//接收学历信息
        this.listcar='';//接收学历信息
        this.listhome='';//接收房屋信息
          }
        );
      },

    },
    mounted() {
      this.show(this.currentPage,this.pageSize);
    }
  }
</script>

<style scoped>

</style>
