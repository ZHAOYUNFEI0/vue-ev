<template>
    <el-container class="main-container">
      <!-- 头部区域 -->
      <el-header>
        <!-- 左侧的 logo -->
        <img src="../../assets/images/logo.png" alt="" />
        <!-- 右侧的菜单 -->
        <el-menu
          class="el-menu-top"
          mode="horizontal"
          background-color="#23262E"
          text-color="#fff"
          active-text-color="#409EFF"
        >
          <el-submenu index="1">
            <template slot="title">
              <!-- 头像 -->
              <img :src="userInfo.user_pic" alt="" class="avatar" />
              <span>个人中心</span>
            </template>
            <el-menu-item index="1-1"><i class="el-icon-s-operation"></i>基本资料</el-menu-item>
            <el-menu-item index="1-2"><i class="el-icon-camera"></i>更换头像</el-menu-item>
            <el-menu-item index="1-3"><i class="el-icon-key"></i>重置密码</el-menu-item>
          </el-submenu>
          <el-menu-item @click="esc" index="2"><i class="el-icon-switch-button"></i>退出</el-menu-item>
        </el-menu>
      </el-header>
      <el-container>
        <!-- 侧边栏区域 -->
        <el-aside width="200px">
            <div class="user-box">
              <img :src="userInfo.user_pic" alt="" />
              <span>欢迎 {{  userInfo.nickname || userInfo.username }}</span>
            </div>
              <el-menu
                :router="true"
                :default-active="dizhi"
                class="el-menu-vertical-demo"
                background-color="#23262e"
                text-color="#fff"
                active-text-color="#409EFF">

                <template v-for="item in data" >
                  <el-menu-item v-if="!item.children" :key="item.indexPath"  :index="item.indexPath">
                    <i :class="item.icon"></i>
                    <span slot="title">{{ item.title }}</span>
                  </el-menu-item>

                  <el-submenu v-else :key="item.indexPath" :index="item.indexPath">
                    <template #title>
                      <i :class="item.icon"></i>
                      <span>{{ item.title }}</span>
                    </template>
                    <el-menu-item-group>
                      <el-menu-item v-for="map in item.children" :key="map.indexPath"  :index="map.indexPath">
                        <i :class="map.icon"></i>
                        <span>{{map.title}}</span>
                      </el-menu-item>
                    </el-menu-item-group>
                  </el-submenu>
                </template>
            </el-menu>
        </el-aside>

        <el-container>
          <!-- 页面主体区域 -->
          <el-main>

            <router-view></router-view>
          </el-main>
          <!-- 底部 footer 区域 -->
          <el-footer>© www.itheima.com - 黑马程序员</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Main',
  data () {
    return {
      data: [],
      dizhi: this.$route.path
    }
  },
  methods: {
    esc () {
      this.$confirm('确定退出登录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '退出成功!'
        },
        this.$store.commit('user/updateToken', ''),
        this.$router.push('/login')
        )
      })
    }
  },

  created () {
    this.$store.dispatch('user/userInfo')
    this.$axios({
      method: 'get',
      url: '/my/menus'
    }).then(res => {
      // console.log(res.data)
      this.data = res.data.data
      // console.log(this.data)
    })
  },
  computed: {
    ...mapState('user', ['userInfo', 'token'])
  }
}
</script>

  <style lang="less" scoped>
  .main-container {
    height: 100%;
    .el-header,
    .el-aside {
      background-color: #23262e;
    }
    .el-header {
      padding: 0;
      display: flex;
      justify-content: space-between;
    }
    .el-main {
      overflow-y: scroll;
      height: 0;
      background-color: #F2F2F2;
    }
    .el-footer {
      background-color: #eee;
      font-size: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .avatar {
    border-radius: 50%;
    width: 35px;
    height: 35px;
    background-color: #fff;
    margin-right: 10px;
    object-fit: cover;
  }
  // 左侧边栏用户信息区域
.user-box {
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  user-select: none;
  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: #fff;
    margin-right: 15px;
    object-fit: cover;
  }
  span {
    color: white;
    font-size: 12px;
  }
  .el-aside{
    .el-submenu,.el-menu-item{
      width: 200px;
      user-select:none
    }
  }
}
  </style>
