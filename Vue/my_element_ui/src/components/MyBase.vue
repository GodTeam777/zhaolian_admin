<template>
  <div class="MyBase">
    <h1>基本组件</h1>
    Switch: <el-switch   v-model="sex"
                         active-text="男" inactive-text="女"
                         active-value="1" inactive-value="0">
  </el-switch>
    <p>性别的值：{{sex}}</p>

    <hr>
    评分：  <el-rate  v-model="rate" show-text> </el-rate>
    <p>选择的评分为：{{rate}}</p>

    <hr>
    颜色选择器：<el-color-picker v-model="color"></el-color-picker>
    <p>选中的颜色为：{{color}}</p>

    <hr>
    步骤条：
    <el-steps  :active="step" finish-status="success">
      <el-step title="步骤 1"></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
    </el-steps>
    <el-button style="margin-top: 12px;" @click="next">下一步</el-button>


    <el-button round type="success" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select style="width:100%" v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
  export default{
    data(){
      return {
        sex:'1',
        rate:'4',
        color:'#EA4393',
        step:'0',
        dialogFormVisible: false,
        form: {
          name: '',
          region: ''
        },
        formLabelWidth: '120px'
      }
    },
    methods:{
      next(){
        if (this.step++ > 2) this.step = 0;
      }
    }
  }
</script>
