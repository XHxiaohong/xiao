<template>
  <div id="app" class="container">
    <xl-meun class="meun" :meunData="meunData" title="name"></xl-meun>
    <!-- <xl-meun class="meun" :meunData="meunData" title="name" mode="horizontal"></xl-meun> -->
    <div class="cenent container">
      <xl-tag
       class="tag" 
       isContextmenu 
       :tags="include" 
       :selection="selection" 
       :noClose="0" 
       @click="choice" 
       @close="removeData"
       @closeAllTags="closeAllTags"
       @closeOthersTags="closeOthersTags"></xl-tag>

      <div class="cenent"> 
        <keep-alive :include="include">
          <router-view/> 
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
// import mapGetters from 'vuex'
export default {
  name: 'home',
  components: {
    // HelloWorld
  },
  data () {
    return {
      include: [{
        name: 'home',
        path: '/home'
      }],
      selection: Number,
      meunData: [{
        name: 'home',
        path: '/home'
      }, {
        name: 'message',
        path: '/message'
      }, {
        name: 'messageBox',
        path: '/messageBox'
      }, {
        name: 'about',
        path: '/about',
      }, {
        name: ' 菜单2',
        path: '',
        child: [{
          name: ' 菜单2_1',
          path: '',
          child: [{
            name: ' 菜单2_1_1',
            path: '',
          }]
        }, {
          name: ' 菜单2_2',
          path: '',
          child: [{
            name: ' 菜单2_2_1',
            path: '',
          }, {
            name: ' 菜单2_2_2',
            path: '',
          }]
        }]
      }, {
        name: ' 菜单3',
        path: '',
      }]
    }
  },
  methods: {
    choice (value, index) {
      this.$router.path = value.path;
      this.selection = index;
      sessionStorage.setItem('selection', JSON.stringify(index));
    },
    removeData (value, index) {
      this.include.splice(index, 1);
      if (this.selection == index) {
        this.selection = this.include.length - 1;
        this.$router.path = this.include[this.selection].path;
      }
      sessionStorage.setItem('include', JSON.stringify(this.include));
    },
    closeAllTags () {
      this.selection = 0;
      this.include = [{ name: 'home', path: '/home' }];
      this.$router.path = this.include[0].path;
      sessionStorage.setItem('include', JSON.stringify(this.include));
    },
    closeOthersTags(value, index) {
      this.include = [{ name: 'home', path: '/home' }];
      this.include.push(value);
      this.selection = 1;
      this.$router.path = this.include[1].path;
      sessionStorage.setItem('include', JSON.stringify(this.include));
    }
  },
  mounted () {
    this.include = JSON.parse(sessionStorage.getItem('include')) || this.include;
    this.selection = JSON.parse(sessionStorage.getItem('index')) || this.include.length - 1;
  },
  watch: {
    $route (to, from){
      const tag = this.include.find(key => to.path == key.path)
      if (!tag) {
        this.include.push(to)
        this.selection = this.include.length - 1;
      } else {
        this.selection = this.include.indexOf(tag);
      }
      var include = [...this.include]
      sessionStorage.setItem('include', JSON.stringify(include))
    } 
  }
}
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
html, body,
.container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.container {
  display: flex;
}

.container.cenent {
  flex-direction: column;
  .tag {
    width: 100%;
    height: 30px;
    // padding: 0 10px;
    border-bottom: 1px solid #808080; 
  }
}

.meun {
  width: 200px;
  height: 60px;
}
.cenent {
  flex: 1;
}
</style>
