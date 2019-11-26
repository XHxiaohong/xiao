<template>
  <ul id="xl-meun"  class="ul" :class ="[mode]">
    <template v-for="meun in meunData">
      <xl-meun-item :key="meun[title]" v-if="!meun.child">
        <span>{{meun[title]}}</span>
      </xl-meun-item>

      <xl-meun-item-group v-else ref="group" :key="meun[title]" @myEvent="noGroup" :title="title" :path="path" :childData="meun"> </xl-meun-item-group>
    </template>
  </ul>
</template>

<script>
import XlMeunItem from './meun-item.vue'
import XlMeunItemGroup from './meun-item-group.vue'
export default {
  name: 'XlMeun',
  props: {
    meunData: Array,
    title: {
      type: String,
      default: 'title'
    },
    path: {
      type: String,
      default: 'path'
    },
    mode: {
      type: String,
      default: 'vertical' // horizontal 
    }
  },
  components: {
    XlMeunItem,
    XlMeunItemGroup
  },
  data () { return  {}},
  methods: {
    log () {
      console.log(this.meun)
    },
    noGroup () {
      this.$refs.group.map(key => {
        key.isGroup = false
      })
    }
  },
  mounted() {
    console.log(this.meun, 'meun')
  }
}
</script>
<style scoped lang="less">
@import url(../../assets/menu/index.less);
</style>
