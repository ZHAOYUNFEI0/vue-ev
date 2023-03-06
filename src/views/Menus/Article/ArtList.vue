<template>
    <div>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>文章列表</span>
        </div>
        <!-- 搜索区域 -->
        <div class="search-box">
          <el-form :inline="true" :model="q">
            <el-form-item label="文章分类">
              <el-select v-model="qq.cate_id" placeholder="请选择分类" size="small">
                <el-option v-for="item in addlist" :key="item.id" :label="item.cate_name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="发布状态" style="margin-left: 15px;">
              <el-select v-model="qq.state" placeholder="请选择状态" size="small">
                <el-option label="已发布" value="已发布"></el-option>
                <el-option label="草稿" value="草稿"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button @click="shaixuan" type="primary" size="small">筛选</el-button>
              <el-button @click="reset" type="info" size="small">重置</el-button>
            </el-form-item>
          </el-form>
          <!-- 发表文章的按钮 -->
          <el-button type="primary" @click="dialogVisible = true" size="small" class="btn-pub">发表文章</el-button>
        </div>

        <!-- 文章表格区域 -->
          <el-table
            border
            stripe
            :data="artList"
            style="width: 100%">
            <el-table-column
              label="文章标题"
              width="180">
              <template v-slot="scop">
               <el-link @click="yulan(scop.row.id)">{{ scop.row.title }}</el-link>
              </template>
            </el-table-column>
            <el-table-column
              prop="cate_name"
              label="文章分类"
              width="180">
            </el-table-column>
            <el-table-column
              label="发表时间">
              <template v-slot="scop">
                {{fromatData(scop.row.pub_date)  }}
              </template>
            </el-table-column>
            <el-table-column
              label="操作">
              <template v-slot="scop">
                <el-button @click="del(scop.row.id)" type="danger" size="mini">删除</el-button>
              </template>

            </el-table-column>
          </el-table>

        <!-- 分页区域 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page= q.pagenum
            :page-sizes="[1,2, 3, 4]"
            :page-size=q.pagesize
            layout="total, sizes, prev, pager, next, jumper"
            :total=total>
          </el-pagination>
      </el-card>

      <!-- 发表文章 -->
      <el-dialog
        fullscreen
        title="发表文章"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm">
          <el-form-item label="活动名称" prop="title">
            <el-input placeholder="请输入活动名称" v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="活动区域" prop="cate_id">
            <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
              <el-option v-for="item in addlist" :key="item.id" :label="item.cate_name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="content" label="文章内容">
            <quill-editor v-model="ruleForm.content"></quill-editor>
          </el-form-item>
          <el-form-item label="文章封面">
            <!-- 用来显示封面的图片 -->
            <img v-if="cover" :src="cover" alt="" class="cover-img" ref="imgRef" />
            <img v-else src="../../../assets/images/cover.jpg" alt="" class="cover-img" ref="imgRef" />
            <br />

            <!-- 文件选择框，默认隐藏 -->
            <input @change="coverChange" type="file" style="display: none" accept="image/*" ref="inp">
            <!-- 选择封面的按钮 -->
            <el-button @click="$refs.inp.click()" type="text">+ 选择封面</el-button>

          </el-form-item>
          <el-form-item>
              <el-button @click="fabu('已发布')" type="primary">发布</el-button>
              <el-button @click="fabu('草稿')" type="info">存为草稿</el-button>
          </el-form-item>
        </el-form>

      </el-dialog>

      <!-- 文章预览 -->
      <el-dialog
        title="文章预览"
        :visible.sync="yulanVisible"
        width="80%">
          <h1 class="title">{{ yulanData.title }}</h1>

          <div class="info">
            <span>作者：{{ yulanData.nickname || yulanData.username }}</span>
            <span>发布时间：{{ fromatData(yulanData.put_data) }}</span>
            <span>所属分类：{{ yulanData.cate_name }}</span>
            <span>状态：{{ yulanData.state }}</span>
          </div>

          <!-- 分割线 -->
          <el-divider></el-divider>

          <img :src="'http://www.liulongbin.top:3008' + yulanData.cover_img" alt="" />

          <div v-html="yulanData.content"></div>
      </el-dialog>
    </div>
  </template>

