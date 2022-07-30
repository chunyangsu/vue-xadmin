// import { find, assign } from 'lodash'

// const users = [
//   { username: 'admin', password: 'admin', uuid: 'admin-uuid', name: 'Admin' },
//   { username: 'editor', password: 'editor', uuid: 'editor-uuid', name: 'Editor' },
//   { username: 'user1', password: 'user1', uuid: 'user1-uuid', name: 'User1' }
// ]

export default ({
  service,
  request,
  serviceForMock,
  requestForMock,
  mock,
  faker,
  tools
}) => ({
  /**
   * @description 登录
   * @param {Object} data 登录携带的信息
   */
  SYS_USER_LOGIN(username, password) {
    // 模拟数据
    // mock
    //   .onAny('/login')
    //   .reply(config => {
    //     const user = find(users, tools.parse(config.data))
    //     return user
    //       ? tools.responseSuccess(assign({}, user, { token: faker.random.uuid() }))
    //       : tools.responseError({}, '账号或密码不正确')
    //   })
    // 接口请求
    const param = new URLSearchParams()
    param.append('username', username)
    param.append('password', password)
    // param.append('appid', appid)
    // param.append('time', time)
    // param.append('hash', hash)
    return request({
      url: '/login',
      method: 'post',
      data: param
    })
  }
  // 退出登录
  // logout() {
  //   return request({
  //     url: '/user/logout',
  //     method: 'post'
  //   })
  // }

  // 获取用户信息
  // getUserInfo() {
  //   return request({
  //     url: '/user',
  //     method: 'get'
  //   })
  // }

})
