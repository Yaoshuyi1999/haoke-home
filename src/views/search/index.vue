<template>
  <div>
    <!-- 头部搜索 -->
    <van-nav-bar @click-left="goBack" class="navbar" style="height: 45px">
      <template #title>
        <van-search placeholder="请输入小区或地址">
          <template #left>
            <van-dropdown-menu>
              <van-dropdown-item v-model="value1" :options="option1" />
            </van-dropdown-menu>
          </template>
        </van-search>
      </template>
      <template #left>
        <van-icon name="arrow-left" />
      </template>
      <template #right>
        <i class="home home-ditu"></i>
      </template>
    </van-nav-bar>
    <!-- 分类选择 -->
    <!-- 列表 -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      value1: 0,
      option1: [
        { text: '上海', value: 0 },
        { text: '杭州', value: 1 },
        { text: '苏州', value: 2 }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
// 头部搜索样式
.navbar {
  background-color: #21b97a;
  :deep(.van-nav-bar__title) {
    color: #fff;
    font-size: 18px;
  }
  .van-icon{
    color: #fff;
    font-size: 16px;
  }
  .home {
    color: #fff;
  }
  .van-search {
    height: 35px;
    line-height: 35px;
    background-color: rgb(196, 38, 38);
  }
}
</style>
