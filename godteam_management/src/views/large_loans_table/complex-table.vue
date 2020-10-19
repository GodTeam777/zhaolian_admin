<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input  placeholder="产品名" style="width: 200px;" class="filter-item" v-model="cname1" @keyup.enter.native="handleFilter" />
      <el-select v-model="ctype" placeholder="产品类型" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in calendarTypeOptions" :label="item.display_name" :value="item.key" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="c">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="insertadd">
        添加
      </el-button>

    </div>


    <el-table
      :data="pb"
      border
      style="width: 100%" >
      <el-table-column
        prop="bdid"
        label="编号"
        width="40">


      </el-table-column>
      <el-table-column
        prop="bdname"
        label="产品名"
        width="100"
      >

      </el-table-column>

      <el-table-column
        prop="bdpath"
        label="宣传图片"
        width="100"
      >
        　　<template slot-scope="scope">
        　　　　<img :src="scope.row.bdpath" width="40" height="40" class="head_pic"/>
        　　</template>
      </el-table-column>
      <el-table-column
        prop="interest"
        label="日息"
        width="40">
      </el-table-column>
      <el-table-column
        prop="bigdaiTitle"
        label="产品介绍标题"
        height="50"
        width="280">
      </el-table-column>
      <el-table-column
        prop="bigdaiBody"
        label="产品介绍详情"
        width="380">
      </el-table-column>
      <el-table-column
        prop="bdtype"
        label="类型">
      </el-table-column>
      <el-table-column
        prop="bddate"
        label="放款周期">
      </el-table-column>
      <el-table-column
        prop="smallMoney"
        label="最小贷款金额">
      </el-table-column>
      <el-table-column
        prop="bigMoney"
        label="最大贷款金额">
      </el-table-column>
      <el-table-column
        width="100"
        label="编辑">
        <template slot-scope="scope">
           <span>
         <el-button type="primary" icon="el-icon-edit" circle  @click="handleEdit(scope.$index, scope.row)"></el-button>
        </span>
          &nbsp;
          <span> <el-button type="danger" icon="el-icon-delete" circle @click="delect(scope.$index, scope.row)"></el-button></span>
        </template>

      </el-table-column>
    </el-table>

    <el-dialog title="提示" :visible.sync="dialogVisible" :before-close="handleClose">
      <span>是否删除</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">否</el-button>
    <el-button type="primary" @click="delectat">是</el-button>
  </span>
    </el-dialog>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogVisible1">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="myinsert1">
          提交
        </el-button>
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>

      </div>
    </el-dialog>

