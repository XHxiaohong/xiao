<template>
  <transition name="xl-message">
    <div v-if="visible"
      :class="['xl-message', `el-message-${ type }`]"
      @mouseleave="startTimer"
      @mouseenter="clearTimer"
    >
      <i :class="[typeClass, 'xl-message__iconClass']" v-if="iconClass"></i>
      <slot>
        <p v-if="!dangerouslyUseHTMLString" class="el-message__content">{{ message }}</p>
        <p v-else v-html="message" class="el-message__content"></p>
      </slot>
      <i v-if="showClose" class="xl-message__closeBtn xl-icon-reeor-fill" @click="close"></i>
    </div>
  </transition>
</template>
<script>
const typeMap = ['info', 'success', 'warning', 'error'];
export default {
  name: 'message',
  data () {
    return {
      message: '',
      duration: 3000,
      type: 'info',
      visible: false,
      showClose: false,
      iconClass: false,
      dangerouslyUseHTMLString: false
    }
  },
  computed: {
    typeClass () {
      return `xl-icon-${this.type}`
    }
  },
  methods: {
    close () {
      this.visible = false;
    },
    startTimer () {
      if (this.duration > 0) {
        this.tmie = setTimeout(()=> {
          this.visible = false;
        }, this.duration) 
      }
    },
    clearTimer () {
      clearInterval(this.tmie)
    }
  },
  mounted () {
    this.startTimer();
    if (typeMap.indexOf(this.type) < 0) this.type = 'info';
  }
}
</script>

<style lang="less" scoped>
@import url('../../assets/message/index.less');
</style>