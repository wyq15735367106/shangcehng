<template>
  <div class="dizhi">
    <app-header :name="name" :image="image" class="heads"></app-header>
    <van-field v-model="username" label="账号" type="tel" readonly />
    <!-- <van-field v-model="sms" center clearable label="短信验证码" placeholder="请输入短信验证码">
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
    </van-field> -->
      <van-field v-model="oldpass" label="登录密码" placeholder="请输入登录密码" type="password" />
    <van-field v-model="text" label="新密码" placeholder="请输入新密码" type="password" />
    <van-field v-model="texts" label="确认密码" placeholder="请再次输入密码" type="password" />
    <div class="tijiao">
      <p @click="mima">确定</p>
    </div>
  </div>
</template>

<script>
import { Dialog } from "vant";
import storage from "good-storage";
import Header from "../components/Header";
import { Toast } from "vant";
import { Field } from "vant";
export default {
  components: {
    "app-header": Header
  },
  name: "bang",
  data() {
    return {
      name: "修改二级密码",
      image: require("../../static/image/left.png"),
      text: "",
      texts: "",
      username: "",
      oldpass: "",
      show: true,
      count: "",
      timer: null
    };
  },
  methods: {
    getCode() {
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
                        this.$api.post('user/send_code', {}, {
         phone:this.username,
          flag:2,
       },
                ret => {
                //    Toast.loading({
                //     message: '加载中...',
                //     forbidClick: true,
                //     duration: 300
                // });
                    console.log(ret)
                    if(ret.code=='1'){
                      Toast({
                        message:ret.msg,
                        position:'bottom',
                        duration:300
                      });
                      this.show = false;
                      // this.$router.push("./home")
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
    mima: function() {
      if (this.text == this.texts) {
        this.$api.post(
          "uppaypass",
          {
            token: storage.get("token"),
            uid: storage.get("uid")
          },
          {
            oldpass: this.oldpass,
            password: this.text,
            username: this.username
          },
          ret => {
            console.log(ret);
            if (ret.code == "1") {
              Dialog.alert({
                title: "提示",
                message: ret.msg
              }).then(() => {
                // on close
                this.$router.back()
              });
            } else {
              Dialog.alert({
                title: "提示",
                message: ret.msg
              }).then(() => {
                // on close
              });
            }
          }
        );
      } else {
        Dialog.alert({
          title: "提示",
          message: "请确认新密码与确认密码一致"
        }).then(() => {
          // on close
        });
      }
    },
    info: function() {
      this.$api.get(
        "persion",
        {
          token: storage.get("token"),
          uid: storage.get("uid")
        },
        {},
        ret => {
          console.log(ret);
          if (ret.code == "1") {
            this.username = ret.data.user.username;
          }
        }
      );
    }
  },
  mounted() {
    this.info();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.heads {
  margin-bottom: 0.1rem;
}

.box {
  margin: 0 auto;
  background: #fff;
}
.bang {
  height: 0.4rem;
  line-height: 0.4rem;
  padding: 0 0.15rem;
  box-sizing: border-box;
  font-size: 0.14rem;
  color: #333333;
  border-bottom: 1px solid #f8f8f8;
}
.imgs img {
  height: 0.2rem;
  width: auto;
  margin-top: 0.1rem;
}
.imgss img {
  height: 0.1rem;
  width: auto;
  margin-top: 0.15rem;
}
.zhu {
  margin-left: 0.1rem;
}
.tijiao {
  width: 80%;
  height: 0.4rem;
  margin: 0 auto;
  margin-top: 0.3rem;
  border-radius: 0.05rem;
  color: #fff;
  font-size: 0.15rem;
  text-align: center;
  line-height: 0.4rem;
  background: #2782fd;
}
</style>