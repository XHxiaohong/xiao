<template>
  <div id="container" class="container">
    <div class="kh-side">
      <div class="xh-logo-box">
        <img src="@/assets/images/logo.png" alt="作者懒得找logo" class="xh-logo">
      </div>
      <xl-meun :meunData="meun.meun" 
      title="name" 
      @click="selend"
      class="xh-meun"></xl-meun>
      
    </div>

    <div class="xh-content">
      <div class="xh-haed">
        <div>这是肖大哥完成的自己UI库</div>
        <div></div>
      </div>

      <div class="xh-tags-box">
        <xl-tag :tags="tags" :noClose='0'></xl-tag>
      </div>

      <div class="xh-content">
        <keep-alive>
          <router-view/>
        </keep-alive>
      </div>
    </div>
  </div>
  
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'container',
  data() {
    return {
      tags: ['首页']
    }
  },
  computed: {
    ...mapState(['meun'])
  },
  methods: {
    selend (value, index) {
      console.log(value, index, 123)
    }
  },
  mounted () {
  }
}
</script>

<style lang="less" scoped>
.container {
  display: flex;
  overflow: hidden;
  .xh-haed {
    width: 100%;
    height: 60px;
    display: flex;
    color: #eee;
    padding: 0 20px;
    background: #272929;
    align-items: center;
    justify-content: space-between;
  }
  .kh-side {
    width: 240px;
    height: calc(100% - 60px);
    background: #000;
    .xh-logo-box {
      width: 100%;
      height: 60px;
      overflow: hidden;
      text-align: center;
      .xh-logo {
        width: 60px;
        height: 60px;
      }
    }
    .xh-meun {
      width: 100%;
      border: none;
      background: #000;
    }
  }

  .xh-tags-box {
    width: 100%;
    height: 30px;
  }

  .xh-content {
    flex: 1;
    overflow: auto;
    .xh-content {
      padding: 8px;
    }
  }
}
</style>