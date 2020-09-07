<template>
  <div class="my">
    <div class="bac cl">
      <div class="pic fl">
        <img :src="cover" alt />
      </div>
      <div class="fl name">
        <div class="fl names">{{ nickname }}</div>
        <div class="fl vip" v-if="level == 0">
          <img src="../../static/image/WechatIMG8.png" alt />
        </div>
        <div class="fl vip" v-if="level == 1">
          <img src="../../static/image/LA1.png" alt />
        </div>
        <div class="fl vip" v-if="level == 2">
          <img src="../../static/image/LA2.png" alt />
        </div>
        <div class="fl vip" v-if="level == 3">
          <img src="../../static/image/LA3.png" alt />
        </div>
        <div class="fl vip" v-if="level == 4">
          <img src="../../static/image/WechatIMG8.png" alt />
        </div>
        <p class="tel" style="margin-top:0.25rem">{{ username }}</p>
      </div>
    </div>
    <!-- 列表 -->
    <div class="list">
      <van-grid :icon-size="50" :border="border">
        <van-grid-item
          icon="../../static/image/qianbao.png"
          text="我的钱包"
          @click="qianbao"
        />
        <van-grid-item
          icon="../../static/image/shequ.png"
          text="我的社区"
          @click="shequ"
        />
        <van-grid-item
          icon="../../static/image/yaoqinghaoyou.png"
          text="邀请码"
          @click="yaoqing"
        />
        <van-grid-item
          icon="../../static/image/gonggao.png"
          text="公告"
          @click="gonggao"
        />
      </van-grid>
    </div>
    <!-- 导航 -->
    <div class="box">
      <div class="bang cl" @click="bang">
        <div class="imgs fl">
          <img src="../../static/image/3.png" alt="" />
        </div>
        <p class="zhu fl">帮助中心</p>
        <div class="imgss fr">
          <img src="../../static/image/right.png" alt="" />
        </div>
      </div>
      <div class="bang cl" @click="dizhi">
        <div class="imgs fl">
          <img src="../../static/image/2.png" alt="" />
        </div>
        <p class="zhu fl">收货地址</p>
        <div class="imgss fr">
          <img src="../../static/image/right.png" alt="" />
        </div>
      </div>
      <div class="bang cl" @click="fankui">
        <div class="imgs fl">
          <img src="../../static/image/1.png" alt="" />
        </div>
        <p class="zhu fl">我要反馈</p>
        <div class="imgss fr">
          <img src="../../static/image/right.png" alt="" />
        </div>
      </div>
      <div class="bang cl" @click="shiming">
        <div class="imgs fl">
          <img src="../../static/image/WechatIMG6.png" alt="" />
        </div>
        <p class="zhu fl">实名认证</p>
        <div class="imgss fr">
          <img src="../../static/image/right.png" alt="" />
        </div>
      </div>
      <div class="bang cl" @click="shezhi">
        <div class="imgs fl">
          <img src="../../static/image/4.png" alt="" />
        </div>
        <p class="zhu fl">设置</p>
        <div class="imgss fr">
          <img src="../../static/image/right.png" alt="" />
        </div>
      </div>
    </div>

    <app-bottom></app-bottom>
  </div>
</template>

<script>
import storage from "good-storage";
import { Grid, GridItem } from "vant";
import { Tab, Tabs } from "vant";
import { Toast } from "vant";
import Tabbar from "../components/Tabbar";
export default {
  components: {
    "app-bottom": Tabbar
  },
  data() {
    return {
      nickname: "",
      username: "",
      cover: "",
      active: 0,
      sticky: true,
      list: [],
      border: false,
      level: "",
      user: "",
      phone: ""
    };
  },
  methods: {
    bang: function() {
      this.$router.push("./bangzhu");
      // Toast.loading({
      //     message: '加载中...',
      //     forbidClick: true,
      //     duration: 300
      // });
    },
    gonggao: function() {
      this.$router.push("./gonggao");
      // Toast.loading({
      //     message: '加载中...',
      //     forbidClick: true,
      //     duration: 300
      // });
    },
    qianbao: function() {
      this.$router.push("./qianbao");
      // Toast.loading({
      //     message: '加载中...',
      //     forbidClick: true,
      //     duration: 300
      // });
    },
    shequ: function() {
      this.$router.push("./shequ");
      // Toast.loading({
      //     message: '加载中...',
      //     forbidClick: true,
      //     duration: 300
      // });
    },
    dizhi: function() {
      this.$router.push("./dizhi");
      // Toast.loading({
      //     message: '加载中...',
      //     forbidClick: true,
      //     duration: 300
      // });
    },
    fankui: function() {
      // Toast.loading({
      //         message: '加载中...',
      //         forbidClick: true,
      //         duration: 300
      //     });
      this.$router.push("./fankui");
    },
    yaoqing: function() {
      // Toast.loading({
      //         message: '加载中...',
      //         forbidClick: true,
      //         duration: 300
      //     });
      this.$router.push("./yaoqing");
    },
    shezhi: function() {
      this.$router.push({
        path: "./shezhi",
        query: { phone: this.phone }
      });
    },
    shiming: function() {
      this.$router.push("./shiming");
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
          // Toast.loading({
          //         message: '加载中...',
          //         forbidClick: true,
          //         duration: 300
          //     });
          if (ret.code == "1") {
            this.nickname = ret.data.user.nickname;
            this.cover = ret.data.user.cover;
            this.username = ret.data.user.username;
            this.phone = ret.data.user.phone;
            this.level = ret.data.user.level;
            console.log(ret.data.user.level);
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
.bac {
  width: 100%;
  height: 2.9rem;
  background: url("../../static/image/back.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 0.4rem 0.15rem 0;
  box-sizing: border-box;
}
.pic {
  height: 0.6rem;
  width: 0.6rem;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 0.1rem;
}
.pic img {
  height: 100%;
  width: auto;
  margin: 0 auto;
}
.name {
  margin-top: 0.1rem;
}
.names {
  font-size: 0.16rem;
  color: #333333;
  line-height: 0.2rem;
}
.vip {
  height: 0.15rem;
  margin-top: 0.025rem;
}
.vip img {
  height: 100%;
  width: auto;
  margin-left: 0.1rem;
}
.tel {
  font-size: 0.14rem;
  color: #333333;
  line-height: 0.2rem;
  margin-top: 0.15rem;
}
.list {
  width: 92%;
  margin: 0 auto;
  margin-top: -1.5rem;
  border-radius: 0.05rem;
  overflow: hidden;
  box-shadow: 1px 1px 10px #e6e6e6;
}
.box {
  margin: 0 auto;
  width: 92%;
  margin-top: 0.2rem;
  border-radius: 0.05rem;
  box-shadow: 1px 1px 10px #f7f7f7;
  background: #fff;
  box-shadow: 1px 1px 10px #e6e6e6;
}
.bang {
  height: 0.5rem;
  line-height: 0.5rem;
  padding: 0 0.15rem;
  box-sizing: border-box;
  font-size: 0.14rem;
  color: #333333;
  border-bottom: 1px solid #e6e6e6;
}
.bang p {
  line-height: 0.5rem;
}
.imgs img {
  height: 0.2rem;
  width: auto;
  margin-top: 0.15rem;
}
.imgss img {
  height: 0.1rem;
  width: auto;
  margin-top: 0.2rem;
}
.zhu {
  margin-left: 0.1rem;
}
</style>
