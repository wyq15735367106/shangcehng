<template>
  <div class="dizhi">
    <div class="head">
      <p>{{ name }}</p>
      <div class="head_box">
        <div style="padding:0;margin:0;width:0.25rem;" @click="goback">
          <img :src="image" alt="" class="img_f" />
        </div>
      </div>
    </div>
    <div id="bod">
      <div class="dingdanimg" v-if="list == ''" style="text-align:center">
        <!-- <img
          src="../../static/image/dizhi2.png"
          alt
          style="height:0.7rem;width:auto;margin:2.5rem auto 0;"
        /> -->
        <p style="text-align:center;font-size:0.12rem;color:#999999">
          暂时没有收货地址请添加地址
        </p>
      </div>
      <div class="nav" v-for="(val, index) in list" :key="index">
        <div class="liuu">
          <div class="cl xinxi">
            <span class="fl" @click="moren(val.id, index)">{{ val.name }}</span>
            <span class="fr" @click="moren(val.id, index)">{{
              val.phone
            }}</span>
          </div>
          <span class="di" @click="moren(val.id, index)"
            >{{ val.province }}/{{ val.city }}/{{ val.county }}
            {{ val.address }}</span
          >
        </div>
        <div class="bian cl">
          <div class="am fl">
            <img
              src="../../static/image/yuan.png"
              v-if="val.is_default == 2"
              @click="moren(val.id, index)"
            />
            <img
              src="../../static/image/wan.png"
              v-if="val.is_default == 1"
              @click="moren(val.id, index)"
            />
          </div>
          <span class="fl">默认地址</span>
          <span class="fr" @click="remove(val.id)">删除</span>
          <div class="im fr">
            <img
              src="../../static/image/remove.png"
              alt
              @click="remove(val.id)"
            />
          </div>
          <span class="fr" @click="edit(val.id)" tapmode="light">编辑</span>
          <div class="im fr">
            <img src="../../static/image/edit.png" alt />
          </div>
        </div>
      </div>
    </div>
    <div class="btn_box">
      <p class="btn" @click="btn">添加收货地址</p>
    </div>
  </div>
</template>

<script>
import { Dialog } from "vant";
import storage from "good-storage";
import { Toast } from "vant";
import { List } from "vant";
import Header from "../components/Header";
export default {
  data() {
    return {
      name: "地址列表",
      image: require("../../static/image/left.png"),
      list: [],
      loading: false,
      finished: false,
      page: 1,
      act: "",
      ive: "",
      shopid: "",
      nums: "",
      is_buy: "",
      is_upgrade: ""
    };
  },
  components: {
    "app-header": Header
  },
  methods: {
    remove: function(id) {
      Dialog.confirm({
        title: "提示",
        message: "你确定删除吗？"
      })
        .then(() => {
          // on confirm
          this.$api.delete(
            "address",
            {
              token: storage.get("token"),
              uid: storage.get("uid")
            },
            {
              aid: id
            },
            ret => {
              console.log(ret);
              if (ret.code == "1") {
                Dialog.alert({
                  title: "提示",
                  message: ret.msg
                }).then(() => {
                  this.dizhi();
                });
              } else {
                Dialog.alert({
                  title: "提示",
                  message: ret.msg
                }).then(() => {
                  this.dizhi();
                });
              }
            }
          );
        })
        .catch(() => {
          // on cancel
        });
    },
    edit: function(id) {
      this.$router.push({
        path: "./bianjidizhi",
        query: { id: id }
      });
    },
    btn: function() {
      this.$router.push({
        path: "./tianjiashouhuodizhi",
        query: {
          shopid: this.shopid,
          act: this.act,
          ive: this.ive,
          nums: this.nums,
          is_buy: this.is_buy,
          is_upgrade: this.is_upgrade
        }
      });
      //   this.$router.push("./tianjiashouhuodizhi");
      //   Toast.loading({
      //     message: "加载中...",
      //     forbidClick: true,
      //     duration: 300
      //   });
    },
    dizhi: function() {
      this.$api.get(
        "address",
        {
          token: storage.get("token"),
          uid: storage.get("uid")
        },
        {},
        ret => {
          console.log(ret);
          this.list = ret.data;
          this.shopid = this.$route.query.shopid;
          this.act = this.$route.query.act;
          this.ive = this.$route.query.ive;
          this.nums = this.$route.query.nums;
          this.is_buy = this.$route.query.is_buy;
          this.is_upgrade = this.$route.query.is_upgrade;
        }
      );
    },
    goback: function() {
      this.$router.push({
        path: "./fukuan",
        query: {
          shopid: this.shopid,
          act: this.act,
          ive: this.ive,
          nums: this.nums,
          is_buy: this.is_buy,
          is_upgrade: this.is_upgrade
        }
      });

      console.log(storage.get("id"));
    },
    moren: function(id, index) {
      console.log(storage.get("id"));
      this.$api.post(
        "address_default",
        {
          token: storage.get("token"),
          uid: storage.get("uid")
        },
        {
          aid: id
        },
        ret => {
          console.log(ret);
          if (ret.code == 1) {
            this.dizhi();
            // Toast.loading({
            //   message: "加载中...",
            //   forbidClick: true,
            //   duration: 300
            // });
            this.$router.push({
              path: "./fukuan",
              query: {
                shopid: this.shopid,
                act: this.act,
                ive: this.ive,
                nums: this.nums,
                is_buy: this.is_buy,
                is_upgrade: this.is_upgrade
              }
            });
          }
        }
      );
    }
  },
  mounted() {
    this.dizhi();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.dizhi {
  padding-top: 0.5rem;
  padding-bottom: 0.6rem;
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
#bod {
  width: 100vw;
  box-sizing: border-box;
}
.btn_box {
  width: 100%;
  height: 0.6rem;
  position: fixed;
  bottom: 0;
  left: 0;
  background: #fff;
  text-align: center;
}
.dizhi {
  margin-top: 0.1rem;
}
.btn {
  width: 70%;
  margin: 0 auto;
  margin-top: 0.1rem;
  font-size: 0.14rem;
  color: #fff;
  height: 0.4rem;
  line-height: 0.4rem;
  background: #0497f4;
  border-radius: 0.4rem;
}

.nav {
  background: #fff;
  width: 100%;
  box-sizing: border-box;
  padding: 0 0.15rem;
  margin-bottom: 0.1rem;
}
.nav .xinxi {
  padding-top: 0.1rem;
}
.liuu {
  border-bottom: 1px solid #f2f2f2;
  padding-bottom: 0.05rem;
}
.nav .liuu .xinxi span:nth-child(1) {
  font-size: 0.14rem;
  color: #333;
}
.nav .liuu .xinxi span:nth-child(2) {
  font-size: 0.14rem;
  color: #666;
}
.nav .liuu .di {
  display: block;
  padding-top: 0.05rem;
  font-size: 0.14rem;
  color: #666;
}
.nav .bian span {
  font-size: 0.12rem;
  color: #666;
  line-height: 0.17rem;
}
.nav .bian {
  padding: 0.1rem 0;
  font-size: 12px;
  color: #ccc;
}
.nav .bian .am img {
  height: 0.17rem;
  width: auto;
}
.nav .bian img {
  height: 0.15rem;
  width: auto;
  margin: 0 0.05rem;
}
</style>
