<template>
  <div class="di">
    <div class="head">
      <p>{{ name }}</p>
      <div class="head_box">
        <div style="padding:0;margin:0;width:0.25rem;" @click="goback">
          <img :src="image" alt="" class="img_f" />
        </div>
      </div>
    </div>
    <div class="dizhi cl">
      <div class="imgages fl" v-if="names">
        <img
          src="../../static/image/dishi3.png"
          alt
          v-if="names"
          style="margin-top: 0.13rem;margin-right: 0.1rem"
        />
      </div>
      <div class="imgages fl" v-show="!names" style="margin-top:0.02rem">
        <img src="../../static/image/dishi3.png" alt />
      </div>
      <div class="weizhi fl" v-show="names">
        <p class="wei" @click="tianjia">
          {{ names }} {{ phone }}
          <span>（默认）</span>
        </p>
        <p class="zhi" @click="tianjia">
          {{ province }}/{{ city }}/{{ county }} {{ address }}
        </p>
      </div>
      <div class="weizhi fl" v-show="!names">
        <p class="wei" @click="tianjia" style="margin-top:0">请添加收货地址</p>
      </div>
    </div>
    <!-- 商品详情 -->
    <div class="shop">
      <p>商品详情</p>
    </div>
    <van-card :num="nums" :price="price" :title="shopname" :thumb="imgs" />
    <!-- 支付方式 -->
    <div class="fang">
      <!-- <div class="box cl" @click="zhifu">
        <div class="img fl">
          <img src="../../static/image/weixin.png" alt />
        </div>
        <p class="fl">微信支付</p>
        <div class="imgss fr"  @click="zhifu">
          <img src="../../static/image/wan.png" alt @click="zhifu" v-show="act==0" />
          <img src="../../static/image/yuan.png" alt @click="zhifu" v-show="act==1" />
        </div>
      </div> -->
      <div class="box cl" style="border:none">
        <div class="img fl">
          <img src="../../static/image/WechatIMG1.png" alt />
        </div>
        <p class="fl">余额支付</p>
        <div class="imgss fr" @click="zhifu">
          <img src="../../static/image/wan.png" />
          <!-- <img src="../../static/image/wan.png" alt v-show="ive==0" /> -->
        </div>
      </div>
    </div>
    <div class="shop" style="margin-bottom:1px">
      <p>备注(选填)</p>
    </div>
    <van-field
      v-model="message"
      rows="4"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入备注"
      show-word-limit
    />
    <!-- 弹出层 -->

    <van-popup
      v-model="show"
      closeable
      round
      position="bottom"
      :style="{ height: '60%' }"
      :close-on-click-overlay="closeonclickoverlay"
      @close="guan1"
    >
      <div style="padding-top:0.15rem">
        <van-password-input
          :value="value"
          info="密码为 6 位数字"
          :focused="showKeyboard"
          @focus="showKeyboard = true"
        />
        <van-number-keyboard
          :show="showKeyboard"
          close-button-text="完成"
          theme="custom"
          extra-key="."
          @input="onInput"
          @delete="onDelete"
          @close="guan2"
        />
      </div>
    </van-popup>

    <!-- 付款 -->
    <div class="footer">
      <p @click="fukuan">立即付款</p>
    </div>
  </div>
</template>

