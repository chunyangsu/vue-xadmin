export default ({
  request
}) => ({
  /**
   * @description 请求项目中的文件
   * @param {String} url 文件地址
   */
  // 获取品牌列表
  getBrandList(query) {
    return request({
      url: '/productCenter/brand/list',
      method: 'get',
      params: query
    })
  },

  // 新增品牌
  createBrand(data) {
    return request({
      url: '/productCenter/brand/',
      method: 'post',
      data: data
    })
  }
})
