<template>
  <ul id="xl-meun" class="ul" :class ="[mode]">
    <template v-for="meun in meunData">
      <xl-meun-item :key="meun[title]" v-if="!meun.child">
        <a :path='meun[path]'>{{meun[title]}}</a>
        <!-- <router-link :to="meun[path]">{{meun[title]}}</router-link> -->
      </xl-meun-item>

      <xl-meun-item-group 
      v-else 
      ref="group" 
      :key="meun[title]" 
      @myEvent="noGroup(meun)" 
      :title="title" 
      :path="path"
      :childData="meun"> </xl-meun-item-group>
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
    },
    isRouter:{
      type: Boolean,
      default: true
    }
  },
  components: {
    XlMeunItem,
    XlMeunItemGroup
  },
  data () { return  {}},
  methods: {
    noGroup () {
      this.$refs.group.map(key => {
        key.isGroup = false
      })
    }
  },
  mounted () {
    const ul = document.getElementById('xl-meun');
    ul.addEventListener('click',  (ev)=> {
      ev = ev || event;
      const path = ev.target.getAttribute('path');
      const value = ev.target.innerText;
      if (path) {
        this.$emit('click', value, path);
        if (this.isRouter && this.$router.history.current.path !== path) this.$router.push({path})
      }
    })
  }
}
</script>
<style scoped lang="less">
@import url(../../assets/menu/index.less);
</style>
