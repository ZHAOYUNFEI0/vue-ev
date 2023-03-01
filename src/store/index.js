import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'

import createpersistedstate from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  // 自动将 vuex 中的数据存储到 localStorage,页面加载时自动读取，数据更新自动同步到 localStorage
  plugins: [createpersistedstate()],
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user
  }
})
