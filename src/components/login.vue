<template>
  <div class="login">
    <app-header :name="name"></app-header>
    <!-- logo -->
    <div class="logo">
      <img src="../../static/image/WechatIMG12.png" alt />
    </div>

    <van-field v-model="username" placeholder="请输入账号" type="text" />
    <van-field v-model="password" placeholder="请输入密码" type="password" />

    <!-- 登录 -->
    <div class="deng">
      <p @click="login">登录</p>
    </div>
    <!-- 注册 忘记密码 -->
    <div class="zhu cl">
      <p class="fl" @click="register">注册</p>
      <p class="fr" @click="forget">忘记密码</p>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import storage from "good-storage";
import { Field } from "vant";
import { Toast } from "vant";
import { Dialog } from "vant";
export default {
  components: {
    "app-header": Header,
  },
  name: "login",
  data() {
    return {
      name: "登录",
      image: require("../../static/image/left.png"),
      username: "",
      password: "",
      cover: "",
      nickname: "",
      openid: "",
    };
  },
  methods: {
    register: function () {
      this.$router.push("./register");
    },
    forget: function () {
      this.$router.push("./Forget");
    },
    login: function () {
      //   storage.set("token", "b60a4cf8283340015a98e23db1a50bdf");
      //   storage.set("uid", "1");
      //   this.$router.push("./home");
      this.$api.post(
        "login",
        {},
        {
          username: this.username,
          password: this.password,
          cover: storage.get("cover"),
          nickname: storage.get("nickname"),
          openid: storage.get("openid"),
        },
        (ret) => {
          console.log(ret);
          if (ret.code == "1") {
            storage.set("token", ret.data.token);
            storage.set("uid", ret.data.uid);

            this.$router.push("./home");
            setTimeout(() => {
              Toast({
                message: ret.msg,
                position: "bottom",
                duration: 300,
              });
            }, 100);
          } else {
            Dialog.alert({
              title: "提示",
              message: ret.msg,
            });
          }
        }
      );
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
  height: 100vh;
  width: 100vw;
  background: #fff;
}
.logo {
  height: 1.1rem;
  width: 1.1rem;
  margin: 0 auto;
  margin-bottom: 0.5rem;
}
.logo img {
  margin-top: 0.4rem;
  height: 100%;
  width: auto;
}
.deng {
  height: 0.45rem;
  width: 80%;
  border-radius: 0.4rem;
  color: #fff;
  margin: 0 auto;
  margin-top: 0.5rem;
  background: #0497f4;
}
.deng p {
  line-height: 0.45rem;
  text-align: center;
  font-size: 0.16rem;
}
.zhu {
  width: 80%;
  margin: 0 auto;
}
.zhu p {
  color: #0497f4;
  font-size: 0.15rem;
  line-height: 0.4rem;
}
</style>