<script>
import { Popup } from "vant";
import { PasswordInput, NumberKeyboard } from "vant";
import storage from "good-storage";
import Header from "../components/Header";
import { Toast } from "vant";
import { Card } from "vant";
import { Dialog } from "vant";
import { Field } from "vant";
import wx from "weixin-js-sdk";
export default {
  components: {
    "app-header": Header
  },
  name: "bang",
  data() {
    return {
      name: "确认付款",
      image: require("../../static/image/left.png"),
      names: "",
      phone: "",
      address: "",
      shopname: "",
      price: "",
      imgs: "",
      city: "",
      province: "",
      county: "",
      act: 1,
      ive: 0,
      shopid: "",
      addressid: "",
      nums: "",
      show: false,
      value: "",
      closeonclickoverlay: false,
      showKeyboard: true,
      shows: true,
      is_buy: "",
      is_upgrade: "",
      message: ""
    };
  },
  methods: {
    onInput(key) {
      this.value = (this.value + key).slice(0, 6);
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    },
    blur() {
      this.show = false;
      this.value = "";
    },
    guan1: function() {
      console.log(1);
      this.value = "";
    },
    guan2() {
      // this.value=''
      if (this.upgrade) {
        var is_upgrade = this.upgrade;
      } else {
        var is_upgrade = this.$route.query.is_upgrade;
      }
      console.log(this.value.length);
      if (this.value.length < 6) {
        // on close
        this.value = "";
        Dialog.alert({
          title: "提示",
          message: "请输入6位数密码"
        }).then(() => {
          // on close
          this.show = false;
        });
      } else if (this.value.length == 6) {
        console.log(this.message);
        //   const toast = Toast.loading({
        //     duration: 0, // 持续展示 toast
        //     forbidClick: true,
        //     message: '加载中...',
        //   });
        this.$api.post(
          "course/buy",
          {
            token: storage.get("token"),
            uid: storage.get("uid")
          },
          {
            gid: this.shopid,
            aid: this.addressid,
            pay_type: 2,
            num: this.nums,
            paypass: this.value,
            is_upgrade: is_upgrade,
            remark: this.message
          },
          ret => {
            console.log(ret);

            if (ret.code == 1) {
              //  Toast.clear();
              this.value = "";
              Dialog.alert({
                title: "提示",
                message: ret.msg
              }).then(() => {
                // on close
                this.$router.push("./order");
              });
            } else {
              //  Toast.clear();
              this.show = false;
              Dialog.alert({
                title: "提示",
                message: ret.msg
              }).then(() => {
                // on close
                this.value = "";
                return;
              });
            }
          }
        );
      }
    },
    shop: function() {
      if (this.$route.query.act) {
        this.act = this.$route.query.act;
        this.ive = this.$route.query.ive;
        this.nums = this.$route.query.nums;
        this.is_buy = this.$route.query.is_buy;
        this.is_upgrade = this.$route.query.is_upgrade;
        //  alert(1)
        console.log(this.$route.query.shopid);
        this.$api.get(
          "course/sub_buy",
          {
            token: storage.get("token"),
            uid: storage.get("uid")
          },
          {
            id: this.$route.query.shopid,
            num: this.$route.query.nums,
            is_buy: this.$route.query.buy,
            is_upgrade: this.$route.query.upgrade
          },
          ret => {
            console.log(ret);
            this.shopname = ret.data.goods.name;
            this.shopid = ret.data.goods.id;
            this.price = ret.data.goods.price;
            this.imgs = ret.data.goods.cover;
            this.names = ret.data.address.name;
            this.phone = ret.data.address.phone;
            this.province = ret.data.address.province;
            this.city = ret.data.address.city;
            this.county = ret.data.address.county;
            this.address = ret.data.address.address;
            this.addressid = ret.data.address.id;
          }
        );
      } else if (this.$route.query.id) {
        // alert(1)
        if (this.$route.query.num) {
          this.nums = this.$route.query.num;
        } else {
          this.nums = 1;
        }
        this.is_buy = this.$route.query.is_buy;
        this.is_upgrade = this.$route.query.is_upgrade;
        console.log(this.$route.query.is_upgrade);
        this.$api.get(
          "course/sub_buy",
          {
            token: storage.get("token"),
            uid: storage.get("uid")
          },
          {
            id: this.$route.query.id,
            num: this.nums,
            is_buy: this.$route.query.is_buy,
            is_upgrade: this.$route.query.is_upgrade
          },
          ret => {
            console.log(ret);
            this.shopname = ret.data.goods.name;
            this.shopid = ret.data.goods.id;
            this.price = ret.data.goods.price;
            this.imgs = ret.data.goods.cover;
            this.names = ret.data.address.name;
            this.phone = ret.data.address.phone;
            this.province = ret.data.address.province;
            this.city = ret.data.address.city;
            this.county = ret.data.address.county;
            this.address = ret.data.address.address;
            this.addressid = ret.data.address.id;
            // alert(1)
            console.log(this.$route.query.is_buy);
          }
        );
      }
    },
    zhifu: function() {
      if (this.act == 1) {
        this.act = 0;
        this.ive = 1;
        // 微信支付
      } else if (this.act == 0) {
        this.act = 1;
        this.ive = 0;
        // 余额支付
      }
    },
    cha: function() {
      this.show = false;
      this.value = "";
    },
    fukuan: function() {
      if (this.act == 1) {
        this.show = true;
      } else {
        Dialog.alert({
          title: "提示",
          message: "暂未开放"
        });
        // this.weixin();
      }
    },
    // 微信支付
    weixin: function() {
      if (this.upgrade) {
        var is_upgrade = this.is_upgrade;
      } else {
        var is_upgrade = this.$route.query.is_upgrade;
      }
      this.$api.post(
        "course/buy",
        {
          token: storage.get("token"),
          uid: storage.get("uid")
        },
        {
          gid: this.shopid,
          aid: this.addressid,
          pay_type: 1,
          num: this.nums,
          paypass: this.value,
          is_upgrade: is_upgrade,
          remark: this.message
        },
        ret => {
          var _this = this;
          console.log(ret);
          if (ret.code == 1) {
            WeixinJSBridge.invoke(
              "getBrandWCPayRequest",
              {
                appId: ret.data.appId,
                timeStamp: "" + ret.data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                nonceStr: ret.data.nonceStr, // 支付签名随机串，不长于 32 位
                package: ret.data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                signType: ret.data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                paySign: ret.data.paySign // 支付签名
              },
              function(res) {
                if (res.err_msg == "get_brand_wcpay_request:ok") {
                  Dialog.alert({
                    title: "提示",
                    message: "支付成功"
                  }).then(() => {
                    _this.$router.push("./order");
                  });
                  // 使用以上方式判断前端返回,微信团队郑重提示：
                  //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                  Dialog.alert({
                    title: "提示",
                    message: "支付取消"
                  });
                } else if (res.err_msg == "get_brand_wcpay_request:fail") {
                  Dialog.alert({
                    title: "提示",
                    message: "支付失败"
                  });
                }
              }
            );
          } else {
            Dialog.alert({
              title: "提示",
              message: ret.msg
            });
          }
        }
      );
    },
    tianjia: function() {
      //    Toast.loading({
      //                 message: '加载中...',
      //                 forbidClick: true,
      //                 duration: 300
      //       });
      console.log(this.buy);
      console.log(this.upgrade);
      this.$router.push({
        path: "./dizhi2",
        query: {
          shopid: this.shopid,
          act: this.act,
          ive: this.ive,
          nums: this.nums,
          is_buy: this.is_buy,
          is_upgrade: this.is_upgrade
        }
      });
    },
    goback: function() {
      if (this.$route.query.hh == 1) {
        this.$router.push({
          path: "./shopxingqing",
          query: {
            id: this.shopid
          }
        });
      } else {
        this.$router.push({
          path: "./shopxingqing2",
          query: {
            id: this.shopid
          }
        });
      }
    }
  },
  mounted() {
    this.shop();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.head {
  width: 100%;
  font-size: 0.18rem;
  line-height: 0.49rem;
  text-align: center;
  background: #fff;
  color: #333333;
  /* position: fixed;
  left: 0;
  top: 0; */
  z-index: 1000;
}

.head .head_box {
  width: 100%;
  line-height: 0.49rem;
  box-sizing: border-box;
  padding: 0 5%;
  position: absolute;
  top: 0;
  left: 0;
}
.imgs {
  position: absolute;
  top: 0;
  right: 0.15rem;
}
.head .head_box img {
  height: 0.18rem;
  width: auto;
  margin: 0.15rem 0;
}
.img_f {
  height: 0.14rem;
}
.heads {
  margin-bottom: 0.1rem;
}
.dizhi {
  background: #fff;
  padding: 0.15rem;
}
.dizhi .imgages {
  height: 0.17rem;
}
.dizhi .imgages img {
  height: 100%;
  width: auto;
}
.weizhi {
  margin-left: 0.08rem;
  width: 90%;
}
.wei {
  font-size: 0.15rem;
  color: #333;
}
.wei span {
  color: #ff4d4f;
}
.zhi {
  font-size: 0.12rem;
  color: #666666;
}
.shop {
  height: 0.4rem;
  width: 100%;
  box-sizing: border-box;
  padding: 0 0.15rem;
  line-height: 0.4rem;
  font-size: 0.15rem;
  color: #333;
  background: #fff;
  margin-top: 0.1rem;
}
.fang {
  background: #fff;
  margin-top: 0.1rem;
  padding: 0 0.15rem;
  width: 100%;
  box-sizing: border-box;
}
.box {
  height: 0.5rem;
  background: #fff;
  border-bottom: 1px solid #f2f2f2;
}
.fang p {
  font-size: 0.12rem;
  color: #333;
  line-height: 0.5rem;
}
.fang .img img {
  height: 0.3rem;
  width: auto;
  margin-top: 0.1rem;
  margin-right: 0.1rem;
}
.fang .imgss img {
  height: 0.2rem;
  width: auto;
  margin-top: 0.15rem;
}
.footer {
  background: #e01212;
  height: 0.5rem;
  color: #fff;
  font-size: 0.14rem;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  text-align: center;
  line-height: 0.5rem;
}
.cha {
  height: 0.2rem;
  width: 0.2rem;
  font-size: 0.2rem;
  color: #999;
  margin-bottom: 0.2rem;
  margin-left: 0.2rem;
}
.common-part {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #000000;
  /*父块透明，子块不透明，用rgba*/
  background: rgba(0, 0, 0, 0.3);
}
.common-dialog {
  width: 80%;
  text-align: center;
  position: absolute;
  background: #ffffff;
  z-index: 2;
  opacity: 1;
  border-radius: 0.05rem;
}
.dialog-title {
  width: 100%;
  height: 0.36rem;
  line-height: 0.36rem;
  color: #fff;
  font-size: 0.18rem;
  background: #d3af80;
  border-radius: 0.05rem;
  position: relative;
}
.dialog-title img {
  height: 0.18rem;
  width: auto;
  position: absolute;
  right: 0.1rem;
  top: 0.09rem;
}
.pay-amount {
  font-size: 0.12rem;
  padding-top: 0.15rem;
}
.pay-fee {
  font-size: 0.12rem;
  color: #ccc;
}
.pay-money {
  color: #333333;
  font-size: 0.16rem;
  margin: 0.12rem 0;
  font-weight: bold;
}
.pay-password {
  width: 100%;
  box-sizing: border-box;
  height: 0.32rem;
  margin: 0 auto;
  margin-top: 0.2rem;
  position: relative;
}
.pay-password .real-ipt {
  position: absolute;
  top: 0;
  left: -100%;
  width: 200%;
  height: 0.32rem;
  line-height: 0.32rem;
  opacity: 0;
  z-index: 100;
  text-indent: 0;
}
.pay-password .surface-ipts {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 0.4rem;
  line-height: 0.32rem;
  z-index: 1;
  overflow: hidden;
}
.pay-password .surface-ipts .surface-ipt {
  padding: 0 0.1rem;
  height: 0.32rem;
  line-height: 0.32rem;
  display: flex;
  justify-content: space-between;
}
.pay-password .surface-ipts .surface-ipt input {
  width: 0.32rem;
  height: 0.32rem;
  line-height: 0.32rem;
  border: 1px solid #ccc;
  color: #333333;
  font-size: 0.1rem;
  text-align: center;
  padding: 0;
}
.pay-part .btns {
  margin: 0.15rem 0;
  margin-top: 0.3rem;
}
.confirm-btn {
  display: inline-block;
  padding: 0.05rem 0.14rem;
  line-height: 0.28rem;
  color: #ffffff;
  font-size: 0.16rem;
  border: none;
  margin: 0 auto;
  background: #d3af80;
  border-radius: 0.05rem;
  margin-top: 0.3rem;
}
.layui-form {
  margin-right: 0.15rem;
}
.layui-form-item {
  margin-bottom: 0;
}
.layui-form-switch {
  margin-top: 10px;
  padding: 0;
  min-width: 50px;
}
</style>
