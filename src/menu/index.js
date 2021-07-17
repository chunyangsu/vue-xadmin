import {
  uniqueId
} from 'lodash'

// 组件
import user from './modules/user'
import product from './modules/product'
import components from './modules/components'

/**
 * @description 给菜单数据补充上 path 字段
 * @description https://github.com/d2-projects/d2-admin/issues/209
 * @param {Array} menu 原始的菜单数据
 */
function supplementPath(menu) {
  return menu.map(e => ({
    ...e,
    path: e.path || uniqueId('d2-menu-empty-'),
    ...e.children ? {
      children: supplementPath(e.children)
    } : {}
  }))
}
// 顶部菜单
export const menuHeader = supplementPath([{
    path: '/index',
    title: '首页',
    icon: 'home'
  },
  // 产品中心
  product,
  // 用户中心
  user,
  // 组件库
  components
])
// 左侧菜单
export const menuAside = supplementPath([{
    path: '/index',
    title: '首页',
    icon: 'home'
  },
  // 产品中心
  product,
  // 用户中心
  user,
  // 组件库
  components
])
