<template>
  <div class="xl-form-item">
    <label :style="labelStyle" :class="['xl-form-label']">
      {{label}}
    </label>

    <div class="xl-form-input--box">
      <slot></slot>
      <!-- <transition name="">

      </transition> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'xlFromItme',
  props: {
    label: String,
    model: Object,
    rules: Object,
    labelPosition: String,
    labelWidth: String,
  },
  data () {
    return {}
  },
  inject: ['xlForm'],
  computed: {
    labelStyle () {
      let res = {}
      // res.
      // console.log(this.xlForm)
      let labelWidth = this.labelWidth || this.xlForm.labelWidth;
      if (labelWidth) res.width = labelWidth;
      return res;
    }
  }
}
</script>

<style lang="less" scoped>
.xl-form-item {
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 15px;
}
.xl-form-label {
  text-align: right;
  display: inline-block;
  vertical-align: middle;
}

.xl-form-input--box {
  flex: 1;
  display: inline-block;
  margin-left: 15px;
  vertical-align: middle;
}
</style>