<template>
  <div class="MyPage">
    <h1>{{msg}}</h1>
    <!--
    sizes,:page-sizes="[8, 20, 30, 40]" 一起使用
    jumper：实现直接输入页面跳转到指定页
    -->
    <el-pagination  background layout="total,sizes,prev, pager, next, jumper"
                    prev-text="上一页" next-text="下一页"
                    :total="100" :page-size="8"
                    :pager-count="5" :current-page="3"
                    :page-sizes="[8, 10, 20, 30]"
    ></el-pagination>
  </div>
</template>

<script>
  export default {
    name: 'MyPage',
    data () {
      return {
        msg: '分页组件'
      }
    }
  }
</script>
