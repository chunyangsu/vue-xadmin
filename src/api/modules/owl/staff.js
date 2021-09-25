export default ({
  request
}) => ({
  /**
   * @description 请求项目中的文件
   * @param {String} url 文件地址
   */
  // 获取员工列表
  getStaffList() {
    return request({
      url: '/user/list',
      method: 'get'
    })
  },
  // 创建员工
  createStaff(data) {
    return request({
      url: '/user/',
      method: 'post',
      data: data
    })
  }
})
