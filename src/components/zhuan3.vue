<template>
  <div class="dizhi">
    <app-header :name="name" :image="image" class="heads"></app-header>
    <van-field
      v-model="username"
      label="账户"
      center
      clearable
      placeholder="请输入对方账户"
      type="text"
    >
      <template #button>
        <p
          style="font-size:0.12rem;color:#0499F6;text-align: center;width:100%"
          @click="getCode"
        >
          查询
        </p>
      </template>
    </van-field>
    <van-field
      v-model="num"
      label="金额"
      placeholder="请输入数量"
      type="number"
    />
    <van-field
      v-model="paypass"
      label="二级密码"
      placeholder="请输入二级密码"
      type="password"
    />
    <div class="tijiao">
      <p @click="zhuan">确定</p>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import storage from "good-storage";
import { Toast } from "vant";
import { Field } from "vant";
import { Dialog } from "vant";
export default {
  components: {
    "app-header": Header
  },
  name: "bang",
  data() {
    return {
      name: "转帐",
      image: require("../../static/image/left.png"),
      username: "",
      num: "",
      paypass: ""
    };
  },
  methods: {
    zhuan: function() {
      // Toast.loading({
      //     message: '加载中...',
      //     forbidClick: true,
      //     duration:0
      // })
      this.$api.post(
        "account/transfer",
        {
          token: storage.get("token"),
          uid: storage.get("uid")
        },
        {
          username: this.username,
          num: this.num,
          paypass: this.paypass
        },
        ret => {
          console.log(ret);

          if (ret.code == 1) {
            //    Toast.clear();
            Dialog.alert({
              title: "提示",
              message: ret.msg
            }).then(() => {
              this.$router.back();
            });
          } else {
            //    Toast.clear();
            Dialog.alert({
              title: "提示",
              message: ret.msg
            });
          }
        }
      );
    },
    getCode: function() {
      if (this.username) {
        // Toast.loading({
        //   message: "查询中...",
        //   forbidClick: true,
        //   duration: 0
        // });
        this.$api.get(
          "get_nickname",
          {
            token: storage.get("token"),
            uid: storage.get("uid")
          },
          {
            username: this.username
          },
          ret => {
            console.log(ret);
            if (ret.code == 1) {
              //   Toast.clear();
              if (ret.data) {
                Dialog.alert({
                  title: "提示",
                  message: `对方账户昵称：${ret.data}`
                });
              } else {
                Dialog.alert({
                  title: "提示",
                  message: `对方账户昵称：`
                });
              }
            } else {
              //   Toast.clear();
              Dialog.alert({
                title: "提示",
                message: "没有此账户，请重新输入"
              });
            }
          }
        );
      } else {
        Dialog.alert({
          title: "提示",
          message: "请输入对方账户"
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
