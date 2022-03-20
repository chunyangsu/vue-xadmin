<template>
  <div>
    <el-dialog :title="dialogTitleMap[dialogStatus]" :visible.sync="dialogVisible" :close-on-click-modal="false" show-close top="50px" width="90%" append-to-body>
      <div v-loading="dialogLoading">
        <el-form ref="dataForm" :rules="rules" :model="formData" label-position="right" label-width="110px" style="width:100%; margin:0; padding-right: 20px;">
          <!-- 产品名称 -->
          <el-form-item label="产品名称" prop="name">
            <el-input v-model.trim="formData.name" style="width: 290px;" />
          </el-form-item>
          <!--品牌-->
          <el-form-item label="品牌" prop="brand_id">
            <el-select :remote-method="searchBrandList" :loading="loadingBrand" placeholder="请选择" v-model="formData.brand_id" filterable remote reserve-keyword style="width: 250px">
              <el-option v-for="item in brandList" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
        </el-form>
        <div style="height: 50px;" />
      </div>
      <!-- 操作按钮 -->
      <div slot="footer">
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button v-if="dialogStatus === 'create'" :disabled="disabled_saveBtn" type="primary" @click="createData">确定</el-button>
          <el-button v-else :disabled="disabled_saveBtn" type="primary" @click="updateData">确定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { createObjectName } from '@/utils/upload'
// import NewButton from '@/components/button'
// import { downloadFile } from '@/utils/download'
// import { splitFileName, fileExtension } from '@/utils/splitFileName'
// import { replaceToHTTP, replaceToHTTPS } from '@/utils/handleUrl'
// import { Message } from 'element-ui'
// import UpMultiImage from '@/components/UploadManage/UpMultiImage'
// import util from '@/libs/util'
// import buttonStyle from '@/common/buttonStyle'

export default {
  name: 'ProductDialog', // 产品新建/编辑 弹窗
  components: {
  },
  props: {
    // 当前id
    curId: {
      type: Number,
      default: function () {
        return 0
      }
    },
    // 判断是新增还是编辑
    proTitle: {
      type: String,
      default: function () {
        return ''
      }
    }
  },
  data() {
    return {
      dialogLoading: false,
      formData: {
        id: undefined,
        // code: undefined,
        name: undefined,
        brand_id: undefined // 品牌id
        // category_id: undefined // 分类id
      },
      dialogVisible: false,
      dialogStatus: '',
      dialogTitleMap: {
        create: '新建',
        update: '编辑'
      },
      rules: {
        name: [{ required: true, message: '产品名称不能为空', trigger: 'change' }],
        brand_id: [{ required: true, message: '品牌不能为空', trigger: 'change' }]
      },
      disabled_saveBtn: false,
      loadingBrand: false,
      brandList: [] // 品牌列表
    }
  },

  created() {
    if (this.proTitle === 'create') {
      this.handleCreate()
    }
    if (this.proTitle === 'update') {
      this.handleUpdate()
    }
  },
  methods: {
    // 初始化数据
    resetData() {
      // 产品信息
      this.formData = {
        id: undefined,
        // code: undefined,
        name: undefined,
        brand_id: undefined // 品牌id
        // category_id: undefined // 分类id
      }
      this.dialogLoading = true
      this.disabled_saveBtn = false
      this.brandList = []
    },
    // 新增（添加）
    handleCreate() {
      this.resetData()
      this.dialogStatus = 'create'
      this.dialogVisible = true
      this.$api.getBrandList().then(response => {
        this.brandList = response.data
      })
      this.$nextTick(() => {
        this.dialogLoading = false
        this.$refs.dataForm.clearValidate()
      })
    },
    // 打开编辑弹窗
    handleUpdate() {
      this.resetData()
      this.dialogStatus = 'update'
      this.dialogVisible = true
      this.$api.getBrandList().then(response => {
        this.brandList = response.data
      })
      // 获取详情
      this.getDetail()
      this.$nextTick(() => {
        this.$refs.dataForm.clearValidate()
      })
    },
    // 获取详情
    getDetail() {
      this.$api.getProductDetail(this.curId).then(response => {
        this.formData = response
        setTimeout(() => {
          this.dialogLoading = false
        }, 150)
      })
    },
    // 搜索品牌列表
    searchBrandList(query) {
      if (query !== '') {
        this.loadingBrand = true
        this.$api.getBrandList({ name: query }).then(response => {
          this.brandList = response.data
          setTimeout(() => {
            this.loadingBrand = false
          }, 50)
        })
      } else {
        this.brandList = []
      }
    },
    // 点击确定按钮，新建数据
    createData() {
      if (this.disabled_saveBtn) {
        return // 防重复提交
      }
      this.disabled_saveBtn = true
      const _this = this
      _this.$refs.dataForm.validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.formData)
          const result = this.$api.createProduct(tempData)
          result
            .then(
              response => {
                this.dialogVisible = false
                // 防重按钮
                setTimeout(() => {
                  this.disabled_saveBtn = false
                }, 150)
                this.$emit('createBack', '1')
                this.$notify({
                  title: this.$t('成功'),
                  message: this.$t('创建成功！'),
                  type: 'success',
                  duration: 2000
                })
              },
              err => {
                console.log(err)
                _this.disabled_saveBtn = false
              }
            )
            .catch(e => {
              console.log(e)
              _this.disabled_saveBtn = false
            })
        } else {
          _this.disabled_saveBtn = false
        }
      })
    },
    // 点击确定按钮，编辑数据
    updateData() {
      if (this.disabled_saveBtn) {
        return // 防重复提交
      }
      this.disabled_saveBtn = true
      const _this = this
      _this.$refs.dataForm.validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.formData)
          const result = this.$api.updateProduct(tempData)
          result
            .then(
              response => {
                this.dialogVisible = false
                // 防重按钮
                setTimeout(() => {
                  this.disabled_saveBtn = false
                }, 150)
                this.$emit('updateBack', '1')
                this.$notify({
                  title: this.$t('成功'),
                  message: this.$t('编辑成功！'),
                  type: 'success',
                  duration: 2000
                })
              },
              err => {
                console.log(err)
                _this.disabled_saveBtn = false
              }
            )
            .catch(e => {
              console.log(e)
              _this.disabled_saveBtn = false
            })
        } else {
          _this.disabled_saveBtn = false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
// 产品描述模块
.proModule {
  margin-bottom: 10px;
}
// .proModule .module-title {
// }
.proModule .module-title .name {
  float: left;
  font-size: 14px;
  color: #eb630c;
  font-weight: bold;
}
.proModule .module-title .btn {
  float: left;
  line-height: 35px;
  margin-left: 10px;
}
</style>
