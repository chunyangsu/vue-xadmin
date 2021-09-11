<template>
  <d2-container>
    <div>产品管理</div>
  </d2-container>
</template>

<script>
import Axios from 'axios'
export default {
  name: 'ProductManage', // 产品管理
  data() {
    return {

    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      Axios({
        method: 'get',
        url: 'http://localhost:3000/user'
      }).then(response => {
        console.log(response)
      })
    }
  }
}
</script>
