<template>
  <div>
    <el-row :gutter="40" class="panel-group">
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
          <div class="card-panel-icon-wrapper icon-people">
            <svg-icon icon-class="peoples" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              用 户
            </div>
            <count-to :start-val="0" :end-val="this.user_count" :duration="2600" class="card-panel-num" />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('messages')">
          <div class="card-panel-icon-wrapper icon-message">
            <svg-icon icon-class="money" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              小额 贷款
            </div>
            <count-to :start-val="0" :end-val="this.small_dai_count" :duration="3000" class="card-panel-num" />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('purchases')">
          <div class="card-panel-icon-wrapper icon-money">
            <svg-icon icon-class="money" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              大额 贷款
            </div>
            <count-to :start-val="0" :end-val="this.big_dai_count" :duration="3200" class="card-panel-num" />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('shoppings')">
          <div class="card-panel-icon-wrapper icon-shopping">
            <svg-icon icon-class="money" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              理财 产品
            </div>
            <count-to :start-val="0" :end-val="this.pro_count" :duration="3600" class="card-panel-num" />
          </div>
        </div>
      </el-col>
    </el-row>
    <img :src=imgSrc id="imgSrc">
  </div>
</template>

<script>
import CountTo from 'vue-count-to'
import imgUrl from '@/assets/img/2.jpg'

export default {
  async created() {
    const hand_router = await this.$store.dispatch('permission/generateRoutes')
    this.$router.addRoutes(hand_router);

    this.axios({url: "http://localhost:10086/session_login", method: 'post', withCredentials: true}).then(result => {
      this.$store.commit('setName', result.data.petname);
      this.$store.commit('setPrint', result.data.type);
      if (result.data.length === 0) {
        this.$router.replace("/login");
      }
    });
    this.$store.dispatch('settings/changeSetting', {
      key: 'sidebarLogo',
      value: true
    })
    this.$store.dispatch('settings/changeSetting', {
      key: 'tagsView',
      value: false
    })
    this.axios.post("http://localhost:10086/user_count").then(result => {
      this.user_count = result.data;
    });
    this.axios.post("http://localhost:10086/big_dai_count").then(result => {
      this.big_dai_count = result.data;
    });
    this.axios.post("http://localhost:10086/small_dai_count").then(result => {
      this.small_dai_count = result.data;
    });
    this.axios.post("http://localhost:10086/pro_count").then(result => {
      this.pro_count = result.data;
    });
  },
  components: {
    CountTo
  },
  data() {
    return {
      user_count: 0,
      big_dai_count: 0,
      small_dai_count: 0,
      pro_count: 0,
      imgSrc: imgUrl,
      prams: {}
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    }
  }
}
</script>

<style lang="scss" scoped>
#imgSrc{
  width: 100%;
  height: 230%;
  position: absolute;
  left: 0.01%;
  top: 100%;
}
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
