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

// 将 axios 挂载到 Vue 原型上
Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
