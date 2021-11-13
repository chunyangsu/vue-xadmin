// Vue
import Vue from 'vue'
import i18n from './i18n'
import App from './App'
// 核心插件
import d2Admin from '@/plugin/d2admin'
// store
import store from '@/store/index'

// 菜单和路由设置
import router from './router'
import {
  menuHeader,
  menuAside
} from '@/menu'
import {
  frameInRoutes
} from '@/router/routes'
// 滚动加载插件
import infiniteScroll from 'vue-infinite-scroll'
// 全局挂载的新增/编辑弹窗组件
import UpdateDialog from './global/updateDialog'

// 全局组件库
import ComponentLibrary from './global/componentLibrary'
// 计时器
import SgoTimer from './components/Sgo/SgoTimer'
// 核心插件
Vue.use(d2Admin)

// 全局 弹窗/子 组件
Vue.use(UpdateDialog)

Vue.use(infiniteScroll)
// 全局组件库
Vue.use(ComponentLibrary)
Vue.use(SgoTimer)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  created() {
    // 处理路由 得到每一级的路由设置
    this.$store.commit('d2admin/page/init', frameInRoutes)
    // 设置顶栏菜单
    this.$store.commit('d2admin/menu/headerSet', menuHeader)
    // 设置侧边栏菜单
    this.$store.commit('d2admin/menu/asideSet', menuAside)
    // 初始化菜单搜索功能
    this.$store.commit('d2admin/search/init', menuHeader)
  },
  mounted() {
    // 展示系统信息
    this.$store.commit('d2admin/releases/versionShow')
    // 用户登录后从数据库加载一系列的设置
    this.$store.dispatch('d2admin/account/load')
    // 获取并记录用户 UA
    this.$store.commit('d2admin/ua/get')
    // 初始化全屏监听
    this.$store.dispatch('d2admin/fullscreen/listen')
  }
}).$mount('#app')
