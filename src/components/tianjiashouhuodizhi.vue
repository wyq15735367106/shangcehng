<template>
  <div class="dizhi">
    <app-header :name="name" :image="image" class="heads"></app-header>
    <van-cell-group>
      <van-field
        v-model="names"
        type="text"
        label="姓名："
        placeholder="请输入姓名"
      />
      <van-field
        v-model="phone"
        type="tel"
        label="联系方式："
        placeholder="请输入联系方式"
      />
      <van-field
        label="所在区域："
        :value="value"
        readonly
        @click="showPopup"
      />
      <van-field
        v-model="address"
        rows="1"
        autosize
        label="详细地址："
        type="textarea"
        placeholder="请输入详细地址"
      />
      <van-switch-cell v-model="checked" title="设为默认" />
    </van-cell-group>

    <van-popup
      v-model="show"
      :close-on-click-overlay="hide"
      :closeable="hides"
      position="bottom"
      :style="{ height: '30%' }"
      ><van-area
        :area-list="areaList"
        :value="values"
        @cancel="cancel"
        @confirm="confirm"
    /></van-popup>

    <div class="tijiao">
      <p @click="onSave">保存</p>
    </div>
  </div>
</template>

<script>
import storage from "good-storage";
import Header from "../components/Header";
import { AddressEdit } from "vant";
import { Toast } from "vant";
import { Area } from "vant";
import { Popup } from "vant";
import areaList from "../../static/script/area";
export default {
  components: {
    "app-header": Header
  },
  name: "bang",
  data() {
    return {
      image: require("../../static/image/left.png"),
      name: "添加收货地址",
      areaList: areaList,
      searchResult: [],
      checked: true,
      names: "",
      phone: "",
      provinces: "",
      address: "",
      show: false,
      hide: false,
      hides: false,
      value: "请选择所在区域",
      values: "",
      province: "",
      checked: true,
      act: "",
      ive: "",
      shopid: "",
      is_upgrade: "",
      is_buy: "",
      shopid: "",
      nums: ""
    };
  },
  methods: {
    onSave() {
      if (this.checked) {
        var isDefault = 1;
      } else {
        var isDefault = 2;
      }
      this.$api.post(
        "address",
        {
          token: storage.get("token"),
          uid: storage.get("uid")
        },
        {
          name: this.names,
          phone: this.phone,
          province: this.province,
          city: this.city,
          county: this.county,
          address: this.address,
          is_default: isDefault,
          area: "123"
        },
        ret => {
          console.log(ret);
          if (ret.code == "1") {
            Toast({
              message: ret.msg,
              position: "bottom",
              duration: 300
            });
            if (this.$route.query.shopid) {
              this.$router.push({
                path: "./dizhi2",
                query: {
                  shopid: this.shopid,
                  act: this.act,
                  ive: this.ive,
                  nums: this.nums,
                  is_buy: this.is_buy,
                  is_upgrade: this.is_upgrade
                }
              });
            } else {
              this.$router.push("./dizhi");
              //  this.$router.back()
            }
          } else {
            Toast({
              message: ret.msg,
              position: "bottom",
              duration: 300
            });
          }
        }
      );
    },
    showPopup: function() {
      this.show = true;
    },
    cancel: function() {
      this.show = false;
    },
    confirm: function(e) {
      console.log(e);
      this.show = false;
      console.log(e[0].name);
      if (e[0].name) {
        this.province = e[0].name;
        this.city = e[1].name;
        this.county = e[2].name;
        this.value = e[0].name + "/" + e[1].name + "/" + e[2].name;
      }
    },
    dizhixin: function() {
      if (this.$route.query.shopid) {
        this.shopid = this.$route.query.shopid;
        this.act = this.$route.query.act;
        this.ive = this.$route.query.ive;
        this.nums = this.$route.query.nums;
        this.is_buy = this.$route.query.is_buy;
        this.is_upgrade = this.$route.query.is_upgrade;
      }
    }
  },
  mounted() {
    this.dizhixin();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
.tijiao p {
  line-height: 0.4rem;
}
</style>
