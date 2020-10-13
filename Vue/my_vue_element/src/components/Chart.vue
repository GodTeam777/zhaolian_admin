<template>
  <div>
      <ve-line :data="charData"></ve-line>
      <chart_data1></chart_data1>
      <chart_data2></chart_data2>
  </div>


</template>

<script>
    import chart_data1 from "./chartAll/Chart_data1";
    import chart_data2 from "./chartAll/Chart_data2";
    export default {
        components: {
            chart_data1,
            chart_data2
        },
        name: "chart",
        data() {
            return {
                charData:{
                  columns: ['日期', '访问用户', '下单用户', '下单率'],
                  rows: [
                    { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 1.32 },
                    { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 2.26 },
                    { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 3.76 },
                    { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 4.49 },
                    { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 5.323 },
                    { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 6.78 }
                  ]
                }
            }
        }
    }
</script>

<style scoped>

</style>
