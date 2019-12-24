<template>
  <div >
    
  </div>
</template>

<script>
export default {
  name: 'contentItem',
  props: {
    title: {
      type: String,
      default: ''
    },
    imgUrl: {
      type: Array,
      default: []
    },
    author: {
      type: String,
      default: ''
    },
    time:{
      type: String,
      default: ''
    }
  },
  data () {
    return {}
  }
}
</script>