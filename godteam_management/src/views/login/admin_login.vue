<template>
    <div>
      <button @click="myBtn">点击首页</button>
    </div>
</template>

<script>
    export default {
      name: "admin_login",
      methods: {
        myBtn() {
          this.$router.push("/")
        }
      }
    }
</script>

<style scoped>

</style>
