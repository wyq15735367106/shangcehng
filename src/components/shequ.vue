<template>
  <div class="shequs">
    <app-header
      :name="name"
      :image="image"
      class="heads"
      :img="img"
    ></app-header>
    <div class="shequ">
      <div class="xiao" style="display:none">
        <p style="line-height: 0.21rem;height:0.2rem;">
          有效数：{{ team_count_real }}
        </p>
      </div>
      <p class="zong">总业绩</p>
      <p class="num">￥{{ team_kpi }}</p>
      <div class="team cl">
        <!-- <p class="fl ren" style="font-size: 0.15rem">邀请：{{ upteam }}</p> -->
        <p class="fl shu" style="font-size: 0.15rem;">节点：{{ upcoll }}</p>
      </div>
    </div>
    <!-- 团队 -->
    <div class="teams">
      <!-- 体系切换 -->
      <div class="ti cl">
        <p
          v-for="(item, index) in all"
          :key="index"
          class="fl left"
          :class="active == index ? 'active' : ''"
          @click="change(index)"
          style="line-height: 0.3rem"
        >
          {{ item.allName }}
        </p>
      </div>
      <!-- 团队列表 -->
      <!-- 对碰 -->
      <div class="teamlist" v-if="active == 0">
        <!-- <div class="weizhi">
          <div v-for="(val,index) in username" :key="index">
              <p  @click="kan(val.id,index)">{{val.username}}</p>
          </div>
        </div> -->
        <div v-if="list != ''">
          <div class="list cl" v-for="(val, index) in list" :key="index">
            <div class="list1 fl">
              <p class="nam">{{ val.username }}</p>
              <p class="shu" v-if="val.honor == 0"></p>
              <p class="shu" v-if="val.honor == 1">经理</p>
              <p class="shu" v-if="val.honor == 2">董事</p>
              <p class="shu" v-if="val.honor == 3">合伙人</p>
            </div>
            <div class="list2 fl">
              <p class="names">个人业绩</p>
              <p class="shus">{{ val.kpi }}</p>
            </div>
            <div class="list2 fl">
              <p class="names">团队业绩</p>
              <p class="shus">{{ val.team_kpi }}</p>
            </div>
            <!-- <div class="img fr">
            <img src="../../static/image/right.png" alt @click="chakan(val.id,index)" />
          </div> -->
          </div>
        </div>
        <div v-else>
          <p style="font-size:o.12rem;line-height:0.4rem;text-align:center">
            暂无客户
          </p>
        </div>
      </div>
      <!-- 团队体系 -->
      <div class="teamlist" v-if="active == 1">
        <div v-if="lists != ''">
          <div
            class="lists cl"
            v-for="(val, index) in lists"
            :key="index"
            style="margin-top:0.1rem"
          >
            <div class="list1 fl">
              <p class="nam">{{ val.username }}</p>
              <p class="shu" v-if="val.honor == 0"></p>
              <p class="shu" v-if="val.honor == 1">经理</p>
              <p class="shu" v-if="val.honor == 2">董事</p>
              <p class="shu" v-if="val.honor == 3">合伙人</p>
            </div>
            <div class="list2 fl" style="width:30%">
              <p class="names">个人业绩</p>
              <p class="shus">{{ val.kpi }}</p>
            </div>
            <div class="list2 fl" style="width:30%">
              <p class="names">团队业绩</p>
              <p class="shus">{{ val.team_kpi }}</p>
            </div>
            <!-- <div class="img fr">
            <img src="../../static/image/right.png" alt />
          </div> -->
          </div>
        </div>
        <div v-else>
          <p style="font-size:o.12rem;line-height:0.4rem;text-align:center">
            暂无客户
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { DropdownMenu } from "vant";
import storage from "good-storage";
import Header from "../components/Header";
import { Toast } from "vant";
export default {
  components: {
    "app-header": Header
  },
  name: "bang",
  data() {
    return {
      name: "我的社区",
      image: require("../../static/image/left.png"),
      img: require("../../static/image/WechatIMG17.png"),
      all: [
        {
          allName: "销售体系"
        },
        {
          allName: "分享体系"
        }
      ],
      actives: true,
      list: [],
      lists: [],
      active: 0,
      team_count_real: "",
      team_count: "",
      push_count: "",
      team_kpi: "",
      username: [],
      upteam: "",
      upcoll: ""
    };
  },
  methods: {
    change: function(index) {
      this.active = index;
    },
    shequ: function() {
      this.$api.get(
        "team",
        {
          token: storage.get("token"),
          uid: storage.get("uid")
        },
        {},
        ret => {
          console.log(ret);
          //  Toast.loading({
          //         message: '加载中...',
          //         forbidClick: true,
          //         duration: 300
          //     });
          if (ret.code == 1) {
            this.team_count_real = ret.data.team_count_real;
            this.team_count = ret.data.team_count;
            this.push_count = ret.data.push_count;
            this.team_kpi = ret.data.team_kpi;
            this.upteam = ret.data.upteam;
            this.upcoll = ret.data.upcoll;
          }
        }
      );
    },
    // 对碰体系
    coll_system: function() {
      this.$api.get(
        "coll_system",
        {
          token: storage.get("token"),
          uid: storage.get("uid")
        },
        {
          id: storage.get("uid")
        },
        ret => {
          console.log(ret);
          this.list = ret.data.user;
        }
      );
    },
    // 团队体系
    team_system: function() {
      this.$api.get(
        "team_system",
        {
          token: storage.get("token"),
          uid: storage.get("uid")
        },
        {
          id: storage.get("uid")
        },
        ret => {
          console.log(ret);
          this.lists = ret.data.user;
        }
      );
      this.username = [
        {
          username: "我的",
          id: storage.get("uid")
        }
      ];
    },
    chakan: function(id, index) {
      var abc = {
        username: this.list[index].username,
        id: this.list[index].id
      };
      this.username.push(abc);
      console.log(this.username);
      this.$api.get(
        "coll_system",
        {
          token: storage.get("token"),
          uid: storage.get("uid")
        },
        {
          id: id
        },
        ret => {
          console.log(ret);
          this.list = ret.data.user;
        }
      );
    },
    kan: function(id, index) {
      this.username.splice(index + 1, this.username.length);
      console.log(this.username.length);
      this.$api.get(
        "coll_system",
        {
          token: storage.get("token"),
          uid: storage.get("uid")
        },
        {
          id: id
        },
        ret => {
          console.log(ret);
          this.list = ret.data.user;
        }
      );
    }
  },
  mounted() {
    this.shequ();
    this.coll_system();
    this.team_system();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.shequs {
  padding-top: 0.6rem;
}
.heads {
  position: fixed;
  top: 0;
  left: 0;
}
.shequ {
  background: #fff;
  border-radius: 0.05rem;
  width: 92%;
  margin: 0 auto;
  padding-top: 0.1rem;
  padding-bottom: 0.15rem;
}
.xiao {
  height: 0.2rem;
  width: 0.75rem;
  background: #2782fd;
  border-radius: 0 0.04rem 0.04rem 0;
  font-size: 0.1rem;
  color: #fff;
  text-align: center;
  line-height: 0.2rem;
}
.xiao p {
  line-height: 0.2rem;
}
.zong {
  text-align: center;
  font-size: 0.14rem;
  color: #333333;
  margin-top: 0.1rem;
  margin-bottom: 0.14rem;
}
.num {
  text-align: center;
  font-size: 0.24rem;
  color: #2782fd;
  margin-bottom: 0.2rem;
}
.team {
  padding: 0 0.15rem;
  font-size: 0.13rem;
  color: #333333;
}
.teams {
  width: 92%;
  margin: 0 auto;
  margin-top: 0.15rem;
  border-radius: 0.05rem;
  background: #fff;
  padding: 0.1rem 0.15rem;
  box-sizing: border-box;
}
.ti {
  width: 52%;
  border: 0.01rem solid #aaaaaa;
  border-radius: 0.28rem;
  margin: 0 auto;
  height: 0.28rem;
  overflow: hidden;
  font-size: 0.13rem;
}
.left {
  border-radius: 0.28rem;
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
.teamlist {
  width: 100%;
}
.weizhi {
  height: 0.45rem;
  line-height: 0.45rem;
  border-bottom: 1px solid #f0f4ff;
}
.activeclass {
  color: #2782fd;
}
.list {
  border-bottom: 1px solid #f0f4ff;
  padding: 0.1rem 0;
}
.lists {
  padding: 0.1rem 0;
  border-bottom: 1px solid #f0f4ff;
}
.list1 {
  width: 40%;
}
.list2 {
  width: 30%;
}
.img {
  width: 10%;
}
.name {
  font-size: 0.15rem;
  color: #333333;
  line-height: 0.2rem;
}
.shu {
  font-size: 0.15rem;
  color: #333333;
  line-height: 0.2rem;
}
.img img {
  height: 0.16rem;
  width: auto;
  margin: 0 auto;
  margin-top: 0.12rem;
}
.weizhi {
  width: 100%;
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  height: 0.5rem;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.weizhi p {
  height: 0.5rem;
  line-height: 0.5rem;
  flex-shrink: 0;
  margin-right: 0.1rem;
}
.weizhi p {
  color: #2782fd;
  text-align: center;
}
.teamlist {
  max-height: 3rem;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.weizhi::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
.teamlist::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
</style>
