<template>
  <div class="qianbao">
    <app-header :name="name" :image="image" class="heads"></app-header>
    <div class="zichan" style="padding: 0.3rem 0.15rem">
      <p class="zi">总资产</p>
      <p class="qian">￥{{ total }}</p>
      <!-- <div class="dong cl">
        <div class="left fr">
          <p>冻结资产</p>
          <p>{{frozen}}￥</p>
        </div>
        <div class="left fl">
          <p>自由资产</p>
          <p>{{amount}}￥</p>
        </div>
      </div>-->
    </div>
    <!-- 转账 -->
    <div class="zhuan cl">
      <p class="fl zh" @click="zhaun">转账</p>
      <p class="fr ti" @click="tixian">提现</p>
    </div>
    <!-- 日志 -->
    <div class="rizhi">
      <div class="rizhis cl">
        <p class="fl rix">日志</p>
        <div class="fr lis">
          <van-dropdown-menu
            :overlay="overlay"
            active-color="#2782FD"
            color="#2782FD"
            @change="changeDevelop"
          >
            <van-dropdown-item
              v-model="value1"
              :options="option1"
              @change="changeDevelop"
            />
          </van-dropdown-menu>
        </div>
      </div>

      <div class="fenye">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text
          @load="onLoad"
          :offset="100"
        >
          <div class="listss" v-for="(val, index) in list" :key="index">
            <p class="msg">{{ val.msg }}</p>
            <p class="times">{{ val.created_at }}</p>
          </div>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import { DropdownMenu, DropdownItem } from "vant";
