<template>
  <div class="tiao">
      <p>{{name}}</p>
  </div>
</template>

<script>
import storage from 'good-storage'
import { Toast } from "vant";
export default {

  name: "tiao",
  data() {
    return {
      name: "授权中"
    };
  },
  methods: {
      login: function () {
            // storage.set('token', 'ad7a20a6646af040f1ec3a401694c2c6')
            // this.$router.push('./Index')
            
            if (this.$route.query.openid) {
                // storage.set('openid', this.$route.query.openid)
                // storage.set('cover', this.$route.query.cover)
                // storage.set('nickname', this.$route.query.nickname)
                // alert(this.$route.query.openid)
                // alert(this.$route.query.cover)
                // alert(this.$route.query.nickname)
                storage.set('openid', this.$route.query.openid)
                storage.set('cover', this.$route.query.cover)
                storage.set('nickname', this.$route.query.nickname)
                if(this.$route.query.invite){
                          this.$router.push({
                            path: './register',
                            query: { invite:this.$route.query.invite }
                            })
                }else{
                    if(storage.get("token")){
                        this.$router.push('./home')
                    }else{
                       this.$router.push('./login')
                    }
                }
                //如果连接中能拿到code说明此时access_token没有或者已过期，需要重新获取token
            }else{
                 this.$router.push('./login')
                // window.location.href = 'http://bgl.whatsfav.com/api/login/index'
            }

        },

  },
  mounted(){
    this.login()
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
