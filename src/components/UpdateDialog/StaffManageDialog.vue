<template>
  <div>
    <!-- 新增/编辑 弹窗 -->
    <el-dialog :title="textMap[dialogStatus]" :close-on-click-modal="false" :visible.sync="dialogVisible" show-close width="70%">
      <el-form ref="dataForm" :rules="rules" :model="formData" label-position="right" label-width="110px">
        <!-- 姓名 -->
        <el-form-item :label="$t('姓名')" prop="name">
          <el-input v-model.trim="formData.name" style="width: 290px;" />
        </el-form-item>
        <!-- 手机号 -->
        <el-form-item :label="$t('手机号')" prop="mobile">
          <el-input v-model.trim="formData.mobile" style="width: 290px;" />
        </el-form-item>
        <!-- 密码 -->
        <el-form-item :label="$t('密码')" prop="password">
          <el-input v-model.trim="formData.password" style="width: 290px;" />
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item :label="$t('邮箱')" prop="email">
          <el-input v-model.trim="formData.email" style="width: 290px;" />
        </el-form-item>
      </el-form>
      <!-- 底部按钮 -->
      <div slot="footer">
        <!-- <sgo-fixed :key="new Date().getTime() || 0" placement="bottom" :height="80"> -->
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">{{ $t('取消') }}</el-button>
          <el-button :disabled="disabled_saveBtn" type="primary" @click="createData">{{ $t('确定') }}</el-button>
          <!-- <NewButton v-if="dialogStatus === 'create'" :functions="createData" type="primary">确定</NewButton> -->
          <!-- <NewButton v-else :functions="updateData" type="primary">确定</NewButton> -->
        </div>
        <!-- </sgo-fixed> -->
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'StaffManageDialog', // 员工管理弹窗
  components: {
    // NewButton: () => import('@/components/NewButton')
  },
  data() {
    return {
      formData: {
        id: undefined,
        name: undefined,
        mobile: undefined,
        password: undefined,
        email: undefined
      },
      dialogVisible: false,
      dialogStatus: '',
      textMap: {
        create: this.$t('新建'),
        update: this.$t('编辑')
      },
      rules: {
        name: [{ required: true, message: this.$t('姓名不能为空'), trigger: 'change' }],
        mobile: [{ required: true, message: this.$t('手机号不能为空'), trigger: 'change' }],
        password: [{ required: true, message: this.$t('密码不能为空'), trigger: 'change' }],
        email: [{ required: true, message: this.$t('邮箱不能为空'), trigger: 'change' }]
      },
      disabled_saveBtn: false
    }
  },
  methods: {
    // 初始化数据
    resetTemp() {
      this.formData = {
        id: undefined,
        name: undefined,
        mobile: undefined,
        password: undefined,
        email: undefined
      }
      this.disabled_saveBtn = false
    },
    // 新增（添加）
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogVisible = true
      this.$nextTick(() => {
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
          const result = this.$api.createStaff(tempData)
          result
            .then(
              response => {
                this.dialogVisible = false
                // 防重按钮
                setTimeout(() => {
                  this.disabled_saveBtn = false
                }, 150)
                this.$emit('refreshList', '1')
                this.$notify({
                  title: this.$t('成功'),
                  message: this.$t('创建成功'),
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

      // var p = new Promise((resolves, rejects) =>
      //   this.$refs.dataForm.validate(valid => {
      //     if (valid) {
      //       var a = this.$api.createArea({ area: Object.assign({}, this.formData) }, this.otherOptions)
      //       Promise.all([a])
      //         .then(function (values) {
      //           resolves(values)
      //         })
      //         .catch(error => {
      //           rejects(error)
      //         })
      //       a.then(response => {
      //         this.dialogVisible = false
      //         this.$emit('getData', this.formData)
      //         this.$notify({
      //           title: this.$t('noticeMessage.successTitle'),
      //           message: this.$t('noticeMessage.successCreateMessage'),
      //           type: 'success',
      //           duration: 2000
      //         })
      //       })
      //     } else {
      //       rejects(true)
      //     }
      //   })
      // )
      // return p
    },
    // 编辑（修改）
    handleUpdate(row) {
      // this.formData = JSON.parse(JSON.stringify(row))
      // 图片
      this.dialogStatus = 'update'
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs.dataForm.clearValidate()
      })
    },
    // 点击确定按钮，编辑数据
    updateData() {
    }
  }
}
</script>
