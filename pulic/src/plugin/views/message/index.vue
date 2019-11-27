<template>
 <transition name="xl-message">
   <div :class="['xl-message', `el-message-${ type }`]">
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
      duration: 3000,
      type: 'info',
      dangerouslyUseHTMLString: false
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
  top: 0;
  left: 50%;
  transition: top 2s;
}
.el-message-info,
.el-message-success {
  top: 20px;
}

.xl-message-enter {
  width: 150px;
  height: 20px;
  border-radius: 5px;
  position: absolute;
  top: -20px;
  z-index: 2000;
}
.xl-message-enter-active {
  transition: all .3s ease;
}
.xl-message-enter-to {
  width: 150px;
  height: 20px;
  border-radius: 5px;
  position: absolute;
  top: 20px;
  z-index: 2000;
}


.xl-message-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.xl-message-enter, .xl-message-leave-to
/* .xl-message-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>