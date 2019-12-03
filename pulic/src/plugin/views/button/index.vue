<template>
  <button class="xl-button">
    <span><slot></slot></span>
  </button>
</template>

<script>
export default {
  name: 'xl-button',
  props: {
    type: {

    }
  },
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
@import url(../../assets/button/index.less);
</style>