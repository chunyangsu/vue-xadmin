<template>
  <div class="timer">
    <ul class="clearfix">
      <li>{{one}}:
      </li>
      <li>{{two}}:
      </li>
      <li>{{three}}</li>
    </ul>
    <!-- 操作按钮 -->
    <!-- <el-button type="primary" @click="startTime">开始</el-button> -->
    <!-- <el-button type="primary" @click="stopTime">暂停</el-button> -->
  </div>
</template>
<script>
export default {
  name: 'SgoTimer', // 计时器组件
  data() {
    return {
      flag: null,
      one: '00', // 时
      two: '00', // 分
      three: '00', // 秒
      abc: 0, // 秒的计数
      cde: 0, // 分的计数
      efg: 0 // 时的计数
    }
  },
  methods: {
    // 开始计时
    startTime() {
      // console.log(this.flag)
      clearInterval(this.flag)
      this.flag = null
      this.one = '00'
      this.two = '00'
      this.three = '00'
      this.abc = 0
      this.cde = 0
      this.efg = 0
      this.flag = setInterval(() => {
        if (this.three === 60 || this.three === '60') {
          this.three = '00'
          this.abc = 0
          if (this.two === 60 || this.two === '60') {
            this.two = '00'
            this.cde = 0
            if (this.efg + 1 <= 9) {
              this.efg++
              this.one = '0' + this.efg
            } else {
              this.efg++
              this.one = this.efg
            }
          } else {
            if (this.cde + 1 <= 9) {
              this.cde++
              this.two = '0' + this.cde
            } else {
              this.cde++
              this.two = this.cde
            }
          }
        } else {
          if (this.abc + 1 <= 9) {
            this.abc++
            this.three = '0' + this.abc
          } else {
            this.abc++
            this.three = this.abc
          }
        }
      }, 1000)
    },
    // 停止计时
    stopTime() {
      this.flag = clearInterval(this.flag)
    },
    // 清除计时
    clearTime() {
      clearInterval(this.flag)
      this.flag = null
      this.one = '00'
      this.two = '00'
      this.three = '00'
      this.abc = 0
      this.cde = 0
      this.efg = 0
    }
  }
}
</script>

<style scoped>
ul li {
  list-style-type: none;
}
.timer {
  font-size: 15px;
  font-weight: bold;
}
.timer ul {
  margin: 0;
  padding: 0;
}
.timer ul li {
  float: left;
}
.timer ul li:first-child {
  margin-left: 10px;
}
</style>
