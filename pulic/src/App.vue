<template>
  <div id="app" class="container">
    <router-view  v-if="isRouterAlive"/>
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {},
  data () { 
    return {
      isRouterAlive: true
    }
  },
  provide () {
    return {
      reload: this.reload
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false;
      this.$nextTick(()=> {
        this.isRouterAlive = true;
      })
    }
  }
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
ul {
  list-style-type: none;
}
</style>
