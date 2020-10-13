import router from './router'
import store from './store'
import { Message } from 'element-ui'
// import NProgress from 'nprogress' // 进度条
// import 'nprogress/nprogress.css' // 进度条样式
import { getToken } from '@/utils/auth' // 从cookie中获取token
import getPageTitle from '@/utils/get-page-title'

// NProgress.configure({ showSpinner: false }) // NProgress配置

const whiteList = ['/login'] //没有重定向白名单

router.beforeEach(async(to, from, next) => {
  //开始进度条
  // NProgress.start()

  //设置页面标题
  document.title = getPageTitle(to.meta.title)

  //确定用户是否已经登录
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
       //如果已登录，则重定向到主页
      next({ path: '/' })
      // NProgress.done(
    } else {
      //确定用户是否通过getInfo获得了他的权限
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          //获取用户信息
          //注意:角色必须是一个对象数组!例如:['admin']或['developer'，'editor']
          const { roles } = await store.dispatch('user/getInfo')
          //根据角色生成可访问路由图
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

          //动态添加可访问路由
          router.addRoutes(accessRoutes)

          //hack方法，以确保addRoutes是完整的
          //设置replace: true，这样导航将不会留下历史记录
          next({ ...to, replace: true })
        } catch (error) {
          //删除令牌，转到登录页面重新登录
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          // NProgress.done()
        }
      }
    }
  } else {
    /* 没有令牌*/

    if (whiteList.indexOf(to.path) !== -1) {
      //在免费登录白名单中，直接登录
      next()
    } else {
      //其他没有访问权限的页面被重定向到登录页面.
      next(`/login?redirect=${to.path}`)
      // NProgress.done()
    }
  }
})

//router.afterEach(() => {
  //完成进度条
  // NProgress.done()
//})
