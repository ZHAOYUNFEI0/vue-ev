import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '@/store'

const Reg = () => import('@/views/Reg/Reg')
const Login = () => import('@/views/Login/Login')
const Main = () => import('@/views/Main/Main')
const Home = () => import('@/views/Menus/Home/Home')
const UserInfo = () => import('@/views/Menus/User/UserInfo')
const UserAvatar = () => import('@/views/Menus/User/UserAvatar')
const UserPwd = () => import('@/views/Menus/User/UserPwd')
const ArtCate = () => import('@/views/Menus/Article/ArtCate')
const ArtList = () => import('@/views/Menus/Article/ArtList')

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
