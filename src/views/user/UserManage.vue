<template>
  <div>
    <d2-container>
      <div slot="header">
        <!-- 新增按钮 -->
        <el-button style="margin-right: 10px; float: right;" type="primary" icon="el-icon-plus" @click="showCreateDialog">{{ $t('添加') }}</el-button>
      </div>
      <!-- 列表数据 -->
      <el-table v-loading="listLoading" :key="tableKey" :data="list" border fit highlight-current-row style="width: 99.99%;">
        <el-table-column :label="$t('序号')" type="index" align="center" width="60" />
        <el-table-column :label="$t('姓名')" min-width="70px" align="left">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('操作')" width="150px" align="center">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="showUpdataDialog(scope.row)">{{ $t('编辑') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </d2-container>
    <!-- 新增/编辑 弹窗 -->
    <user-manage-dialog ref="UserManageDialog" @getData="getData" />
  </div>
</template>

<script>
// import Axios from 'axios'

export default {
  name: 'UserManage', // 用户管理
  components: {
    UserManageDialog: () => import('@/components/UpdateDialog/UserManageDialog')
  },
  data() {
    return {
      listLoading: true,
      tableKey: 0,
      list: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 获取列表
    getList() {
      this.listLoading = false
      // this.$api.fetchUserList().then(response => {
      //   this.list = response.data
      //   setTimeout(() => {
      //     this.listLoading = false
      //   }, 150)
      // })
      // Axios({
      //   method: 'get',
      //   url: 'http://localhost:3000/user/getList'
      // }).then(response => {
      //   console.log(response)
      //   if (response.status === 200) {
      //     this.list = response.data.data
      //   }
      //   setTimeout(() => {
      //     this.listLoading = false
      //   }, 150)
      // })
    },
    // 打开新增弹窗
    showCreateDialog() {
      this.$refs.UserManageDialog.handleCreate()
    },
    // 打开编辑弹窗
    showUpdataDialog() {

    },
    getData() { }
  }
}
</script>
