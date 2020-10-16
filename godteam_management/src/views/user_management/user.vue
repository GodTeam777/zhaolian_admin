<template>
  <div>


    <div class="add">

      <!--搜索框-->
      <el-input placeholder="请输入用户名" v-model="news_params.search_name" class="input-with-select" style="width: 300px;" >
        <el-button slot="append" icon="el-icon-search" @click="btnsearch_name"></el-button>
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
        <el-table-column prop="usersid" label="编号" sortable align="center"  width="90%"></el-table-column>
        <el-table-column prop="uname" label="昵称"  align="center"  width="110%"></el-table-column>
        <el-table-column prop="sex" label="性别" align="center" width="80%"></el-table-column>
        <el-table-column prop="birthday" label="出生日期"  :formatter="dateFormat" align="center" width="100%"></el-table-column>
        <el-table-column prop="smalldai" label="贷款额度"   align="center" width="110%"></el-table-column>
        <el-table-column prop="petname" label="账号" align="center" width="110%"></el-table-column>
        <el-table-column label="操作"  width="220%" align="center" >
          <template slot-scope="scope" align="center">
            <el-button  type="success" icon="el-icon-search" size="mini" round
                        @click="dialogVisible = true" @click.prevent="tangchaung(scope.$index, scope.row)"
            >查看详情</el-button>
            <el-button  type="success" icon="el-icon-document" size="mini" round
                        @click="dialogVisible1 = true" @click.prevent="selectSamlldaiOrderByid(scope.$index, scope.row)" style=";width: 90px"
            >贷款记录</el-button>
          </template>
        </el-table-column>
        <el-table-column label="编辑" align="center"  width="335%">
          <template slot-scope="scope" align="center">

            <el-button  icon="el-icon-edit" size="mini"round
                        @click="dialogVisible2 = true"  @click.prevent="updateedaikuan(scope.$index, scope.row)"style=";width: 90px"
            >编辑额度</el-button>
            <el-button  type="info" icon="el-icon-edit" size="mini"round
                        @click="dialogVisible3 = true"  @click.prevent="selectByidlilv(scope.$index, scope.row)"style=";width: 90px"
            >编辑利率</el-button>
            <el-button  v-show="scope.row.status==1" type="danger" icon="el-icon-warning" size="mini"round
                        @click.prevent="Updatejinyong(scope.$index, scope.row)"style=";width: 90px"
            >禁用贷款</el-button>
            &nbsp; &nbsp;      &nbsp; &nbsp;&nbsp; &nbsp;<span v-show="scope.row.status==0" ><el-button type="danger"  size="mini" round
                                                                                                        @click.prevent="(scope.$index, scope.row)" disabled="disabled" style=";width: 90px">已禁用</el-button></span>
          </template>
        </el-table-column>
      </el-table>
      <!--编辑利率-->
      <div>
        <el-dialog
          title="编辑利率"
          :visible.sync="dialogVisible3"
          width="40%"

        >
          <el-form ref="form" label-width="80px">
            <el-form-item label="编号">
              <el-input  disabled v-model="Listlilv.usid"></el-input>
            </el-form-item>
            <el-form-item label="利率">
              <el-input   v-model="Listlilv.lilv"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="round" @click="updatelilv">立即修改</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </div>
      <!--修改额度-->
      <div>
        <el-dialog
          title="修改额度"
          :visible.sync="dialogVisible2"
          width="40%"

        >
          <el-form ref="form" label-width="80px">
            <el-form-item label="编号">
              <el-input  disabled v-model="listsmalldai.usersid"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
              <el-input  disabled v-model="listsmalldai.uname"></el-input>
            </el-form-item>
            <el-form-item label="额度">
              <el-input v-model="listsmalldai.smalldai"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="round" @click="updatedaikuan">立即修改</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </div>
      <!--货款记录-->
      <div>
        <el-dialog
          title="货款记录"
          :visible.sync="dialogVisible1"
          width="72.5%"
        >
          <el-table
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            fit
            :data="listSamlldai" border style="width: 100%" ref="multipleTable" tooltip-effect="dark">
            <el-table-column prop="sdoid" label="货款编号" sortable align="center"  width="109%"></el-table-column>
            <el-table-column prop="usersid" label="用户编号"  align="center"  width="80%"></el-table-column>
            <el-table-column prop="daimoney" label="贷款金额"  align="center"  width="90%"></el-table-column>
            <el-table-column prop="mou" label="还款期数"  align="center"  width="80%"></el-table-column>
            <el-table-column prop="daiDate" label="贷款时间" :formatter="dateFormat"  align="center"  width="100%"></el-table-column>
            <el-table-column prop="yihuan" label="已还期数"  align="center"  width="80%"></el-table-column>
            <el-table-column prop="onemoney" label="每期应还"  align="center"  width="100%"></el-table-column>
            <el-table-column prop="shouCard" label="收款卡号"  align="center"  width="155%"></el-table-column>
            <el-table-column prop="huanCard" label="还款卡号"  align="center"  width="155%"></el-table-column>
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
            <table border="0" width="100%">
              <tr >
                <td ><h3>基本信息</h3></td>
                <td rowspan="3" align="right">  <el-image
                  style="width: 100px;height: 100px"
                  :src="listall.front"
                  fit="fill"></el-image></td>
              </tr>
              <tr>
                <td > 用户姓名:{{listall.name}}</td>

              </tr>
              <tr>
                <td> 身份证号:{{listall.idcard}}</td>
              </tr>
            </table>


          </el-row>
        <el-row>
          <el-col :span="24"><hr  width="100%"color='#BFBFBF' SIZE=1></el-col>
        </el-row>
        <table border="0" width="100%">
          <tr >
            <td ><h3>学历信息</h3></td>
            <td rowspan="5" align="right">  <el-image
              style="width: 100px;height: 100px"
              :src="listedu.spath"
              fit="fill"></el-image></td>
          </tr>
          <tr>
            <td > 学院名称:{{listedu.schoolname}}</td>

          </tr>
          <tr>
            <td> 入学时间:{{listedu.beginDate}}</td>
          </tr>
          <tr>
            <td> 毕业时间:{{listedu.endDate}}</td>
          </tr>
          <tr>
            <td> 学历学位:{{listedu.degree}}</td>
          </tr>
          <tr>
            <td> 入学时间:{{listedu.beginDate}}</td>
          </tr>
        </table>
        <el-row>
          <el-col :span="24"><hr  width="100%"color='#BFBFBF' SIZE=1></el-col>
        </el-row>
        <table border="0" width="100%">
          <tr >
            <td ><h3>车辆信息</h3></td>
            <td rowspan="4" align="right">  <el-image
              style="width: 100px;height: 100px"
              :src="listcar.cpath"
              fit="fill"></el-image></td>
          </tr>
          <tr>
            <td > 车辆品牌:{{listcar.carbrand}}</td>

          </tr>
          <tr>
            <td> 车辆车牌:{{listcar.carid}}</td>
          </tr>
          <tr>
            <td> 车辆归属地:{{listcar.caraddress}}</td>
          </tr>
          <tr>
            <td> 认证时间:{{listcar.ndate}}</td>
          </tr>
        </table>
        <el-row>
          <el-col :span="24"><hr  width="100%"color='#BFBFBF' SIZE=1></el-col>
        </el-row>
        <table border="0" width="100%">
          <tr >
            <td ><h3>房屋信息</h3></td>
            <td rowspan="4" align="right">  <el-image
              style="width: 100px;height: 100px"
              :src="listhome.hpath"
              fit="fill"></el-image></td>
          </tr>
          <tr>
            <td > 房主姓名:{{listhome.hname}}</td>

          </tr>
          <tr>
            <td> 房屋地址:{{listhome.haddress}}</td>
          </tr>
          <tr>
            <td> 认证时间:{{listhome.hdate}}</td>
          </tr>
        </table>
      </el-dialog></div>

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
    </div></div>
