import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// element-ui 框架引入
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import './assets/global.less'

// 引入 axios
import axios from 'axios'

// 使用 element-ui 框架
Vue.use(ElementUI)

// 设置 axios 的基地址
axios.defaults.baseURL = 'http://www.liulongbin.top:3008'

// 请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做什么
  // console.log(config)
  config.headers.Authorization = store.state.user.token
  return config
}, function (error) {
  // 对请求错误做什么
  return Promise.reject(error)
})
// 响应拦截器
axios.interceptors.response.use(function (response) {
  // 响应成功
  return response
}, function (error) {
  // 响应失败
  console.log(error)
  if (error.response.status === 401) {
    // console.log(111)
    store.commit('user/updateToken', '')
    router.push('/login')
    // console.log(error)
    // 提示错误信息
    Vue.prototype.$message.error(error.response.data.message)
  }
  return Promise.reject(error)
})

// 将 axios 挂载到 Vue 原型上
Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
