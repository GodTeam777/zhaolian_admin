<template>
  <el-dialog
    :modal="true"
    :fullscreen="fullscreen"
    custom-class="dialog-custom"
    :visible.sync="dialogVisible"
    width="50%">
    <template v-if="dialogCategory === 'combineEngineering'">

      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="活动名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="活动名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="活动名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="活动名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="活动名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="活动名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        </el-form>
    </template>
    <template v-else-if="dialogCategory === 'subjectMatch'">
      <div slot="title">科目匹配 <i @click="fullscreen = !fullscreen" class="el-icon-menu float_right" style="padding-right: 30px;cursor: pointer;"></i></div>
      <subject-match></subject-match>
    </template>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
  </el-dialog>
</template>

<script>
    export default {
        name: "ziinsert"
    }
</script>

<style scoped>

</style>
