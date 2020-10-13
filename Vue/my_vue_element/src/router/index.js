import Vue from 'vue'
import Router from 'vue-router'
import Chart from "../components/Chart";

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/home',
    //   name: 'HomeBlog',
    //   component: homeBlog
    // },
    // {
    //   path: '/listBlog',
    //   name: 'ListBlog',
    //   component: listBlog
    // },
    // {
    //   path: '/addBlog',
    //   name: 'AddBlog',
    //   component: addBlog
    // },
    // {
    //   path: '/updateBlog/:id', //注册路由传参
    //   name: 'UpdateBlog',
    //   component: updateBlog
    // },
    {
      path: '/',
      name: 'Chart',
      component: Chart
    }
  ]
})

