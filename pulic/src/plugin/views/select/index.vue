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