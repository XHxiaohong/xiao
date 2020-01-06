<template>
  <div class="xl-select-box">
    <div>
      <input type="text">
      <i class="xl-icon"></i>
    </div>

    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'xlSelect',
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
  .xl-select-box {
    width: 180px;
    height: 28px;
    position: relative;
    border: 1px solid;
    border-radius: 5px; 
    user-select: none;
    display: inline-block;
    border-color: #ccc;
  }
  .xl-border-hover {
    // border-color: @primary;
  }
</style>