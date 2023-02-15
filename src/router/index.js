import Vue from 'vue'
import VueRouter from 'vue-router'

import Reg from '@/views/Reg/Reg'
import Login from '@/views/Login/Login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/reg'
  },
  {
    path: '/reg',
    component: Reg

  },
  {
    path: '/login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
