<template>
  <div class="dizhi">
    <app-header :name="name" :image="image" class="heads"></app-header>
    <van-cell-group>
      <van-field v-model="names" type="text" label="姓名：" placeholder="请输入姓名" />
      <van-field v-model="phone" type="tel" label="联系方式：" placeholder="请输入联系方式" />
       <van-field label="所在区域：" :value="value" readonly @click="showPopup" />
      <van-field v-model="address" rows="1" autosize label="详细地址：" type="textarea" placeholder="请输入详细地址" />
      <van-switch-cell v-model="checked" title="设为默认" />
    </van-cell-group>
    
    <van-popup
  v-model="show"
  :close-on-click-overlay='hide'
  :closeable='hides'
  position="bottom"
  :style="{ height: '30%' }"
><van-area :area-list="areaList" :value="values" @cancel='cancel' @confirm='confirm' /></van-popup>
   
    <div class="tijiao">
      <p @click="onSave">保存</p>
    </div>
  </div>
</template>

<script>
import storage from 'good-storage'
import Header from "../components/Header";
import { AddressEdit } from 'vant';
import { Toast } from "vant";
import { Area } from 'vant';
import { Popup } from 'vant';
import { Dialog } from 'vant';
import areaList from '../../static/script/area'
export default {
  components: {
    "app-header": Header
  },
  name: "bang",
  data() {
    return {
      image: require("../../static/image/left.png"),
        name: '编辑收货地址',
        areaList:areaList,
      searchResult: [],
         checked: true,
      names: '',
      phone: '',
      provinces: '',
      address: '',
      show: false,
      hide:false,
      hides:false,
      value:'请选择所在区域',
      values:'',
      province:'',
      checked:''
    };
  },
  methods: {
   onSave(content) {

      console.log(content)
       if(this.checked){
          var isDefault=1
         }else{
           var isDefault=2
         }
         console.log(isDefault)
          this.$api.put('address', {
              token: storage.get('token'),
        uid: storage.get('uid')
          }, {
         area:'123',
          name:this.names,
         phone:this.phone,
         province:this.province,
         city:this.city,
         county:this.county,
         address:this.address,      
         is_default:isDefault,   
         aid:this.$route.query.id
       },
                ret => {
                    console.log(ret)
                    if(ret.code=='1'){
                         this.$router.push("./dizhi")
                         setTimeout(()=>{

                        Toast({
                            message: ret.msg,
                            position: "bottom",
                            duration: 300
                            });
                        },100)
        
                      
                      
                    }else{
                       Toast({
                        message:ret.msg,
                        position:'bottom',
                        duration:300
                      });
                    }
                }
            )
    },
       showPopup:function () {
      this.show=true
    },
    cancel:function(){
      this.show=false
    },
    confirm:function(e){
      console.log(e)
      this.show=false
      console.log(e[0].name)
      if(e[0].name){
       this.province=e[0].name
        this.city=e[1].name
       this.county=e[2].name
        this.value=e[0].name+'/'+e[1].name+'/'+e[2].name
      }    
    },
    dizhi:function(){
        console.log(this.searchResult)
        this.$api.get(
        "address",
        {
          token: storage.get("token"),
          uid: storage.get("uid")
        },
        {
            aid:this.$route.query.id
        },
        ret => {
          console.log(ret);
       
         
              this.names=ret.data.name
              this.phone=ret.data.phone
              this.province=ret.data.province
              this.city=ret.data.city
              this.county=ret.data.county
             
              this.address=ret.data.address
            this.value=this.province+'/'+this.city+'/'+this.county
              if(ret.data.is_default==1){
                this.checked=true
              }else{
                this.checked=false
              }
        console.log(this.checked)
        
        }
      );
    }
   
  },
  mounted(){
      this.dizhi()
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
.tijiao p{
   line-height: 0.4rem;
}
</style>