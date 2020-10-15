<template>
  <div style="width: 100%;height: 100%">
    <div :id="id" :class="className" :style="{height:height,width:width}" />
    <div id="chart_div">
      <div class="block">
        <el-date-picker v-model="day_value" type="month" placeholder="选择月" value-format="yyyy-MM" @change="selectChange">
        </el-date-picker>
      </div>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import resize from './resize'

  export default {
    created() {
      this.day_value = new Date();
      this.change_array.change_year = this.day_value.getFullYear();
      this.change_array.change_month = this.day_value.getMonth()+1;
      this.axios.post("http://localhost:10086/pro_day_chart",this.change_array).then(result => {
        this.z_array = [];
          for (let i = 0; i < result.data.length; i++) {
            this.z_array.push(result.data[i].pro_count);
          }
          this.count_array = [];
          this.getDaysOfMonth(this.day_value.getFullYear(), this.day_value.getMonth()+1, 0);
          for (let p = 1; p <= this.count; p++) {
            this.count_array.push(p);
          }
        this.initChart();
      });
    },
    mixins: [resize],
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      id: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '200px'
      },
      height: {
        type: String,
        default: '200px'
      }
    },
    data() {
      return {
        chart: null,
        day_value: '',
        array: [],
        count: 31,
        count_array: [],
        change_array: {
          change_year: '',
          change_month: ''
        },
        z_array: []
      }
    },
    mounted() {
      this.initChart()
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null
    },
    methods: {
      selectChange(val){
        //获取当前点击的年-月
        this.day_value = val;
        this.change_array.change_year = this.day_value.substring(0,4);
        this.change_array.change_month = this.day_value.substring(5,7);
        this.axios.post("http://localhost:10086/pro_day_chart",this.change_array).then(result => {
          this.z_array = [];
          for (let i = 0; i < result.data.length; i++) {
            this.z_array.push(result.data[i].pro_count);
          }
          this.count_array = [];
          this.getDaysOfMonth(parseInt(this.day_value.substring(0, 4)), parseInt(this.day_value.substring(5, 7)), 0);
          for (let p = 1; p <= this.count; p++) {
            this.count_array.push(p);
          }
          this.initChart();
        });
      },
      getDaysOfMonth(year,month) {
        var d = new Date(year, month,0)
        this.count = d.getDate();
      },
      initChart() {
        this.chart = echarts.init(document.getElementById(this.id))
        const xData = (function() {
          const data = []
          for (let i = 1; i < 32; i++) {
            data.push(i + '号')
          }
          return data
        }())
        this.chart.setOption({
          backgroundColor: '#344b58',
          title: {
            text: '日成交量',
            x: '20',
            top: '20',
            textStyle: {
              color: '#fff',
              fontSize: '22'
            },
            subtextStyle: {
              color: '#90979c',
              fontSize: '16'
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              textStyle: {
                color: '#fff'
              }
            }
          },
          grid: {
            left: '5%',
            right: '5%',
            borderWidth: 0,
            top: 150,
            bottom: 95,
            textStyle: {
              color: '#fff'
            }
          },
          legend: {
            x: '5%',
            top: '10%',
            textStyle: {
              color: '#90979c'
            },
            data: ['总金额']
          },
          calculable: true,
          xAxis: [{
            type: 'category',
            axisLine: {
              lineStyle: {
                color: '#90979c'
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitArea: {
              show: false
            },
            axisLabel: {
              interval: 0

            },
            data: this.count_array
          }],
          yAxis: [{
            type: 'value',
            splitLine: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#90979c'
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              interval: 0
            },
            splitArea: {
              show: false
            }
          }],
          dataZoom: [{
            show: true,
            height: 30,
            xAxisIndex: [
              0
            ],
            bottom: 30,
            start: 10,
            end: 80,
            handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
            handleSize: '110%',
            handleStyle: {
              color: '#d3dee5'

            },
            textStyle: {
              color: '#fff' },
            borderColor: '#90979c'

          }, {
            type: 'inside',
            show: true,
            height: 15,
            start: 1,
            end: 35
          }],
          series: [{
              name: '总金额',
              type: 'line',
              stack: 'total',
              itemStyle: {
                normal: {
                  color: 'rgba(252,230,48,1)',
                  label: {
                    show: true,
                    position: 'top',
                    formatter(p) {
                      return p.value > 0 ? p.value : ''
                    }
                  }
                }
              },
              data: this.z_array
            }
          ]
        })
      }
    }
  }
</script>
