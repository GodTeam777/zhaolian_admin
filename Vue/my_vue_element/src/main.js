import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import Moment from 'moment'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VCharts from 'v-charts'
import VeLine from 'v-charts/lib/line.common'

Vue.prototype.$moment = Moment;
Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VCharts)
Vue.component(VeLine.name, VeLine)
Vue.use(VueAxios,axios)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
