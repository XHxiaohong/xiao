<template>
  <div class="home">
    <xl-meun :meunData="meunData"></xl-meun>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

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
        }, {
          name: ' 菜单2_2',
          path: '',
        }]
      }]
    }
  }
}
</script>
