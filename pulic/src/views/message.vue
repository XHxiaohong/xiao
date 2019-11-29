<template>
  <div class="container">
    <button @click="success">成功</button>
    <button>警告</button>
    <button>失败</button>
    <button>消息</button>
  </div>
</template>

<script>
export default {
  name: 'message',
  data () {
    return {}
  },
  methods: {
    success () {
      console.log(this.$message)
      this.$message({
        type: 'succress',
        message: '我是一条成功消息！',
        showClose: true
      })
    },
    warning () {},
    adnger () {},
    info () {},
  },
  mounted () {}
}
</script>
<style lang="less" scoped>
  .container {
    display: block;
  }
</style>