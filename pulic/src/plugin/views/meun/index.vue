<template>
  <ul id="xl-meun" :class={}>
    <template v-for="meun in meunData">
      <xl-meun-item :key="meun[title]" v-if="!meun.child">
        {{meun[title]}}
      </xl-meun-item>

      <xl-meun-item-group v-else :key="meun[title]" :title="title" :path="path" :childData="meun"> </xl-meun-item-group>
 
      <!-- -->
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
    mode: String
  },
  // child
  components: {
    XlMeunItem,
    XlMeunItemGroup
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