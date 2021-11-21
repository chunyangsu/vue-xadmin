<template>
  <d2-container>
    <!-- 搜索栏 -->
    <div slot="header">
      <div>
        <!-- 品牌名称 -->
        <el-input v-model="searchQuery.name" placeholder="品牌名称" style="width: 180px; margin-bottom: 0;margin-right: 5px; " class="filter-item" clearable />
        <!-- 搜索 -->
        <el-button type="primary" icon="el-icon-search" @click="handleSearch" />
        <!-- 添加 -->
        <el-button style="margin-right: 10px; float: right;" type="primary" icon="el-icon-plus" @click="showCreate">添加</el-button>
      </div>
    </div>

    <!-- 列表 -->
    <el-table v-loading="listLoading" ref="brandTable" :key="tableKey" :data="list" :height="ListTableHeight" row-key="id" border lazy highlight-current-row style="width: 99.99%;">
      <el-table-column label="序号" type="index" align="center" width="50px" />
      <!-- 名称 -->
      <el-table-column label="品牌名称" min-width="100px" show-overflow-tooltip align="left">
        <template slot-scope="scope">
          <span class="link-type" @click="showBrandDetail(scope.row)">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="150px" align="left">
        <template slot-scope="scope">
          <span>{{ scope.row.create_time }}</span>
        </template>
      </el-table-column>
      <!-- 操作按钮 -->
      <el-table-column label="操作" width="120px" align="center">
        <template slot-scope="scope">
          <!-- 编辑 -->
          <el-button type="primary" size="mini" plain @click="update(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <div class="pagination-container">
      <el-pagination :current-page="searchQuery.page" :page-sizes="[20,50,100]" :page-size="searchQuery.limit" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
    <!-- 新建编辑弹窗 -->
    <brand-dialog v-if="brand_update_show" ref="BrandDialog" :dialog-title="dialogTitle" :cur-id="brandId" @createBack="handleSearch" @updateBack="updateBack" />
  </d2-container>
</template>

<script>
export default {
  name: 'BrandManage', // 品牌管理
  data() {
    return {
      ListTableHeight: window.innerHeight - 250,
      tableKey: 0,
      list: [],
      total: null,
      listLoading: true,
      searchQuery: {
        page: 1,
        limit: 20,
        name: undefined
      },
      brand_update_show: false,
      dialogTitle: '',
      brandId: undefined
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 获取品牌列表
    getList() {
      this.listLoading = true
      this.list = []
      this.$api.getBrandList(this.searchQuery).then(response => {
        this.list = response.data
        setTimeout(() => {
          this.listLoading = false
        }, 50)
      })
    },
    // 条件搜索
    handleSearch() {
      this.searchQuery.page = 1
      this.getList()
    },
    // 切换每页数量
    handleSizeChange(val) {
      // this.searchQuery.limit = val
      // this.searchQuery.page = 1
      // this.getList()
    },
    // 切换当前页
    handleCurrentChange(val) {
      // this.searchQuery.page = val
      // this.getList()
    },
    // 打开品牌新增弹窗
    showCreate() {
      this.dialogTitle = 'create'
      if (this.brand_update_show) {
        // 该组件已创建过，只需展示
        this.$nextTick(() => {
          this.$refs.BrandDialog.handleCreate()
        })
      } else {
        // 需要第一次创建该组件
        this.brand_update_show = true
      }
    },
    // 打开编辑弹窗
    update(row) {
      // this.dialogTitle = 'update'
      // this.pro_update_code = 'updateProProduct'
      // this.brandId = row.id
      // if (this.brand_update_show) {
      //   // 该组件已创建过，只需展示
      //   this.$nextTick(() => {
      //     this.$refs.ProductDialog.handleUpdate()
      //   })
      // } else {
      //   // 需要第一次创建该组件
      //   this.brand_update_show = true
      // }
    },
    // 打开品牌详情弹窗
    showBrandDetail(row) {
      // this.pro_detail_id = id
      // this.pro_detail_page_code = 'ProProductDetail'
      // if (this.pro_detail_show) {
      //   // 该组件已创建过，只需展示
      //   this.$nextTick(() => {
      //     this.$refs.ProductDetail.handleDetail()
      //   })
      // } else {
      //   // 需要第一次创建该组件
      //   this.pro_detail_show = true
      // }
    },
    // 编辑成功后的回调
    updateBack() {
      this.getList()
    }
  }
}
</script>
