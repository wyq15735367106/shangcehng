<template>
  <div class="zhuce">
    <div class="register">
      <app-header :name="name" :image="image"></app-header>
      <!-- logo -->
      <div class="logo">
        <img src="../../static/image/WechatIMG12.png" alt />
      </div>

      <van-field
        v-model="username"
        placeholder="请输入6-18位数的数字或字母"
        type="text"
        maxlength="18"
      />
      <van-field
        v-model="nicheng"
        placeholder="请输入昵称"
        type="text"
        maxlength="10"
      />
      <van-field v-model="tel" placeholder="请输入手机号" type="tel" />

      <van-field v-model="code" center clearable placeholder="请输入验证码">
        <template #button>
          <p
            style="font-size:0.12rem;color:#0499F6;text-align: center;width:100%"
            v-show="show"
            @click="getCode"
          >
            获取验证码
          </p>
          <p
            style="font-size:0.12rem;color:#0499F6;text-align: center;width:100%"
            v-show="!show"
            class="count"
          >
            {{ count }}s
          </p>
        </template>
      </van-field>
      <van-field v-model="password" placeholder="请输入密码" type="password" />
      <van-field
        v-model="paypass"
        placeholder="请输入二级密码"
        type="password"
      />
      <van-field v-model="invite" placeholder="请输入邀请码" type="text" />
      <van-field
        v-model="node_user"
        placeholder="请输入节点账号(选填)"
        type="text"
      />
      <!-- 登录 -->
      <div class="deng">
        <p @click="zhuce">确认注册</p>
      </div>
      <!-- 注册 忘记密码 -->
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
    "app-header": Header
  },
  name: "login",
  data() {
    return {
      name: "注册",
      image: require("../../static/image/left.png"),
      username: "",
      password: "",
      paypass: "",
      invite: "",
      username: "",
      openid: "",
      cover: "",
      code: "",
      show: true,
      count: "",
      timer: null,
      nicheng: "",
      tel: "",
      node_user: ""
    };
  },
  methods: {
    getCode() {
      this.$api.post(
        "user/send_code",
        {},
        {
          phone: this.tel,
          flag: 1
        },
        ret => {
          console.log(ret);
          if (ret.code == "1") {
            Toast({
              message: ret.msg,
              position: "bottom",
              duration: 300
            });
            const TIME_COUNT = 59;
            if (!this.timer) {
              this.count = TIME_COUNT;
              this.show = false;
              this.timer = setInterval(() => {
                if (this.count > 0 && this.count <= TIME_COUNT) {
                  this.count--;
                } else {
                  this.show = true;
                  clearInterval(this.timer);
                  this.timer = null;
                }
              }, 1000);
            }
            // this.$router.push("./home")
          } else {
            this.show = true;
            Toast({
              message: ret.msg,
              position: "bottom",
              duration: 300
            });
          }
        }
      );
    },
    zhuce: function() {
      this.$api.post(
        "register",
        {},
        {
          phone: this.tel,
          username: this.username,
          password: this.password,
          paypass: this.paypass,
          invite: this.invite,
          code: this.code,
          node_user: this.node_user,
          cover: storage.get("cover"),
          nickname: this.nicheng,
          openid: storage.get("openid")
        },
        ret => {
          console.log(ret);
          if (ret.code == "1") {
            setTimeout(() => {
              Toast({
                message: ret.msg,
                position: "bottom",
                duration: 300
              });
            }, 100);
            storage.set("token", ret.data.token);
            storage.set("uid", ret.data.uid);
            this.$router.push("./home");
          } else {
            Dialog.alert({
              title: "提示",
              message: ret.msg
            });
          }
        }
      );
    },
    invites: function() {
      if (this.$route.query.invite) {
        this.invite = this.$route.query.invite;
      } else {
        this.invite = "";
      }
    }
  },
  mounted() {
    this.invites();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
html,
body {
  font-size: 14px;
  background: #fff !important;
}
.zhuce {
  height: 100%;
  width: 100vw;
  background: #fff;
  padding-bottom: 0.3rem;
}
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
