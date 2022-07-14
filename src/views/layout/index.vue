<template>
  <div>
    <router-view></router-view>
    <div class="tabbar-bottom">
      <van-tabbar v-model="active" active-color='rgb(33, 185, 122)'>
        <van-tabbar-item to="/layout/home">
          <span>首页</span>
          <template #icon>
            <i class="home home-shouye"></i>
          </template>
        </van-tabbar-item>
        <van-tabbar-item to="/layout/search">
          <span>找房</span>
          <template #icon>
            <i class="home home-sousuo"></i>
          </template>
        </van-tabbar-item>
        <van-tabbar-item to="/layout/news">
          <span>资讯</span>
          <template #icon>
            <i class="home home-zixun"></i>
          </template>
        </van-tabbar-item>
        <van-tabbar-item to="/layout/my">
          <span>我的</span>
          <template #icon>
            <i class="home home-wode"></i>
          </template>
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style lang='less' scoped>
.tabbar-bottom{
  .van-tabbar{
    height: 50px;
    border-top: 1px solid #ddd;
    .van-tabbar-item{
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      .van-tabbar-item__text{
        font-size:10px
      }
      .home{
        font-size: 22px;
      }
    }
  }
}
</style>