</template>
<script>
  export default{
    data(){
      return {
        //修改---
        listsmalldai:[],
        hid:'',//房屋信息
        cid:'',//车辆id
        edusersid:'',//学历id
        id:'',//银行卡id
        dialogVisible: false,//点击弹窗
        dialogVisible1: false,//点击弹窗
        dialogVisible2:false,
        dialogVisible3:false,
        userName:"",
        total:0,  // 总记录数
        Size:8, //每页显示的条数
        currentPage:1, //当前页
        list:[],  //当前现实的记录信息
        listall:[],//存放银行卡信息
        listedu:[],//存放学历信息
        listcar:[],//存放车辆信息
        listhome:[],//存放房屋信息
        listSamlldai:[],//存放贷款记录
        Listlilv:[],//存放利率记录
        listforbidden:[],//存放禁用
        news_params:{
          pageNumber: 1,
          pageSize: 6,
          search_name: '',
        }
      }
    },
    methods:{
      //全部查询
      show:function(page,pageSize){
        this.axios.post('http://localhost:10086/queryPagesUsers',this.news_params).then(res=>{
          console.log("返回："+res.data)
          this.list=res.data.data;
          this.total=res.data.totalRecords;
          this.Size=res.data.pageSize;
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
      //高级查询
      btnsearch_name(){
        this.show();
      },
      // 禁用
      Updatejinyong:function(index, row){
        row.status=0//禁用
        this.$confirm('是否禁用,一经处理不可改变?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.axios.post("http://localhost:10086/Updatejinyong",
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
      //执行利率修改
      updatelilv:function(){
        this.axios.post("http://localhost:10086/updatelilv",
          JSON.stringify({"usid":this.Listlilv.usid,"lilv": this.Listlilv.lilv})).then(result=>{
          if (result.status === 200) {
            this.$notify({
              title: '成功',
              message: '额度修改成功',
              type: 'success',
            },2000);
            //页面刷新
            location.reload();
          } else {
            // 失败了
            alert("修改失败！");
          }
        })
      },
      //按个人编号查询利率
      selectByidlilv:function(index,row){
        this.axios.get("http://localhost:10086/ISmadaiLilv?id="+row.usersid).then(res=>{
          this.Listlilv=res.data;
          if(res.data==''){
            this.Listlilv={usid:"无",lilv:"无"}
          }
        }).catch(reason=>{
        })
      },
      //执行修改
      updatedaikuan:function(){
        this.axios
          .post("http://localhost:10086/updatedaikuan",
            JSON.stringify({"usersid":this.listsmalldai.usersid,"smalldai": this.listsmalldai.smalldai})).then(result=>{
          if (result.status === 200) {
            // alert("修改成功！");
            this.$notify({
              title: '成功',
              message: '额度修改成功',
              type: 'success',
            },2000);
            //页面刷新
            location.reload();
          } else {
            // 失败了
            alert("修改失败！");
          }
        })
      },
      //按编号查询修改小额贷款额度
      updateedaikuan:function(index, row){
        this.axios.get("http://localhost:10086/queryUserById?id=" + row.usersid).then(res=>{
          console.log("查询到的记录"+res.data);
          this.listsmalldai=res.data;
        }).catch(reason=>{
          this.listsmalldai='';
        })
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
          console.log("返回："+res.data.car)
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
          if(this.listall===undefined){
            //异常处理 不存在设置为 无
            this.listall={name:'无',idcard:'无'};//银行卡信息
          }if(this.listedu===undefined){
            this.listedu={schoolname:'无',beginDate:'无',endDate:'无',degree:'无',ndate:'无'};//接收学历信息
          }
          if(this.listcar===undefined){
            this.listcar={carbrand:'无',carid:'无',caraddress:'无',ndate:'无'};//接收学历信息
          }
          if(this.listhome===undefined){
            this.listhome={hname:'无',haddress:'无',hdate:'无'};//接收房屋信息
          }





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
  .add {
    border: 1px solid #eee;
    margin: 10px 0;
    padding: 15px;
  }
</style>
