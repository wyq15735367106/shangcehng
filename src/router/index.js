import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import tiao from '@/components/tiao'
import home from '@/components/home'
import register from '@/components/register'
import order from '@/components/order'
import Forget from '@/components/Forget'
import my from '@/components/my'
import bangzhu from '@/components/bangzhu'
import gonggao from '@/components/gonggao'
import gonggaoxingqing from '@/components/gonggaoxingqing'
import qianbao from '@/components/qianbao'
import shequ from '@/components/shequ'
import shopxingqing from '@/components/shopxingqing'
import dingdanxingqing from '@/components/dingdanxingqing'
import dizhi from '@/components/dizhi'
import tianjiashouhuodizhi from '@/components/tianjiashouhuodizhi'
import fankui from '@/components/fankui'
import shezhi from '@/components/shezhi'
import xiugaimima from '@/components/xiugaimima'
import erjimima from '@/components/erjimima'
import tixian from '@/components/tixian'
import zhuan1 from '@/components/zhuan1'
import zhuan2 from '@/components/zhuan2'
import zhuan3 from '@/components/zhuan3'
import fukuan from '@/components/fukuan'
import bianjidizhi from '@/components/bianjidizhi'
import yaoqing from '@/components/yaoqing'
import shopxingqing2 from '@/components/shopxingqing2'
import dizhi2 from '@/components/dizhi2'
import shiming from '@/components/shiming'
import bang from '@/components/bang'
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: '跳转',
      component: tiao
    },
    {
      path: '/login',
      name: '登录',
      component: login
    },
    {
      path: '/home',
      name: '首页',
      component: home
    },
    {
      path: '/register',
      name: '注册',
      component: register
    },
    {
      path: '/Forget',
      name: '忘记密码',
      component: Forget
    },
    {
      path: '/order',
      name: '订单',
      component: order
    },
    {
      path: '/my',
      name: '我的',
      component: my
    },
    {
      path: '/bangzhu',
      name: '帮助中心',
      component: bangzhu
    },
    {
      path: '/gonggao',
      name: '公告',
      component: gonggao
    },
    {
      path: '/gonggaoxingqing',
      name: '公告详情',
      component: gonggaoxingqing
    },
    {
      path: '/qianbao',
      name: '我的钱包',
      component: qianbao
    },
    {
      path: '/shequ',
      name: '我的社区',
      component: shequ
    },
    {
      path: '/shopxingqing',
      name: '升级商品详情',
      component: shopxingqing
    },
    {
      path: '/dingdanxingqing',
      name: '订单详情',
      component: dingdanxingqing
    },
    {
      path: '/dizhi',
      name: '地址列表',
      component: dizhi
    },
    {
      path: '/tianjiashouhuodizhi',
      name: '添加收货地址',
      component: tianjiashouhuodizhi
    },
    {
      path: '/fankui',
      name: '意见反馈',
      component: fankui
    },
    {
      path: '/shezhi',
      name: '设置',
      component: shezhi
    },
    {
      path: '/xiugaimima',
      name: '设置',
      component: xiugaimima
    },
    {
      path: '/erjimima',
      name: '设置',
      component: erjimima
    },
    {
      path: '/tixian',
      name: '提现',
      component: tixian
    },
    {
      path: '/zhuan1',
      name: '支付包',
      component: zhuan1
    },
    {
      path: '/zhuan2',
      name: '银行卡',
      component: zhuan2
    },
    {
      path: '/zhuan3',
      name: '转账',
      component: zhuan3
    },
    {
      path: '/fukuan',
      name: '立即付款',
      component: fukuan
    },
    {
      path: '/bianjidizhi',
      name: '编辑收货地址',
      component: bianjidizhi
    },
    {
      path: '/yaoqing',
      name: '邀请',
      component: yaoqing
    },
    {
      path: '/shopxingqing2',
      name: '商品详情',
      component: shopxingqing2
    },
    {
      path: '/dizhi2',
      name: '地址列表2',
      component: dizhi2
    },
    {
      path: '/shiming',
      name: '实名认证',
      component: shiming
    },
    {
      path: '/bang',
      name: '绑定手机号',
      component: bang
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
