<template>
  <form class="xl-from">
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: 'xlFrom',
  props: {
    model: Object,
    rules: Object,
    labelPosition: String,
    labelWidth: String,
    inline: Boolean,
  },
  data () {
    return {}
  },
  provide () {
    return { xlForm: this }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.xl-from {
  // width: 100%;
  // height: 100%;
}
</style>
