<template>
  <d2-container>
    <!-- v-infinite-scroll：指定触发的方法 -->
    <!-- infinite-scroll-disabled：true时代表正在执行加载，这时禁用滚动触发。 -->
    <!-- infinite-scroll-distance：页面滚动到离页尾多少像素的时候触发回调函数，10是像素值。 -->
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="100">
      <!-- 数据列表 -->
      <div v-for="item in data" :key="item.index">{{item.name}}</div>
      <!-- 页尾 -->
      <div style="width: 100%; height: 100px; line-height: 50px; background-color: pink; text-align: center;">正在加载中。。。</div>
    </div>
  </d2-container>
</template>

<script>
export default {
  name: 'UserCenter', // 用户中心
  data() {
    return {
      count: 0,
      data: [],
      busy: false // 是否正在加载过程中
    }
  },
  methods: {
    // 滚动到底部，触发函数
    // 在进行异步请求之前，需要调用this.busy= true,
    // 数据请求完成后 再设置 this.busy = false(放在axios请求的外面，避免不断重复加载的现象)
    loadMore: function () {
      this.busy = true
      // 官方示例中延迟了1秒，防止滚动条滚动时的频繁请求数据
      setTimeout(() => {
        // 这里请求接口去拿数据，实际应该是调用一个请求数据的方法
        for (var i = 0, j = 10; i < j; i++) {
          this.data.push({ name: this.count++ })
        }
        console.log(this.data)
        this.busy = false
      }, 1000)
    }
  }
}
</script>
