<template>
  <div class="container">
    <xl-meun class="meun" :meunData="meunData" title="name" :mode="'horizontal'"></xl-meun>
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
        name: ' 菜单1',
        path: '',
        child: [{
          name: ' 菜单1_1',
          path: '',
        }]
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
  // mounted: {}
}
</script>

<style lang="less">
.container {
  // display: flex;
  // justify-content: space-between;
}
.meun {
  width: 200px;
  height: 60px;
}
.cenent {
  flex: 1;
}
</style>