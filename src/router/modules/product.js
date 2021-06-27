import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = {
  auth: true,
  cache: process.env.VUE_APP_TABS === 'OPEN' && process.env.VUE_APP_PAGE_CACHE === 'OPEN'
}

export default {
  path: '/product',
  name: 'product',
  meta,
  redirect: {
    name: 'product-ProductManage'
  },
  component: layoutHeaderAside,
  children: (pre => [{
      path: 'ProductManage',
      name: `${pre}ProductManage`,
      component: _import('product/ProductManage'),
      meta: {
        ...meta,
        title: '产品管理'
      }
    },
    {
      path: 'BrandManage',
      name: `${pre}BrandManage`,
      component: _import('product/BrandManage'),
      meta: {
        ...meta,
        title: '品牌管理'
      }
    },
    {
      path: 'CategoryManage',
      name: `${pre}CategoryManage`,
      component: _import('product/CategoryManage'),
      meta: {
        ...meta,
        title: '分类管理'
      }
    },
    {
      path: 'ApplyManage',
      name: `${pre}ApplyManage`,
      component: _import('product/ApplyManage'),
      meta: {
        ...meta,
        title: '应用管理'
      }
    },
    {
      path: 'IndustryManage',
      name: `${pre}IndustryManage`,
      component: _import('product/IndustryManage'),
      meta: {
        ...meta,
        title: '行业管理'
      }
    }
  ])('product-')
}
