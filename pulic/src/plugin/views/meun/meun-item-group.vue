<template>
  <li>
    <div @click="change"> {{ childData[title] }} </div>
    <ul v-if="childData.child" v-show="isGroup"> 
      <template v-for="child in childData.child">
        <xl-menu-item-group :key="child[title]" :title="title" :path="path" :childData="child"></xl-menu-item-group >
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
      this.isGroup = !this.isGroup
    }
  },
  watch: {
    childData(value) {
      console.log(value, 'group')
    }
  }
}
</script>

<style scoped>
.group {
  padding-left: 20px;
}
</style>