<template>
    <div>
      <el-card class="box-card">
        <div slot="header" class="clearfix header-box">
          <span>文章分类</span>
          <el-button type="primary" @click="dialogVisible = true" size="mini">添加分类</el-button>
        </div>
        <el-table
          stripe
          border
          :data="list"
          style="width: 100%">
          <el-table-column
            type="index"
            label="序号"
            width="50">
          </el-table-column>
          <el-table-column
            prop="cate_name"
            label="分类名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="cate_alias"
            label="分类别名">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button @click="xiugai(scope.row)" size="mini" type="primary">修改</el-button>
              <el-button @click="del(scope.row)" size="mini" type="danger">删除</el-button>
            </template>

          </el-table-column>
      </el-table>
      </el-card>
      <!-- 添加 -->
      <el-dialog
        title="添加文章分类示"
        :visible.sync="dialogVisible"
        width="35%">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm">
          <el-form-item label="分类名称" prop="cate_name">
            <el-input v-model="ruleForm.cate_name"></el-input>
          </el-form-item>
          <el-form-item label="分类别名" prop="cate_alias">
            <el-input v-model="ruleForm.cate_alias"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button  @click="dialogVisible = false">取 消</el-button>
          <el-button  type="primary" @click="add">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 编辑 -->
      <el-dialog
        title="编辑文章分类示"
        :visible.sync="bianjiVisible"
        width="35%">
        <el-form :model="bianjiForm" :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm">
          <el-form-item label="分类名称" prop="cate_name">
            <el-input v-model="bianjiForm.cate_name"></el-input>
          </el-form-item>
          <el-form-item label="分类别名" prop="cate_alias">
            <el-input v-model="bianjiForm.cate_alias"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button  @click="bianjiVisible = false">取 消</el-button>
            <el-button  type="primary" @click="bianji">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </template>

<script>
export default {
  name: 'ArtCate',
  data () {
    return {
      list: [],
      // 添加
      dialogVisible: false,
      ruleForm: {
        cate_name: '',
        cate_alias: ''
      },
      rules: {
        cate_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { pattern: /^\S{1,10}$/, message: '分类名必须是1-10位的非空字符', trigger: 'blur' }
        ],
        cate_alias: [
          { required: true, message: '请输入分类别名', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]{1,15}$/, message: '分类别名必须是1-15位的字母数字', trigger: 'blur' }
        ]
      },
      // 修改
      bianjiVisible: false,
      bianjiForm: {
        cate_name: '',
        cate_alias: ''
      }
    }
  },
  created () {
    this.getlist()
  },
  methods: {
    getlist () {
      this.$axios({
        method: 'get',
        url: '/my/cate/list'
      }).then(res => {
        // console.log(res.data)
        this.list = res.data.data
      })
    },
    add () {
      // 兜底校验
      this.$refs.ruleForm.validate(valid => {
        if (!valid) return
        // 发送请求
        this.$axios({
          method: 'post',
          url: '/my/cate/add',
          data: {
            cate_name: this.ruleForm.cate_name,
            cate_alias: this.ruleForm.cate_alias
          }
        }).then(res => {
          console.log(res.data)
          if (res.data.code !== 0) return this.$message.error(res.data.message)
          this.$message.success(res.data.message)
          this.dialogVisible = false
          // 更新数据
          this.getlist()
        })
      })
    },
    xiugai (row) {
      this.bianjiForm = { ...row }
      this.bianjiVisible = true
    },
    bianji (row) {
      // 兜底校验
      this.$refs.ruleForm.validate(valid => {
        this.$axios({
          method: 'put',
          url: '/my/cate/info',
          data: {
            id: this.bianjiForm.id,
            cate_name: this.bianjiForm.cate_name,
            cate_alias: this.bianjiForm.cate_alias
          }
        }).then(res => {
          // console.log(res.data)
          if (res.data.code !== 0) return this.$message.error(res.data.message)
          this.$message.success(res.data.message)
          this.bianjiVisible = false
          // 更新数据
          this.getlist()
        })
      }
      )
    },
    del (row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 请求
        this.$axios({
          method: 'delete',
          url: '/my/cate/del',
          params: { id: row.id }
        }).then(res => {
          console.log(res.data)
          this.getlist()
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

      // console.log(row, String(row.id))
    }
  }
}
</script>

  <style lang="less" scoped>
  .header-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  </style>
