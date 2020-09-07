<template>
  <div class="shopxigqing2">
    <!-- 轮播图 -->
       <div class="head">
    <p>{{name}}</p>
    <div class="head_box">
      <div style="padding:0;margin:0;width:0.25rem;" @click="goback">
        <img :src="image" alt="" class="img_f">
      </div>
    </div>
  </div>
    <div class="banner">
      <div class="swiper-container bac">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="item in banners" :key="item">
            <img :src="item" alt />
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>
    <!-- 介绍 -->
    <div class="center">
      <p class="title van-multi-ellipsis--l2">{{names}}</p>
      <div class="price cl">
          <p class="qian fl">¥{{price}}</p>
          <div class="img fr" v-if="level==4">
            <img src="../../static/image/WechatIMG8.png" alt />
          </div>
          <div class="img fr" v-if="level==1">
            <img src="../../static/image/LA1.png" alt />
          </div>
          <div class="img fr" v-if="level==2">
            <img src="../../static/image/LA2.png" alt />
          </div>
          <div class="img fr" v-if="level==3">
            <img src="../../static/image/LA3.png" alt />
          </div>
        </div>
      </div>
          <div style="padding-bottom:0.5rem">
            <div class="jieshao" v-for="val in detail" :key="val">
                <img :src="val" alt="">
            </div>
        </div>
        <!-- 底部 -->
        <div class="footer">
          <!-- <p @click="fukuan">立即购买</p> -->
          <van-stepper v-model="value" disable-input />
          <p class="mai" @click="fukuan">立即购买</p>
        </div>
    </div>
</template>

<script>
import { Stepper } from 'vant';
import Swiper from "swiper";
import Header from "../components/Header";
import storage from 'good-storage'
import { Toast } from "vant";
export default {
  components: {
    "app-header": Header
  },
  data() {
    return {
      name: "商品详情",
      image: require("../../static/image/left.png"),
      banners: [],
      detail:[],
      level: '',
      names:'',
      price:'',
      shopid:'',
      is_upgrade:'',
      is_buy:'',
      value:''
    };
  },
  methods: {
  getbanner: function() {
      this.$nextTick(() => {
        this.banner();
      });
    },  
    banner: function() {
      var swiper = new Swiper(".bac", {
        pagination: {
          el: ".swiper-pagination",
          type: "fraction"
        },
        observer: true,
        loop: true
      })
    },
    fukuan:function(){
      console.log()
        this.$router.push({
          path: './fukuan',
          query: { 
            id: this.shopid,
            is_buy:this.is_buy,
            is_upgrade:this.is_upgrade,
            num:this.value,
            hhh:2
          }
        })
            // Toast.loading({
            //     message: '加载中...',
            //     forbidClick: true,
            //     duration: 300
            // });
    },
    shop:function(){
              this.$api.get(
        "course/detail/"+this.$route.query.id,
        {
          token: storage.get('token'),
        uid: storage.get('uid'),
        },
        {},
        ret => {
          console.log(ret);
         this.banners=ret.data.slide
         this.detail=ret.data.detail
          this.price=ret.data.price
         this.names=ret.data.name
         this.level=ret.data.level
         this.shopid=ret.data.id
         this.is_upgrade=ret.data.is_upgrade
         this.is_buy=ret.data.is_buy
        }
      )
    },
    goback:function(){
      this.$router.push("./home")
    }
  },
  mounted() {
    this.getbanner()
    this.shop()
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.shopxigqing2 {
  padding-top: 0.49rem;
}
.heads {
  position: fixed;
  top: 0;
  left: 0;
}
/* 轮播 */
.swiper-slide {
  width: 100%;
}
.swiper-slide img {
  height: 100%;
  width: 100%;
}
.banner {
  width: 100%;
  height: 3.75rem;
  margin: 0 auto;
  overflow: hidden;
}
.banner img {
  height: 100%;
  width: 100%;
}
.banner .swiper-pagination-bullet-active {
  background: #fff !important;
}
.banner .swiper-pagination-bullet {
  width: 6px;
  height: 6px;
  display: inline-block;
  border-radius: 100%;
  background: none;
  opacity: 1;
  border: 1px solid #fff;
}
.banner img {
  height: 100%;
  width: 100%;
}
.swiper-container-horizontal > .swiper-pagination-bullets,
.swiper-pagination-custom,
.swiper-pagination-fraction {
  left: 85%;
  background: rgba(0, 0, 0, 1);
  opacity: 0.5;
  width: 0.4rem;
  height: 0.16rem;
  line-height: 0.17rem;
  border-radius: 0.1rem;
  color: #fff;
  padding: 0.01rem 0.05rem;
}
.center {
  background: #fff;
  width: 100%;
  box-sizing: border-box;
  padding: 0.13rem 0.15rem;
}
.title {
  font-size: 0.14rem;
  color: #333333;
  line-height: 0.2rem;
}
.price{
  font-size: 0.16rem;
  color: #E01212;
  height: 0.2rem;
  line-height: 0.2rem;
  margin-top: 0.1rem
}
.price img{
 height: 0.14rem;
 width: auto;
 margin-top: 0.03rem
}
.jieshao img{
  height:auto;
  width: 100%;
  display: block;
}
.footer{
  background:#FFF;
  height: 0.5rem;
  color: #fff;
  font-size: 0.14rem;
  width: 100%;
  position:fixed;
  bottom: 0;
  left: 0;
  line-height: 0.5rem;
  border-top: 1px solid #ededed
}
.fukuan1{
  background: #ABABAB;
  color: #fff
}
.mai{
    position: absolute;
    background: #E01212;
    height: 0.3rem;
    width:1.75rem;
    border-radius: 0.3rem;
    right: 0.15rem;
    top: 0.1rem;
    color: #FFF;
    text-align: center;
    line-height: 0.3rem;
    font-size: 0.14rem
}
.head {
  width: 100%;
  font-size: 0.18rem;
  line-height: 0.49rem;
  text-align: center;
  background: #fff;
  color: #333333;
  position: fixed;
  left: 0;
  top: 0;
  z-index:1000;
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
</style>