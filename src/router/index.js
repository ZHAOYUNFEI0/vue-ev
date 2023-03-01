import Vue from 'vue'
import VueRouter from 'vue-router'

import Reg from '@/views/Reg/Reg'
import Login from '@/views/Login/Login'
import Main from '@/views/Main/Main'
import Home from '@/views/Menus/Home/Home'
import UserInfo from '@/views/Menus/User/UserInfo'
import UserAvatar from '@/views/Menus/User/UserAvatar'
import UserPwd from '@/views/Menus/User/UserPwd'
import ArtCate from '@/views/Menus/Article/ArtCate'
import ArtList from '@/views/Menus/Article/ArtList'

import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/reg',
    component: Reg

  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: Main,
    // 路由重定向
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: Home
      },
      {
        path: 'user-info',
        component: UserInfo
      },
      {
        path: 'user-avatar',
        component: UserAvatar
      },
      {
        path: 'user-pwd',
        component: UserPwd
      },
      {
        path: 'art-cate',
        component: ArtCate
      },
      {
        path: 'art-list',
        component: ArtList
      }

    ]
  }
]

const router = new VueRouter({
  routes
})

// 拦截守卫  未登录跳转到登录页面
router.beforeEach((to, from, next) => {
  // console.log(to, from, store)
  if (!store.state.user.token && to.path !== '/login' && to.path !== '/reg') {
    // 提醒用户
    Vue.prototype.$message.error('您还没有登录')
    return next('/login')
  }
  next()
  // console.log(store.state.user.token)
})

export default router
