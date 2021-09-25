export default {
  path: '/owl',
  title: '组织权限',
  icon: 'cubes',
  children: (pre => [{
      path: `${pre}StaffManage`,
      title: '员工管理',
      icon: 'cubes'
    },
    {
      path: `${pre}CompanyManage`,
      title: '公司管理',
      icon: 'registered'
    }
  ])('/owl/')
}
