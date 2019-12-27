<template>
  <div class="xh-home-content">
    <img :src="imgUrl[0]" :alt="title" class="img" v-if="imgUrl.length == 1">

    <div class="xh-home-content_title">
      <h3>{{title}}</h3>

      <div class="xh-img_box" v-if="imgUrl.length > 1">
        <template v-for="url in imgUrl">
          <img :src="url" :alt="title" :key="url">
        </template>
      </div>

      <div  class="xh-home-content_text" >
        <span>{{author}}</span>
        <span>{{time}}</span>
      </div>
    </div>
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
    },
    // itmeData: {
    //   type: Object,
    //   default: {}
    // }
  },
  computed: {
    style () {
      if (imgUrl.length) {
        return {
          
        }
      }
    }
  },
  data () {
    return {
      // style: {}
    }
  }
}
</script>

<style lang="less" scoped>
.xh-home-content {
  display: flex;
  padding: 20px; 
  align-items: center;
  border-bottom: 1px solid #ccc;
}
.img {
  width: 180px;
  margin-right: 15px; 
}
.xh-img_box {
  width: 100%;
  display: flex;
  margin: 8px;
  img {
    width: 32%;
    margin-right: 1%;
  }
}
.xh-home-content_title {
  h3 {
    font-size: 22px;
  }

}
.xh-home-content_text {
  margin-top: 8px;
  color: #808080;
  span {
    margin-right: 10px;
  }
}
</style>