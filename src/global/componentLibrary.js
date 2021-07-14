import OpenLayersMap from '@/components/OpenLayersMap' // OpenLayers地图插件

const ComponentLibrary = {
  install: function (Vue) {
    Vue.component('OpenLayersMap', OpenLayersMap) // OpenLayers地图插件
  }
}

export default ComponentLibrary
