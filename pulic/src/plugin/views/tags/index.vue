<template>
  <section class="xl-tags-box">
    <ul class="xl-tags">
      <template v-for="(tag, i) of tags">
        <li 
          @click="choice(tag, i)"
          @contextmenu.prevent='contextmenuShow(tag, i)'
          :class="['xl-tag-item',
          {'xl-tag-selection': sele_Index === i }]" 
          :key="'xl-tag-' + i">
          <i class="xl-tag-selection__icon" v-if="i == sele_Index"></i>
          <span> {{tag[name] || tag}} </span>
          <i class="xl-icon xl-icon-close" v-if="noClose !== i" @click.stop="close(tag, i)"></i>
        </li>
      </template>
    </ul>

    <!-- <ul @click.stop="" v-closeMeun class="xl-tag-meun" :style="meunClass" v-if="isContextmenu" v-show="visible">
      <li v-if="isShowMeun" @click="close(value, index)">关闭</li>
      <li @click="closeOthersTags">关闭其他</li>
      <li @click="closeAllTags">关闭全部</li>
    </ul> -->
  </section>
</template>
<script>
export default {
  name: 'xlTag',
  data () {
    return {
      sele_Index: null,
      visible: false,
      meunClass: {},
      value: {},
      index: null,
      isShowMeun: true
    }
  },
  // directives: {
  //   closeMeun: {
  //     inserted: (el) => {
  //       _this = this
  //       document.onmousedown = (ev) =>{
  //         _this.visible = false;
  //         event.stopImmediatePropagation();
  //       }
  //     }
  //   }
  // },
  props: {
    tags: {
      type: Array,
      default: []
    },
    name: {
      type: String,
      default: 'name'
    },
    selection: {
      type: null,
      default: 0
    },
    noClose: {
      type: Number,
      default: null
    },
    isContextmenu: Boolean
  },
  computed: {},
  methods: {
    choice (value, index) {
      this.sele_Index = index;
      this.$emit('click', value, index)
    },
    close (value, index) {
      this.$emit('close', value, index);
      this.visible = false;
    },
    closeOthersTags () {
      if (!this.index) return false;
      this.$emit('closeOthersTags', this.value, this.index);
      this.visible = false;
    },
    closeAllTags () {
      this.$emit('closeAllTags');
      this.visible = false;
    },
    contextmenuShow (value, index, evt) {
      evt = evt || event;
      this.visible = true;
      this.value = value;
      this.index = index;
      this.isShowMeun = this.noClose !== index;

      const menuMinWidth = 105
      const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      const offsetWidth = this.$el.offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      const left = evt.clientX - offsetLeft + 15 // 15: margin right

      this.meunClass = {
        top: evt.clientY + 'px',
        left: left + 'px'
      }

      return false;
    }
  },
  watch: {
    selection (value) {
      this.sele_Index = value <= 0 ? 0 : value;
    }
  }
}
</script>

<style lang="less" scoped>
@import url(../../assets/tags/index);
</style>