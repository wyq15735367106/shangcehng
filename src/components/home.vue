<template>
  <div class="helllo">
    <!-- 轮播图 -->
    <div class="banner">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item, index) in banners" :key="index">
            <img :src="item.cover" alt @click="tiao(item.type, item.content)" />
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>
    <!-- 公告 -->
    <!-- <van-notice-bar
      @click="notice"
      :text="text"
      color="#ABABAB"
      background="#fff"
      left-icon="../../static/image/gaokaobei.png"
      mode="link"
    />-->

    <!-- 切换 -->
    <div class="tabbar cl" style="margin-top:0.1rem">
      <p class="te fl" v-for="(item, index) in all" :key="index">
        <span
          class="tebs"
          :class="active == index ? 'activeClass' : ''"
          @click="change(index)"
        >{{ item.allName }}</span>
      </p>
    </div>
    <div style="backgroun:#ff;padding-bottom:0.5rem;">
      <div class="goods cl">
        <div class="good fl" v-for="(item, index) in goods" :key="index">
          <div class="bookimg" v-if="active == 0">
            <img :src="item.cover" @click="shop(item.id)" />
          </div>
          <div class="bookimg" v-else>
            <img :src="item.cover" @click="shops(item.id)" />
          </div>

          <div class="title" v-if="active == 0">
            <p class="titles van-multi-ellipsis--l2" @click="shop(item.id)">{{ item.name }}</p>
          </div>
          <div class="title" v-else>
            <p class="titles van-multi-ellipsis--l2" @click="shops(item.id)">{{ item.name }}</p>
          </div>
          <div class="price cl">
            <p class="qian fl">¥{{ item.price }}</p>
            <div class="img fr" v-if="item.level == 4">
              <img src="../../static/image/WechatIMG8.png" alt />
            </div>
            <div class="img fr" v-if="item.level == 1">
              <img src="../../static/image/LA1.png" alt />
            </div>
            <div class="img fr" v-if="item.level == 2">
              <img src="../../static/image/LA2.png" alt />
            </div>
            <div class="img fr" v-if="item.level == 3">
              <img src="../../static/image/LA3.png" alt />
            </div>
          </div>
        </div>
      </div>
    </div>
    <app-bottom></app-bottom>
  </div>
</template>

<script>
import storage from "good-storage";
import { Toast } from "vant";
import { List } from "vant";
import { NoticeBar } from "vant";
import Tabbar from "../components/Tabbar";
import Swiper from "swiper";
export default {
  components: {
    "app-bottom": Tabbar,
  },
  data() {
    return {
      banners: [],
      text: "",
      all: [
        { allName: "爆品区" },
        { allName: "复购区" },
        { allName: "优品区" },
      ],
      active: 0,
      goods: [],
      noticeid: "",
    };
  },
  methods: {
    getbanner: function () {
      this.$nextTick(() => {
        this.banner();
      });
    },
    // 公告详情
    notice: function () {
      this.$router.push({
        path: "./gonggaoxingqing",
        query: { id: this.noticeid },
      });
    },
    banner: function () {
      console.log(storage.get("token"));
      this.$api.get(
        "course/slide",
        {
          token: storage.get("token"),
          uid: storage.get("uid"),
        },
        {},
        (ret) => {
          console.log(ret);
          if (ret.code == "1") {
            this.banners = ret.data.slide;
            this.text = ret.data.notice.title;
            this.noticeid = ret.data.notice.id;
          }
        }
      );
      var swiper = new Swiper(".swiper-container", {
        pagination: {
          el: ".swiper-pagination",
        },
        observer: true,
        loop: true,
        // spaceBetween: 10
      });
    },
    // 商品
    goodshop: function () {
      this.$api.get(
        "course/list/" + 1,
        {
          token: storage.get("token"),
          uid: storage.get("uid"),
        },
        {},
        (ret) => {
          console.log(ret);
          if (ret.code == 1) {
            //  Toast.loading({
            //         message: '加载中...',
            //         forbidClick: true,
            //         duration: 300
            //     });
            this.goods = ret.data;
          }
        }
      );
    },
    change: function (index) {
      this.active = index;
      if (index == 1) {
        this.$api.get(
          "course/list/" + 2,
          {
            token: storage.get("token"),
            uid: storage.get("uid"),
          },
          {},
          (ret) => {
            console.log(ret);
            this.goods = ret.data;
          }
        );
      } else if (index == 0) {
        this.$api.get(
          "course/list/" + 1,
          {
            token: storage.get("token"),
            uid: storage.get("uid"),
          },
          {},
          (ret) => {
            console.log(ret);
            this.goods = ret.data;
          }
        );
      } else if (index == 2) {
        this.$api.get(
          "course/list/" + 3,
          {
            token: storage.get("token"),
            uid: storage.get("uid"),
          },
          {},
          (ret) => {
            console.log(ret);
            this.goods = ret.data;
          }
        );
      }
    },
    tiao: function (type, id) {
      console.log(type);
      if (type == 1) {
        // 公告

        this.$router.push({
          path: "./gonggaoxingqing",
          query: { id: id },
        });
      } else {
        this.$router.push({
          path: "./shopxingqing",
          query: { id: id },
        });
      }
    },
    // 商品详情
    shop: function (id) {
      this.$router.push({
        path: "./shopxingqing",
        query: { id: id },
      });
    },
    shops: function (id) {
      this.$router.push({
        path: "./shopxingqing2",
        query: { id: id },
      });
    },
  },
  mounted() {
    this.getbanner();
    this.goodshop();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.helllo {
  height: 100vh;
  width: 100vw;
  background: #fff;
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
  width: 94%;
  margin: 0 auto;
  border-radius: 0.1rem;
  overflow: hidden;
  padding-top: 0.1rem;
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
  height: 1.6rem;
  width: 100%;
}
.tabbar {
  width: 100%;
  height: 0.3rem;
  background: #fff;
  line-height: 0.3rem;
  box-shadow: 1px 1px 1px #e1f8ff;
}
.tebs {
  font-size: 0.13rem;
  color: #333333;
  display: block;
  margin: 0 0.1rem;
}
.activeClass {
  font-size: 0.13rem;
  color: #0497f4;
  /* font-weight: 500; */
  border-bottom: 1px solid #0497f4;
}
.goods {
  box-sizing: border-box;
  background: #fff;
  width: 100%;
  margin-top: 1px;
  padding-top: 0.1rem;
}
.good {
  width: 45.5%;
  margin: 0 2%;
  margin-bottom: 0.15rem;
  border: 1px solid #e1f8ff;
  border-radius: 0.08rem;
  overflow: hidden;
}
.bookimg {
  width: 100%;
  margin: 0 auto;
  height: 1.15rem;
}
.bookimg img {
  height: 100%;
  width: 100%;
}
.titles {
  box-sizing: border-box;
  padding: 0.05rem 0.1rem;
  background: #e1f8ff;
  height: 0.35rem;
}
.title {
  font-size: 0.13rem;
  color: #333333;
  line-height: 0.15rem;
}
.price {
  box-sizing: border-box;
  background: #e1f8ff;
  padding: 0.05rem 0.1rem;
}
.qian {
  font-size: 0.18rem;
  color: #ff5a5f;
}
.img {
  height: 0.13rem;
  width: auto;
  margin-top: 0.06rem;
}
.img img {
  height: 100%;
  width: auto;
}
.goods .good:nth-child(2n) {
  margin-right: 0;
}
</style>
