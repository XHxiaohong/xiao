<template>
  <div @click="onClick" v-if="visible"
    :style="{backgrouned: color}"
    :class="['xl-label', typeClass]"
  >
    <span> <slot></slot></span>
    <i class="xl-icon xl-icon-close" v-if="isClose" @click.stop="close(text)"></i>
  </div>
</template>

<script>
export default {
  name: 'xl-label',
  props: {
    text: {
      type: String,
      default: ''
    },
    isClose: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: '#ccc'
    },
    type: {
      type: String,
      default: 'primary'
    }
  },
  data () {
    return {
      visible: true
    }
  },
  computed: {
    typeClass () {
      return `xl-label-${this.type}`
    }
  },
  methods: {
    onClick (evt) {
      this.$emit('click', evt)
    },
    close (evt) {
      this.visible = false;
      this.$emit('clic', this.text, evt)
    }
  }
}
</script>

<style scoped lang="less">
@import url(../../assets/label/index.less);
</style>