import storage from "good-storage";
import Header from "../components/Header";
import { Toast } from "vant";
import { List } from "vant";
export default {
  components: {
    "app-header": Header
  },
  name: "bang",
  data() {
    return {
      name: "我的钱包",
      image: require("../../static/image/left.png"),
      value1: 1,
      overlay: false,
      option1: [
        { text: "荣耀奖", value: 1 },
        { text: "销售奖", value: 2 },
        { text: "管理奖", value: 3 },
        { text: "消费奖", value: 4 },
        { text: "分享奖", value: 5 },
        { text: "创享奖", value: 6 },
        { text: "提现", value: 7 },
        { text: "转账", value: 8 },
        { text: "购买商品", value: 9 },
        { text: "拓展奖", value: 10 },
        { text: "排位奖", value: 14 }
      ],
      list: [],
      frozen: "",
      amount: "",
      total: "",
      type: 6,
      page: 1,
      totals: "",
      loading: false,
      finished: false,
      per_page: ""
    };
  },
  methods: {
    // 分页
    onLoad() {
      if (this.list.length < 15) {
        this.loading = false;
        return;
      } else {
        setTimeout(() => {
          this.page++;
          this.$api.get(
            "account/log",
            {
              token: storage.get("token"),
              uid: storage.get("uid")
            },
            {
              page: this.page,
              type: this.type
            },
            ret => {
              console.log(ret);
              for (var j = 0; j < ret.data.logs.data.length; j++) {
                if (this.list) {
                  this.list.push(ret.data.logs.data[j]);
                }
              }
              this.totals = ret.data.logs.total;
            }
          );

          // 加载状态结束
          this.loading = false;

          // 数据全部加载完成
          if (this.list) {
            if (this.list.length >= this.totals) {
              this.finished = true;
              this.page = 1;
            }
          }
        }, 1000);
      }
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    },
    tixian: function() {
      this.$router.push("./tixian");
      // Toast.loading({
      //   message: "加载中...",
      //   forbidClick: true,
      //   duration: 300
      // });
    },
    zhaun: function() {
      this.$router.push("./zhuan3");
      // Toast.loading({
      //   message: "加载中...",
      //   forbidClick: true,
      //   duration: 300
      // });
    },
    zichuan: function() {
      this.$api.get(
        "account",
        {
          token: storage.get("token"),
          uid: storage.get("uid")
        },
        {},
        ret => {
          console.log(ret);

          if (ret.code == 1) {
            this.frozen = ret.data.account.frozen;
            this.amount = ret.data.account.amount;
            this.total = ret.data.account.total;
          }
        }
      );
    },
    changeDevelop: function(value) {
      this.onLoad();
      if (value == 1) {
        this.page = 1;
        this.type = 6;
        this.rizhi();
      } else if (value == 2) {
        this.page = 1;
        this.type = 2;
        this.rizhi();
      } else if (value == 3) {
        this.page = 1;
        this.type = 3;
        this.rizhi();
      } else if (value == 4) {
        this.page = 1;
        this.type = 4;
        this.rizhi();
      } else if (value == 5) {
        this.page = 1;
        this.type = 5;
        this.rizhi();
      } else if (value == 6) {
        this.page = 1;
        this.type = 1;
        this.rizhi();
      } else if (value == 7) {
        this.page = 1;
        this.type = 7;
        this.rizhi();
      } else if (value == 8) {
        this.page = 1;
        this.type = 8;
        this.rizhi();
      } else if (value == 9) {
        this.page = 1;
        this.type = 9;
        this.rizhi();
      } else if (value == 10) {
        this.page = 1;
        this.type = 10;
        this.rizhi();
      } else if (value == 14) {
        this.page = 1;
        this.type = 14;
        this.rizhi();
      }
    },
    rizhi: function() {
      this.$api.get(
        "account/log",
        {
          token: storage.get("token"),
          uid: storage.get("uid")
        },
        {
          type: this.type
        },
        ret => {
          if (ret.code == 1) {
            this.list = ret.data.logs.data;
            this.per_page = ret.data.logs.per_page;
          }
          console.log(ret);
        }
      );
    }
  },
  mounted() {
    this.zichuan();
    this.rizhi();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.qianbao {
  padding-top: 0.6rem;
}
.heads {
  position: fixed;
  top: 0;
  left: 0;
}
.zichan {
  background: #fff;
  border-radius: 0.08rem;
  width: 92%;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0.15rem;
}
.zi {
  text-align: center;
  font-size: 0.18rem;
  color: #333333;
  line-height: 0.2rem;
}
.qian {
  font-size: 0.26rem;
  color: #2782fd;
  text-align: center;
}
.left {
  width: 50%;
  text-align: center;
  margin-top: 0.1rem;
}
.left p:nth-child(1) {
  font-size: 0.1rem;
  color: #333333;
}
.left p:nth-child(2) {
  font-size: 0.12rem;
  color: #2782fd;
}
.zhuan {
  width: 84%;
  margin: 0.15rem auto;
}
.zh {
  width: 38%;
  border-radius: 0.3rem;
  height: 0.3rem;
  background: #4fb89e;
  text-align: center;
  line-height: 0.3rem;
  color: #fff;
}
.ti {
  width: 38%;
  border-radius: 0.3rem;
  height: 0.3rem;
  background: #0497f4;
  text-align: center;
  line-height: 0.3rem;
  color: #fff;
}
.lis {
  width: 30%;
  height: 0.4rem;
}
.rizhis {
  padding: 0 0.15rem;
  overflow: hidden;
}
.rizhi {
  border-radius: 0.08rem;
  width: 92%;
  margin: 0 auto;
  background: #fff;
}
.rix {
  font-size: 0.15rem;
  color: #0497f4;
  line-height: 0.5rem;
}
.listss {
  width: 92%;
  margin: 0 auto;
  border-bottom: 1px solid #f8f8f8;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.msg {
  font-size: 0.1rem;
  color: #333333;
  line-height: 0.2rem;
}
.times {
  font-size: 0.1rem;
  color: #aaaaaa;
  line-height: 0.2rem;
}
.fenye {
  background: #fff;
  max-height: 60vh;
  display: flex;
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.fenye::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
</style>
