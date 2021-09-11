export default ({
  request
}) => ({
  /**
   * @description 请求项目中的文件
   * @param {String} url 文件地址
   */
  // 获取用户列表
  fetchUserList() {
    return request({
      url: '/user/list',
      method: 'get'
    })
  },
  // 新增用户
  createUser(data) {
    return request({
      url: '/user/',
      method: 'post',
      data: data
    })
  }
})
