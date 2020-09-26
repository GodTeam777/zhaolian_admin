<template>
    <div class="app-container">
      <div class="filter-container">
        <el-input placeholder="客服ID" style="width: 200px;" class="filter-item" />
        <el-input placeholder="用户名" style="width: 200px;" class="filter-item" />
        <el-select  placeholder="是否允许拉取用户" clearable style="width: 200px" class="filter-item">
          <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
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
          prop="Cid"
          label="客服ID"
          width="130">

        </el-table-column>
        <el-table-column
          prop="UserName"
          label="用户名"
          width="130">
          
        </el-table-column>
        <el-table-column
          prop="TureName"
          label="真实姓名"
          width="130">
        </el-table-column>
        <el-table-column
          prop="date"
          label="创建时间"
          width="150">
        </el-table-column>
        <el-table-column
          prop="allow"
          label="是否允许拉取用户"
          width="180">
        </el-table-column>
        <el-table-column
          prop="serusernum"
          label="服务用户数"
          width="130">
        </el-table-column>
        <el-table-column
          prop="creater"
          label="创建人"
          width="130">
        </el-table-column>
        <el-table-column
          prop="update_user"
          label="修改人"
          width="130">
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
        name: "customer_index",
      methods: {
        handleClick(row) {
          console.log(row);
        }
      },

      data() {
        return {
          tableData: [{
            Cid: '10086',
            UserName: '文和友',
            TureName: '张三',
            date: '2016-05-04',
            allow: '允许',
            serusernum: 19981,
            creater:'美食届老八',
            update_user:'雷霆嘎巴'
          }, {
            Cid: '10087',
            UserName: '火宫殿',
            TureName: '李四',
            date: '2016-07-21',
            allow: '允许',
            serusernum: 20031,
            creater:'美食届老八',
            update_user:'雷霆嘎巴'
          }, {
            Cid: '10088',
            UserName: '杨裕兴',
            TureName: '王五',
            date: '2018-08-13',
            allow: '允许',
            serusernum: 10041,
            creater:'美食届老八',
            update_user:'雷霆嘎巴'
          }, {
            Cid: '10089',
            UserName: '甘长顺',
            TureName: '赵六',
            date: '2018-09-24',
            allow: '允许',
            serusernum: 996,
            creater:'美食届老八',
            update_user:'雷霆嘎巴'
          }, {
            Cid: '10090',
            UserName: '德茂隆',
            TureName: '孙七',
            date: '2018-11-24',
            allow: '允许',
            serusernum: 901,
            creater:'美食届老八',
            update_user:'雷霆嘎巴'
          }
            , {
              Cid: '10091',
              UserName: '九芝堂',
              TureName: '周八',
              date: '2019-03-27',
              allow: '允许',
              serusernum: 888,
              creater:'美食届老八',
              update_user:'雷霆嘎巴'
            }
            , {
              Cid: '10092',
              UserName: '玉楼东',
              TureName: '吴九',
              date: '2019-07-04',
              allow: '允许',
              serusernum: 777,
              creater:'美食届老八',
              update_user:'雷霆嘎巴'
            }
            , {
              Cid: '10093',
              UserName: '双燕楼',
              TureName: '郑十',
              date: '2019-12-24',
              allow: '允许',
              serusernum: 666,
              creater:'美食届老八',
              update_user:'雷霆嘎巴'
            }],
          importanceOptions: ['允许','不允许'],
        }
      }
    }
</script>

<style scoped>

</style>




