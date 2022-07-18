<template>
  <div class="box">
    <van-nav-bar
      :title="title"
      @click-left="goBack"
      class="navbar"
      style="height: 45px"
      fixed
    >
      <template #left>
        <van-icon name="arrow-left" />
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  props: ['title'],
  methods: {
    goBack () {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
.navbar {
  z-index: 999;
  background-color: #21b97a;
  :deep(.van-nav-bar__title) {
    color: #fff;
    font-size: 18px;
  }
  .van-icon {
    color: #fff;
  }
}
</style>
