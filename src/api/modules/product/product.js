export default ({
  request
}) => ({
  /**
   * @description 请求项目中的文件
   * @param {String} url 文件地址
   */
  // 获取产品列表
  getProductList(query) {
    return request({
      url: '/productCenter/product/list',
      method: 'get',
      params: query
    })
  },

  // 新增产品
  createProduct(data) {
    return request({
      url: '/productCenter/product/',
      method: 'post',
      data: data
    })
  },

  // 获取产品详情
  getProductDetail(id) {
    return request({
      url: '/productCenter/product/detail/' + id,
      method: 'get'
    })
  },

  // 编辑产品
  updateProduct(data) {
    return request({
      url: '/productCenter/product/',
      method: 'put',
      data: data
    })
  },

  // 删除产品
  deleteProduct(id) {
    return request({
      url: '/productCenter/product/' + id,
      method: 'delete'
    })
  }
})
