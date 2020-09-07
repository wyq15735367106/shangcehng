<template>
  <div class="gong">
    <app-header :name="name" :image="image" class="heads"></app-header>
    <div class="gonggao" v-for="(val,index) in list" :key="index">
      <div class="cl" @click="notice(val.id)">
        <div class="left fl">
          <p class="title van-ellipsis">{{val.title}}</p>
          <!-- <p class="time">{{val.created_at}}</p> -->
        </div>
        <div class="img fr">
          <img src="../../static/image/right.png" alt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import storage from "good-storage";
import Header from "../components/Header";
import { Toast } from "vant";
export default {
  components: {
    "app-header": Header,
  },
  name: "bang",
  data() {
    return {
      name: "公告",
      image: require("../../static/image/left.png"),
      list: [],
    };
  },
  methods: {
    notice_list: function () {
      this.$api.get(
        "notice_list",
        {
          token: storage.get("token"),
          uid: storage.get("uid"),
        },
        {},
        (ret) => {
          //  Toast.loading({
          //           message: '加载中...',
          //           forbidClick: true,
          //           duration: 300
          //       });
          console.log(ret);
          if (ret.code == 1) {
            this.list = ret.data.data;
          }
        }
      );
    },
    notice: function (id) {
      //   Toast.loading({
      //             message: '加载中...',
      //             forbidClick: true,
      //             duration: 300
      //         });
      this.$router.push({
        path: "./gonggaoxingqing",
        query: { id: id },
      });
    },
  },
  mounted() {
    this.notice_list();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.gong {
  padding-top: 0.5rem;
}
.heads {
  position: fixed;
  top: 0;
  left: 0;
}
.gonggao {
  width: 100%;
  box-sizing: border-box;
  padding: 0.1rem 0.15rem;
  background: #fff;
  margin-bottom: 1px;
}
.left {
  width: 90%;
}
.title {
  font-size: 0.15rem;
  color: #333333;
  line-height: 0.2rem;
}
.time {
  font-size: 0.12rem;
  color: #333;
  margin-top: 0.1rem;
}
.img img {
  height: 0.15rem;
  width: auto;
  margin-top: 0.02rem;
}
</style>
