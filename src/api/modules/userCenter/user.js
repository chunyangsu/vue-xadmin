export default ({
  request
}) => ({
  /**
   * @description 请求项目中的文件
   * @param {String} url 文件地址
   */
  fetchUserList() {
    return request({
      url: '/user/list',
      method: 'get'
    })
  }
})
