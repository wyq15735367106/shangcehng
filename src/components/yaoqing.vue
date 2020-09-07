<template>
  <!--头部-->
  <div class="yaoqing">
    <div class="head">
      <div class="ti cl">
        <p style="line-height:0.3rem"
          v-for="(item,index) in all"
          :key="index"
          class="fl left"
          :class="active==index ? 'active' : '' "
          @click="change(index)"
        >{{item.allName}}</p>
      </div>
      <div class="head_box">
        <div style="padding:0;margin:0;width:0.25rem;" @click="goback">
          <img :src="image" alt class="img_f" />
        </div>
      </div>
    </div>
    <!-- 码 -->
  
    <div v-if="invite1">
       <div class="box" v-if="active==0">
        <div class="img">
            <img :src="url1" alt="">
        </div>
        <p class="ma">我的A区码：<span style="color:#FF6C64"  class="invite1">{{invite1}}</span></p>
        <p @click="fuzhi1" class="fuzhi">复制A区码</p>
    </div>
    </div>
    <div v-else>
           <div class="box" >
       
        <p class="ma" style="margin-top:1.6rem"><span style="color:#ABABAB"  class="invite1">消费爆品套餐后可激活邀请链接</span></p>
       <p class="fuzhi" style="background:#ABABAB;margin-top:1.5rem">复制A区码</p>
    </div>
   </div>
    <div class="box" v-if="active==1">
        <div class="img">
            <img :src="url2" alt="">
        </div>
        <p class="ma">我的B区码：<span style="color:#FF6C64">{{invite2}}</span></p>
        <p @click="fuzhi2" class="fuzhi">复制B区码</p>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import { Field } from "vant";
import storage from "good-storage";
import { Dialog } from 'vant';
export default {
  name: "bang",
  data() {
    return {
      name: "设置",
      image: require("../../static/image/left.png"),
      active: 0,
      all: [
        {
          allName: "A区码"
        },
        {
          allName: "B区码"
        }
      ],
      url1:'',
      invite1:'',
      url2:'',
      invite2:''
    };
  },
  methods: {
    goback: function() {
      this.$router.back();
    },
    change: function(index) {
        if(this.url2){
            this.active = index;
        }else{
            Dialog.alert({
                title: '提示',
                message: '必须邀请一个A区好友,才可开通B区码',
                })
        }
    },
    yaoqing:function(){
          this.$api.get(
        "user/invite",
        {
          token: storage.get("token"),
          uid: storage.get("uid")
        },
        {

        },
        ret => {
          console.log(ret);
          this.url1=ret.data.url1
          this.invite1=ret.data.invite1
          this.url2=ret.data.url2
          this.invite2=ret.data.invite2
        }
      );
    },
    fuzhi1:function(){
      console.log(2)
            var oInput = document.createElement('input');
            oInput.value = this.invite1;
            document.body.appendChild(oInput);
            oInput.select(); // 选择对象
            document.execCommand("Copy"); // 执行浏览器复制命令
            oInput.className = 'oInput';
            oInput.style.display='none';  
              Dialog.alert({
                title: '提示',
                message: '复制成功',
                }) 
               
    },
    fuzhi2:function(){
   var oInput = document.createElement('input');
            oInput.value = this.invite2;
            document.body.appendChild(oInput);
            oInput.select(); // 选择对象
            document.execCommand("Copy"); // 执行浏览器复制命令
            oInput.className = 'oInput';
            oInput.style.display='none';  
              Dialog.alert({
                title: '提示',
                message: '复制成功',
                }) 
    }
  },
  mounted(){
      this.yaoqing()
  }
};
</script>

<style scoped>
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
  background: #fff;
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
.ti {
  width: 50%;
  border: 0.01rem solid #aaaaaa;
  border-radius: 0.28rem;
  height: 0.28rem;
  overflow: hidden;
  position: absolute;
  left: 25%;
  top: 0.1rem;
  z-index: 9999;
}
.left {
  border-radius: 0.28rem;
  font-size: 0.13rem;
  color: #aaaaaa;
  width: 50%;
  height: 100%;
  text-align: center;
  line-height: 0.28rem;
}
.active {
  background: #2782fd;
  color: #fff;
}
.yaoqing {
  height: 100vh;
  width: 100vw;
  background: url("../../static/image/backs.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.box{
    width: 90%;
    height: 75%;
    border-radius: 0.05rem;
    background: #fff;
    box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.1);
    position: absolute;
    top: 15%;
    left: 5%;
}
.box img{
    height:1.8rem;
    width: auto;
    margin: 0 auto;
    margin-top: 0.7rem
}
.ma{
    text-align: center;
    font-size: 0.18rem;
    color: #555BD7;
    margin-top:0.5rem
}
.fuzhi{
    height: 0.4rem;
    width: 80%;
    border-radius: 0.08rem;
    background: #2782FD;
    color: #fff;
    line-height: 0.4rem;
    text-align: center;
    margin: 0 auto;
    margin-top: 0.3rem
}
</style>