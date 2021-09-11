<template>
  <div>
    <d2-container>
      <!-- 列表数据 -->
      <el-table v-loading="listLoading" :key="tableKey" :data="list" border fit highlight-current-row style="width: 99.99%;">
        <el-table-column :label="$t('序号')" type="index" align="center" width="60" />
        <el-table-column :label="$t('姓名')" min-width="70px" align="left">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
      </el-table>
    </d2-container>
  </div>
</template>

<script>
// import Axios from 'axios'

export default {
  name: 'UserCenter', // 用户中心
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
      this.$api.fetchUserList().then(response => {
        this.list = response.data
        setTimeout(() => {
          this.listLoading = false
        }, 150)
      })
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
    }
  }
}
</script>