<!--    <el-dialog title="提示" :visible.sync="dialogVisible1" :before-close="handleClose">-->
<!--      <span>需要满足那些条件</span>-->
<!--      <span slot="footer" class="dialog-footer">-->
<!--        <el-form-item>-->
<!--          <el-select v-model="cvid" placeholder="身份证认证" clearable class="filter-item" style="width: 130px">-->
<!--        <el-option v-for="item in calendarTypeOptions1" :label="item.display_name" :value="item.key" />-->
<!--      </el-select>-->
<!--        </el-form-item>-->
<!--         <el-form-item>-->
<!--          <el-select v-model="cvid" placeholder="学历认证" clearable class="filter-item" style="width: 130px">-->
<!--        <el-option v-for="item in calendarTypeOptions1" :label="item.display_name" :value="item.key" />-->
<!--      </el-select>-->
<!--        </el-form-item>-->
<!--         <el-form-item>-->
<!--          <el-select v-model="cvid" placeholder="车辆认证" clearable class="filter-item" style="width: 130px">-->
<!--        <el-option v-for="item in calendarTypeOptions1" :label="item.display_name" :value="item.key" />-->
<!--      </el-select>-->
<!--        </el-form-item>-->
<!--         <el-form-item>-->
<!--          <el-select v-model="cvid" placeholder="房屋认证" clearable class="filter-item" style="width: 130px">-->
<!--        <el-option v-for="item in calendarTypeOptions1" :label="item.display_name" :value="item.key" />-->
<!--      </el-select>-->
<!--        </el-form-item>-->
<!--    <el-button @click="dialogVisible = false">否</el-button>-->
<!--    <el-button type="primary" @click="delectat">是</el-button>-->
<!--  </span>-->
<!--    </el-dialog>-->

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="num"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="mypagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totals">
    </el-pagination>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item label="产品名" prop="">
          <el-input type="text" v-model="Bigdai.bdname"  placeholder="请输入产品名"></el-input>
        </el-form-item>
        <el-form-item label="日息" prop="rxi">
          <el-input v-model="Bigdai.interest" oninput = "value=value.replace(/[^\d.]/g,'')" placeholder="请输入日息"></el-input>
        </el-form-item>

        <el-form-item label="类型" prop="type1">
          <el-input v-model="Bigdai.bdtype" placeholder="类型"></el-input>
        </el-form-item>
        <el-form-item label="放款周期" prop="date1">
          <el-input v-model="Bigdai.bddate" placeholder="放款周期"></el-input>
        </el-form-item>
        <el-form-item label="最小贷款金额" prop="smal1">
          <el-input v-model="Bigdai.smallMoney" placeholder="最小贷款金额"></el-input>
        </el-form-item>
        <el-form-item label="最大贷款金额" prop="big1">
          <el-input v-model="Bigdai.bigMoney" placeholder="最大贷款金额"></el-input>
        </el-form-item>
        <el-form-item label="产品介绍标题" prop="title1">
          <el-input type="textarea" rows="5" v-model="Bigdai.bigdaiTitle" placeholder="产品介绍标题"></el-input>
        </el-form-item>
        <el-form-item label="产品介绍详情" prop="body1">
          <el-input type="textarea" rows="5"  v-model="Bigdai.bigdaiBody" placeholder="产品介绍详情"></el-input>
        </el-form-item>
        <el-form-item>
        <el-upload style="width: 28.5%;height:180px;"
                   class="avatar-uploader"
                   action="https://jsonplaceholder.typicode.com/posts/"
                   :show-file-list="false"
                   :auto-upload="false"

                   :http-request="uploadFile"

                   :on-change="handleAvatarSuccess"
                   ref="upload"
                   accept=".jpg,.jpeg,.png,.JPG,.JPEG"  >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="myupdate">
          提交
        </el-button>
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>

      </div>
    </el-dialog>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible1">
      <el-form ref="dataForm" :rules="rules" :model="Bigdai" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item label="产品名" prop="bdname">
          <el-input type="text" v-model="Bigdai.bdname"  placeholder="请输入产品名"></el-input>
        </el-form-item>
        <el-form-item label="日息" prop="interest">
          <el-input v-model="Bigdai.interest" oninput = "value=value.replace(/[^\d.]/g,'')" placeholder="请输入日息"></el-input>
        </el-form-item>

        <el-form-item label="类型" prop="bdtype">
          <el-input v-model="Bigdai.bdtype" placeholder="类型"></el-input>
        </el-form-item>
        <el-form-item label="放款周期" prop="bddate">
          <el-input v-model="Bigdai.bddate" placeholder="放款周期"></el-input>
        </el-form-item>
        <el-form-item label="最小贷款金额" prop="smallMoney">
          <el-input v-model="Bigdai.smallMoney" placeholder="最小贷款金额"></el-input>
        </el-form-item>
        <el-form-item label="最大贷款金额" prop="bigMoney">
          <el-input v-model="Bigdai.bigMoney" placeholder="最大贷款金额"></el-input>
        </el-form-item>
        <el-form-item label="产品介绍标题" prop="bigdaiTitle">
          <el-input type="textarea" rows="5" v-model="Bigdai.bigdaiTitle" placeholder="产品介绍标题"></el-input>
        </el-form-item>
        <el-form-item label="产品介绍详情" prop="bigdaiBody">
          <el-input type="textarea" rows="5"  v-model="Bigdai.bigdaiBody" placeholder="产品介绍详情"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="queae" placeholder="身份证认证" clearable class="filter-item" style="width: 130px" :disabled="true">
            <el-option v-for="item in calendarTypeOptions1" :label="item.display_name" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="bigdaivlidate.xueli" placeholder="学历认证" clearable class="filter-item" style="width: 130px">
            <el-option v-for="item in calendarTypeOptions1" :label="item.display_name" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="bigdaivlidate.cheliang" placeholder="车辆认证" clearable class="filter-item" style="width: 130px">
            <el-option v-for="item in calendarTypeOptions1" :label="item.display_name" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="bigdaivlidate.home" placeholder="房屋认证" clearable class="filter-item" style="width: 130px">
            <el-option v-for="item in calendarTypeOptions1" :label="item.display_name" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-upload style="width: 28.5%;height:180px;"
                     class="avatar-uploader"
                     action="https://jsonplaceholder.typicode.com/posts/"
                     :show-file-list="false"
                     :auto-upload="false"

                     :http-request="uploadFile"

                     :on-change="handleAvatarSuccess"
                     ref="upload"
                     accept=".jpg,.jpeg,.png,.JPG,.JPEG"  >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="myinsert">
          提交
        </el-button>
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>

      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">Confirm</el-button>
      </span>
    </el-dialog>




  </div>
