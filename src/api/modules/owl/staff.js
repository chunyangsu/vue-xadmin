export default ({
  request
}) => ({
  /**
   * @description 请求项目中的文件
   * @param {String} url 文件地址
   */
  // 获取员工列表
  getStaffList(query) {
    return request({
      url: '/owl/user/list',
      method: 'get',
      params: query
    })
  },
  // 创建员工
  createStaff(data) {
    return request({
      url: '/owl/user/',
      method: 'post',
      data: data
    })
  },
  // 编辑员工
  updateStaff(data) {
    return request({
      url: '/owl/user/',
      method: 'put',
      data: data
    })
  },

  // 删除员工
  deleteStaff(id) {
    return request({
      url: '/owl/user/' + id,
      method: 'delete'
    })
  },
  // 获取员工详情
  getStaffDetail(id) {
    return request({
      url: '/owl/user/detail/' + id,
      method: 'get'
    })
  }
})
