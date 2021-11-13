<template>
  <div>
    <el-dialog :title="dialogTitleMap[dialogStatus]" :visible.sync="dialogVisible" :close-on-click-modal="false" show-close top="50px" width="90%" append-to-body>
      <div v-loading="dialogLoading">
        <el-form ref="dataForm" :rules="rules" :model="formData" label-position="right" label-width="110px" style="width:100%; margin:0; padding-right: 20px;">
          <!-- 产品信息 -->
          <el-row>
            <el-col :span="8">
              <!-- 产品名称 -->
              <el-form-item label="产品名称" prop="name">
                <el-input v-model.trim="formData.name" style="width: 290px;" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <!--品牌-->
              <!-- <el-form-item :label="$t('product.product.brand')" prop="brand_id">
                <el-select :remote-method="getBrandsListAddSerach" :disabled="brandDisabledChange" :loading="LDAddbrand" :placeholder="$t('placeholder.brand')" v-model="product.brand_id" filterable remote reserve-keyword style="width: 80%" @change="brandChange">
                  <el-option v-for="item in BrandAddSerachLists" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
              </el-form-item> -->
            </el-col>
            <el-col :span="8">
              <!-- 产品分类 -->
              <!-- <el-form-item :label="$t('product.product.category')">
                <el-cascader v-if="dialogVisible" :props="defaultProps" :options="categoryLists" v-model="product.category_id" :placeholder="$t('placeholder.pro_category')" filterable clearable style="width: 80%" />
              </el-form-item> -->
            </el-col>
          </el-row>
        </el-form>
        <div style="height: 50px;" />
      </div>
      <!-- 操作按钮 -->
      <div slot="footer">
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <!-- <NewButton v-if="dialogStatus ==='update'" :functions="updateData" type="primary">{{ $t('button.confirm') }}</NewButton> -->
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
        code: undefined,
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
      }
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
    initData() {
      // 产品信息
      this.formData = {
        id: undefined,
        code: undefined,
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
    }
  }
}
</script>
<style lang="scss" scoped>
// 产品描述模块
.proModule {
  margin-bottom: 10px;
}
.proModule .module-title {
}
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
