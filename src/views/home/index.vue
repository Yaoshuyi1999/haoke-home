<template>
  <div>
    <!-- 头部搜索框 -->
      <van-nav-bar class="navbar" style="height: 45px">
        <template #title>
          <van-search placeholder="请输入小区或地址">
            <template #left>
              <van-dropdown-menu>
                <van-dropdown-item v-model="value1" :options="option1" />
              </van-dropdown-menu>
            </template>
          </van-search>
        </template>
        <template #right>
          <i class="home home-ditu"></i>
        </template>
      </van-nav-bar>
    <!-- 轮播图 -->
    <div></div>
    <!-- 分类选择 -->
    <!-- 展示 -->
  </div>
</template>

<script>
export default {}
</script>

<style></style>
