<template>
  <div id="#app">
    <div id="table">
      <div class="add">
        <input type="text" v-model="params.title" value="" placeholder="标题" />
        <input type="text" v-model="params.name" value="" placeholder="发布人" />
        <input type="date" name="date" value="" placeholder="发布时间" />
        <button @click="topic_seach_Click">查询</button>
      </div>
      <bbs_add :topic_funcotion="bbsAll"></bbs_add>
      <bbs_delete :topic_funcotion="bbsAll" :topic_tid="checks"></bbs_delete>
      <el-table border strip :data="item" @selection-change="handleSelectionChange" ref="checkTable" @row-click="getRow">
        <el-table-column min-width="30" type="selection" reserve-selection></el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="tusers.userName" label="发帖人"></el-table-column>
        <el-table-column prop="tusers.nickName" label="发布人"></el-table-column>
        <el-table-column prop="content" label="帖子内容" show-overflow-tooltip="true"></el-table-column>
        <el-table-column :formatter="dataFormat" prop="topicRegtime" label="发帖时间"></el-table-column>
        <el-table-column prop="replyCount" label="回帖数"></el-table-column>
        <el-table-column :formatter="dataFormat" prop="latestTime" label="回帖时间"></el-table-column>
        <el-table-column prop="readCount" label="点击数"></el-table-column>
        <el-table-column label="操作">
            <bbs_update :topic_funcotion="bbsAll" :row_data="topi"></bbs_update>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination background layout="sizes, prev, pager, next, jumper, slot"
             :page-sizes="[5,8,10]" :total="total" :current-page="params.pageNumber"
             :page-size="size"
             @current-change="CurrentChange" @size-change="SizeChange">
        </el-pagination>
      </div>
    </div>
  </div>
</template>



<script>
    import bbs_add from "./Bbs_Add";
    import bbs_delete from "./Bbs_delete";
    import bbs_update from "./Bbs_Update"
    export default {
        created() {
            this.bbsAll();
        },
        name: "bbs_index",
        data(){
          return {
              total: 0,
              size: 5,
              params: {
                  pageNumber: 1,
                  pageSize: 5,
                  name: '',
                  title: ''
              },
              item: [],
              box: [],
              topi: [],
              checks: [],

          }
        },
      components:{
        bbs_add,
        bbs_delete,
        bbs_update
      },
        methods: {
            bbsAll(){
                this.axios.post("http://localhost:8080/topic_page",this.params).then(result=>{
                    this.item = result.data.rows;
                    this.total = result.data.total;
                    this.size = result.data.pageSize;
                    this.params.pageNumber = result.data.pageNo;
                })
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
            CurrentChange(val) {
                this.params.pageNumber = val;
                this.bbsAll();
            },
            SizeChange(val){
                this.params.pageSize=val;
                this.bbsAll();
            },
            topic_seach_Click(){
                this.bbsAll();
            },
            topic_add_Click(){
                //this.$router.push({path: '/bbs_add'});
            },
            handleSelectionChange(val){
                this.box = val;
                this.checks = [];
                let newFilArr = this.box.filter((item,i)=>{
                    this.checks += item.tid+",";
                })
            },
            getRow(row, column, event){
                this.topi = row.tid;
                this.$refs.checkTable.toggleRowSelection(row);
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
  </style>d
