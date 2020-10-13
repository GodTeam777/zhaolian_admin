import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import MyBase from '@/components/MyBase'
import MyPage from '@/components/MyPage'
import MyTable from '@/components/MyTable'
import MyRequest from '@/components/MyRequest'
import MyApp from '@/components/MyApp'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:"/MyBase",
      name:'MyBase',
      component:MyBase
    },
    {
      path: '/MyPage',
      name: 'MyPage',
      component: MyPage
    },
    {
      path: '/MyTable',
      name: 'MyTable',
      component: MyTable
    },
    {
      path: '/MyRequest',
      name: 'MyRequest',
      component: MyRequest
    },
    {
      path: '/MyApp',
      name: 'MyApp',
      component: MyApp
    }
  ]
})
