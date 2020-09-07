<template>
  <div class="order">
    <van-tabs
      v-model="active"
      color="#0497F4"
      background="#FFFFFF"
      title-active-color="#0497F4"
      title-inactive-color="#797979"
      :sticky="sticky"
      @click="onClick"
    >
      <van-tab title="全部">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text=""
          @load="onLoad"
          :offset="100"
        >
          <div class="box" v-for="(val, index) in list" :key="index">
            <div class="time cl">
              <div class="img fl">
                <img src="../../static/image/time.png" alt="" />
              </div>
              <p class="times fl">{{ val.created_at }}</p>
            </div>
            <div class="center cl">
              <div class="imgs fl">
                <img :src="val.cover" alt="" @click="dingdan(val.id)" />
              </div>
              <div class="cen fl">
                <p class="name van-multi-ellipsis--l2" @click="dingdan(val.id)">
                  {{ val.name }}
                </p>
                <div class="num cl">
                  <p class="fl">数量：{{ val.num }}</p>
                  <p class="fr">实付：￥{{ val.price }}</p>
                </div>
              </div>
            </div>
            <div class="nums cl">
              <p class="fl" v-if="val.state == 1">待付款</p>
              <p class="fl" v-else-if="val.state == 2">待发货</p>
              <p class="fl" v-else-if="val.state == 3">待收货</p>
              <p class="fl" v-else-if="val.state == 4">已完成</p>
              <p class="fr dan" @click="dingdan(val.id)">查看订单</p>
            </div>
          </div>
        </van-list>
      </van-tab>
      <van-tab title="待发货">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text=""
          @load="onLoad1"
          :offset="100"
        >
          <div class="box" v-for="(val, index) in list1" :key="index">
            <div class="time cl">
              <div class="img fl">
                <img src="../../static/image/time.png" alt="" />
              </div>
              <p class="times fl">{{ val.created_at }}</p>
            </div>
            <div class="center cl">
              <div class="imgs fl">
                <img :src="val.cover" alt="" @click="dingdan(val.id)" />
              </div>
              <div class="cen fl">
                <p class="name van-multi-ellipsis--l2" @click="dingdan(val.id)">
                  {{ val.name }}
                </p>
                <div class="num cl">
                  <p class="fl">数量：{{ val.num }}</p>
                  <p class="fr">实付：￥{{ val.price }}</p>
                </div>
              </div>
            </div>
            <div class="nums cl">
              <p class="fl" v-if="val.state == 1">待付款</p>
              <p class="fl" v-else-if="val.state == 2">待发货</p>
              <p class="fl" v-else-if="val.state == 3">待收货</p>
              <p class="fl" v-else-if="val.state == 4">已完成</p>
              <p class="fr dan" @click="dingdan(val.id)">查看订单</p>
            </div>
          </div>
        </van-list>
      </van-tab>
      <van-tab title="待收货">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text=""
          @load="onLoad2"
          :offset="100"
        >
          <div class="box" v-for="(val, index) in list2" :key="index">
            <div class="time cl">
              <div class="img fl">
                <img src="../../static/image/time.png" alt="" />
              </div>
              <p class="times fl">{{ val.created_at }}</p>
            </div>
            <div class="center cl">
              <div class="imgs fl">
                <img :src="val.cover" alt="" @click="dingdan(val.id)" />
              </div>
              <div class="cen fl">
                <p class="name van-multi-ellipsis--l2" @click="dingdan(val.id)">
                  {{ val.name }}
                </p>
                <div class="num cl">
                  <p class="fl">数量：{{ val.num }}</p>
                  <p class="fr">实付：￥{{ val.price }}</p>
                </div>
              </div>
            </div>
            <div class="nums cl">
              <p class="fl" v-if="val.state == 1">待付款</p>
              <p class="fl" v-else-if="val.state == 2">待发货</p>
              <p class="fl" v-else-if="val.state == 3">待收货</p>
              <p class="fl" v-else-if="val.state == 4">已完成</p>
              <p class="fr dan" @click="dingdan(val.id)">查看订单</p>
            </div>
          </div>
        </van-list>
      </van-tab>
      <van-tab title="已完成">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text=""
          @load="onLoad3"
          :offset="100"
        >
          <div class="box" v-for="(val, index) in list3" :key="index">
            <div class="time cl">
              <div class="img fl">
                <img src="../../static/image/time.png" alt="" />
              </div>
              <p class="times fl">{{ val.created_at }}</p>
            </div>
            <div class="center cl">
              <div class="imgs fl">
                <img :src="val.cover" alt="" @click="dingdan(val.id)" />
              </div>
              <div class="cen fl">
                <p class="name van-multi-ellipsis--l2" @click="dingdan(id)">
                  {{ val.name }}
                </p>
                <div class="num cl">
                  <p class="fl">数量：{{ val.num }}</p>
                  <p class="fr">实付：￥{{ val.price }}</p>
                </div>
              </div>
            </div>
            <div class="nums cl">
              <p class="fl" v-if="val.state == 1">待付款</p>
              <p class="fl" v-else-if="val.state == 2">待发货</p>
              <p class="fl" v-else-if="val.state == 3">待收货</p>
              <p class="fl" v-else-if="val.state == 4">已完成</p>
              <p class="fr dan" @click="dingdan(val.id)">查看订单</p>
            </div>
          </div>
        </van-list>
      </van-tab>
    </van-tabs>
    <app-bottom></app-bottom>
  </div>
