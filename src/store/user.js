import axios from 'axios'
export default {
  namespaced: true, // 开启命名空间
  state: {
    // token: localStorage.getItem('token') || ''
    token: '',
    userInfo: ''
  },
  mutations: {
    updateToken (state, token) {
      state.token = token
      // localStorage.setItem('token', token)
    },
    userInfo (state, vulue) {
      state.userInfo = vulue
    }
  },
  actions: {
    userInfo (context) {
      axios({
        method: 'get',
        url: '/my/userinfo'

      }).then(res => {
        // console.log(res.data)
        context.commit('userInfo', res.data.data)
      })
    }
  },
  getters: {
  }
}
