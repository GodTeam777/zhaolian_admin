<template>
  <div id="#app">
    <div id="table">
      <div class="add">
        <input type="text" v-model="news_params.search_title" value="" placeholder="标题" />
        <input type="text" v-model="news_params.search_name" value="" placeholder="发布人" />
        <button @click="news_seach_click">查询</button>
      </div>
      <insert :news_funcotion="news_page"></insert>
      <delete :news_funcotion="news_page" :news_nid="checks"></delete>
      <el-table border strip :data="item" @selection-change="handleSelectionChange" ref="checkTable" @row-click="getRow">
        <el-table-column type="selection" reserve-selection></el-table-column>
        <el-table-column prop="newsTitle" label="标题"></el-table-column>
        <el-table-column prop="newsBody" label="主题" show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="chubanshe" label="出版社"></el-table-column>
        <el-table-column prop="fabiaoname" label="发表人"></el-table-column>
        <el-table-column :formatter="dataFormat" prop="newsDate" label="发表时间"></el-table-column>
        <el-table-column prop="ntype" label="类型"></el-table-column>
        <el-table-column  label="操作">
          <update :news_funcotion="news_page" :row_data="news_id"></update>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination background layout="sizes, prev, pager, next, jumper, slot"
                       :page-sizes="[2,8,10]" :total="total" :current-page="news_params.pageNumber"
                       :page-size="size"
                       @current-change="CurrentChange" @size-change="SizeChange">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import Insert from "@/views/news/operation/insert";
  import Update from "@/views/news/operation/update";
  import Delete from "@/views/news/operation/delete";
    export default {
      created() {
        this.news_page();
      },
      name: "index",
      components: {Delete, Update, Insert},
      data() {
        return {
          total: 0,
          size: 2,
          news_params: {
            pageNumber: 1,
            pageSize: 2,
            search_title: '',
            search_body: '',
            search_press: '',
            search_name: '',
            search_date: '',
            search_type: ''
          },
          item: [],
          box: [],
          checks: [],
          news_id: [],
        }
      },
      methods: {
        news_page() {
          this.axios.post("http://localhost:10086/news_page",this.news_params).then(result => {
            this.item = result.data.rows;
            this.total = result.data.total;
            this.size = result.data.pageSize;
            this.news_params.pageNumber = result.data.pageNo;
          })
        },
        news_seach_click() {
          this.news_page();
        },
        CurrentChange(val) {
          this.news_params.pageNumber = val;
          this.news_page();
        },
        SizeChange(val) {
          this.news_params.pageSize = val;
          this.news_page();
        },
        handleSelectionChange(val) {
          this.box = val;
          this.checks = [];
          let newFilArr = this.box.filter((item, i) => {
            this.checks += item.nid +",";
          })
        },
        getRow(row, column, event) {
          this.news_id = row.nid;
          this.$refs.checkTable.toggleRowSelection(row);
        },
        dataFormat(row,column){
          let data = row[column.property]
          if (data ===null) {
            return ''
          }
          let dt = new Date(data)
          return dt.getFullYear() + '-' +
            (dt.getMonth() + 1) + '-' +
            dt.getDate() + ' ' +
            dt.getHours() + ':' +
            dt.getMinutes() + ':' +
            dt.getSeconds()
        },
        kot() {
          return false;
        }
      }
    }
</script>

<style scoped>
  #table table {
    width: 100%;
    font-size: 14px;
    border: 1px solid #eee
  }

  #table {
    padding: 0 10px;
  }

  table thead th {
    background: #f5f5f5;
    padding: 10px;
    text-align: left;
  }

  table tbody td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #eee;
    border-right: 1px solid #eee;
  }

  table tbody td span {
    margin: 0 10px;
    cursor: pointer;
  }

  .delete {
    color: red;
  }

  .edit {
    color: #008cd5;
  }

  .add {
    border: 1px solid #eee;
    margin: 10px 0;
    padding: 15px;
  }

  input {
    border: 1px solid #ccc;
    padding: 5px;
    border-radius: 3px;
    margin-right: 15px;
  }

  button {
    background: #008cd5;
    borer: 0;
    padding: 4px 15px;
    border-radius: 3px;
    color: #fff;
  }

  #mask {
    background: rgba(0, 0, 0, .5);
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 4;
    top: 0;
    left: 0;
    display: none;
  }

  .mask {
    width: 300px;
    height: 250px;
    background: rgba(255, 255, 255, 1);
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index: 47;
    border-radius: 5px;
  }

  .title {
    padding: 10px;
    border-bottom: 1px solid #eee;
  }

  .title span {
    float: right;
    cursor: pointer;
  }

  .content {
    padding: 10px;

  }

  .content input {
    width: 270px;
    margin-bottom: 15px;
  }
</style>
