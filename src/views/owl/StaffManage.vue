<template>
  <d2-container>
    <!-- 搜索栏 -->
    <div class="filter-container">
      <el-input :placeholder="$t('姓名')" v-model="listQuery.name" style="width: 200px; margin-left: 5px; margin-right: 10px;" clearable @keyup.enter.native="handleSearch" />
      <!-- 搜索按钮 -->
      <el-button type="primary" icon="el-icon-search" @click="handleSearch" />
      <!-- 添加按钮 -->
      <el-button style="margin-right: 10px; float: right;" type="primary" icon="el-icon-plus" @click="showCreate">添加</el-button>
    </div>
    <!-- 列表 -->
    <el-table v-loading="listLoading" :key="tableKey" :data="list" :height="ListTableHeight" border fit highlight-current-row style="width: 99.98%;">
      <el-table-column :label="$t('序号')" type="index" fixed align="center" width="50" />
      <el-table-column :label="$t('姓名')" min-width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('手机号码')" min-width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.mobile }}</span>
        </template>
      </el-table-column>
      <!-- 操作按钮 -->
      <el-table-column :label="$t('操作')" min-width="120px" align="left">
        <template slot-scope="scope">
          <!-- 编辑 -->
          <el-button type="primary" size="mini" plain @click="showUpdata(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <!-- <div class="pagination-container">
        <el-pagination :current-page="listQuery.page" :page-sizes="[20, 50, 100]" :page-size="listQuery.limit" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div> -->
    <!-- 新增/编辑 弹窗 -->
    <staff-manage-dialog ref="StaffManageDialog" @refreshList="refreshList" />
  </d2-container>
</template>

<script>

export default {
  name: 'StaffManage', // 员工管理
  components: {
    StaffManageDialog: () => import('@/components/UpdateDialog/StaffManageDialog')
  },
  data() {
    return {
      ListTableHeight: window.innerHeight - 200 + 'px', // 表格高度(屏幕高度减去200)
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        name: undefined
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 获取列表
    getList() {
      this.listLoading = true
      this.$api.getStaffList().then(response => {
        this.list = response.data
        setTimeout(() => {
          this.listLoading = false
        }, 150)
      })
    },
    handleSearch() {

    },
    // 打开新增弹窗
    showCreate() {
      this.$refs.StaffManageDialog.handleCreate()
    },
    // 打开编辑弹窗
    showUpdata() {

    },
    // 刷新列表
    refreshList() {
      this.getList()
    }
  }
}
</script>
