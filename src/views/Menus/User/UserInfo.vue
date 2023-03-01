<template>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>基本资料</span>
      </div>
        <el-form :model="userForm" :rules="userRules" ref="userForm" label-width="100px">
            <el-form-item label="登录名称">
                <el-input disabled v-model="userForm.username"></el-input>
            </el-form-item>
            <el-form-item label="用户名称" prop="nickname">
                <el-input v-model="userForm.nickname"></el-input>
            </el-form-item>
            <el-form-item label="用户邮箱" prop="email">
                <el-input v-model="userForm.email"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="tijiao" type="primary">提交修改</el-button>
                <el-button>重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
  </template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'UserInfo',
  data () {
    return {
      userForm: {},
      userRules: {
        nickname: [
          { required: true, message: '请输入用户昵称', trigger: 'blur' },
          { pattern: /^\S{1,10}$/, message: '昵称必须是1-10位的非空字符串', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  created () {
    // console.log(this.user)

    this.userForm = { ...this.userInfo }
    // console.log(this.userForm)
  },
  computed: {
    ...mapState('user', ['userInfo'])
  },
  methods: {
    tijiao () {
      this.$axios({
        method: 'put',
        url: '/my/userinfo',
        data: {
          id: this.userForm.id,
          nickname: this.userForm.nickname,
          email: this.userForm.email

        }
      }).then(res => {
        // 更新用户信息
        this.$store.dispatch('user/userInfo')
        if (res.data.code !== 0) return this.$message.error(res.data.message)
        this.$message.success(res.data.message)
        console.log(res.data)
      })
    }
  }
}
</script>

  <style lang="less" scoped>
  .el-form {
    width: 500px;
  }
  </style>
