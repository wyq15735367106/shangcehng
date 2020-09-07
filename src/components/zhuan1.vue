<template>
  <div class="dizhi">
    <app-header :name="name" :image="image" class="heads"></app-header>
    <van-field
      v-model="texta"
      label="姓名"
      placeholder="请输入账户名字"
      type="text"
      v-if="ident == 1 || ident == 4"
      readonly
    />
    <van-field
      v-model="texta"
      label="姓名"
      placeholder="请输入账户名字"
      type="text"
      v-else
    />
    <van-field
      v-model="text"
      label="账号"
      placeholder="请输入账号"
      type="text"
    />
    <van-field
      v-model="texts"
      label="二级密码"
      placeholder="请输入二级密码"
      type="password"
    />
    <div class="tijiao">
      <p @click="queding">确定</p>
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
      name: "修改支付宝信息",
      image: require("../../static/image/left.png"),
      text: "",
      texts: "",
      texta: "",
      ident: ""
    };
  },
  methods: {
    queding: function() {
      this.$api.post(
        "editali",
        {
          token: storage.get("token"),
          uid: storage.get("uid")
        },
        {
          alipayname: this.texta,
          alipay: this.text,
          paypass: this.texts
        },
        ret => {
          //  Toast.loading({
          //         message: '加载中...',
          //         forbidClick: true,
          //         duration: 300
          //     });
          console.log(ret);
          if (ret.code == 1) {
            Dialog.alert({
              title: "提示",
              message: ret.msg
            }).then(() => {
              this.$router.back();
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
    infor: function() {
      //   Toast.loading({
      //     message: "加载中...",
      //     forbidClick: true,
      //     duration: 300
      //   });
      this.$api.get(
        "ident",
        {
          token: storage.get("token"),
          uid: storage.get("uid")
        },
        {},
        ret => {
          console.log(ret);
          if (ret.code == 1) {
            this.ident = ret.data.ident;
            this.texta = ret.data.name;
            if (ret.data.ident == 2 || ret.data.ident == 3) {
              Dialog.alert({
                title: "提示",
                message: "请先去实名认证，再添加支付宝信息"
              }).then(() => {
                this.$router.push("./shiming");
              });
            }
          }
        }
      );
    }
  },
  mounted() {
    this.infor();
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
