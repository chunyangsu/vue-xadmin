import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = {
  auth: true,
  cache: process.env.VUE_APP_TABS === 'OPEN' && process.env.VUE_APP_PAGE_CACHE === 'OPEN'
}

export default {
  path: '/owl',
  name: 'owl',
  meta,
  redirect: {
    name: 'owl-StaffManage'
  },
  component: layoutHeaderAside,
  children: (pre => [{
      path: 'StaffManage',
      name: `${pre}StaffManage`,
      component: _import('owl/StaffManage'),
      meta: {
        ...meta,
        title: '员工管理'
      }
    },
    {
      path: 'CompanyManage',
      name: `${pre}CompanyManage`,
      component: _import('owl/CompanyManage'),
      meta: {
        ...meta,
        title: '公司管理'
      }
    }
  ])('owl-')
}
