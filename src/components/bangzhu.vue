<template>
  <div class="bang">
    <app-header :name="name" :image="image" class="heads"></app-header>

    <!-- logo -->
    <van-collapse v-model="activeNames" v-for="(val,index) in list" :key="index" accordion>
      <van-collapse-item :title="val.title" :name="index">{{val.content}}</van-collapse-item>
    </van-collapse>
  </div>
</template>

<script>
import storage from "good-storage";
import Header from "../components/Header";
import { Toast } from "vant";
import { Collapse, CollapseItem } from "vant";
export default {
  components: {
    "app-header": Header
  },
  name: "bang",
  data() {
    return {
      name: "帮助中心",
      image: require("../../static/image/left.png"),
      activeNames: 0,
      list: []
    };
  },
  methods: {
    register: function() {
      this.$router.push("./register");
    //   Toast.loading({
    //     message: "加载中...",
    //     forbidClick: true,
    //     duration: 300
    //   });
    },
        notice_list:function(){
            this.$api.get(
        "help_list",
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
          console.log(ret);
          if (ret.code == 1) {
              this.list=ret.data
          }
        }
      );
    },
  },
  mounted(){
      this.notice_list()
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bang {
  padding-top: 0.6rem;
}
.heads {
  position: fixed;
  top: 0;
  left: 0;
}
</style>
