import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = {
  auth: true,
  cache: process.env.VUE_APP_TABS === 'OPEN' && process.env.VUE_APP_PAGE_CACHE === 'OPEN'
}

export default {
  path: '/user',
  name: 'user',
  meta,
  redirect: {
    name: 'user-UserCenter'
  },
  component: layoutHeaderAside,
  children: (pre => [{
    path: 'UserCenter',
    name: `${pre}UserCenter`,
    component: _import('user/UserCenter'),
    meta: {
      ...meta,
      title: '用户中心'
    }
  }])('user-')
}
