<template>
  <!-- 登录页面的整体盒子 -->
  <div v-loading="loading" class="login-container">
    <!-- 登录的盒子 -->
    <div class="login-box">
      <!-- 标题的盒子 -->
      <div class="title-box"></div>
      <!-- 登录的表单区域 -->
      <el-form
        :model="loginRorm"
        :rules="loginRules"
        ref="loginRorm"
        class="demo-loginRorm"
      >
        <el-form-item prop="username">
          <el-input
            prefix-icon="el-icon-user"
            placeholder="请输入用户名"
            v-model="loginRorm.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
          @keyup.enter.native="loginBtn"
            type="password"
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
            v-model="loginRorm.password"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-button @click="loginBtn" class="loginBtn" type="primary"
            >登录</el-button
          >
          <el-link @click="goReg" type="info">去注册</el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // 数据
      loginRorm: {
        username: '',
        password: ''
      },
      // 配置校验规则
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]{0,9}$/, message: '请输入1-10位的数字或字母' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            rpattern: /^\S{6,15}$/,
            message: '请输入6-15位的非空字符',
            trigger: 'blur'
          }
        ]
      },
      loading: false
    }
  },
  methods: {
    loginBtn () {
      this.$refs.loginRorm.validate((v) => {
        // 加载动画
        this.$axios.interceptors.request.use((config) => {
          // 展示 Loading 效果
          this.loading = true
          return config
        })
        this.$axios.interceptors.response.use((response) => {
          // 隐藏 Loading 效果
          this.loading = false
          return response
        })
        // console.log(v)
        this.$axios({
          method: 'post',
          url: '/api/login',
          data: {
            username: this.loginRorm.username,
            password: this.loginRorm.password
          }
        }).then((res) => {
          if (res.data.code === 0) {
            console.log(res.data)
            this.$message({
              message: res.data.message,
              type: 'success'
            })
            // 保存token
            // console.log(res.data.token)

            this.$store.commit('user/updateToken', res.data.token)

            // 登录成功跳转到主页
            this.$router.push('/')
          } else {
            this.$message.error(res.data.message)
          }
        })
      })
    },
    goReg () {
      this.$router.push('/reg')
    }
  },
  created () {
    console.log('我是axios' + this.$axios)
  }
}
</script>
<style lang="less" scoped>
.login-container {
  background: url('../../assets/images/login_bg.jpg') center;
  background-size: cover;
  height: 100%;

  .login-box {
    width: 400px;
    height: 270px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 0 20px;
    box-sizing: border-box;

    .title-box {
      height: 60px;
      background: url('../../assets/images/login_title.png') center no-repeat;
    }

    .loginBtn {
      width: 100%;
    }
  }
}
</style>
