import Vue from 'vue'

import Cookies from 'js-cookie'
import Axios from "axios";
import VueAxios from "vue-axios";

import Moment from 'moment' //导入日期格式化
// 绑定 moment 进行时间格式化 ✔
Vue.prototype.$moment = Moment;//日期格式化工具
Axios.defaults.withCredentials = true;


import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'
// import enLang from 'element-ui/lib/locale/lang/en'// 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters

import Vuex from 'vuex'
Vue.use(VueAxios,Axios);
Vue.use(Vuex)


if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  // locale: enLang // 如果使用中文，无需设置，请删除
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})

//权限拦截器
router.beforeEach((to, from, next) => {
  if (store.state.name !== null) {
    if (store.state.title === 2) {
      if(to.path === '/boorrowing/chart_month' || to.path === '/boorrowing/chart_day'
        || to.path === '/user_management/user' || to.path === '/user_management/kefu'
        || to.path === '/user_management/admin' || to.path === '/charts/mix-chart'
        || to.path === '/financial_product/mix-chart' || to.path === '/financial_product/product'
        || to.path === '/large_loans/audit_loans' || to.path === '/large_loans/complex-table'
        || to.path === '/large_loans/mix-chart' || to.path === '/financial/financial_index'
        || to.path === '/samll/samll_month' || to.path === '/samll/samll_day' || to.path === '/news/index'
        || to.path === '/financial/financial_month' || to.path === '/financial/chart_day'){
        alert("权限不足！")
        //next('/');
      }else{
        next();
      }
    }else{
      //alert("未登录！")
      next();
    }
  }else {
    next('/login');
  }

})
