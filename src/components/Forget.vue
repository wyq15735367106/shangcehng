<template>
  <div class="wanf">
    <div class="register">
      <app-header :name="name" :image="image"></app-header>
      <!-- logo -->
      <div class="logo">
        <img src="../../static/image/WechatIMG12.png" alt />
      </div>

      <van-field v-model="username" placeholder="请输入账号" type="tel" />
      <van-field v-model="code" center clearable placeholder="请输入短信验证码">
        <template #button>
          <p
            style="font-size:0.12rem;color:#0499F6;text-align: center;width:100%"
            v-show="show"
            @click="getCode"
          >获取验证码</p>
          <p
            style="font-size:0.12rem;color:#0499F6;text-align: center;width:100%"
            v-show="!show"
            class="count"
          >{{count}}s</p>
        </template>
      </van-field>
      <van-field v-model="password" placeholder="请输入新密码" type="password" />
      <!-- 登录 -->
      <div class="deng">
        <p @click="wangji">登录</p>
      </div>
      <!-- 注册 忘记密码 -->
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import { Field } from "vant";
import { Toast } from "vant";
import { Dialog } from 'vant';
export default {
  components: {
    "app-header": Header
  },
  name: "login",
  data() {
    return {
      name: "忘记密码",
      image: require("../../static/image/left.png"),
      username: "",
      password: "",
      code: "",
      show: true,
      count: "",
      timer: null
    };
  },
  methods: {
    getCode() {
        // Toast.clear();
    this.$api.post('user/send_code_username', {}, {
         phone:this.username,
          flag:2,
       },
                ret => {
                    console.log(ret)
                    if(ret.code=='1'){
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
                      Toast({
                        message:ret.msg,
                        position:'bottom',
                        duration:300
                      });
                    
                    }else{
                      this.show = true;
                       Toast({
                        message:ret.msg,
                        position:'bottom',
                        duration:300
                      });
                    }
                }
            )
    },
    wangji: function() {
      this.$api.post(
        "forget",
        {},
        {
          username: this.username,
          password: this.password,
          code: this.code
        },
        ret => {
          console.log(ret);
          if (ret.code == "1") {
             Dialog.alert({
                        title: '提示',
                        message:ret.msg,
                      }).then(() => {
                        this.$router.push("./login")
                      });
          } else {
            Toast({
              message: ret.msg,
              position: "bottom",
              duration: 300
            });
          }
        }
      );
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wanf {
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