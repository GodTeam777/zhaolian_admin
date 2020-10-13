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
        <el-table-column prop="usersid" label="个人编号" sortable align="center"  width="150px"></el-table-column>
        <el-table-column prop="uname" label="个人姓名"  align="center"  width="180px"></el-table-column>
        <el-table-column prop="sex" label="个人性别" align="center" width="180px"></el-table-column>
        <el-table-column prop="birthday" label="出生日期"  :formatter="dateFormat" align="center" width="180px"></el-table-column>
        <el-table-column prop="smalldai" label="贷款额度"   align="center" width="180px"></el-table-column>
        <el-table-column prop="petname" label="昵称" align="center" width="180px"></el-table-column>
        <el-table-column label="操作"  width="260px" align="center" >
          <template slot-scope="scope" align="center">
            <el-button  type="success" icon="el-icon-search" size="mini" round
                        @click="dialogVisible = true" @click.prevent="tangchaung(scope.$index, scope.row)"
            >查看详情</el-button>
            <el-button  type="success" icon="el-icon-document" size="mini" round
                        @click="dialogVisible1 = true" @click.prevent="selectSamlldaiOrderByid(scope.$index, scope.row)" style=";width: 90px"
            >贷款记录</el-button>
          </template>
        </el-table-column>
        <el-table-column label="编辑" align="center">
          <template slot-scope="scope" align="center">

            <el-button  icon="el-icon-edit" size="mini"round
                        @click.prevent="updateerdu(scope.$index, scope.row)"style=";width: 90px"
            >编辑额度</el-button>
            <el-button  type="info" icon="el-icon-edit" size="mini"round
                        @click.prevent="(scope.$index, scope.row)"style=";width: 90px"
            >编辑利率</el-button>
            <el-button  type="danger" icon="el-icon-warning" size="mini"round
                        @click.prevent="(scope.$index, scope.row)"style=";width: 90px"
            >禁用贷款</el-button>

          </template>
        </el-table-column>
      </el-table>
      <!--货款记录-->
      <div>
        <el-dialog
          title="货款记录"
          :visible.sync="dialogVisible1"
          width="75%"
        >
          <el-table
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            fit
            :data="listSamlldai" border style="width: 100%" ref="multipleTable" tooltip-effect="dark">
            <el-table-column prop="sdoid" label="货款编号" sortable align="center"  width="150px"></el-table-column>
            <el-table-column prop="usersid" label="用户编号"  align="center"  width="150px"></el-table-column>
            <el-table-column prop="daimoney" label="贷款金额"  align="center"  width="150px"></el-table-column>
            <el-table-column prop="shouCard" label="收款卡号"  align="center"  width="150px"></el-table-column>
            <el-table-column prop="huanCard" label="还款卡号"  align="center"  width="150px"></el-table-column>
            <el-table-column prop="mou" label="还款期数"  align="center"  width="150px"></el-table-column>
            <el-table-column prop="daiDate" label="贷款时间" :formatter="dateFormat"  align="center"  width="150px"></el-table-column>
            <el-table-column prop="yihuan" label="已还期数"  align="center"  width="150px"></el-table-column>
            <el-table-column prop="onemoney" label="每期应还"  align="center"  width="150px"></el-table-column>
          </el-table>
        </el-dialog>
      </div>
      <!--用户详细信息-->
      <div><el-dialog
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
        dialogVisible1: false,//点击弹窗
        userName:"",
        total:0,  // 总记录数
        pageSize:8, //每页显示的条数
        currentPage:1, //当前页
        list:[],  //当前现实的记录信息
        listall:[],//存放银行卡信息
        listedu:[],//存放学历信息
        listcar:[],//存放车辆信息
        listhome:[],//存放房屋信息
        listSamlldai:[],
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
      //修改小额贷款额度
      updateerdu:function(index, row){
        alert(row.usersid)
      },
      //查询货款信息
      selectSamlldaiOrderByid:function(index, row){

         this.axios.get
          ("http://localhost:10086/selectSamlldaiOrderByid?id=" + row.usersid).then(res=>{
           console.log("查询到的记录"+res.data);
          this.listSamlldai=res.data;
        })
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
          //时间处理
          let date=new Date(this.listedu.beginDate);
          let d;
          if(date.getDate()>10){
            d=date.getDate()
          }else{
            d="0"+date.getDate()
          }
          let m;
          if((date.getMonth()+1)>10){
            m=(date.getMonth()+1)
          }else{
            m="0"+(date.getMonth()+1)
          }
          this.listedu.beginDate=date.getFullYear()+"-"+m+"-"+d;
          //时间处理
          let date1=new Date(this.listedu.endDate);
          let d1;
          if(date1.getDate()>10){
            d1=date1.getDate()
          }else{
            d1="0"+date1.getDate()
          }
          let m1;
          if((date1.getMonth()+1)>10){
            m1=(date1.getMonth()+1)
          }else{
            m1="0"+(date1.getMonth()+1)
          }
          this.listedu.endDate=date1.getFullYear()+"-"+m+"-"+d;
          //时间处理
          let date2=new Date(this.listedu.ndate);
          let d2;
          if(date2.getDate()>10){
            d2=date2.getDate()
          }else{
            d2="0"+date2.getDate()
          }
          let m2;
          if((date2.getMonth()+1)>10){
            m2=(date2.getMonth()+1)
          }else{
            m2="0"+(date2.getMonth()+1)
          }
          this.listedu.ndate=date2.getFullYear()+"-"+m+"-"+d;
          //时间处理
          let date3=new Date(this.listcar.ndate);
          let d3;
          if(date3.getDate()>10){
            d3=date3.getDate()
          }else{
            d3="0"+date3.getDate()
          }
          let m3;
          if((date3.getMonth()+1)>10){
            m3=(date3.getMonth()+1)
          }else{
            m3="0"+(date3.getMonth()+1)
          }
          this.listcar.ndate=date3.getFullYear()+"-"+m+"-"+d;
          //时间处理
          let date4=new Date(this.listhome.hdate);
          let d4;
          if(date4.getDate()>10){
            d4=date4.getDate()
          }else{
            d4="0"+date4.getDate()
          }
          let m4;
          if((date4.getMonth()+1)>10){
            m4=(date4.getMonth()+1)
          }else{
            m4="0"+(date4.getMonth()+1)
          }
          this.listhome.hdate=date4.getFullYear()+"-"+m+"-"+d;
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
