export default {
  path: '/components',
  title: '组件库',
  icon: 'cubes',
  children: (pre => [{
      path: `${pre}Map`,
      title: '地图',
      icon: 'cubes'
    },
    {
      path: `${pre}Editor`,
      title: '编辑器',
      icon: 'cubes'
    }
  ])('/components/')
}
