import Vue from 'vue';
import Router from 'vue-router'
import Bbs_Index from "../components/Bbs_Index";

Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/',
      name: 'bbs_index',
      component: Bbs_Index
    }
    // ,
    // {
    //   path: '/bbs_add',
    //   component: Bbs_Add
    // }
  ]
})
