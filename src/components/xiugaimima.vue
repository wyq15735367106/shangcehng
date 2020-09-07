<template>
  <div class="dizhi">
    <app-header :name="name" :image="image" class="heads"></app-header>
    <van-field v-model="oldpass" label="原密码" placeholder="请输入原密码" type="password" />
    <van-field v-model="password" label="新密码" placeholder="请输入新密码" type="password" />
    <van-field v-model="texts" label="确认密码" placeholder="请输入新密码" type="password" />
    <div class="tijiao">
      <p @click="mima">确定</p>
    </div>
  </div>
</template>

<script>
import { Dialog } from "vant";
import storage from "good-storage";
import Header from "../components/Header";
import { Toast } from "vant";
import { Field } from "vant";
export default {
  components: {
    "app-header": Header
  },
  name: "bang",
  data() {
    return {
      name: "修改密码",
      image: require("../../static/image/left.png"),
      oldpass: "",
      password: "",
      texts: ""
    };
  },
  methods: {
    mima: function() {
      if (this.password == this.texts) {
        this.$api.post(
          "uppassword",
          {
            token: storage.get("token"),
            uid: storage.get("uid")
          },
          {
            oldpass: this.oldpass,
            password: this.password
          },
          ret => {
            console.log(ret);
            if (ret.code == "1") {
              Dialog.alert({
                title: "提示",
                message: ret.msg
              }).then(() => {
                // on close
                this.$router.back()
              });
            } else {
              Dialog.alert({
                title: "提示",
                message: ret.msg
              }).then(() => {
                // on close
              });
            }
          }
        );
      } else {
        Dialog.alert({
          title: "提示",
          message: "请确认新密码与确认密码一致"
        }).then(() => {
          // on close
        });
      }
    }
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