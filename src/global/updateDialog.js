import ProductDialog from '../components/UpdateDialog/ProductDialog' // 产品管理
import BrandDialog from '../components/UpdateDialog/BrandDialog' // 品牌管理

const UpdateDialog = {
  install: function (Vue) {
    Vue.component('ProductDialog', ProductDialog) // 产品管理
    Vue.component('BrandDialog', BrandDialog) // 品牌管理
  }
}

export default UpdateDialog
