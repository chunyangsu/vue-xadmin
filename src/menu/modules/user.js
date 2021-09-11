export default {
  path: '/user',
  title: '用户中心',
  icon: 'user-circle-o',
  children: (pre => [{
    path: `${pre}UserManage`,
    title: '用户管理',
    icon: 'user-circle-o'
  }])('/user/')
}
