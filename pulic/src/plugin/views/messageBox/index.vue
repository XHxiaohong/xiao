<template>
  <div class="xl-message-box__modal" v-if="isModel" @click="isOnClickModel()">
    <transition name="xl-message-box">
      <div id="messageBox" v-show="visible" 
      @click.stop=""
      :class="['xl-message-box', `el-message-${ type }`]">
        <div class="xl-message-box__title"> 
          <span> {{title}} </span> 
          <i class="xl-icon xl-icon-close" @click="close(false)"></i>
        </div>

        <div class="xl-message-box__content"> 
          <span>{{ message }} </span>
          <input type="text" 
            v-if="showInput"
            v-model="inputValue" 
            @input="valueTest"
            class="xl-message-box__input"
          />
          <span v-if="isError" class="xl-message-box__error">{{ inputErrorMessage }}</span>
        </div>

        <div class="xl-button__box">
          <button v-if="cancelButtonText" @click="close(false)">{{cancelButtonText}}</button>
          <button v-if="confirmButtonText" @click="isConfirmFun()">{{confirmButtonText}}</button>
        </div>
      </div>  
    </transition>
  </div>
</template>

<script>
const typeMap = ['alert', 'confirm', 'prompt'];
export default {
  name: 'messageBox',
  data () {
    return {
      title: '',
      type: 'alert',
      cancelButtonText: '',
      confirmButtonText: '',
      inputValue: '',
      showInput: false,
      isError: false,
      message: '暂无数据',
      visible: false,
      onClose: null,
      closeOnClickModal: true,
      isModel: true,
      inputPattern: '',
      inputErrorMessage: '',
      inputPlaceholder: ''
    }
  },
  computed: {
    isOnClickModel () {
      return this.closeOnClickModal ? ()=>this.close(false) : ''
    },
    isConfirmFun () {
      return !this.showInput ? ()=>this.close(true) : ()=>this.close(this.inputValue);
    }
  },
  methods: {
    close (ber = false) {
      this.visible = false
      setTimeout(()=> {
        this.isModel = false
      }, 500)
      this.onClose && this.onClose(ber);
    },
    valueTest () {
      this.isError = !this.inputPattern.test(this.inputValue)
    }
  }
}
</script>
<style lang="less" scoped>
@import url(../../assets/message-box/index.less);
</style>