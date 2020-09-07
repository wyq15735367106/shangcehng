<template>
  <div class="dizhi">
    <app-header :name="name" :image="image" class="heads"></app-header>
    <van-field v-model="phone" label="手机号" placeholder="请输入手机号" type="text" />
    <van-field v-model="code" label="验证码" center clearable placeholder="请输入验证码">
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
    <van-field v-model="paypass" label="二级密码" placeholder="请输入二级密码" type="password" />
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
      name: "绑定手机号",
      image: require("../../static/image/left.png"),
      paypass: "",
      phone: "",
      count: "",
      code: "",
      show: true
    };
  },
  methods: {
    mima: function() {
      this.$api.post(
        "bind_phone",
        {
          token: storage.get("token"),
          uid: storage.get("uid")
        },
        {
          phone: this.phone,
          code: this.code,
          paypass: this.paypass
        },
        ret => {
          console.log(ret);
          if (ret.code == 1) {
            Dialog.alert({
              title: "提示",
              message: ret.msg
            }).then(() => {
              this.$router.push("./shezhi");
            });
          } else {
            Dialog.alert({
              title: "提示",
              message: ret.msg
            });
          }
        }
      );
    },
    getCode() {
    
      this.$api.post(
        "user/send_code",
        {},
        {
          phone: this.phone,
          flag: 3
        },
        ret => {
          console.log(ret);
          if (ret.code == "1") {
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
              message: ret.msg,
              position: "bottom",
              duration: 300
            });
           
          } else {
            this.show = true;
            // Toast({
            //   message: ret.msg,
            //   position: "bottom",
            //   duration: 300
            // });
          }
        }
      );
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.heads {
  margin-bottom: 1px;
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