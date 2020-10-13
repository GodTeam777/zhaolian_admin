import Vue from 'vue';
import App from './App'
import router from './router'
import Axios from "axios";
import VueAxios from "vue-axios";
import moment from 'moment'
import Qs from 'qs'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import jquery from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'

Vue.use(VueAxios,Axios)
Vue.use(moment)
Vue.use(Qs)
Vue.use(ElementUI)
Vue.use(jquery)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

Vue.filter('moment', function (value, formatString) {
  formatString = formatString || 'YYYY-MM-DD HH:mm:ss';
  return moment(value).format(formatString);
});
