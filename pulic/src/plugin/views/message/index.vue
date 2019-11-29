<template>
 <transition name="xl-message">
   <div v-if="visible" :class="['xl-message', `el-message-${ type }`]">
      <!-- <i :class="iconClass" v-if="iconClass"></i>
      <i :class="typeClass" v-else></i> -->
      <slot>
        <p v-if="!dangerouslyUseHTMLString" class="el-message__content">{{ message }}</p>
        <p v-else v-html="message" class="el-message__content"></p>
      </slot>
      <!-- <i v-if="showClose" class="el-message__closeBtn el-icon-close" @click="close"></i> -->
   </div>
 </transition>
</template>
<script>
export default {
  name: 'message',
  data () {
    return {
      message: '',
      duration: 5000,
      type: 'info',
      visible: false,
      dangerouslyUseHTMLString: false
    }
  },
  methods: {
    startTimer () {
      if (this.duration > 0) {
        setTimeout(()=> {

        }, this.duration) 
      }
    }
  }
}
</script>

<style lang="less" scoped>
.xl-message {
  width: 150px;
  height: 20px;
  background: #888;
  position: absolute;
  top: 20px;
  left: 50%;
}


.xl-message-enter-active {
  transition: all 1.8s ease;
}

.xl-message-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.xl-message-enter, .xl-message-leave-to
/* .xl-message-leave-active for below version 2.1.8 */ {
  transform: translateY(-10px);
  opacity: 0;
}
</style>