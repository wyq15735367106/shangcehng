<template>
  <div class="dizhi">
    <app-header :name="name" :image="image" class="heads"></app-header>
    <div class="box">
      <div class="bang cl" @click="mima">
        <p class="zhu fl" >修改密码</p>
        <div class="imgss fr">
          <img src="../../static/image/right.png" alt @click="mima" />
        </div>
      </div>
      <div class="bang cl"  @click="erji">
        <p class="zhu fl">修改二级密码</p>
        <div class="imgss fr">
          <img src="../../static/image/right.png" alt @click="erji" />
        </div>
      </div>
       <div class="bang cl" v-if="phone">
        <p class="zhu fl">绑定手机号</p>
        <p class="fr" style="font-size: 0.14rem;color: #333333;">{{phone}}</p>
      </div>
        <div class="bang cl"  @click="phones" v-else>
        <p class="zhu fl">绑定手机号</p>
        <div class="imgss fr">
          <img src="../../static/image/right.png" alt @click="erji" />
        </div>
      </div>
    </div>
    <div class="tijiao">
      <p @click="tui">退出登录</p>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import { Toast } from "vant";
import { Field } from "vant";
import storage from 'good-storage'
export default {
  components: {
    "app-header": Header
  },
  name: "bang",
  data() {
    return {
      name: "设置",
      image: require("../../static/image/left.png"),
      phone:''
    };
  },
  methods: {
    mima: function() {
      this.$router.push("./xiugaimima");
      // Toast.loading({
      //   message: "加载中...",
      //   forbidClick: true,
      //   duration: 300
      // });
    },
    erji: function() {
      this.$router.push("./erjimima");
      // Toast.loading({
      //   message: "加载中...",
      //   forbidClick: true,
      //   duration: 300
      // });
    },
    phones: function() {
      this.$router.push("./bang");
    //   Toast.loading({
    //     message: "加载中...",
    //     forbidClick: true,
    //     duration: 300
    //   });
    },
    tui:function(){
       storage.set('token', '')
        storage.set('uid', '')
        this.$router.push("./login");
    },
    infor:function(){
      if(this.$route.query.phone){
        this.phone=this.$route.query.phone
      }
    }
  },
  mounted(){
    this.infor()
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.heads {
  margin-bottom: 1px;
}

.box {
  margin: 0 auto;
  background: #fff;
}
.bang {
  height: 0.4rem;
  line-height: 0.4rem;
  padding: 0 0.15rem;
  box-sizing: border-box;
  font-size: 0.14rem;
  color: #333333;
  border-bottom: 1px solid #f8f8f8;
}
.imgs img {
  height: 0.2rem;
  width: auto;
  margin-top: 0.1rem;
}
.imgss img {
  height: 0.1rem;
  width: auto;
  margin-top: 0.15rem;
}
.zhu {
  margin-left: 0.1rem;
}
.tijiao {
  width: 80%;
  height: 0.4rem;
  margin: 0 auto;
  margin-top: 0.3rem;
  border-radius: 0.05rem;
  color: #fff;
  font-size: 0.15rem;
  text-align: center;
  line-height: 0.4rem;
  background: #2782fd;
}
</style>