<template>
  <div>
    <el-dialog :title="dialogTitleMap[dialogStatus]" :visible.sync="dialogVisible" :close-on-click-modal="false" show-close top="50px" width="90%" append-to-body>
      <div v-loading="dialogLoading">
        <el-form ref="dataForm" :rules="rules" :model="formData" label-position="right" label-width="110px" style="width:100%; margin:0; padding-right: 20px;">
          <!-- 品牌名称 -->
          <el-form-item label="品牌名称" prop="name">
            <el-input v-model.trim="formData.name" style="width: 290px;" />
          </el-form-item>
        </el-form>
        <div style="height: 50px;" />
      </div>
      <!-- 操作按钮 -->
      <div slot="footer">
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button v-if="dialogStatus === 'create'" :disabled="disabled_saveBtn" type="primary" @click="createData">{{ $t('确定') }}</el-button>
          <!-- <NewButton v-else :functions="createData" type="primary">{{ $t('button.confirm') }}</NewButton> -->
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
  name: 'BrandDialog', // 品牌新建/编辑 弹窗
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
    dialogTitle: {
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
        name: undefined
      },
      dialogVisible: false,
      dialogStatus: '',
      dialogTitleMap: {
        create: '新建',
        update: '编辑'
      },
      rules: {
        // brand_id: [{ required: true, message: this.$t('validateMessage.brand'), trigger: 'change' }],
        // modelCode: [{ required: true, message: this.$t('validateMessage.model'), trigger: 'change' }],
        // measure: [{ required: true, message: this.$t('validateMessage.unit'), trigger: 'change' }],
        // series_models: [{ required: true, message: this.$t('validateMessage.series_models'), trigger: 'change' }]
      },
      disabled_saveBtn: false
    }
  },

  created() {
    if (this.dialogTitle === 'create') {
      this.handleCreate()
    }
    if (this.dialogTitle === 'update') {
      this.handleUpdate()
    }
  },
  methods: {
    // 初始化数据
    initData() {
      // 产品信息
      this.formData = {
        id: undefined,
        name: undefined
      }
      this.dialogLoading = true
    },
    // 新增（添加）
    handleCreate() {
      this.initData()
      this.dialogStatus = 'create'
      this.dialogVisible = true
      this.$nextTick(() => {
        this.dialogLoading = false
        this.$refs.dataForm.clearValidate()
      })
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
          const result = this.$api.createBrand(tempData)
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
    }
  }
}
</script>
