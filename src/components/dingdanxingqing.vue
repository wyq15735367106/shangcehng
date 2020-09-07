<template>
  <div class="dingdanxigqing">
    <!-- 轮播图 -->
    <app-header :name="namess" :image="image" class="heads"></app-header>
    <!-- 商品信息 -->
    <div class="shop">
      <p>商品信息</p>
    </div>
    <van-card :num="num" :price="price" :title="name" :thumb="cover" />
    <!-- 订单编号 -->
    <div class="boxs">
      <div class="box cl">
        <p class="fl num">订单编号：</p>
        <p class="fl nums">{{order_id}}</p>
      </div>
      <div class="box cl">
        <p class="fl num">下单时间：</p>
        <p class="fl nums">{{created_at}}</p>
      </div>
      <div class="box cl">
        <p class="fl num">交易状态：</p>
        <p class="fl nums" v-if="state==2">待发货</p>
        <p class="fl nums" v-else-if="state==3">待收货</p>
        <p class="fl nums" v-else-if="state==4">已完成</p>
      </div>
    </div>
    <!-- 收或信息 -->
    <div class="shop" style="margin-top:0.1rem">
      <p>收货信息</p>
    </div>
    <div class="boxs" style="margin-top:1px">
      <div class="box cl">
        <p class="fl num">收货人：</p>
        <p class="fl nums">{{adressname}}</p>
      </div>
      <div class="box cl">
        <p class="fl num">联系电话：</p>
        <p class="fl nums">{{phone}}</p>
      </div>
      <div class="box cl">
        <p class="fl num">收货地址：</p>
        <p class="fl nums">{{province}}{{city}}{{county}}{{address}}</p>
      </div>
    </div>
    <!-- 发货信息 -->
    <div class="shop" style="margin-top:0.1rem" v-if="state==3||state==4">
      <p>发货信息</p>
    </div>
    <div class="boxs" style="margin-top:1px" v-if="state==3||state==4">
      <div class="box cl">
        <p class="fl num">物流公司：</p>
        <p class="fl nums">{{faname}}</p>
      </div>
      <div class="box cl">
        <p class="fl num">快递单号：</p>
        <p class="fl nums">{{faphone}}</p>
      </div>
      <!-- <div class="box cl">
        <p class="fl num">发货地址：</p>
        <p class="fl nums">{{faaddress}}</p>
      </div> -->
    </div>
    <div class="shou" v-if="state==3">
      <p @click="fukuan">确认收货</p>
    </div>

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
  </div>
</template>

<script>
import storage from "good-storage";
import Header from "../components/Header";
import { Card } from "vant";
import { Field } from "vant";
import { Dialog } from "vant";
import { Toast } from "vant";
export default {
  components: {
    "app-header": Header
  },
  data() {
    return {
      namess: "订单详情",
      image: require("../../static/image/left.png"),
      num: "",
      order_id: "",
      cover: "",
      name: "",
      price: "",
      state: "",
      created_at: "",
      adressname: "",
      phone: "",
      city: "",
      province: "",
      county: "",
      address: "",
      faname: "",
      faphone: "",
      faaddress: "",
      hidessssss: false,
      hidesss: false,
      hides: false,
      show: false,
      showKeyboard: true,
      value: "",
      closeonclickoverlay: false
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
      if (this.value == "") {
      }
    },
    fukuan: function() {
      this.show = true;
    },
    guan1: function() {
      console.log(1);
      this.value = "";
    },
    guan2() {
      // this.value=''
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
        this.$api.post(
          "order/harvest",
          {
            token: storage.get("token"),
            uid: storage.get("uid")
          },
          {
            id: this.$route.query.id,
            paypass: this.value
          },
          ret => {
            console.log(ret);
            //   Toast.loading({
            //         message: '加载中...',
            //         forbidClick: true,
            //         duration: 300
            //     });
            if (ret.code == 1) {
              Dialog.alert({
                    title: '提示',
                    message: ret.msg,
                  }).then(() => {
                    // on close
                      this.$router.push("./order")
                  }); 

            } else {
              Dialog.alert({
                title: "提示",
                message: ret.msg
              });
            }
          }
        );
      }
    },

    order: function() {
      console.log(1)
      this.$api.get(
        "order/detail/" + this.$route.query.id,
        {
          token: storage.get("token"),
          uid: storage.get("uid")
        },
        {},
        ret => {
            // Toast.loading({
            //         message: '加载中...',
            //         forbidClick: true,
            //         duration: 300
            //     });
                if(ret.code==1){
                       this.num = ret.data.order.num;
          this.order_id = ret.data.order.order_id;
          this.cover = ret.data.order.cover;
          this.name = ret.data.order.name;
          this.price = ret.data.order.price;
          this.state = ret.data.order.state;
          this.created_at = ret.data.order.created_at;
          this.adressname = ret.data.order.address_info.name;
          this.phone = ret.data.order.address_info.phone;
          this.province = ret.data.order.address_info.province;
          this.city = ret.data.order.address_info.city;
          this.county = ret.data.order.address_info.county;
          this.address = ret.data.order.address_info.address;
          this.faname = ret.data.order.deliver_info.name;
          this.faphone = ret.data.order.deliver_info.phone;
          this.faaddress = ret.data.order.deliver_info.address;
                } 
          console.log(ret);
       
        }
      );
    },
    cha: function() {
      this.show = false;
      this.value = "";
    },
    que: function() {
      this.show = true;
    }
  },
  mounted() {
    this.order();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.dingdanxigqing {
  padding-top: 0.6rem;
}
.heads {
  position: fixed;
  top: 0;
  left: 0;
}
.shop {
  background: #fff;
  padding: 0 0.15rem;
  height: 0.35rem;
  line-height: 0.35rem;
  color: #333;
  font-size: 0.13rem;
}
.boxs {
  background: #fff;
  padding: 0.1rem 0.15rem;
  margin-top: 0.1rem;
}
.box {
  height: 0.2rem;
  line-height: 0.2rem;
  color: #868686;
  font-size: 0.13rem;
}
.num {
  width: 20%;
}
.shou {
  height: 0.5rem;
  width: 100%;
  background: #e01212;
  position: fixed;
  bottom: 0;
  left: 0;
}
.shou p {
  font-size: 0.15rem;
  line-height: 0.5rem;
  color: #fff;
  text-align: center;
}
.cha {
  height: 0.2rem;
  width: 0.2rem;
  font-size: 0.2rem;
  color: #999;
  margin-bottom: 0.2rem;
  margin-left: 0.2rem;
}
</style>