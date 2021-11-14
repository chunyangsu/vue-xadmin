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
      url: '/product/list',
      method: 'get',
      params: query
    })
  }
})
