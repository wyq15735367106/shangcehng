<template>
  <div class="tixian">
    <app-header :name="name" :image="image" class="heads"></app-header>
    <van-field v-model="digit" type="digit" label="提现数量" placeholder="请输入提现数量" @input="input" />
    <!-- 输入手机号，调起手机号键盘 -->
    <van-field v-model="password" type="password" label="二级密码" placeholder="请输入二级密码" />
    <p class="shouxu">手续费:{{feiyong}}</p>
    <!-- 提现方式 -->
    <div class="fang">
      <div class="lei cl">
        <div class="img2 fl">
          <img src="../../static/image/yuan.png" v-show="is_default == 0" />
          <img src="../../static/image/wan.png" v-show="is_default == 1" />
        </div>
        <p class="fl">选择银行卡提现</p>
        <p class="fr" style="color:#2782FD;" @click="ka" v-if="bankcard">修改</p>
        <p class="fr" style="color:#2782FD;" @click="ka" v-else>添加</p>
      </div>
      <div class="yin cl">
        <div class="img fl">
          <img src="../../static/image/ka.png" alt />
        </div>
        <p class="fl">银行卡</p>
      </div>
      <p class="num" v-if="bankcard">{{ bankcard }}</p>
      <p class="num" v-else>请添加银行卡</p>
      <div class="imgzhi">
        <!-- <img src="../../static/image/yinhangka.png" alt /> -->
      </div>
    </div>
    <!-- <div class="fang2">
      <div class="lei cl">
        <div class="img2 fl">
          <img src="../../static/image/yuan.png" v-show="is_defaults==0" @click="mo" />
          <img src="../../static/image/wan.png" v-show="is_defaults==1" @click="mo" />
        </div>
        <p class="fl">选择支付宝提现</p>
        <p class="fr" style="color:#2782FD" @click="bao" v-if='alipay'>修改</p>
         <p class="fr" style="color:#2782FD" @click="bao">添加</p>
      </div>
      <div class="yin cl">
        <div class="img fl">
          <img src="../../static/image/bao.png" alt />
        </div>
        <p class="fl">支付宝</p>
      </div>
      <p class="num" v-if="alipay">{{alipay}}</p>
      <p class="num" v-else>请添加支付宝</p>
      <div class="imgzhi">
       
      </div>
    </div>-->
    <div class="tijiao">
      <p @click="tixian">确定</p>
    </div>
  </div>
</template>

<script>
import storage from "good-storage";
import Header from "../components/Header";
import { Toast } from "vant";
import { Field } from "vant";
import { Dialog } from "vant";
export default {
  components: {
    "app-header": Header,
  },
  name: "tixian",
  data() {
    return {
      name: "提现",
      image: require("../../static/image/left.png"),
      digit: "",
      password: "",
      is_default: 1,
      is_defaults: 0,
      alipay: "",
      bankcard: "",
      type: "",
      bili: "",
      feiyong: "0",
    };
  },
  methods: {
    mima: function () {
      this.$router.push("./xiugaimima");
    },
    erji: function () {
      this.$router.push("./erjimima");
    },
    ka: function () {
      this.$router.push("./zhuan2");
    },
    bao: function () {
      this.$router.push("./zhuan1");
    },
    moren: function () {
      if (this.is_default == "1") {
        this.is_defaults = 1;
        this.is_default = 0;
        console.log("支付宝");
      } else {
        this.is_defaults = 0;
        this.is_default = 1;
        console.log("yinghangha");
      }
      console.log(this.is_default);
    },
    mo: function () {
      if (this.is_defaults == "0") {
        this.is_defaults = 1;
        this.is_default = 0;
      } else {
        this.is_defaults = 0;
        this.is_default = 1;
      }
    },

    tixian: function () {
      if (this.is_default == 1) {
        this.type = 1;
        console.log("银行卡");
      } else {
        this.type = 2;
        console.log("支付包");
      }
      this.$api.post(
        "account/extact",
        {
          token: storage.get("token"),
          uid: storage.get("uid"),
        },
        {
          type: this.type,
          num: this.digit,
          paypass: this.password,
        },
        (ret) => {
          console.log(ret);
          this.num = "";
          this.paypass = "";
          if (ret.code == 1) {
            Dialog.alert({
              title: "提示",
              message: ret.msg,
            });
          } else {
            Dialog.alert({
              title: "提示",
              message: ret.msg,
            });
          }
        }
      );
    },
    input(value) {
      console.log(value);
      this.feiyong = value * this.bili;
    },
    account_change() {
      this.$api.post(
        "account/charge",
        {
          token: storage.get("token"),
          uid: storage.get("uid"),
        },
        {},
        (ret) => {
          console.log(ret);
          this.bili = ret.data;
          console.log(this.bili);
        }
      );
    },
    pay_list: function () {
      this.$api.get(
        "pay_list",
        {
          token: storage.get("token"),
          uid: storage.get("uid"),
        },
        {
          type: this.type,
          num: this.digit,
          paypass: this.password,
        },
        (ret) => {
          console.log(ret);
          if (ret.code == 1) {
            this.alipay = ret.data.alipay;
            this.bankcard = ret.data.bankcard;
          }
        }
      );
    },
  },
  mounted() {
    this.pay_list();
    this.account_change();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.heads {
  margin-bottom: 0.1rem;
}
.fang {
  width: 92%;
  margin: 0 auto;
  background: #fff;
  margin-top: 0.1rem;
  height: 1.14rem;
  box-sizing: border-box;
  padding: 0.1rem;
  border-radius: 0.05rem;
  position: relative;
}
.fang2 {
  width: 92%;
  margin: 0 auto;
  background: #fff;
  margin-top: 0.1rem;
  height: 1.14rem;
  box-sizing: border-box;
  padding: 0.1rem;
  border-radius: 0.05rem;
  position: relative;
}
.imgzhi {
  height: 1.14rem;
  position: absolute;
  top: 0;
  right: 0.4rem;
  z-index: 0;
}
.imgzhi img {
  height: 100%;
  width: auto;
}
.img1 {
  height: 100%;
  width: 30%;
}
.img1 img {
  height: 100%;
  width: 100%;
}
.lei {
  height: 0.2rem;
  line-height: 0.2rem;
  font-size: 0.13rem;
  color: #333333;
}
.lei img {
  height: 0.16rem;
  width: auto;
  margin-right: 0.1rem;
  margin-top: 0.02rem;
}
.yin {
  height: 0.2rem;
  margin-top: 0.2rem;
  margin-left: 0.4rem;
}
.yin img {
  height: 0.18rem;
  width: auto;
  margin-right: 0.1rem;
}
.num {
  font-size: 0.13rem;
  line-height: 0.2rem;
  margin-top: 0.1rem;
  padding-left: 0.4rem;
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
.shouxu {
  padding: 0 0.15rem;
  box-sizing: border-box;
  background: #fff;
  height: 0.4rem;
  line-height: 0.4rem;
  color: red;
  font-size: 0.14rem;
}
</style>
