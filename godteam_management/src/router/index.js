import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/admin/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'large_loans'}
      }
    ]
  },
  {
    path: '/boorrowing',
    component: Layout,
    redirect: '/boorrowing/index',
    alwaysShow: true,
    name: 'Boorrowing',
    meta: { title: '大额贷款实时监控', icon: 'large_loans' },
    children: [
      {
        path: 'chart_month',
        component: () => import('@/views/borrowing/chart/chart_month/chart_month'),
        name: 'ChartMonth',
        meta: { title: '月成交量' }
      },
      {
        path: 'chart_day',
        component: () => import('@/views/borrowing/chart/chart_day/chart_day'),
        name: 'ChartDay',
        meta: { title: '日成交量' }
      }
    ]
  },
  {
    path: '/samll',
    component: Layout,
    redirect: '/samll/index',
    alwaysShow: true,
    name: 'Samll',
    meta: { title: '小额贷款实时监控', icon: 'large_loans' },
    children: [
      {
        path: 'samll_month',
        component: () => import('@/views/samll/chart/samll_month/samll_month'),
        name: 'SamllMonth',
        meta: { title: '月成交量' }
      },
      {
        path: 'samll_day',
        component: () => import('@/views/samll/chart/samll_day/samll_day'),
        name: 'SamllDay',
        meta: { title: '日成交量' }
      }
    ]
  },
  {
    path: '/financial',
    component: Layout,
    redirect: '/financial/index',
    alwaysShow: true,
    name: 'Financial',
    meta: { title: '理财实时监控', icon: 'large_loans' },
    children: [
      {
        path: 'financial_month',
        component: () => import('@/views/financial/chart/financial_month/financial_month'),
        name: 'FinancialMonth',
        meta: { title: '月成交量' }
      },
      {
        path: 'financial_day',
        component: () => import('@/views/financial/chart/financial_day/chart_day'),
        name: 'FinancialDay',
        meta: { title: '日成交量' }
      }
    ]
  },
  {
    path: '/large_loans',
    component: Layout,
    redirect: '/large_loans/index',
    alwaysShow: true,
    name: 'Large_Loans',
    meta: { title: '大额贷款', icon: 'large_loans' },
    children: [
      {
        path: 'complex-table',
        component: () => import('@/views/large_loans_table/complex-table'),
        name: 'ComplexTable',
        meta: { title: '监控贷款' }
      },
      {
        path: 'audit_loans',
        component: () => import('@/views/large_loans_table/audit_loans'),
        name: 'AuditLoans',
        meta: { title: '审核贷款' }
      },
      {
        path: 'mix-chart',
        component: () => import('@/views/charts/mix-charttwo'),
        name: 'MixChart',
        meta: { title: '统计贷款' }
      }
    ]
  },
  {
    path: '/financial_product',
    component: Layout,
    redirect: '/financial_product/index',
    alwaysShow: true,
    name: 'FinancialProduct',
    meta: { title: '理财产品', icon: 'large_loans' },
    children: [
      {
        path: 'product',
        component: () => import('@/views/financial_product/product'),
        name: 'Product',
        meta: { title: '监控产品' }
      },
      {
        path: 'mix-chart',
        component: () => import('@/views/charts/mix-chart'),
        name: 'MixChart',
        meta: { title: '统计产品' }
      },
    ]
  },
  {
    path: '/user_management',
    component: Layout,
    alwaysShow: true,
    name: 'UserManagement',
    meta: { title: '角色管理', icon: 'large_loans' },
    children: [
      {
        path: 'user',
        component: () => import('@/views/user_management/user'),
        name: 'User',
        meta: { title: '用户管理' }
      },
      {
        path: 'kefu',
        component: () => import('@/views/user_management/kefu'),
        name: 'kefu',
        meta: { title: '客服管理' }
      },
      {
        path: 'admin',
        component: () => import('@/views/user_management/admin'),
        name: 'admin',
        meta: { title: '管理员角色管理' }
      }
    ]
  },
  // {
  //   path: '/customer',
  //   component: Layout,
  //   redirect: '/customer/index',
  //   alwaysShow: true,
  //   name: 'CustomerManagement',
  //   meta: { title: '客服管理', icon: 'large_loans' },
  //   children: [
  //     {
  //       path: 'customer_index',
  //       component: () => import('@/views/customer/customer_index'),
  //       name: 'CustomerIndex',
  //       meta: { title: '客服监控' }
  //     },
  //     {
  //       path: 'historical_chat_record',
  //       component: () => import('@/views/customer/historical_chat_record'),
  //       name: 'HistoricalChatRecord',
  //       meta: { title: '消息中心' }
  //     },
  //   ]
  // },
  {
    path: '/news',
    component: Layout,
    redirect: '/news/index',
    alwaysShow: true,
    name: 'NewsManagement',
    meta: { title: '新闻管理', icon: 'large_loans'},
    children: [
      {
        path: 'index',
        component: () => import('@/views/news/index'),
        name: 'Index',
        meta: { title: '新闻监控'}
      }
    ]
  },
<<<<<<< HEAD
=======
    //客服中心
>>>>>>> 71249b521513bfb58835a8e0c2a733d3c5945f90
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1/menu1-1',
    name: 'Nested',
    meta: {
      title: '客服中心',
      icon: 'large_loans'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'),
        name: 'Menu1',
        meta: { title: '认证' ,
<<<<<<< HEAD
          icon:'el-icon-medal'
=======
        icon:'el-icon-medal'
>>>>>>> 71249b521513bfb58835a8e0c2a733d3c5945f90
        },
        redirect: '/nested/menu1/menu1-1',
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: '房产认证',
              icon:'el-icon-school'},

          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'menu1-2',
            meta: { title: '车辆认证',
              icon:'el-icon-bicycle'
            }
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'menu1-3',
            meta: { title: '学历认证',
<<<<<<< HEAD
              icon:'el-icon-reading'
=======
            icon:'el-icon-reading'
>>>>>>> 71249b521513bfb58835a8e0c2a733d3c5945f90
            }
          }
        ]
      },
      {
        path: 'menu2',
        name: 'Menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: '在线客服' }
      }
    ]
  }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
const router = createRouter()
export function resetRouter(){
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
