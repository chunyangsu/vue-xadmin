<template>
  <div>
    <!-- 新增/编辑 弹窗 -->
    <el-dialog :title="textMap[dialogStatus]" :close-on-click-modal="false" :visible.sync="dialogVisible" show-close @contextmenu.native="rightDilogClick($event)">
      <el-form ref="dataForm" :rules="rules" :model="formData" label-position="right" label-width="110px">
        <el-form-item :label="$t('姓名')" prop="name">
          <el-input v-model="formData.name" />
        </el-form-item>
      </el-form>
      <!-- 底部按钮 -->
      <div slot="footer">
        <!-- <sgo-fixed :key="new Date().getTime() || 0" placement="bottom" :height="80"> -->
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">{{ $t('取消') }}</el-button>
          <el-button type="primary" @click="createData">{{ $t('确定') }}</el-button>
          <!-- <NewButton v-if="dialogStatus === 'create'" :functions="createData" type="primary">{{ $t('button.confirm') }}</NewButton> -->
          <!-- <NewButton v-else :functions="updateData" type="primary">{{ $t('button.confirm') }}</NewButton> -->
        </div>
        <!-- </sgo-fixed> -->
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import NewButton from '@/components/button'

export default {
  name: 'UserManageDialog', // 用户管理弹窗
  components: {
    // NewButton
  },
  data() {
    return {
      formData: {
        id: undefined,
        name: undefined
      },
      dialogVisible: false,
      dialogStatus: '',
      textMap: {
        create: this.$t('新建'),
        update: this.$t('编辑')
      },
      dialogPvVisible: false,
      rules: {
        name: [{ required: true, message: this.$t('validateMessage.area.name'), trigger: 'change' }]
      }
    }
  },
  methods: {
    // 初始化数据
    resetTemp() {
      this.formData = {
        id: undefined,
        name: undefined
      }
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
      const tempData = {
        id: 0,
        name: this.formData.name
      }
      this.$api.createUser(tempData).then(response => {
        console.log(response)
      })
      // if (this.formData.name) {
      //   this.formData.name = this.formData.name.trim()
      // }
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
