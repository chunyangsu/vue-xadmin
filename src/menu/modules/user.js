export default {
  path: '/user',
  title: '用户中心',
  icon: 'user-circle-o',
  children: (pre => [{
    path: `${pre}UserCenter`,
    title: '用户中心',
    icon: 'user-circle-o'
  }])('/user/')
}
