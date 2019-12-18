<template>
  <div id="app" class="container">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {},
  data () { return {} },
  methods: {}
}
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
html, body, #app,
.container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
