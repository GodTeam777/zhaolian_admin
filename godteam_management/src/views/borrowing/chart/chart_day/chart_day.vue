<template>
  <div class="chart-container">
    <chart height="100%" width="100%" />
<!--    <span type="button" @click="getDaysOfMonth(2020,1)">点击</span>-->
  </div>
</template>
<script>
import Chart from '@/views/borrowing/chart/chart_day/char_router/MixChart'

export default {
  name: 'ChartDay',
  components: { Chart }
  // methods: {
  //   getDaysOfMonth(year,month) {
  //     var d = new Date(year,month,0);
  //     alert(d.getDate());
  //   }
  // }
}
</script>

<style scoped>
.chart-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>

