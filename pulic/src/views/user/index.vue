<template>
  <div class="container" id="user">
    <div class="left">
      <img :src="userImg" alt="用户头像" class="userImg" />
      <h3>{{name}}</h3>
      <span>注册日期： {{date}}</span>

      <button class="submit">
        修改头像
        <!-- 多文件 multiple="multiple" -->
        <input type="file" class="file" id="userImg" @change="uploadImg" />
      </button>

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

      <xl-from labelWidth="65px" class="xh-from">
        <xl-from-itme label="用户名" class="xl-from-itme">
          <xl-input v-model="username" placeholder="请输入用户名" />
        </xl-from-itme>

        <xl-from-itme label="真实姓名" class="xl-from-itme">
          <xl-input v-model="name" placeholder="请输入真实姓名" />
        </xl-from-itme>

        <xl-from-itme label="性别" class="xl-from-itme">
          <xl-input v-model="username" placeholder="请输入用户性别" />
        </xl-from-itme>

        <xl-from-itme label="生日" class="xl-from-itme">
          <xl-date-pilcker class="xl-from-date" v-model="birthday" placeholder="请选择出生日期"></xl-date-pilcker>
        </xl-from-itme>

        <xl-from-itme label="地址" class="xl-from-itme">
          <xl-input v-model="username" placeholder="请输入用户地址" />
        </xl-from-itme>

        <xl-from-itme label="个性签名" class="xl-from-itme">
          <xl-input v-model="username" placeholder="请输入个性签名" />
        </xl-from-itme>

      </xl-from>

      <button class="save_button" @click="save">保存</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
// import axios from "vuex";
export default {
  name: "userCenter",
  data() {
    return {
      name: "",
      date: "",
      phone: "",
      email: "",
      username: "",
      birthday: '',
      value: null
    };
  },
  inject: ["reload"],
  computed: {
    ...mapState(["meun", "userName", "userImg"])
  },
  methods: {
    ...mapMutations(["setUserImg"]),
    getList() {
      let url = `/user/list?username=${this.userName}`;
      this.$http
        .get(url)
        .then(({ msg, data }) => {
          this.email = data.email;
          this.phone = data.telephone;
        })
        .catch(err => {
          // console.log(err);
          this.$message({
            type: "error",
            message: "获取数据失败！",
            duration: 5000
          });
        });
    },
    uploadImg(e) {
      // 上传头像
      let formData = new FormData();
      let fileList = e.target.files;

      if (fileList == undefined) return false;

      formData.append("username", this.userName);
      for (let file of fileList) {
        formData.append("file", file);
      }

      document.getElementById("userImg").value = "";

      this.$confirm("是否修改头像?", "修改头像", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(value => {
          if (!value) return (this.value = null);
          this.$http
            .post("/user/uploadImg", formData)
            .then(({ msg, url, text }) => {
              if (msg == "success") {
                this.$message.success(text);
                this.$nextTick(() => {
                  this.setUserImg(url);
                });
              }
            })
            .catch(err => {
              this.$message({
                type: "error",
                message: "图像上传失败！",
                duration: 5000
              });
            });
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
            type: "success",
            message: "绑定手机成功！",
            duration: 5000
          });
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: "绑定手机失败！",
            duration: 5000
          });
        });
    },
    save () {
      this.birthday = ''
    }
  },
  mounted() {
    this.getList();
  },
  watch: {
    userImg(value) {},
    username(value) {
      console.log(value);
    }
  }
};
</script>

<style lang="less" scoped>
.button {
  height: 30px;
  color: #fff;
  margin: auto;
  display: block;
  margin-top: 10px;
  border: none;
  outline: none;
  border-radius: 3px;
}
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
      display: inline-block;
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
    .userImg {
      width: 130px;
      height: 130px;
      display: block;
      margin: auto;
      border-radius: 50%;
    }
    .submit {
      width: 80px;
      display: block;
      padding: 2px 8px;
      background: #fff;
      color: #57c5f7;
      border: 1px solid #57c5f7;
      margin: 8px auto;
      overflow: hidden;
      position: relative;
      .file {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
      }
    }
  }
  .update_button {
    .button;
    width: 294px;
    letter-spacing: 2px;
    background: #f16643;
  }

  .right {
    flex: 1;
    text-align: left;
    .user_input_box {
      span {
        width: 120px;
        text-align: right;
        display: inline-block;
      }
    }
  }
  .xh-from {
    width: 80%;
    padding-top: 20px;
    margin: auto;
    margin-bottom: 30px;
    .xl-from-itme {
      width: 90%;
      margin-bottom: 20px
    }
    .xl-from-date {
       width: 100%;
    }
  }
  .save_button {
    .button;
    width: 65%;
    letter-spacing: 5px;
    background: #57a3f3;
  }
}
</style>