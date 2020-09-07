<template>
  <div class="ming">
    <app-header :name="names" :image="image" class="heads"></app-header>
      <div v-if="ident==3||ident==2">
            <van-field v-model="name" label="姓名" placeholder="请输入姓名" type="text" />
            <van-field v-model="idcard" label="身份证号" placeholder="请输入身份证号" type="text" />
      </div>

       <div  v-else>
            <van-field v-model="name" label="姓名" placeholder="请输入姓名" type="text" readonly />
            <van-field v-model="idcard" label="身份证号" placeholder="请输入身份证号" type="text" readonly />
      </div>
    <div class="paizhao" v-if="ident==3||ident==2">
      <p class="pai">请拍摄并上传你的身份证照片</p>
      <van-uploader class="zhang" :after-read="afterRead1">
        <div class="img1">
          <img :src="zhang"  v-if="zhang"/>
          <img src="../../static/image/zhang.png" alt v-else />
        </div>
        <p class="she">拍摄正面</p>
      </van-uploader>
      <van-uploader class="zhang" :after-read="afterRead2">
        <div class="img1">
        <img :src="fan"  v-if="fan"/>
          <img src="../../static/image/fan.png" alt v-else />
        </div>
        <p class="she">拍摄反面</p>
      </van-uploader>
      <div class="tijiao">
        <p v-if="ident==1" style="background:#999">审核通过</p>
         <p v-else-if="ident==2" @click="chuan">重新上传</p>
         <p v-else-if="ident==3" @click="chuan">上传</p>
         <p v-else-if="ident==4" style="background:#FF9E05">审核中</p>
      </div>
    </div>
       <div class="paizhao" v-else>
      <p class="pai">请拍摄并上传你的身份证照片</p>
      <div class="zhang" :after-read="afterRead1">
        <div class="img1">
          <img :src="zhang"/>
        </div>
        <p class="she">拍摄正面</p>
      </div>
      <div class="zhang" :after-read="afterRead2">
        <div class="img1">

          <img :src="fan"  />
        </div>
        <p class="she">拍摄反面</p>
      </div>
      <div class="tijiao">
        <p v-if="ident==1" style="background:#999">审核通过</p>
         <p v-else-if="ident==2" @click="chuan">重新上传</p>
         <p v-else-if="ident==3" @click="chuan">上传</p>
         <p v-else-if="ident==4" style="background:#FF9E05">审核中</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Dialog } from "vant";
import storage from "good-storage";
import Header from "../components/Header";
import { Toast } from "vant";
import { Field } from "vant";
import { Uploader } from "vant";
export default {
  components: {
    "app-header": Header
  },
  name: "bang",
  data() {
    return {
      names: "实名认证",
      image: require("../../static/image/left.png"),
      name: "",
      idcard: "",
      zhang: "",
      fan: "",
      ident: "",
      front:'',
      behind:'',
      chuans:1,
      chuanss:1,
      formData1:''
    };
  },
  methods: {
    infor: function() {
        //   Toast.loading({
        //     message: "加载中...",
        //     forbidClick: true,
        //     duration: 300
        //   });
      this.$api.get(
        "ident",
        {
          token: storage.get("token"),
          uid: storage.get("uid")
        },
        {},
        ret => {
          console.log(ret);
          if (ret.code == 1) {
            this.name = ret.data.name;
            this.idcard = ret.data.idcard;
            this.zhang = ret.data.front;
            this.fan = ret.data.behind;
            this.ident = ret.data.ident;
          }
        }
      );
    },
    chuan: function() {
      var regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; 
        if(this.name==''){
            Dialog.alert({
            title: '提示',
            message:'请输入您的姓名',
          })
        }else if(!regIdNo.test(this.idcard)){
            Dialog.alert({
            title: '提示',
            message:'请输入您的身份证号有误',
          }).then(() => {
               this.idcard=''
            })
        }else {
        
      var formData1 = new FormData()
      formData1.append('name',this.name)
      formData1.append('idcard',this.idcard)
      formData1.append('front',this.front)
      formData1.append('behind',this.behind)
        this.$api.post(
        "ident",
        {
          token: storage.get("token"),
          uid: storage.get("uid")
        },
        formData1,
        ret => {
      
           
          if(ret.code==1){
             Toast.clear();
            Dialog.alert({
            title: '提示',
            message: ret.msg,
          })

          this.infor()
          }else{
             Toast.clear();
             Dialog.alert({
            title: '提示',
            message: ret.msg,
          })
          }
       
        }
      );
        }
    },
    afterRead1: function(file) {
      this.chuans=0
      this.zhang = file.content;
      this.front=file.file
      console.log(this.front)
    },
    afterRead2: function(file) {
      this.chuanss=0
      console.log(file);
      this.fan = file.content;
       this.behind=file.file
       console.log(this.behind)
    }
  },
  mounted() {
    this.infor();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.heads {
  margin-bottom: 1px;
}
.paizhao {
  background: #fff;
  margin-top: 0.1rem;
  height: 70vh;
}
.pai {
  font-size: 0.15rem;
  line-height: 0.5rem;
  color: #333;
  padding: 0 0.15rem;
}
.zhang {
  width: 60%;
  height: 1.3rem;
  background: #f4f8fe;
  margin: 0.2rem auto;
  border-radius: 0.05rem;
  overflow: hidden;
  margin-left: 20%;
}
.img1 {
  height: 0.8rem;
  margin: 0 auto;
  margin-top: 0.1rem;
}
.img1 img {
  height: 100%;
  width: auto;
  margin: 0 auto;
}
.she {
  height: 0.3rem;
  width: 100%;
  background: #4280f2;
  margin-top: 0.1rem;
  line-height: 0.3rem;
  text-align: center;
  color: #fff;
  font-size: 0.14rem;
}
.tijiao {
  width: 80%;
  height: 0.4rem;
  margin: 0 auto;
  border-radius: 0.05rem;
  color: #fff;
  font-size: 0.15rem;
  text-align: center;
  line-height: 0.4rem;
  background: #2782fd;
}
</style>