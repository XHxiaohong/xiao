<template>
  <div class="container">
    <button @click="success">成功</button>
    <button @click="warning">警告</button>
    <button @click="error">失败</button>
    <button @click="info">消息</button>
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
      this.$message({
        type: 'success',
        message: '我是一条成功消息！',
        showClose: true
      })
    },
    warning () {
      this.$message.warning({
        type: 'warning',
        message: '我是一条警告消息！',
        showClose: true
      })
    },
    error () {
      this.$message.error('我是一条错误消息消息！')
    },
    info () {
      this.$message({
        type: 'info',
        message: '我是一条普通消息！',
        showClose: true,
        iconClass: true
      })
    },
  },
  mounted () {}
}
</script>
<style lang="less" scoped>
  .container {
    display: block;
  }
</style>