<template>
  <div class="xl-input-box">
    <!-- 前置图标 -->
    <span></span>

    <input :type="type" v-model="inputValue" :placeholder="placeholder">

    <!-- 后置图标 -->
    <span v-if="suffixIcon"></span>
    <span v-else class=""></span>
  </div>
</template>

<script>
import { watch } from 'fs'
export default {
  name: "xlInput",
  props: {
    value: [String, Number],
    type: String,
    placeholder: String,
    prefixIcon: String,
    suffixIcon: String,
    isSuffixIcon: Boolean
  },
  data () {
    return {
      inputValue: ''
    }
  },
  watch: {
    inputValue (val) {
      this.$emit('input', val)
    },
    value (val) {
      this.inputValue = val
    }
  }
};
</script>

<style lang="less" scoped>
.xl-input-box {
  height: 28px;
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  border: 1px solid #aaaaaa;

  input {
    flex: 1;
    border: none;
    outline: none;
    height: 28px;
    line-height: 28px;
    text-indent: 10px;
  }
}
</style>>
