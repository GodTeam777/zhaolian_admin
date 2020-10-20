<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="uname" placeholder="用户名"  style="width: 200px;" class="filter-item"  @keyup.enter.native="handleFilter" />
      <el-input v-model="cname" placeholder="产品名"  style="width: 200px;" class="filter-item"  @keyup.enter.native="handleFilter" />
      <el-select v-model="stust" placeholder="状态" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select>

      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="clickselect">
        搜索
      </el-button>


    </div>
    <el-table
      :data="pb"
      border
      style="width: 100%">
      <el-table-column
        prop="boid"
        label="编号"
        width="40">
      </el-table-column>
      <el-table-column
        prop="uname"
        label="用户"
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="bdname"
        label="贷款产品"
        width="100">
      </el-table-column>
      <el-table-column
        prop="bigmoney"
        label="贷款金额"
        height="50"
        width="80">
      </el-table-column>
      <el-table-column
        prop="bigdaiDate"
        label="分几期还"
        width="80">
      </el-table-column>
      <el-table-column
        prop="yihuan"
        label="已还几期">
      </el-table-column>
      <el-table-column
        prop="huanCard"
        label="还款卡号">
      </el-table-column>
      <el-table-column
        prop="shouCard"
        label="收款卡号">
      </el-table-column>
      <el-table-column
        prop="daiDate"
        label="贷款时间"
        :formatter="dateFormat">
      </el-table-column>
      <el-table-column
        prop="onemoney"
        label="每期应还金额">
      </el-table-column>
      <el-table-column
        label="申请状态"
      prop="status">
        <template slot-scope="scope">

        <span v-show="scope.row.status==0">

         <span>
         <el-button type="primary"  circle  @click="handleEdit(scope.$index, scope.row)">通过</el-button>
        </span>
        &nbsp;
        <span> <el-button type="danger" circle @click="handleEdit1(scope.$index, scope.row)">不通过</el-button></span>
          </span>
            <span v-show="scope.row.status==1">
          已通过
        </span>
            <span v-show="scope.row.status==2">
          未通过
        </span>
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
        <el-form-item label="用户" prop="bdname">
          <el-input v-model="Bigdai.uname" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="贷款产品" prop="rxi">
          <el-input v-model="Bigdai.bdname"  placeholder="请输入贷款产品"></el-input>
        </el-form-item>
        <el-form-item label="贷款金额" prop="title1">
          <el-input v-model="Bigdai.bigmoney" placeholder="请输入贷款金额"></el-input>
        </el-form-item>
        <el-form-item label="分几期还" prop="body1">
          <el-input v-model="Bigdai.bigdaiDate" placeholder="分几期还"></el-input>
        </el-form-item>
        <el-form-item label="已还几期" prop="type1">
          <el-input v-model="Bigdai.yihuan" placeholder="已还机器"></el-input>
        </el-form-item>
        <el-form-item label="还款卡号" prop="date1">
          <el-input v-model="Bigdai.huanCard" placeholder="还款卡号"></el-input>
        </el-form-item>
        <el-form-item label="收款卡号" prop="smal1">
          <el-input v-model="Bigdai.shouCard" placeholder="收款卡号"></el-input>
        </el-form-item>
        <el-form-item label="贷款时间" prop="big1">
          <el-input v-model="Bigdai.daiDate" placeholder="贷款时间"></el-input>
        </el-form-item>
        <el-form-item label="每期应还" prop="big1">
          <el-input v-model="Bigdai.onemoney" placeholder="每期应还"></el-input>
        </el-form-item>
        <el-form-item label="申请状态" prop="big1">
          <el-input v-model="Bigdai.status" placeholder="申请状态"></el-input>
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
      <span>是否修改</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">否</el-button>
    <el-button type="primary" @click="myupdate">是</el-button>
  </span>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="dialogVisible1" :before-close="handleClose">
      <span>是否修改</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">否</el-button>
    <el-button type="primary" @click="myupdate1">是</el-button>
  </span>
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

