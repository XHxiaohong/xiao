<template>
  <button 
  @click="handleClick"
  :class="['xl-button', typeClass, {
    'xl-button--plain': plain,
    'xl-button--round': round,
  }]">
    <i :class="icon" v-if="icon"> </i>
    <span><slot></slot></span>
  </button>
</template>

<script>
const typeMap = ['primary', 'success', 'info', 'warning', 'danger']
export default {
  name: 'xlButton',
  props: {
    type: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    plain: Boolean,
    round: Boolean
  },
  data () {
    return {}
  },
  computed: {
    typeClass () {
      return this.type ? `xl-button--${this.type}` : '';
    }
  },
  methods: {
    handleClick (evt) {
      this.$emit('click', evt)
    }
  },
  // mounted: {},
  // watch: {
  //   type (value) {
  //     if (typeMap.indexOf(value) == -1) {
  //       this.type = ''
  //     }
  //   }
  // }
}
</script>

<style lang="less" scoped>
@import url(../../assets/button/index.less);
</style>