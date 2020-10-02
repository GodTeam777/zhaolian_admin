<template>
  <div style="width: 100%;height: 100%">
    <div :id="id" :class="className" :style="{height:height,width:width}" />
    <div id="chart_div">
      <div class="block">
        <el-date-picker v-model="day_value" type="month" placeholder="选择月" value-format="yyyy-MM" @change="selectChange">
        </el-date-picker>
        <button @click="my_result">接收结果</button>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import resize from './resize'

export default {
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
      day_array: [
        {"a_year": '2020-01-01', "a_day": 4},{"a_year": '2020-01-02', "a_day": 9},{"a_year": '2020-02-01', "a_day": 1},
        {"a_year": '2020-01-03', "a_day": 22},{"a_year": '2020-01-05', "a_day": 4},{"a_year": '2020-01-06', "a_day": 10},
        {"a_year": '2020-01-11', "a_day": 16},{"a_year": '2020-01-04', "a_day": 20},{"a_year": '2020-01-07', "a_day": 14},
        {"a_year": '2020-01-08', "a_day": 9},{"a_year": '2020-01-09', "a_day": 12},{"a_year": '2020-01-10', "a_day": 61},
        {"a_year": '2020-01-13', "a_day": 41},{"a_year": '2020-01-12', "a_day": 46},{"a_year": '2020-01-14', "a_day": 52},
        {"a_year": '2020-01-15', "a_day": 71},{"a_year": '2020-01-16', "a_day": 90},{"a_year": '2020-01-17', "a_day": 82},
        {"a_year": '2020-01-18', "a_day": 66},{"a_year": '2020-01-19', "a_day": 77},{"a_year": '2020-01-20', "a_day": 72},
        {"a_year": '2020-01-21', "a_day": 109},{"a_year": '2020-01-22', "a_day": 99},{"a_year": '2020-01-23', "a_day": 112},
        {"a_year": '2020-01-24', "a_day": 104},{"a_year": '2020-01-25', "a_day": 54},{"a_year": '2020-01-26', "a_day": 37},
        {"a_year": '2020-01-27', "a_day": 65},{"a_year": '2020-01-28', "a_day": 42},{"a_year": '2020-01-29', "a_day": 18},
        {"a_year": '2020-01-30', "a_day": 79},{"a_year": '2020-01-31', "a_day": 132},{"a_year": '2020-02-02', "a_day": 92},
        {"a_year": '2020-02-03', "a_day": 22},{"a_year": '2020-02-04', "a_day": 67},{"a_year": '2020-02-05', "a_day": 81}
      ],
      day_value: '',
      h_array: [4,9,22,4,10],
      j_array: [12,8,40,63,77],
      array: [],
      count: null,
      count_array: [],
      getCount: 1,
      params: {}
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose();
    this.chart = null
  },
  methods: {
    my_result(){
      this.axios.post("http://localhost:10086/select",this.params).then(result => {
        alert("java端传递的数据："+result.data)
      })
    },
    selectChange(val){
      //获取当前点击的年-月
      this.day_value = val;
      this.h_array = [];
      this.getCount = 0;
      //循环对象数组
      for (var i = 0; i < this.day_array.length; i++) {
        //判断日期选择器年份是否和数据库一致
        if(parseInt(this.day_value.substring(0,4)) === parseInt(this.day_array[i].a_year.substring(0,4))){
          //判断日期选择器月份是否和数据库一致
          if(parseInt(this.day_value.substring(5,7)) === parseInt(this.day_array[i].a_year.substring(5,7))) {
            //判断月份有几天
            this.getDaysOfMonth(parseInt(this.day_value.substring(0, 4)), parseInt(this.day_value.substring(5, 7)), 0)
            //循环月份所有日
            for(var h = 1; h <= this.count; h++) {
              if(this.getCount < 10){
                if (h === parseInt(this.day_array[i].a_year.substring(8, 10).substring(1, 2))) {
                  this.h_array.push(this.day_array[i].a_day);
                  this.getCount ++;
                }
              }else if(this.getCount >= 10 && this.getCount <= this.count){
                if (h === parseInt(this.day_array[i].a_year.substring(8, 10))) {
                  this.h_array.push(this.day_array[i].a_day);
                  this.getCount ++;
                }
              }
            }
          } else {
            // alert("没有该月的记录！")
            // break;
          }
        }
      }
      this.initChart()
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
                position: 'insideTop'
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
          data: [
            32,
            17,
            50,
            12,
            80,
            48,
            20,
            13,
            10,
            95,
            38,
            20
          ]
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
          data: [
            10,
            36,
            29,
            38,
            25,
            19,
            17,
            46,
            62,
            43,
            28,
            42
          ]
        }
        ]
      })
    }
  }
}
</script>
