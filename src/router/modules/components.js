import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = {
  auth: true,
  cache: process.env.VUE_APP_TABS === 'OPEN' && process.env.VUE_APP_PAGE_CACHE === 'OPEN'
}

export default {
  path: '/components',
  name: 'components',
  meta,
  redirect: {
    name: 'components-Map'
  },
  component: layoutHeaderAside,
  children: (pre => [{
      path: 'Map',
      name: `${pre}Map`,
      component: _import('components/Map'),
      meta: {
        ...meta,
        title: '地图'
      }
    },
    {
      path: 'Editor',
      name: `${pre}Editor`,
      component: _import('components/Editor'),
      meta: {
        ...meta,
        title: '编辑器'
      }
    }
  ])('components-')
}
