<template>
  <div class="hello">
    <van-tabbar v-model="active"  active-color="#0497F4" inactive-color="#81cbf9" route>
      <van-tabbar-item replace to="/home">
      <span>首页</span>
        <template #icon="props">
          <img :src="props.active ? icon.active : icon.inactive" />
        </template>
      </van-tabbar-item>
       <van-tabbar-item replace to="/order">
      <span>订单</span>
        <template #icon="props">
          <img :src="props.active ? icon1.active : icon1.inactive" />
        </template>
      </van-tabbar-item>
       <van-tabbar-item replace to="/my">
      <span>我的</span>
        <template #icon="props">
          <img :src="props.active ? icon2.active : icon2.inactive" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
    name: "HelloWorld",
  data() {
    return {
      active: 0,
      icon: {
        active: '../../static/image/home.png',
        inactive: '../../static/image/home1.png'
      },
      icon1: {
        active: '../../static/image/order.png',
        inactive: '../../static/image/order1.png'
      },
      icon2: {
        active: '../../static/image/my.png',
        inactive: '../../static/image/my1.png'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