</template>
<style lang="stylus">
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
<script>
import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const calendarTypeOptions = [
  { key: '抵押贷', display_name: '抵押贷' },
  { key: '质押贷', display_name: '质押贷' },
  { key: '担保贷', display_name: '担保贷' },
  { key: '信用贷', display_name: '信用贷' }
]
const calendarTypeOptions1 = [
  { key: '1', display_name: '需要' },
  { key: '0', display_name: '不需要' }

]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})
const calendarTypeKeyValue1 = calendarTypeOptions1.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      isImgupdate:false,
      queae:'1',
      formDate:"",
      imageUrl: '',
      num:1,
      pagenum:"",
        cname1:"",
      ctype:"",
      cvid:"",
      upd:{
        id:'',
        bname:''
      },
      Bigdai:{
        "bdid":'',
        "bdpath":'',
        "bdname":'',
        "interest":'',
        "bigdaiTitle":'',
        "bigdaiBody":'',
        "bdtype":'',
        "bddate":'',
        "smallMoney":'',
        "bigMoney":''
      },
      bigdaivlidate:{
        "idcard":'',
        "xueli":'',
        "cheliang":'',
        "home":''
      },




      mypagesize:1,
      totals:'',
      pb:[],
      users:{
        "uname":'农行抵押贷'
      },
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,

      },

      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      calendarTypeOptions1,
      sortOptions: [{ label: '升序', key: '+id' }, { label: '降序', key: '-id' }],
      showReviewer: false,
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      dialogFormVisible1:false,
      dialogFormVisible: false,
      dialogVisible:false,
      dialogVisible1:false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      // formdate:{
      //   bdname1:'',
      //   rxi:'',
      //   title1:'',
      //   body1:'',
      //   type1:'',
      //   date1:'',
      //   smal1:'',
      //   big1:''
      // },
      rules: {
        bdname: [
          { required: true, message: '产品名不能为空',  trigger: 'blur'},
          { min: 3, max: 5, message: '长度在 3 到 5 个字符' }
        ],
        interest: [
          { required: true, message: '产品日息不能为空',transform: (value) => Number(value)}
        ],
        bigdaiTitle: [
          { required: true, message: '产品标题不能为空'}
        ],
        bigdaiBody: [
          { required: true, message: '产品信息不能为空'}
        ],
        bdtype: [
          { required: true, message: '产品类型不能为空'}
        ],
        bddate: [
          { required: true, message: '产品周期不能为空',transform: (value) => Number(value)}
        ],
        smallMoney: [
          { required: true, message: '产品最小额度不能为空',transform: (value) => Number(value)}
        ],
        bigMoney: [
          { required: true, message: '产品最大额度不能为空',transform: (value) => Number(value)}
        ]

      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  mounted() {

    this.axios({
      url:'http://localhost:10086/listByPage',
      method:'POST',
      withCredentials:true,
      data:{
        pageNumber:'1',
        pageSize:'4',

      },
    }).then(res =>{
      this.pb=res.data.rows
      this.totals = res.data.total
    })
  }
  ,
  methods: {
    uploadFile(file){
      this.formDate.append('file', file.file);
      this.isImgupdate=true;
    }
    ,
    handleAvatarSuccess(file, fileList) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    insertadd(){
      this.dialogFormVisible1=true
    },
    delectat(){

      this.axios({
        url:'http://localhost:10086/delect',
        method:'POST',
        withCredentials:true,
        data:{
          dbid:this.Bigdai.bdid
        },
      }).then(res =>{
        this.pb=res.data.rows
        this.totals = res.data.total
        location.reload()
      })
    },
    myinsert(){
      this.dialogFormVisible1=true

      this.formDate = new FormData()
      this.$refs.upload.submit();
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      this.axios.post("http://localhost:10086/liupload",this.formDate, config).then(res => {
          alert("图片上传完成")
      this.axios({
        url:'http://localhost:10086/insert1',
        method:'POST',
        withCredentials:true,
        data:{
          idcard:'1',
          xueli:this.bigdaivlidate.xueli,
          cheliang:this.bigdaivlidate.cheliang,
          home:this.bigdaivlidate.home,
          bdid:this.Bigdai.bdid,
          bdname:this.Bigdai.bdname,
          interest:this.Bigdai.interest,
          bigdaiTitle:this.Bigdai.bigdaiTitle,
          bigdaiBody:this.Bigdai.bigdaiBody,
          bdtype:this.Bigdai.bdtype,
          bddate:this.Bigdai.bddate,
          smallMoney:this.Bigdai.smallMoney,
          bigMoney:this.Bigdai.bigMoney
        },
      }).then(res =>{
        this.pb=res.data.rows
        this.totals = res.data.total
        location.reload()
      }).catch(res => {
        console.log(res);
      })}).catch(res => {
        console.log(res);
      })
    },
    myupdate(){
      this.formDate = new FormData()
      this.$refs.upload.submit();
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      if(this.isImgupdate){
        this.axios.post("http://localhost:10086/liupload",this.formDate, config).then(res => {
          alert("图片上传完成")
          this.axios({
            url:'http://localhost:10086/update1',
            method:'POST',
            withCredentials:true,
            data:{
              bdid:this.Bigdai.bdid,
              bdname:this.Bigdai.bdname,
              interest:this.Bigdai.interest,
              bigdaiTitle:this.Bigdai.bigdaiTitle,
              bigdaiBody:this.Bigdai.bigdaiBody,
              bdtype:this.Bigdai.bdtype,
              bddate:this.Bigdai.bddate,
              smallMoney:this.Bigdai.smallMoney,
              bigMoney:this.Bigdai.bigMoney

            },
          }).then(res =>{

            this.pb=res.data.rows
            this.totals = res.data.total
            location.reload()
          })
        }).catch(res => {
          console.log(res);
        })
      }else {
        this.axios({
          url:'http://localhost:10086/update1',
          method:'POST',
          withCredentials:true,
          data:{
            bdid:this.Bigdai.bdid,
            bdname:this.Bigdai.bdname,
            interest:this.Bigdai.interest,
            bigdaiTitle:this.Bigdai.bigdaiTitle,
            bigdaiBody:this.Bigdai.bigdaiBody,
            bdtype:this.Bigdai.bdtype,
            bddate:this.Bigdai.bddate,
            smallMoney:this.Bigdai.smallMoney,
            bigMoney:this.Bigdai.bigMoney

          },
        }).then(res =>{

          this.pb=res.data.rows
          this.totals = res.data.total
          location.reload()
        })

      }


    },
    delect(index, row){
      this.dialogVisible = true
      this.Bigdai.bdid=row.bdid
    },
    handleEdit(index, row) {

    this.dialogFormVisible = true
      this.Bigdai.bdid=row.bdid
      this.Bigdai.bdname=row.bdname
      this.Bigdai.interest=row.interest
      this.Bigdai.bigdaiTitle=row.bigdaiTitle
      this.Bigdai.bigdaiBody=row.bigdaiBody
      this.Bigdai.bdtype=row.bdtype
      this.Bigdai.bddate=row.bddate
      this.Bigdai.smallMoney=row.smallMoney
      this.Bigdai.bigMoney=row.bigMoney
    },
    handleSizeChange(val) {
      this.num=1;
      this.mypagesize=val
      this.axios({
        url:'http://localhost:10086/listByPage',
        method:'POST',
        withCredentials:true,
        data:{
          pageNumber:'1',
          pageSize:this.mypagesize,

        },
      }).then(res =>{
        this.pb=res.data.rows
        this.totals = res.data.total
      })
    },
    handleCurrentChange(val) {
      this.axios({
        url:'http://localhost:10086/listByPage',
        method:'POST',
        withCredentials:true,
        data:{
          pageNumber:val,
          pageSize:this.mypagesize,

        },
      }).then(res =>{
        this.pb=res.data.rows
        this.totals = res.data.total
      })
    },

    clickselect(){
      // this.axios.post("http://localhost:10086/listByPage",this.users).then(result =>{
      //   alert("1")
      //   alert(c)
      // }).then()
      this.axios({
        url:'http://localhost:10086/listByPage',
        method:'POST',
        withCredentials:true,
        data:{
          pageNumber:'1',
          pageSize:this.mypagesize,
name:this.cname1,
          type:this.ctype

        },
      }).then(res =>{

        this.pb=res.data.rows
        this.totals = res.data.total


      })
    },

    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormViseible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleDelete(row, index) {
      this.$notify({
        title: '删除',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      this.list.splice(index, 1)
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>
