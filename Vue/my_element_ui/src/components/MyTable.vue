<template>
  <div class="MyTable">
    <h1>{{msg}}</h1>

    <el-table  :data="tableData" stripe  border style="width: 100%">
      <el-table-column prop="date" label="日期" width="200px"></el-table-column>
      <el-table-column prop="name" label="姓名" width="200px"></el-table-column>
      <el-table-column prop="address" label="地址" ></el-table-column>
    </el-table>
  </div>

</template>
<script>
  export default{
    name: 'MyTable',
    data () {
      return {
        msg: 'table 组件',
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]

      }
    }
  }
</script>
<style>
  .MyTable{
    margin:10px auto;
    width:900px;
  }
</style>
