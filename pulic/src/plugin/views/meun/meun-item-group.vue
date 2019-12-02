<template>
  <li>
    <div @click="change" class="xl-meun-text"> 
      <router-link :to="childData[path]">{{childData[title]}}</router-link>
      <i class="xl-icon xl-icon-arrow-down" :class="isGroup? 'xl-icon-hover' : ''" v-if="childData.child"></i>
    </div>
    <ul v-if="childData.child" v-show="isGroup" class="xl-group"> 
      <template v-for="child in childData.child">
        <xl-menu-item-group  ref="group"  @myEvent="noGroup" :key="child[title]" :title="title" :path="path" :childData="child"></xl-menu-item-group >
      </template>
    </ul>
  </li>
</template>

<script>

export default {
  name: 'XlMenuItemGroup',
  props: {
    childData: {
      type: Object,
      default: ()=> {}
    },
    title: {
      type: String,
      default: 'title'
    },
    path: {
      type: String,
      default: 'path'
    }
  },
  data () {
    return {
      isGroup: false
    }
  },
  methods: {
    change () {
      if (this.isGroup) {
        this.isGroup = !this.isGroup
      } else {
        this.$emit('myEvent', this.isGroup);
        this.isGroup = !this.isGroup
      }
    },
    noGroup () {
      this.$refs.group.map(key => {
        key.isGroup = false
      })
    }
  }
}
</script>
<style scoped lang="less">
@import url('../../assets/icon/iconfont.css');
@import url('../../assets/menu/meun-item-group.less');
</style>
