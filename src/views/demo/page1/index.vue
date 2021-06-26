<template>
  <d2-container>
    <div id="d-whole">
      <!-- //顶部固定区域 -->
      <div id="d-top">
        <div style="width:100%; height: 30px; background-color: yellow;">顶部区域</div>
      </div>
      <!-- //滚动区域 -->
      <div id="d-scroll" :style="obj" @scroll="listenScroll">
        <div style="width: 100%; height: 100%; background-color: pink;">1111</div>
      </div>
    </div>
  </d2-container>
</template>

<script>
export default {
  name: 'page1',
  data() {
    return {
      winHei: screen.availHeight, // 屏幕高度
      obj: {
        height: 0
      },
      pagenum: 1,
      pagesize: 10,
      dataLIst: []
    }
  },
  mounted() {
    const topH = document.getElementById('d-top').offsetHeight // 获取顶部区域高度
    this.obj.height = (this.winHei - topH) + 'px' // 动态修改滚动区域高度
    console.log(topH)
    console.log(this.obj.height)
    this.getList()
  },
  methods: {
    getList() {
      // const param = {
      //   param: {
      //     pageNumber: this.pagenum,
      //     pageSize: this.pagesize
      //   }
      // }
      // 获取数据，后台分页处理

      // for (const i in list) { // list为获取的数据列表
      //   this.dataList.push(list[i]) // 追加在已有数据后
      // }
      this.dataLIst.push(1)
      console.log(this.dataLIst)
    },
    listenScroll(e) { // 监听滚动
      console.log(e)
      const ele = e.srcElement ? e.srcElement : e.target
      if (ele.scrollTop + ele.offsetHeight > ele.scrollHeight - 100) { // 监听滚动到div底部
        console.log(11)
        this.addMoreData()
      }
    },
    addMoreData() { // 加载更多
      // 加载效果
      ++this.pagenum
      this.getList()
    }
  }
}
</script>
