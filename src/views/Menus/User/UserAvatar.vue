<template>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>更换头像</span>
      </div>
      <div>
        <!-- 图片，用来展示用户选择的头像 -->
        <img v-if="touxiang" :src='touxiang' alt="" />
        <img v-else src="../../../assets/images/avatar.jpg" alt="" />

        <!-- 按钮区域 -->
        <div class="btn-box">
          <input @change="avatarChange" accept="image/*" ref="fileInp" type="file" style="display: none;">
          <el-button @click="$refs.fileInp.click()" type="primary" icon="el-icon-plus">选择图片</el-button>
          <el-button @click="shangchuan" type="success" icon="el-icon-upload" :disabled="!touxiang">上传头像</el-button>
        </div>
      </div>
    </el-card>
  </template>

<script>
export default {
  name: 'UserAvatar',
  data () {
    return {
      touxiang: ''
    }
  },
  methods: {
    avatarChange (e) {
    //   console.log(e)
      const file = e.target.files[0]
      if (file) {
        // 创建对象
        const fr = new FileReader()
        // 获取文件
        fr.readAsDataURL(file)
        // 获取结果
        fr.onload = (e) => {
          this.touxiang = e.target.result
        }
      } else {
        this.touxiang = ''
      }
    },
    shangchuan () {
      this.$axios({
        method: 'patch',
        url: '/my/update/avatar',
        data: { avatar: this.touxiang }
      }).then(res => {
        console.log(res.data)
        if (res.data.code !== 0) return this.$message.error(res.data.message)
        this.$message.success(res.data.message)

        //   重新获取用户信息
        this.$store.dispatch('user/userInfo')
      })
    }
  }
}
</script>

  <style lang="less" scoped>
  .btn-box {
    margin-top: 10px;
  }
  .preview {
    object-fit: cover;
  }
  </style>
