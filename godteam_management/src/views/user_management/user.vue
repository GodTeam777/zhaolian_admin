<template>
  <div class="app-container">

    <div class="filter-container">
      <el-input placeholder="客户ID" style="width: 200px;" class="filter-item" />
      <el-input placeholder="客户姓名" style="width: 200px;" class="filter-item" />
      <el-select  placeholder="签单情况" clearable style="width: 200px" class="filter-item">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select  placeholder="地址" clearable style="width: 200px" class="filter-item">
      <el-option v-for="item in addressOptions" :key="item" :label="item" :value="item" />
    </el-select>
      <el-button  class="filter-item" type="primary" icon="el-icon-search" >
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" >
        添加
      </el-button>
    </div>

    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="uId"
        label="客户ID"
        width="130">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="客户姓名"
        width="130">
      </el-table-column>
      <el-table-column
        prop="sex"
        label="客户性别"
        width="130">
      </el-table-column>
      <el-table-column
        prop="age"
        label="年龄"
        width="130">
      </el-table-column>
      <el-table-column
        prop="situation"
        label="签单情况"
        width="140">
      </el-table-column>
      <el-table-column
        prop="getCustomers"
        label="获客方式"
        width="130">
      </el-table-column>
      <el-table-column
        prop="serviceName"
        label="业务员姓名"
        width="130">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        width="190">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="160">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" >
            编辑
          </el-button>
          <el-button  size="mini" type="danger" >
            删除
          </el-button>
          <!--<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>-->
          <!--<el-button type="text" size="small">编辑</el-button>-->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "user",
    methods: {
      handleClick(row) {
        console.log(row);
      }
    },

    data() {
      return {
        tableData: [{
          uId: '8535',
          userName: '提里奥',
          sex: '女',
          age: '55',
          situation: '允许',
          getCustomers: '个人拜访',
          serviceName:'药水哥',
          address:'天心区'
        }, {
          uId: '6751',
          userName: '艾露恩',
          sex: '女',
          age: '41',
          situation: '已经签单',
          getCustomers: '主管陪访',
          serviceName:'药水哥',
          address:'芙蓉区'
        }, {
          uId: '1864',
          userName: '杜隆坦',
          sex: '男',
          age: '35',
          situation: '仍可追踪',
          getCustomers: '小交会',
          serviceName:'药水哥',
          address:'雨花区'
        }, {
          uId: '5783',
          userName: '格罗姆',
          sex: '男',
          age: '58',
          situation: '确定放弃',
          getCustomers: '公司产说会',
          serviceName:'药水哥',
          address:'岳麓区'
        }, {
          uId: '2187',
          userName: '雷克萨',
          sex: '男',
          age: '31',
          situation: '仍可追踪',
          getCustomers: '个人酒会',
          serviceName:'药水哥',
          address:'望城区'
        }, {
          uId: '6821',
          userName: '艾格文',
          sex: '女',
          age: '42',
          situation: '仍可追踪',
          getCustomers: '个人拜访',
          serviceName:'药水哥',
          address:'开福区'
        }, {
          uId: '7952',
          userName: '乌瑞恩',
          sex: '女',
          age: '35',
          situation: '确定放弃',
          getCustomers: '个人拜访',
          serviceName:'药水哥',
          address:'长沙县'
        }, ],
        importanceOptions: ['已经签单','仍可追踪','已经放弃'],
        addressOptions: ['天心区','雨花区','岳麓区','开福区','芙蓉区','望城区','长沙县']
      }
    }
  }
</script>

<style scoped>

</style>
