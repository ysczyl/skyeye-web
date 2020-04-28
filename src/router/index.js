import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
 **/
export const constantRouterMap = [
  // { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/signIn', component: () => import('@/views/signIn/index'), hidden: true },
  { path: '/shop', component: () => import('@/views/shop/index'), hidden: true },
  { path: '/urlShop', component: () => import('@/views/shop/urlShop'), hidden: true },
  { path: '/toUrlSearch', component: () => import('@/views/dashboard/toUrlSearch'), hidden: true },
  { path: '/evaluate', component: () => import('@/views/evaluate/index'), hidden: true },
  { path: '/help', component: () => import('@/views/help/index'), hidden: true },
  {name: 'dashboard', path: '/dashboard', component: () => import('@/views/dashboard/index'), hidden: true  },
  { path: '/mine', component: () => import('@/views/mine/index'), hidden: true },
  { path: '/advancedSearch', component: () => import('@/views/advancedSearch/index'), hidden: true },
  { path: '/lable', component: () => import('@/views/lable/index'), hidden: true },
  { path: '/user', component: () => import('@/views/user/index'), hidden: true },
  { name: 'kinds', path: '/kinds', component: () => import('@/views/kinds/index'), hidden: true },
  { path: '/labelControl', component: () => import('@/views/labelControll/index'), hidden: true },
  //,
]

export const dynamicRouter = [
  {

  },

  { path: '*', redirect: '/404', hidden: true, meta: { title: '404', icon: 'tree', roles: ['ALL'] }}
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
