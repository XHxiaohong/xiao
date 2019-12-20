<template>
  <div class="xh-login-container">
    <div class="xh-login-box">
      <div class="xh-login-title">
        <span @click.stop="selened = true" :class="[selened ? 'xh-login-title-selened': '']">登录</span>
        <span @click.stop="selened = false" :class="[!selened ? 'xh-login-title-selened': '']">注册</span>
      </div>


      <div class="xh-input-box">
        <i class="xh-ioc xh-ioc-yonghu1"></i>
        <input type="text" name="usernmae" v-model="username" content="no-cache" 
        maxlength = "32" placeholder="请输入密码">
      </div>

      <div class="xh-input-box">
        <i class="xh-ioc xh-ioc-mima1" ></i>
        <input type="password" name="password" maxlength = "32"
        v-model="password" autocomplete="new-password" placeholder="密码长度在6-32位字符之间">
      </div>

      <div class="xh-input-box" v-show="!selened">
        <i class="xh-ioc xh-ioc-youxiang3"></i>
        <input type="email" name="email" v-model="email" placeholder="请输入用户邮箱！" content="no-cache">
      </div>

      <div class="xh-button-box">
        <button v-show="selened" @click="login">登录</button>
        <button v-show="!selened" @click="register">注册</button>
      </div>

      <div class="xh-input-label" v-show="selened">
        <label >
          <input type="checkbox" name="checkbox" v-model="checkbox" content="no-cache">
          <span>记住密码</span>
        </label>
        <a @click.stop="retrieve"> 找回密码 </a>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  name: 'login',
  data () {
    return {
      email: '',
      username: '',
      password: '',
      selened: true,
      checkbox: false
    }
  },
  methods: {
    ...mapGetters(['getMeun', 'addMeun']),
    regular (data) {
      let reg = /\S/; 
      let formText= {
        username: '请输入用户登录名！',
        password: '请输入用户登录密码！',
        email: '请输入联系邮箱！'
      }
      for (let key in data) {
        if (!reg.test(data[key])) {
          this.$message.error(formText[key])
          return false;
        }
      }
      if (data.password && data.password.length < 6) {
        this.$message.error('密码长度不得小于6个字段！');
        return false;
      }
      return true;
    },
    login () { // 登录
      let data = {
        username: this.username,
        password: this.password
      }

      console.log(this.$store)

      this.addMeun()
      .then(data=> {
        console.log(data)
        this.getMeun()
        .then(data=> {
          console.log(data)
        })
        .catch(err=> {
          console.log(err)
        })
      })

      if (!this.regular(data)) return false;

      this.$http.post('/login', data)
      .then(({msg, text})=> {
        msg == 'SUCCESS'
        ? this.$router.push({path: '/home'})
        : this.$message.error(text);
      }).catch(err => {
        this.$message.error('请求错误！');
      })
    },
    register () { // 用户注册
      let data = {
        email: this.email,
        username: this.username,
        password: this.password
      }
      if (!this.regular(data)) return false;

      let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (!reg.test(data.email)) {
        this.$message.error('邮箱格式不正确！')
      }

      this.$http.post('/register', data)
      .then(({msg, text})=> {
        if (msg == 'SUCCESS') {
          this.$message.success(text);
        } else {
          this.$message.error(text);
        }
      }).catch(err => {
        this.$message.error('请求错误！');
      })
    },
    retrieve () { // 找回密码
      let data = { username: this.username };
      if (!this.regular(data)) return false;

      this.$http.post('/retrieve', data)
      .then(({msg, text})=> {
        msg == 'SUCCESS'
        ? this.$message.success(text)
        : this.$message.error(text);
      }).catch(err=> {
        this.$message.error('请求错误！');
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import url(../assets/css/xh-public.less);
@import url(../assets/icon/iconfont.css);
.xh-login-container {
  .container;
  display: flex;
  font-size: 14px;
  color: rgba(25, 25, 25, 0.85);
  justify-content: flex-end;
  align-items: center;
  background: url(../assets/images/login-bg.jpg);
}
.xh-login-box {
  padding: 20px 40px;
  margin-right: 10%;
  background: rgba(251, 247, 247, .65);
  border-radius: 6px;
  box-shadow: 2px 2px 2px 2px #afacac47;
  .xh-login-title {
    margin-bottom: 20px;
    border-bottom: 2px solid @border;; 
    span {
      width: 50px;
      padding: 3px;
      cursor: pointer;
      text-align: center;
      display: inline-block;
      margin-bottom: -2px;
      border-bottom: 2px solid transparent; 
    }
    span:hover,
    .xh-login-title-selened {
      color: @primary;
      border-color: @primary;
    }
  }

  .xh-box {
    width: 250px;
    height: 36px;
    margin-bottom: 20px;
    border:  1px solid @border;
    border-radius: 5px;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.41);
  }

  .xh-ioc  {
    width: 30px;
    height: 30px;
    font-size: 28px;
    text-align: center;
    line-height: 38px;
    margin: 0 10px
  }
  .xh-input-box {
    .xh-box;
    display: flex;
    input {
      width: 100%;
      border: none;
      outline: none;
      background: transparent;
    }
  }
  .xh-input-label {
    .xh-box;
    display: flex;
    justify-content: space-between;
    border-color:  transparent; 
    background: transparent;
    span {
      margin-left: 10px; 
      cursor: pointer;
      vertical-align: middle; 
    }

    input[type="checkbox"] {
      width: 16px;
      height: 16px;
      display: inline-block;
      text-align: center;
      vertical-align: middle; 
      line-height: 14px;
      position: relative;
    }
    input[type="checkbox"]::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      background: #fff;
      width: 100%;
      height: 100%;
      border: 1px solid @border;
    }
    input[type="checkbox"]:checked::before{
      content: "\2713";
      position: absolute;
      top: 0;
      left: 0;
      width:100%;
      border: 1px solid #808080;
      color: rgba(25, 25, 25, 0.85);
      font-size: 14px;
      font-weight: bold;
      background-color: #fff;
    }
    a:hover,
    input[type="checkbox"]:checked + span {  
      color: @primary;
      font-weight: 800; 
    }
  }
  .xh-button-box {
    .xh-box;
    border: none;
    button {
      width: 100%;
      height: 100%;
      border: none;
      display: block;
      color: #eee;
      background: @primary;
      letter-spacing: 8px;
    }
  }
}

</style>