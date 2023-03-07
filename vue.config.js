const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 在脚手架中配置webpack的优化项
  configureWebpack: {
    externals: {
      // import 导入的模块名：window成员名
      echarts: 'echarts',
      vue: 'Vue',
      'element-ui': 'ELEMENT',
      'vue-quill-editor': 'VueQuillEditor',
      'vue-router': 'VueRouter',
      vuex: 'Vuex',
      axios: 'axios',
      dayjs: 'dayjs'

    }
  }
})
