<template>
  <d2-container>
    <!-- 搜索栏 -->
    <div slot="header">
      <div>
        <!-- 型号编码 -->
        <!-- <el-select :remote-method="getProductListByModelCode" :loading="LDCodeproduct" v-model="searchQuery.id" :placeholder="$t('product.product.code')" clearable filterable remote reserve-keyword class="selectStyle" style="width: 150px;margin-right: 5px; margin-left: 5px; ">
          <el-option v-for="item in productCodeLists" :key="item.id" :label="item.code" :value="item.product_id" />
        </el-select> -->
        <!-- 产品型号 -->
        <!-- <model-search v-model="searchQuery.product_ids" :page-code="otherOptions.yesgooo_menu_code" style="margin-right: 5px; " /> -->
        <!-- 品牌 -->
        <!-- <el-select :remote-method="getBrandsList" :loading="LDbrand" v-model="searchQuery.brand_id" :placeholder="$t('placeholder.brand')" clearable filterable remote reserve-keyword class="selectStyle" style="width: 180px;margin-right: 5px; " @change="brandChange" @focus="brandFocus">
          <el-option v-for="item in BrandLists" :key="item.id" :label="item.name" :value="item.id" />
        </el-select> -->
        <!-- 产品名称 -->
        <el-input v-model="searchQuery.name" placeholder="产品名称" style="width: 180px; margin-bottom: 0;margin-right: 5px; " class="filter-item" clearable />
        <!-- 分类名称 -->
        <!-- <el-cascader :props="defaultProps" :options="categoryLists" v-model="category_id" :placeholder="$t('placeholder.category_name')" class="selectStyle" style="width: 180px;margin-right: 5px;" :clearable="true" filterable @change="searchCateValue" /> -->
        <!-- 搜索 -->
        <el-button type="primary" icon="el-icon-search" @click="handleSearch" />
        <!-- 添加 -->
        <el-button style="margin-right: 10px; float: right;" type="primary" icon="el-icon-plus" @click="showCreate">添加</el-button>
      </div>
    </div>

    <!-- 列表 -->
    <el-table v-loading="listLoading" ref="productTable" :key="tableKey" :data="list" :height="ListTableHeight" row-key="id" border lazy highlight-current-row style="width: 99.99%;">
      <el-table-column label="序号" type="index" align="center" width="50px" />
      <!-- 产品编码 -->
      <el-table-column label="产品编码" min-width="100px" align="left">
        <template slot-scope="scope">
          <span class="link-type" @click="showProDetail(scope.row)">{{ scope.row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column label="品牌" min-width="100px" show-overflow-tooltip align="left">
        <template slot-scope="scope">
          <span>{{ scope.row.brand_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品名称" min-width="100px" show-overflow-tooltip align="left">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品分类" min-width="100px" show-overflow-tooltip align="left">
        <template slot-scope="scope">
          <span>{{ scope.row.category_name }}</span>
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
          <!-- 添加型号 -->
          <!-- <el-button :type="buttonStyle.edit.type" size="mini" plain @click="addModel(scope.row)">添加型号</el-button> -->
          <!-- 导入型号 -->
          <!-- <el-button :type="buttonStyle.edit.type" size="mini" plain @click="importModel(scope.row)">导入型号</el-button> -->
          <!-- 复制产品 -->
          <!-- <el-button :type="buttonStyle.edit.type" size="mini" plain @click="copy(scope.row)">复制产品</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <div class="pagination-container">
      <el-pagination :current-page="searchQuery.page" :page-sizes="[20,50,100]" :page-size="searchQuery.limit" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
    <!-- 新建编辑弹窗 -->
    <product-dialog v-if="pro_update_show" ref="ProductDialog" :pro-title="proTitle" :cur-id="pro_id" @getData="handleSearch" @updateRefresh="updateRefresh" />
  </d2-container>
</template>

<script>
export default {
  name: 'ProductManage', // 产品管理
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
        // id: undefined,
        // category_id: undefined,
        // brand_id: undefined
      },
      pro_update_show: false,
      proTitle: '',
      pro_id: undefined
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 获取产品列表
    getList() {
      this.listLoading = false
    },
    // 条件搜索
    handleSearch() {
      // this.listLoading = true
      // this.searchQuery.page = 1
      // if (this.pro_model_list_show) {
      //   this.closeProList()
      // }
      // if (this.searchQuery.name) {
      //   this.searchQuery.name = this.searchQuery.name.trim()
      // }
      // for (var key in this.searchQuery) {
      //   if (this.searchQuery[key] === '' || this.searchQuery[key] === []) {
      //     delete this.searchQuery[key]
      //   }
      // }
      // this.getList()
    },
    // 切换每页数量
    handleSizeChange(val) {
      // this.searchQuery.limit = val
      // this.searchQuery.page = 1
      // this.getList()
      // if (this.pro_model_list_show) {
      //   this.closeProList()
      // }
    },
    // 切换当前页
    handleCurrentChange(val) {
      // this.searchQuery.page = val
      // this.getList()
      // if (this.pro_model_list_show) {
      //   this.closeProList()
      // }
    },
    // 打开产品新增弹窗
    showCreate() {
      this.proTitle = 'create'
      // this.pro_update_code = 'createProProduct'
      if (this.pro_update_show) {
        // 该组件已创建过，只需展示
        this.$nextTick(() => {
          this.$refs.ProductDialog.handleCreate()
        })
      } else {
        // 需要第一次创建该组件
        this.pro_update_show = true
      }
    },
    // 打开编辑弹窗
    update(row) {
      // this.proTitle = 'update'
      // this.pro_update_code = 'updateProProduct'
      // this.pro_id = row.id
      // if (this.pro_update_show) {
      //   // 该组件已创建过，只需展示
      //   this.$nextTick(() => {
      //     this.$refs.ProductDialog.handleUpdate()
      //   })
      // } else {
      //   // 需要第一次创建该组件
      //   this.pro_update_show = true
      // }
    },
    // 打开产品详情弹窗
    showProDetail(row) {
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
    updateRefresh() {
      this.getList()
    }
  }
}
</script>
