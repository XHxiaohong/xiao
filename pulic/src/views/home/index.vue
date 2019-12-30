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
        <div>这是个人的UI库，练手之作。</div>
        <ul class="xh-top-nav">
          <!-- <li></li>
          <li></li> -->
          <li class="xh-nav-item" @click="router">个人中心</li>
          <li class="xh-nav-item" @click.stop="signOut">安全退出</li>
          <li class="xh-nav-user">
            <img :src="userImg" alt="" class="xh-user_img">
            <div  class="xh-user-text">
              <span>{{userName}}</span>

              <div>
                <span>{{date}}</span>
                <span class="xh-time">{{time}}</span>
                <span>{{day}}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="xh-tags-box">
        <xl-tag 
        :tags="tags" 
        :noClose="0" 
        :selection="selection"
        @click="selendTag"
        @close="closeTag"></xl-tag>
      </div>

      <div class="xh-content"> 
        <keep-alive :include="include">
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
      tags: ['首页'],
      include: ['home'],
      selection: 0,
      time: '',
      date: '',
      day: ''
    }
  },
  computed: {
    ...mapState(['meun', 'userName']),
    userImg () {
      return '/public/images/user.png'
    }
  },
  methods: {
    selend (value, path) {
      path = path.replace('/', '');
      if (!this.include.includes(path)) {
        this.tags.push(value);
        this.include.push(path);
        this.selection = this.tags.length - 1;

        localStorage.setItem('tags', JSON.stringify(this.tags));
        localStorage.setItem('include', JSON.stringify(this.include));
      } else {
        this.selection = this.tags.indexOf(value);
      }
    },
    router () {
      // if (!this.include.includes(path)) {return false}
      this.selend('个人中心' ,'/userCenter');
      this.$router.push({path: '/userCenter'});
    },
    selendTag(value, index) {
      if (index != this.selection) {
        this.selection = index;
        this.$router.push(this.include[index]);
      }
    },
    closeTag (value, index) {
      this.tags.splice(index, 1);
      this.include.splice(index, 1);

      let path = '/' + this.include[this.include.length - 1];
      
      this.$router.push({path: path});
      localStorage.setItem('tags', JSON.stringify(this.tags));
      localStorage.setItem('include', JSON.stringify(this.include));
    },
    signOut () {
      this.$router.push({path: '/login'});
    },
    getDate () {
      let date = new Date();

      switch (date.getDay()) {
        case 0: this.day = '星期天'; break;
        case 1: this.day = '星期一'; break;
        case 2: this.day = '星期二'; break;
        case 3: this.day = '星期三'; break;
        case 4: this.day = '星期四'; break;
        case 5: this.day = '星期五'; break;
        case 6: this.day = '星期六'; break;
      }
      this.date = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`
      this.time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    }
  },
  mounted () {
    setInterval(()=> {
      this.getDate();
    }, 1000)

    let tags = localStorage.getItem('tags');
    let include = localStorage.getItem('include');

    this.tags = JSON.parse(tags) || ['首页'],
    this.include = JSON.parse(include) || ['home']
  }
}
</script>

<style lang="less" scoped>
.container {
  display: flex;
  overflow: hidden;
  .xh-haed {
    width: calc(100% - 40px);
    height: 60px;
    display: flex;
    color: #eee;
    padding: 0 20px;
    background: #272929;
    align-items: center;
    justify-content: space-between;

    .xh-top-nav {
      display: flex;
      height: 100%;
      .xh-nav-item {
        padding: 0 20px;
        height: 58px;
        line-height: 60px;
        display: inline-block;
        border-bottom: 2px solid transparent; 
      }

      .xh-nav-item:hover {
        border-color: #eee
      }
      .xh-nav-user {
        width: 260px;
        display: flex;
        align-items: center;
      }

      .xh-user_img {
        width: 50px;
        height: 50px;
        display: block;
        border-radius: 50%;
        border: 2px solid #ccc; 
      }
      .xh-user-text {
        display: flex;
        margin-left: 16px;
        justify-content: space-between;
        flex-direction: column;
        span {
          height: 28px;
          line-height: 28px;
          display: inline-block;
          font-size: 14px;
        }
        .xh-time {
          width: 65px;
          margin-left: 8px;
        }
      }
    }
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
    height: 34px;
    // bottom: ;
  }

  .xh-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: auto;
    .xh-content { 
      background: #eee;
      padding: 8px;
    }
  }
}
</style>