</template>

<script>
import { List } from "vant";
import storage from "good-storage";
import { Toast } from "vant";
import { Tab, Tabs } from "vant";
import Tabbar from "../components/Tabbar";
export default {
  components: {
    "app-bottom": Tabbar
  },
  data() {
    return {
      active: 0,
      sticky: true,
      list: [],
      list1: [],
      list2: [],
      list3: [],
      title: "全部",
      page: 1,
      type: 1,
      totals: "",
      loading: false,
      finished: false,
      per_page: ""
    };
  },
  methods: {
    onClick(name, title) {
      console.log(title);
      this.title = title;
      console.log(this.title);
      this.order();
      this.onLoad();
    },
    getbanner: function() {
      this.$nextTick(() => {
        this.banner();
      });
    },
    dingdan: function(id) {
      this.$router.push({
        path: "./dingdanxingqing",
        query: { id: id }
      });
      // Toast.loading({
      //     message: '加载中...',
      //     forbidClick: true,
      //     duration: 300
      // });
    },
    order: function() {
      if (this.title == "全部") {
        this.type = 1;
      } else if (this.title == "待发货") {
        this.type = 2;
      } else if (this.title == "待收货") {
        this.type = 3;
      } else if (this.title == "已完成") {
        this.type = 4;
      }
      this.$api.get(
        "order/list/" + this.type,
        {
          token: storage.get("token"),
          uid: storage.get("uid")
        },
        {},
        ret => {
          console.log(ret);
          this.list = ret.data.order.data;
          this.list1 = ret.data.order.data;
          this.list2 = ret.data.order.data;
          this.list3 = ret.data.order.data;
          this.per_page = ret.data.order.per_page;
          console.log(ret.data.order.per_page);
        }
      );
    },
    onLoad() {
      console.log(this.per_page);
      if (this.list.length < 15) {
        this.loading = false;
        return;
      } else {
        setTimeout(() => {
          this.page++;
          this.$api.get(
            "order/list/" + this.type,
            {
              token: storage.get("token"),
              uid: storage.get("uid")
            },
            {
              page: this.page
            },
            ret => {
              console.log(ret);
              for (var j = 0; j < ret.data.order.data.length; j++) {
                this.list.push(ret.data.order.data[j]);
              }
              this.totals = ret.data.logs.total;
            }
          );
          // 加载状态结束
          this.loading = false;

          // 数据全部加载完成
          if (this.list.length >= this.totals) {
            this.finished = true;
            this.page = 1;
          }
        }, 1000);
      }
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    },
    onLoad1() {
      if (this.list1.length < 15) {
        this.loading = false;
        return;
      } else {
        setTimeout(() => {
          this.page++;
          this.$api.get(
            "order/list/" + this.type,
            {
              token: storage.get("token"),
              uid: storage.get("uid")
            },
            {
              page: this.page
            },
            ret => {
              console.log(ret);
              for (var j = 0; j < ret.data.order.data.length; j++) {
                this.list1.push(ret.data.order.data[j]);
              }
              this.totals = ret.data.logs.total;
            }
          );
          // 加载状态结束
          this.loading = false;

          // 数据全部加载完成
          if (this.list.length >= this.totals) {
            this.finished = true;
            this.page = 1;
          }
        }, 1000);
      }
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    },
    onLoad2() {
      if (this.list2.length < 15) {
        this.loading = false;
        return;
      } else {
        setTimeout(() => {
          this.page++;
          this.$api.get(
            "order/list/" + this.type,
            {
              token: storage.get("token"),
              uid: storage.get("uid")
            },
            {
              page: this.page
            },
            ret => {
              console.log(ret);
              for (var j = 0; j < ret.data.order.data.length; j++) {
                this.list2.push(ret.data.order.data[j]);
              }
              this.totals = ret.data.logs.total;
            }
          );
          // 加载状态结束
          this.loading = false;

          // 数据全部加载完成
          if (this.list.length >= this.totals) {
            this.finished = true;
            this.page = 1;
          }
        }, 1000);
      }
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    },
    onLoad3() {
      if (this.list3.length < 15) {
        this.loading = false;
        return;
      } else {
        setTimeout(() => {
          this.page++;
          this.$api.get(
            "order/list/" + this.type,
            {
              token: storage.get("token"),
              uid: storage.get("uid")
            },
            {
              page: this.page
            },
            ret => {
              console.log(ret);
              for (var j = 0; j < ret.data.order.data.length; j++) {
                this.list3.push(ret.data.order.data[j]);
              }
              this.totals = ret.data.logs.total;
            }
          );
          // 加载状态结束
          this.loading = false;

          // 数据全部加载完成
          if (this.list.length >= this.totals) {
            this.finished = true;
            this.page = 1;
          }
        }, 1000);
      }
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    }
  },
  mounted() {
    this.order();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.order {
  background: #faf7f8;
  padding-bottom: 0.4rem;
}
.box {
  width: 100%;
  background: #fff;
  margin-bottom: 0.1rem;
}
.time {
  height: 0.36rem;
  width: 92%;
  margin: 0 auto;
  line-height: 0.36rem;
  border-bottom: 1px solid #f7f7f9;
}
.time img {
  height: 0.12rem;
  width: auto;
  margin-top: 0.12rem;
  margin-right: 0.1rem;
}
.center {
  width: 92%;
  margin: 0 auto;
  padding: 0.1rem 0;
  border-bottom: 1px solid #f7f7f9;
}
.imgs {
  width: 20%;
  overflow: hidden;
}
.center img {
  height: 0.62rem;
  width: auto;
  margin: 0 auto;
}
.cen {
  width: 75%;
  margin-left: 0.1rem;
}
.name {
  font-size: 0.14rem;
  color: #797979;
  line-height: 0.2rem;
  margin-top: 0.1rem;
}
.num {
  font-size: 0.12rem;
  color: #797979;
  line-height: 0.2rem;
  margin-top: 0.05rem;
}
.nums {
  width: 92%;
  margin: 0 auto;
  color: #0497f4;
  font-size: 0.12rem;
  line-height: 0.4rem;
}
.dan {
  border: 1px solid #0497f4;
  height: 0.2rem;
  width: 0.6rem;
  margin-top: 0.1rem;
  line-height: 0.2rem;
  text-align: center;
  border-radius: 0.05rem;
}
</style>
