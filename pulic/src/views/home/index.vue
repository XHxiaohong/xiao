<template>
  <div id="container" class="container">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'container',
  data() {
    return {}
  },
  methods: {},
  mounted () {
    console.log(this.router)
  }
}
</script>
