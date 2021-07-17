<template>
  <div id="map" ref="map" class="map"></div>
</template>

<script>
// import 'ol/ol.css'
// import Map from 'ol/Map'
// import OSM from 'ol/source/OSM'
// import TileLayer from 'ol/layer/Tile'
// import View from 'ol/View'
import Map from 'ol/Map'
import View from 'ol/View'
import { Tile as TileLayer } from 'ol/layer'
// import { XYZ, OSM } from 'ol/source'
import { XYZ } from 'ol/source'
import { fromLonLat } from 'ol/proj'

export default {
  name: 'OpenLayersMap', // OpenLayers 地图
  data() {
    return {
      map: undefined
    }
  },
  mounted() {
    this.initMap()
  },
  methods: {
    initMap() {
      // =============================== 使用内置地图
      // this.map = new Map({
      //   layers: [
      //     // 数据源
      //     new TileLayer({
      //       // openlayers内置的数据源
      //       source: new OSM()
      //     })
      //   ],
      //   // 绑定页面中DOM元素的id
      //   target: 'map',
      //   // 视图配置
      //   view: new View({
      //     center: [0, 0], // 地图中心点坐标，经度0、纬度0
      //     zoom: 2 // 定义地图显示层级为2
      //   })
      // })
      // =============================== 使用高德地图
      const tileLayer = new TileLayer({
        source: new XYZ({
          url: 'https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}'
        })
      })
      this.map = new Map({
        layers: [tileLayer],
        view: new View({
          // center: fromLonLat([120.771441, 30.756433]), // 地图中心点
          center: fromLonLat([121.363744, 31.351326]), // 地图中心点
          zoom: 15, // 缩放级别
          minZoom: 0, // 最小缩放级别
          maxZoom: 18, // 最大缩放级别
          constrainResolution: true// 因为存在非整数的缩放级别，所以设置该参数为true来让每次缩放结束后自动缩放到距离最近的一个整数级别，这个必须要设置，当缩放在非整数级别时地图会糊
        }),
        target: this.$refs.map// DOM容器
      })
    }
  }
}
</script>
<style scoped>
.map {
  width: 100%;
  height: 90%;
  border: 1px solid #ccc;
}
</style>
