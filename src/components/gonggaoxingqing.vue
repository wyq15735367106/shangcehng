<template>
  <div class="gong">
    <app-header :name="name" :image="image" class="heads"></app-header>
    <p class="title">{{title}}</p>
    <div class="center" v-html="center"></div>
  </div>
</template>

<script>
import storage from 'good-storage'
import Header from "../components/Header";
import { Toast } from "vant";
export default {
  components: {
    "app-header": Header
  },
  name: "bang",
  data() {
    return {
      name: "公告详情",
      image: require("../../static/image/left.png"),
      center:'',
      title:''
    };
  },
  methods: {
    gonggao:function(){
 this.$api.get(
        "notice_detail/"+this.$route.query.id,
        {
          token: storage.get('token'),
        uid: storage.get('uid'),
        },
        {
         
        },
        ret => {
        //    Toast.loading({
        //             message: '加载中...',
        //             forbidClick: true,
        //             duration: 300
        //         });
          console.log(ret);
          if (ret.code == "1") {
            this.center=ret.data.content
            this.title=ret.data.title
          }
        }
      )
    }
  },
  mounted(){
    this.gonggao()
  }
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
.title{
  height: 0.5rem;
  line-height: 0.5rem;
  text-align: center;
  box-sizing: border-box;
  font-size: 0.15rem;
  background: #fff
}
.center{
    font-size: 0.14rem;
    color: #333;
    background: #fff;
    border-radius: 0.05rem;
    width: 92%;
    margin: 0 auto;
    padding: 0 0.15rem
}
</style>
