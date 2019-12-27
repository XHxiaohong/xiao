<template>
  <div class="container" id="user">
    <div class="left">
      <img :src="imgUrl" alt="用户头像" />
      <h3>{{name}}</h3>
      <span>注册日期： {{date}}</span>
      <button class="update">修改头像</button>

      <span class="title">信息绑定</span>

      <div class="input_box">
        <span>手机：</span>
        <input type="text" class="input" placeholder="未绑定" v-model="phone" />
        <button class="button" @click="phoneFun">绑定手机</button>
      </div>

      <div class="input_box">
        <span>邮箱：</span>
        <input type="text" class="input" placeholder="未绑定" v-model="email" />
        <button class="button">绑定邮箱</button>
      </div>

      <button class="update_button">修改密码</button>
    </div>

    <div class="right">
      <span class="title">个人信息</span>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "userCenter",
  data() {
    return {
      name: "",
      date: "",
      phone: "",
      email: "",
      imgUrl: "/images/user.png"
    };
  },
  computed: {
    ...mapState(["meun", "userName"])
  },
  methods: {
    getList() {
      let url = `/user/list?username=${this.userName}`;
      this.$http
        .get(url)
        .then(({ msg, data }) => {
          console.log(msg);
          console.log(data);
          this.email = data.email;
          this.phone = data.telephone;
        })
        .catch(err => {
          console.log(err);
        });
    },
    phoneFun() {
      let data = {
        username: this.userName,
        telephone: this.phone
      };
      this.$http
        .post("/user/telephone", data)
        .then(({ msg, data }) => {
           this.$message({
            type: 'success',
            message: '绑定手机成功！',
            duration: 5000
          });
        })
        .catch(err => {
          this.$message({
            type: 'error',
            message: '绑定手机失败！',
            duration: 5000
          });
        });
    }
  },
  mounted() {
    this.getList();
  }
};
</script>

<style lang="less" scoped>
.container {
  padding-top: 60px;
  text-align: center;
  background: #fff;

  .input_box {
    margin: 8px 0px;
    .input {
      border: none;
      outline: none;
      margin-right: 10px;
    }

    .button {
      // margin-right: -60px;
      color: #ffffff;
      border: 1px solid #47cb89;
      padding: 2px 5px;
      background: #47cb89;
      border-radius: 3px;
    }
  }

  .title {
    width: 100%;
    margin: 8px;
    display: inline-block;
    position: relative;
    vertical-align: middle;
    white-space: nowrap;
  }

  .title:after,
  .title:before {
    content: "";
    display: inline-block;
    position: relative;
    top: 50%;
    width: 35%;
    border-top: 1px solid #aaa;
    vertical-align: middle;
    margin: 0 20px;
  }

  .left {
    width: 40%;
    padding-top: 20px;
    border-right: 1px solid #aaa;
    .update {
      display: block;
      padding: 2px 8px;
      background: #fff;
      color: #57c5f7;
      border: 1px solid #57c5f7;
      margin: 8px auto;
    }
  }
  .update_button {
    width: 294px;
    height: 30px;
    color: #fff;
    margin-top: 10px;
    // margin-left: 60px;
    border: none;
    outline: none;
    border-radius: 3px;
    background: #f16643;
  }

  .right {
    flex: 1;
  }
}
</style>