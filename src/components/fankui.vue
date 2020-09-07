<template>
  <div class="dizhi">
    <app-header :name="name" :image="image" class="heads"></app-header>
    <van-field
      v-model="message"
      rows="4"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <!-- 提交 -->
    <div class="tijiao">
      <p @click="contents">提交</p>
    </div>
  </div>
</template>

<script>
import storage from 'good-storage'
import { Dialog } from "vant";
import Header from "../components/Header";
import { Toast } from "vant";
import { Field } from "vant";
export default {
  components: {
    "app-header": Header,
    [Dialog.Component.name]: Dialog.Component
  },
  name: "bang",
  data() {
    return {
      name: "意见反馈",
      image: require("../../static/image/left.png"),
      message: ""
    };
  },
  methods: {
    contents: function() {
      this.$api.post(
        "feedback",
        {
          token: storage.get("token"),
          uid: storage.get("uid")
        },
        {
          contents: this.message
        },
        ret => {
          //  Toast.loading({
          //           message: '加载中...',
          //           forbidClick: true,
          //           duration: 300
          //       });
          console.log(ret);
          if (ret.code == 1) {
            Dialog.alert({
              title: "提示",
              message: ret.msg
            }).then(() => {
              
              this.$router.push("./my")
            });
          }else{
             Dialog.alert({
              title: "提示",
              message: ret.msg
            })
          }
        }
      );
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.heads {
  margin-bottom: 1px;
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