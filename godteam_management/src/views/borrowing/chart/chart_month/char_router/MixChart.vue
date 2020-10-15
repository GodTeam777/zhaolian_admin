<template>
  <div style="width: 100%;height: 100%">
    <div :id="id" :class="className" :style="{height:height,width:width}"/>
    <div id="chart_div">
      <div class="block">
        <el-date-picker v-model="year_value" type="year" placeholder="选择年" value-format="yyyy" @change="selectChange">
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
    this.year_value = new Date();
    this.change_array.change_year = this.year_value.getFullYear();
    this.change_array.change_month = this.year_value.getMonth()+1;
    this.axios.post("http://localhost:10086/big_huan_month_chart",this.change_array).then(result => {
      this.h_array = [];
      for (let i = 0; i < result.data.length; i++) {
        this.h_array.push(result.data[i].big_month_count);
      }
    });
    this.axios.post("http://localhost:10086/big_dai_month_chart",this.change_array).then(result => {
      this.j_array = [];
      for (let i = 0; i < result.data.length; i++) {
        this.j_array.push(result.data[i].big_month_count)
      }
      this.z_array = [];
      for (let a = 0; a < this.h_array.length; a++) {
        for (let b = 0; b < this.j_array.length; b++) {
          if (a === b) {
            this.z_array.push(this.h_array[a]+this.j_array[b]);
          }
        }
      }
      this.initChart();
    })
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
      value: '',
      year_value: '',
      month_value: '',
      h_array: [],
      j_array: [],
      z_array: [],
      count_array: [],
      change_array: {
        change_year: ''
      }
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
    //切换年份，显示选中的年份所有月的数据
    selectChange(val){
      //获取当前点击的年-月
      this.year_value = val;
      this.z_array = [];
      this.change_array.change_year = this.year_value.substring(0,4);
      this.axios.post("http://localhost:10086/big_huan_month_chart",this.change_array).then(result => {
        this.h_array = [];
        for (let i = 0; i < result.data.length; i++) {
          this.h_array.push(result.data[i].big_month_count);
        }
      });
      this.axios.post("http://localhost:10086/big_dai_month_chart",this.change_array).then(result => {
        this.j_array = [];
        for (let i = 0; i < result.data.length; i++) {
          this.j_array.push(result.data[i].big_month_count)
        }
        for (let a = 0; a < this.h_array.length; a++) {
          for (let b = 0; b < this.j_array.length; b++) {
            if (a === b) {
              this.z_array.push(this.h_array[a]+this.j_array[b]);
            }
          }
        }
        this.initChart();
      })
    },
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))
      const xData = (function() {
        const data = []
        for (let i = 1; i < 13; i++) {
          data.push(i + '月')
        }
        return data
      }())
      this.chart.setOption({
        backgroundColor: '#344b58',
        title: {
          text: '月成交量',
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
          data: ['还款总数', '借款总数', '总成交量']
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
          data: xData
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
          xAxisIndex: [0],
          bottom: 30,
          start: 10,
          end: 80,
          handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
          handleSize: '110%',
          handleStyle: {
            color: '#d3dee5'

          },
          textStyle: {
            color: '#fff'
          },
          borderColor: '#90979c'

        }, {
          type: 'inside',
          show: true,
          height: 15,
          start: 1,
          end: 35
        }],
        series: [{
          name: '还款总数',
          type: 'bar',
          stack: 'total',
          barMaxWidth: 35,
          barGap: '10%',
          itemStyle: {
            normal: {
              color: 'rgba(255,144,128,1)',
              label: {
                show: true,
                textStyle: {
                  color: '#fff'
                },
                position: 'insideTop',
                formatter(p) {
                  return p.value > 0 ? p.value : ''
                }
              }
            }
          },
          data: this.h_array
        },

        {
          name: '借款总数',
          type: 'bar',
          stack: 'total',
          itemStyle: {
            normal: {
              color: 'rgba(0,191,183,1)',
              barBorderRadius: 0,
              label: {
                show: true,
                position: 'top',
                formatter(p) {
                  return p.value > 0 ? p.value : ''
                }
              }
            }
          },
          data: this.j_array
        }, {
          name: '总成交量',
          type: 'line',
          stack: 'total',
          symbolSize: 10,
          symbol: 'circle',
          itemStyle: {
            normal: {
              color: 'rgba(252,230,48,1)',
              barBorderRadius: 0,
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

<style>
  #chart_div{
    width: 150px;
    height: 30px;
    position: absolute;
    top: 10px;
    right: 10px;
  }
</style>


