<template>
  <div>
    <!-- 头部搜索框 -->
    <div class="navbar">
      <van-search v-model="value" placeholder="请输入搜索关键词" class="search">
        <template #left>
          <van-dropdown-menu>
            <van-dropdown-item v-model="value1" :options="option1" />
          </van-dropdown-menu>
        </template>
      </van-search>
      <div class="ditu">
        <i class="home home-ditu"></i>
      </div>
    </div>
    <!-- 轮播图 -->
    <div class="banner">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item>
          <img v-lazy="image" />
        </van-swipe-item>
        <van-swipe-item>2</van-swipe-item>
        <van-swipe-item>3</van-swipe-item>
        <van-swipe-item>4</van-swipe-item>
      </van-swipe>
    </div>
    <!-- 分类选择 -->
    <van-grid class="choose">
      <van-grid-item>
        <template #icon>
          <i class="home home-shouye1"></i>
        </template>
        <template #text>
          <p>整租</p>
        </template>
      </van-grid-item>
      <van-grid-item>
        <template #icon>
          <i class="home home-pengyou"></i>
        </template>
        <template #text>
          <p>合租</p>
        </template>
      </van-grid-item>
      <van-grid-item>
        <template #icon>
          <i class="home home-dituzhaofang"></i>
        </template>
        <template #text>
          <p>地图找房</p>
        </template>
      </van-grid-item>
      <van-grid-item>
        <template #icon>
          <i class="home home-zufang"></i>
        </template>
        <template #text>
          <p>去出租</p>
        </template>
      </van-grid-item>
    </van-grid>
    <!-- 租房小组 -->
    <div class="group">
      <van-cell-group>
        <van-cell title="租房小组" value="更多" />
      </van-cell-group>
      <van-grid :column-num="2">
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
      </van-grid>
    </div>
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

<style scoped lang="less">
// 头部搜索的样式
.navbar {
  position: absolute;
  top: 25px;
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  display: flex;
  z-index: 999;
  align-items: center;
  .search {
    flex: 1;
    height: 32px;
    margin: 0 10px;
    padding: 0 5px;
    border-radius: 3px;
    background-color: rgb(255, 255, 255);
    font-size: 13px;
    .van-search__content {
      margin-left: 20px;
      height: 100%;
    }
    :deep(.van-dropdown-menu__bar) {
      height: 0;
    }
  }
  .ditu {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid rgb(255, 255, 255);
    margin-top: 5px;
    .home-ditu {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 18px;
      color: #fff;
    }
  }
}
// 轮播图
.banner {
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }
}
// 分类选择
.choose {
  i {
    background-color: rgb(242, 251, 247);
    font-size: 24px;
    padding: 10px;
    border-radius: 50%;
    color: rgb(2, 174, 102);
    font-weight: 700;
  }
  .van-grid-item__content {
    p {
      font-size: 14px;
      margin-top: 18px;
    }
  }
}
// 租房小组
.group {
  background-color: #f6f5f6;
  padding: 0 10px;
  :deep(.van-cell-group) {
    background-color: #f6f5f6;
  }
  .van-cell {
    background-color: #f6f5f6;
    .van-cell__title {
      font-weight: bold;
    }
  }
}
</style>