<script>
import dayjs from 'dayjs'
export default {
  name: 'ArtList',
  data () {
    return {
      // 查询参数对象
      q: {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
      },
      qq: {
        cate_id: '',
        state: ''
      },
      total: 0,
      dialogVisible: false,
      ruleForm: {
        name: '',
        region: '',
        content: '',
        cover_img: '',
        state: ''
      },
      rules: {
        // title: [
        //   // { required: true, message: '请输入文章标题', trigger: 'blur' },
        //   { min: 1, max: 30, message: '文章标题过长', trigger: 'blur' }
        // ],
        // cate_id: [{ required: true, message: '请选择文章类型', trigger: 'blur' }],
        // content: [{ required: true, message: '请输入文章内容', trigger: 'blur' }]
      },
      addlist: [],
      cover: '',
      artList: [],
      yulanData: '',
      yulanVisible: false
    }
  },
  methods: {
    handleClose (done) {
      this.$confirm('此操作将导致文章信息丢失，是否继续？', '提示', {
        type: 'warning'
      })
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    list () {
      this.$axios({
        method: 'get',
        url: '/my/cate/list'
      }).then(res => {
        // console.log(res.data)
        this.addlist = res.data.data
      })
    },
    coverChange (e) {
      // 提取用户选择的文件
      const file = e.target.files[0]
      if (file) {
        // // 1、创建对象
        // const fr = new FileReader()
        // // 2、读文件
        // fr.readAsDataURL(file)
        // // 3、获取结果
        // fr.onload = (e) => {
        // // 4、设置给img的src
        //   this.cover = e.target.result
        //   console.log(e)
        // }
        this.cover = URL.createObjectURL(file)
        this.ruleForm.cover_img = file
      } else {
        // 清除预览
        this.cover = ''
        // 清除用户选择的文件
        this.ruleForm.cover_img = ''
      }
    },
    fabu (state) {
      this.ruleForm.state = state
      // 兜底校验
      this.$refs.ruleForm.validate(valid => {
        if (!valid) return
        // 创建formdata对象
        const fd = new FormData()
        fd.append('title', this.ruleForm.name)
        fd.append('cate_id', this.ruleForm.region)
        fd.append('content', this.ruleForm.content)
        fd.append('state', this.ruleForm.state)
        fd.append('cover_img', this.ruleForm.cover_img)
        console.log(fd)
        this.$axios({
          method: 'post',
          url: '/my/article/add',
          data: fd
        }).then(res => {
          console.log(res.data)
          if (res.data.code !== 0) this.$message.success(res.data.message)
          this.$message.error(res.data.message)
        })
      })
    },
    getList () {
      this.$axios({
        method: 'get',
        url: '/my/article/list',
        params: this.q
      }).then(res => {
        // console.log(res.data)
        this.artList = res.data.data
        this.total = res.data.total
      })
    },
    fromatData (data) {
      return dayjs(data).format('YYYY-MM-DD HH:mm:ss')
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.q.pagesize = val
      this.getList()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.q.pagenum = val
      this.getList()
    },
    shaixuan () {
      this.q.cate_id = this.qq.cate_id
      this.q.state = this.qq.state
      this.q.pagenum = 1
      this.getList()
    },
    reset () {
      this.q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
      }
      this.qq = {
        cate_id: '',
        state: ''
      }
      this.getList()
    },
    yulan (id) {
      this.$axios({
        method: 'get',
        url: '/my/article/info',
        params: { id }
      }).then(res => {
        // console.log(res.data)
        this.yulanData = res.data.data
        this.yulanVisible = true
      })
    },
    del (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios({
          method: 'delete',
          url: '/my/article/info',
          params: { id }
        }).then(res => {
          // console.log(res.data)
          if (this.artList.length === 1 && this.q.pagenum > 1) {
            this.q.pagenum--
          }
          this.getList()
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }

  },
  created () {
    this.list()
    this.getList()
    // console.log(this.addlist)
  }
}
</script>

  <style lang="less" scoped>
  .search-box {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    .btn-pub {
      margin-top: 5px;
    }
  }
  .el-select{
    width: 100%;
  }
  /deep/.quill-editor .ql-editor{
      height: 300px;
  }
  // 设置图片封面的宽高
.cover-img {
  width: 400px;
  height: 280px;
  object-fit: cover;
}
.title {
  font-size: 24px;
  text-align: center;
  font-weight: normal;
  color: #000;
  margin: 0 0 10px 0;
}

.info {
  font-size: 12px;
  span {
    margin-right: 20px;
  }
}
  </style>
