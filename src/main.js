// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant';
import axios from 'axios'
import api from './api/index.js'
import 'vant/lib/index.css';
import '../static/script/font.js'
import '../src/assets/style.css';
import 'swiper/js/swiper.min.js'
import 'swiper/css/swiper.min.css'
import wx from 'weixin-js-sdk'
Vue.prototype.$wx = wx
Vue.prototype.$api = api
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data;'
Vue.prototype.$http = axios
Vue.use(Vant)
Vue.config.productionTip = false
// 复制
import Clipboard from 'clipboard'; 
Vue.prototype.Clipboard=Clipboard;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
