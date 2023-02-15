<template>
  <!-- 注册页面的整体盒子 -->
  <div class="reg-container">
    <!-- 注册的盒子 -->
    <div class="reg-box">
      <!-- 标题的盒子 -->
      <div class="title-box"></div>
      <!-- 注册的表单区域 -->
      <el-form
      :model="regRorm"
      :rules="regRules"
      ref="regRorm"
      class="reg-form">
        <el-form-item prop="username">
          <el-input  prefix-icon="el-icon-user" placeholder="请输入用户名" v-model="regRorm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input  prefix-icon="el-icon-lock" placeholder="请输入密码" v-model="regRorm.password"></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input  prefix-icon="el-icon-lock" placeholder="请确认密码" v-model="regRorm.repassword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="regBtn" class="rebtn" type="primary">注册</el-button>
          <el-link @click="goLogin" type="info">去登录</el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    const checkPwd = (rule, value, callback) => {
      if (value !== this.regRorm.password) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    }
    return {
      regRorm: {
        username: '',
        password: '',
        repassword: ''
      },
      regRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]{0,9}$/, message: '请输入1-10位的数字或字母' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { rpattern: /^\S{6,15}$/, message: '请输入6-15位的非空字符', trigger: 'blur' }
        ],
        repassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { rpattern: /^\S{6,15}$/, message: '请输入6-15位的非空字符', trigger: 'blur' },
          { validator: checkPwd, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    regBtn () {
      this.$refs.regRorm.validate((valid) => {
        if (!valid) return
        this.$axios({
          method: 'post',
          url: '/api/reg',
          data: {
            username: this.regRorm.username,
            password: this.regRorm.password,
            repassword: this.regRorm.repassword
          }
        }).then(res => {
          console.log(res.data)
          if (res.data.code === 0) {
            this.$message.success(res.data.message)
            this.$router.push('/login')
          } else {
            // alert(res.data.message)
            this.$message.error(res.data.message)
          }
        })
      })
    },
    goLogin () {
      this.$router.push('/login')
    }
  }

}

</script>

<style lang="less" scoped>
.reg-container {
  background: url('../../assets/images/login_bg.jpg') center;
  background-size: cover;
  height: 100%;

  .reg-box {
    width: 400px;
    height: 335px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .title-box {
      height: 60px;
      background: url('../../assets/images/login_title.png') center no-repeat;
    }

    .reg-form{
      padding: 0 20px;
    }

    .rebtn{
      width: 100%;
    }
  }
}
</style>
