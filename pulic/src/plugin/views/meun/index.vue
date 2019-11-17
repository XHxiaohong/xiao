<template>
  <div id="xl-meun">
    <a @click="log">我是菜单插件</a>
  </div>
</template>

<script>
export default {
  name: 'xl-meun',
  props: {
    meunData: Array,
    nme: String,
    path: String
  },
  data () { return  {}},
  methods: {
    log () {
      console.log(this.meun)
    }
  },
  mounted() {
    console.log(this.meun, 'meun')
  }
}
</script>