<script>
  import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
  import waves from '@/directive/waves' // waves directive
  import { parseTime } from '@/utils'
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination
  import moment from 'moment'

  const calendarTypeOptions = [
    { key: '1', display_name: '已通过' },
    { key: '0', display_name: '未通过' }

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
          "boid":'',
          "uname":'',
          "bigmoney":'',
          "bigdaiDate":'',
          "yihuan":'',
          "huanCard":'',
          "shouCard":'',
          "daiDate":'',
          "onemoney":'',
          "status":'',
          "bdname":''


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
        dialogVisible:false,
        dialogVisible1:false,
        dialogStatus: '',
        textMap: {
          update: 'Edit',
          create: 'Create'
        },
        dialogPvVisible: false,
        pvData: [],
        rules: {
          bdname: [
            { required: true, message: '产品名不能为空',  trigger: 'blur'},
            { min: 3, max: 5, message: '长度在 3 到 5 个字符' }
          ],
          rxi: [
            { required: true, message: '产品日息不能为空'}
          ],
          title1: [
            { required: true, message: '产品标题不能为空'}
          ],
          body1: [
            { required: true, message: '产品信息不能为空'}
          ],
          type1: [
            { required: true, message: '产品类型不能为空'}
          ],
          date1: [
            { required: true, message: '产品周期不能为空'}
          ],
          smal1: [
            { required: true, message: '产品最小额度不能为空'}
          ],
          big1: [
            { required: true, message: '产品最大额度不能为空'}
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
        url:'http://localhost:10086/myByPage',
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
      dateFormat(row,colnum){
        return moment(row[colnum.property]).format('YYYY-MM-DD hh:mm:ss')
      },
      update(row){
        alert(row.bdtype)
      },
      handleEdit(index, row) {

        this.dialogVisible = true
        this.Bigdai.boid=row.boid
        this.Bigdai.uname=row.users.uname
        this.Bigdai.bigmoney=row.bigmoney
        this.Bigdai.bigdaiDate=row.bigdaiDate
        this.Bigdai.yihuan=row.yihuan
        this.Bigdai.huanCard=row.huanCard
        this.Bigdai.shouCard=row.shouCard
        this.Bigdai.daiDate=row.daiDate
        this.Bigdai.onemoney=row.onemoney
        this.Bigdai.status=row.status
        this.Bigdai.bdname=row.bigdai.bdname


      },
      myupdate(){
        this.axios({
          url:'http://localhost:10086/bigdaiorderupdate',
          method:'POST',
          withCredentials:true,
          data:{
            boid:this.Bigdai.boid,
            bigmoney:this.Bigdai.bigmoney,
            bigdaiDate:this.Bigdai.bigdaiDate,
            yihuan:this.Bigdai.yihuan,
            huanCard:this.Bigdai.huanCard,
            shouCard:this.Bigdai.shouCard,
            daiDate:this.Bigdai.daiDate,
            onemoney: this.Bigdai.onemoney,
            status:this.Bigdai.status,
            bigdai:this.Bigdai.bigMoney,
            users:this.Bigdai.uname,
            bigdai:this.Bigdai.bdname
          },
        }).then(res =>{

          this.pb=res.data.rows
          this.totals = res.data.total
          location.reload()
        })

      },
      handleEdit1(index, row) {

        this.dialogVisible1 = true
        this.Bigdai.boid=row.boid
        this.Bigdai.uname=row.users.uname
        this.Bigdai.bigmoney=row.bigmoney
        this.Bigdai.bigdaiDate=row.bigdaiDate
        this.Bigdai.yihuan=row.yihuan
        this.Bigdai.huanCard=row.huanCard
        this.Bigdai.shouCard=row.shouCard
        this.Bigdai.daiDate=row.daiDate
        this.Bigdai.onemoney=row.onemoney
        this.Bigdai.status=row.status
        this.Bigdai.bdname=row.bigdai.bdname

      },
      myupdate1(){
        this.axios({
          url:'http://localhost:10086/bigdaiorderupdate1',
          method:'POST',
          withCredentials:true,
          data:{
            boid:this.Bigdai.boid,
            bigmoney:this.Bigdai.bigmoney,
            bigdaiDate:this.Bigdai.bigdaiDate,
            yihuan:this.Bigdai.yihuan,
            huanCard:this.Bigdai.huanCard,
            shouCard:this.Bigdai.shouCard,
            daiDate:this.Bigdai.daiDate,
            onemoney: this.Bigdai.onemoney,
            status:this.Bigdai.status,
            bigdai:this.Bigdai.bigMoney,
            users:this.Bigdai.uname,
            bigdai:this.Bigdai.bdname
          },
        }).then(res =>{

          this.pb=res.data.rows
          this.totals = res.data.total
          location.reload()
        })

      },

      handleSizeChange(val) {
        this.num=1;

        this.mypagesize=val
        this.axios({
          url:'http://localhost:10086/myByPage',
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
          url:'http://localhost:10086/myByPage',
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
          url:'http://localhost:10086/myByPage',
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
