export default {
  path: '/product',
  title: '产品中心',
  icon: 'cubes',
  children: (pre => [{
      path: `${pre}ProductManage`,
      title: '产品管理',
      icon: 'cubes'
    },
    {
      path: `${pre}BrandManage`,
      title: '品牌管理',
      icon: 'registered'
    },
    {
      path: `${pre}CategoryManage`,
      title: '分类管理',
      icon: 'sitemap'
    },
    {
      path: `${pre}ApplyManage`,
      title: '应用管理',
      icon: 'list'
    },
    {
      path: `${pre}IndustryManage`,
      title: '行业管理',
      icon: 'industry'
    }
  ])('/product/')
}
