<template>
  <div id="app" class="container">
    <xl-meun class="meun" :meunData="meunData" title="name"></xl-meun>
    <div class="cenent">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {
    // HelloWorld
  },
  data () {
    return {
      meunData: [{
        name: 'message',
        path: '/message',
      }, {
        name: 'home',
        path: '/home',
      }, {
        name: 'about',
        path: '/about',
      }, {
        name: ' 菜单2',
        path: '',
        child: [{
          name: ' 菜单2_1',
          path: '',
          child: [{
            name: ' 菜单2_1_1',
            path: '',
          }]
        }, {
          name: ' 菜单2_2',
          path: '',
          child: [{
            name: ' 菜单2_2_1',
            path: '',
          }, {
            name: ' 菜单2_2_2',
            path: '',
          }]
        }]
      }, {
        name: ' 菜单3',
        path: '',
      }]
    }
  },
}
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
html, body,
.container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.container {
  display: flex;
}
.meun {
  width: 200px;
  height: 60px;
}
.cenent {
  flex: 1;
}
</style>
