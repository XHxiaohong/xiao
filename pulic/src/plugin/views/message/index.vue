<template>
  <transition name="xl-message">
    <div v-if="visible"
      :class="['xl-message', `el-message-${ type }`]"
      @mouseleave="startTimer"
      @mouseenter="clearTimer"
    >
      <i :class="typeClass" v-if="iconClass"></i>
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
      iconClass: true,
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
.xl-message {
  color: #fff;
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  border-radius: 5px;
  background: #a5b2bb;
  position: absolute;
  top: 20px;
  left: 50%;
}

.xl-message__closeBtn {
  font-size: 20px;
  margin-left: 20px;
  border-radius: 50%; 
  color: #e8e0e1;
}

.xl-message-enter-active {
  transition: all .5s ease;
}

.xl-message-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.xl-message-enter, .xl-message-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>