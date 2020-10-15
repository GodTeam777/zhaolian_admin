<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  async created() {
    const hand_router = await this.$store.dispatch('permission/generateRoutes')
    this.$router.addRoutes(hand_router);
    this.axios({url: "http://localhost:10086/session_login", method: 'post', withCredentials: true}).then(result => {
      this.$store.commit('setName', result.data.petname);
      this.$store.commit('setPrint', result.data.type);
    });
  },
  name: 'App'
}
</script>
