<template>
    <div>
      <el-input v-model="this.user_name" placeholder="用户名" name="username" type="text" />
      <el-input v-model="this.user_pass" placeholder="密码" name="password"  />
      <button @click="myBtn">点击首页</button>
    </div>
</template>

<script>
    export default {
      name: "admin_login",
      data() {
        return {
          user_name: '',
          user_pass: ''
        }
      },
      methods: {
        async myBtn() {
          this.$router.replace("/");
          this.$router.addRoutes(await this.$store.dispatch('permission/generateRoutes', 'cust'))
        }
      }
    }
</script>

<style scoped>

</style>
