<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="uname" placeholder="产品名"  style="width: 200px;" class="filter-item"  @keyup.enter.native="handleFilter" />
<!--      <el-input v-model="cname" placeholder="产品类型"  style="width: 200px;" class="filter-item"  @keyup.enter.native="handleFilter" />-->
      <el-select v-model="cname" placeholder="状态" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="clickselect">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="myinsert">
        添加
      </el-button>

    </div>
    <el-table
      :data="pb"
      border
      style="width: 100%" >
      <el-table-column
        prop="mpid"
        label="产品id"
        width="40">


      </el-table-column>
      <el-table-column
        prop="mpname"
        label="产品名"
        width="100"
      >

      </el-table-column>

      <el-table-column
        prop="mppath"
        label="宣传图片"
        width="100"
      >
        　　<template slot-scope="scope">
        　　　　<img :src="scope.row.mppath" width="40" height="40" class="head_pic"/>
        　　</template>
      </el-table-column>
      <el-table-column
        prop="mptype"
        label="产品类型"
        >
      </el-table-column>
      <el-table-column
        prop="income"
        label="年化利率"
        height="50"
        >
      </el-table-column>
      <el-table-column
        prop="mpTitle"
        label="产品介绍标题"
        width="120"
        show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        prop="mpBody"
        width="120"
        label="产品介绍主体"
        show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        prop="zhouqi"
        label="收益产生周期">
      </el-table-column>
      <el-table-column
        prop="minMoney"
        label="最低买入量">
      </el-table-column>
      <el-table-column
        prop="bigMoney"
        label="最高买入量">
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
        <el-form-item label="产品名" prop="bdname">
          <el-input v-model="Bigdai.mpname" placeholder="请输入产品名"></el-input>
        </el-form-item>
        <el-form-item label="产品类型" prop="rxi">
          <el-input v-model="Bigdai.mptype"  placeholder="请输入产品类型"></el-input>
        </el-form-item>
        <el-form-item label="年化利率" prop="title1">
          <el-input v-model="Bigdai.income" placeholder="请输入年化利率"></el-input>
        </el-form-item>
        <el-form-item label="产品介绍标题" prop="body1">
          <el-input type="textarea" rows="5"  v-model="Bigdai.mp_title" placeholder="产品介绍标题"></el-input>
        </el-form-item>
        <el-form-item label="产品介绍主体" prop="type1">
          <el-input type="textarea" rows="5"  v-model="Bigdai.mp_body" placeholder="产品介绍主体"></el-input>
        </el-form-item>
        <el-form-item label="收益产生周期" prop="date1">
          <el-input v-model="Bigdai.zhouqi" placeholder="收益产生周期"></el-input>
        </el-form-item>
        <el-form-item label="最低买入量" prop="smal1">
          <el-input v-model="Bigdai.min_money" placeholder="最低买入量"></el-input>
        </el-form-item>
        <el-form-item label="最高买入量" prop="big1">
          <el-input v-model="Bigdai.big_money" placeholder="最高买入量"></el-input>
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
    <el-dialog title="提示" :visible.sync="dialogVisible" :before-close="handleClose">
      <span>是否删除</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">否</el-button>
    <el-button type="primary" @click="meymodelectat">是</el-button>
  </span>
    </el-dialog>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible1">
      <el-form ref="dataForm" :rules="rules" :model="Bigdai" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item label="产品名" prop="mpname">
          <el-input v-model="Bigdai.mpname" placeholder="请输入产品名"></el-input>
        </el-form-item>
        <el-form-item label="产品类型" prop="mptype">
          <el-input v-model="Bigdai.mptype"  placeholder="请输入产品类型"></el-input>
        </el-form-item>
        <el-form-item label="年化利率" prop="income">
          <el-input v-model="Bigdai.income" placeholder="请输入年化利率"></el-input>
        </el-form-item>
        <el-form-item label="产品介绍标题" prop="mp_title">
          <el-input type="textarea" rows="5"  v-model="Bigdai.mp_title" placeholder="产品介绍标题"></el-input>
        </el-form-item>
        <el-form-item label="产品介绍主体" prop="mp_body">
          <el-input type="textarea" rows="5"  v-model="Bigdai.mp_body" placeholder="产品介绍主体"></el-input>
        </el-form-item>
        <el-form-item label="收益产生周期" prop="zhouqi">
          <el-input v-model="Bigdai.zhouqi" placeholder="收益产生周期"></el-input>
        </el-form-item>
        <el-form-item label="最低买入量" prop="min_money">
          <el-input v-model="Bigdai.min_money" placeholder="最低买入量"></el-input>
        </el-form-item>
        <el-form-item label="最高买入量" prop="big_money">
          <el-input v-model="Bigdai.big_money" placeholder="最高买入量"></el-input>
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
        <el-button type="primary" @click="myinsert1">
          提交
        </el-button>
        <el-button @click="dialogFormVisible1 = false">
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
  .el-tooltip__popper{font-size: 14px; max-width:50% } /*设置显示隐藏部分内容，按50%显示*/
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
    { key: '定期', display_name: '定期' },
    { key: '活期', display_name: '活期' }

  ]

  // arr to obj, such as { CN : "China", US : "USA" }
  const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
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
        imageUrl:"",
        isImgupdate:false,
        num:1,
        pagenum:"",
        uname:'',
        cname:'',
        stust:'',
        upd:{
          id:'',
          bname:''
        },
        Bigdai:{

          "mpid":'',
          "mpname":'',
          "mptype":'',
          "income":'',
          "mppath":'',
          "mp_title":'',
          "mp_body":'',
          "zhouqi":'',
          "min_money":'',
          "big_money":''



        },




        mypagesize:4,
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
        dialogFormVisible: false,
        dialogFormVisible1:false,
        dialogVisible:false,
        dialogStatus: '',
        textMap: {
          update: 'Edit',
          create: 'Create'
        },
        dialogPvVisible: false,
        pvData: [],
        rules: {
          mpname: [
            { required: true, message: '产品名不能为空',  trigger: 'blur'},
            { min: 3, max: 5, message: '长度在 3 到 5 个字符' }
          ],
          mptype: [
            { required: true, message: '产品类型不能为空'}
          ],
          income: [
            { required: true, message: '年化利率不能为空'},
            { type: 'number', message: '必须是数字',trigger: 'blur',transform: (value) => Number(value)}
          ],
          mp_title: [
            { required: true, message: '产品标题不能为空'}
          ],
          mp_body: [
            { required: true, message: '产品主体为空'}
          ],
          zhouqi: [
            { required: true, message: '产品周期不能为空'},
            { type: 'number', message: '必须是数字',trigger: 'blur',transform: (value) => Number(value)}
          ],
          min_money: [
            { required: true, message: '最低买入量不能为空'},
            { type: 'number', message: '必须是数字',trigger: 'blur',transform: (value) => Number(value)}
          ],
          big_money: [
            { required: true, message: '最高买入量不能为空'},
            { type: 'number', message: '必须是数字',trigger: 'blur',transform: (value) => Number(value)}
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
        url:'http://localhost:10086/moneyByPage',
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
      meymodelectat(){

        this.axios({
          url:'http://localhost:10086/molidelect',
          method:'POST',
          withCredentials:true,
          data:{
            mpid:this.Bigdai.mpid
          },
        }).then(res =>{
          this.pb=res.data.rows
          this.totals = res.data.total
          location.reload()
        })
      },
      delect(index, row){
        this.dialogVisible = true
        this.Bigdai.mpid=row.mpid
      },
      myinsert1(){
        this.dialogFormVisible1=true

        this.formDate = new FormData()
        this.$refs.upload.submit();
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        this.axios.post("http://localhost:10086/moliupload",this.formDate, config).then(res => {
          alert("图片上传完成")
          this.axios({
            url:'http://localhost:10086/moliinsert',
            method:'POST',
            withCredentials:true,
            data:{
              mpid:this.Bigdai.mpid,
              mpname:this.Bigdai.mpname,
              mptype:this.Bigdai.mptype,
              income:this.Bigdai.income,
              mppath:this.Bigdai.mppath,
              mpTitle:this.Bigdai.mp_title,
              mpBody:this.Bigdai.mp_body,
              zhouqi:this.Bigdai.zhouqi,
              minMoney:this.Bigdai.min_money,
              bigMoney:this.Bigdai.big_money
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
      myinsert(){
        this.dialogFormVisible1=true
      },
      uploadFile(file){
        this.formDate.append('file', file.file);
        this.isImgupdate=true;
      },
      handleAvatarSuccess(file, fileList) {
        this.imageUrl = URL.createObjectURL(file.raw);
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
          this.axios.post("http://localhost:10086/moliupload",this.formDate, config).then(res => {
            alert("图片上传完成")
            this.axios({
              url:'http://localhost:10086/moupdate',
              method:'POST',
              withCredentials:true,
              data:{
                mpid:this.Bigdai.mpid,
                mpname:this.Bigdai.mpname,
                mptype:this.Bigdai.mptype,
                income:this.Bigdai.income,
                mpTitle:this.Bigdai.mp_title,
                mpBody:this.Bigdai.mp_body,
                zhouqi:this.Bigdai.zhouqi,
                minMoney:this.Bigdai.min_money,
                bigMoney:this.Bigdai.big_money
              },
            }).then(res =>{

              this.pb=res.data.rows
              this.totals = res.data.total
              location.reload()
            })
          }).catch(res => {
            console.log(res);
          })
        }else{
          this.axios({
            url:'http://localhost:10086/moupdate',
            method:'POST',
            withCredentials:true,
            data:{
              mpid:this.Bigdai.mpid,
              mpname:this.Bigdai.mpname,
              mptype:this.Bigdai.mptype,
              income:this.Bigdai.income,
              mpTitle:this.Bigdai.mp_title,
              mpBody:this.Bigdai.mp_body,
              zhouqi:this.Bigdai.zhouqi,
              minMoney:this.Bigdai.min_money,
              bigMoney:this.Bigdai.big_money
            },
          }).then(res =>{

            this.pb=res.data.rows
            this.totals = res.data.total
            location.reload()
          })
        }



      },
      update(row){
        alert(row.bdtype)
      },
      handleEdit(index, row) {

        this.dialogFormVisible = true
        this.Bigdai.mpid=row.mpid
        this.Bigdai.mpname=row.mpname
        this.Bigdai.mptype=row.mptype
        this.Bigdai.income=row.income
        this.Bigdai.mppath=row.mppath
        this.Bigdai.mp_title=row.mpTitle
        this.Bigdai.mp_body=row.mpBody
        this.Bigdai.zhouqi=row.zhouqi
        this.Bigdai.min_money=row.minMoney
        this.Bigdai.big_money=row.bigMoney



      },
      // myupdate(){
      //   this.axios({
      //     url:'http://localhost:10086/bigdaiorderupdate',
      //     method:'POST',
      //     withCredentials:true,
      //     data:{
      //       boid:this.Bigdai.boid,
      //       bigmoney:this.Bigdai.bigmoney,
      //       bigdaiDate:this.Bigdai.bigdaiDate,
      //       yihuan:this.Bigdai.yihuan,
      //       huanCard:this.Bigdai.huanCard,
      //       shouCard:this.Bigdai.shouCard,
      //       daiDate:this.Bigdai.daiDate,
      //       onemoney: this.Bigdai.onemoney,
      //       status:this.Bigdai.status,
      //       bigdai:this.Bigdai.bigMoney,
      //       users:this.Bigdai.uname,
      //       bigdai:this.Bigdai.bdname
      //     },
      //   }).then(res =>{
      //
      //     this.pb=res.data.rows
      //     this.totals = res.data.total
      //     location.reload()
      //   })
      //
      // },

      handleSizeChange(val) {
        this.num=1;

        this.mypagesize=val
        this.axios({
          url:'http://localhost:10086/moneyByPage',
          method:'POST',
          withCredentials:true,
          data:{
            pageNumber:'1',
            pageSize:this.mypagesize,
            name:this.uname,
            aname:this.cname,
            stua:this.stust

          },
        }).then(res =>{
          this.pb=res.data.rows
          this.totals = res.data.total
        })
      },

      handleCurrentChange(val) {
        this.axios({
          url:'http://localhost:10086/moneyByPage',
          method:'POST',
          withCredentials:true,
          data:{
            pageNumber:val,
            pageSize:this.mypagesize,
            name:this.uname,
            aname:this.cname,
            stua:this.stust
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
        this.num=1
        this.axios({
          url:'http://localhost:10086/moneyByPage',
          method:'POST',
          withCredentials:true,
          data:{
            pageNumber:'1',
            pageSize:this.mypagesize,
            name:this.uname,
            aname:this.cname
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
