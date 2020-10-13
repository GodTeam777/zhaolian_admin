// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//全局加载所有Element-UI组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//import {Button,Radio} from 'element-ui'

// 跨域访问Axios
import axios from 'axios'
import VueAxios from 'vue-axios'


Vue.config.productionTip = false

//Vue.use(Button)
//Vue.use(Radio)
Vue.use(ElementUI)
Vue.use(VueAxios,axios)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
