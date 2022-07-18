<template>
  <div>
    <!-- 头部搜索框 -->
    <div class="navbar">
      <van-search placeholder="请输入小区或地址" class="search">
        <template #left>
          <van-button type="default" size="small" to="/city">
            上海
            <i class="home home-xiajiantou"></i>
          </van-button>
        </template>
      </van-search>
      <div class="ditu">
        <i class="home home-ditu"></i>
      </div>
    </div>
    <!-- 轮播图 -->
    <div class="banner">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in getSwiperList" :key="item.id">
          <img :src="'http://liufusong.top:8080' + item.imgSrc" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 分类选择 -->
    <van-grid class="choose">
      <van-grid-item to="/layout/search">
        <template #icon>
          <i class="home home-shouye1"></i>
        </template>
        <template #text>
          <p>整租</p>
        </template>
      </van-grid-item>
      <van-grid-item to="/layout/search">
        <template #icon>
          <i class="home home-pengyou"></i>
        </template>
        <template #text>
          <p>合租</p>
        </template>
      </van-grid-item>
      <van-grid-item to='/map'>
        <template #icon>
          <i class="home home-dituzhaofang"></i>
        </template>
        <template #text>
          <p>地图找房</p>
        </template>
      </van-grid-item>
      <van-grid-item to="/rent/add">
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
      <van-grid :column-num="2" :gutter="10">
        <van-grid-item v-for="item in getGroupsList" :key="item.id">
          <img
            :src="'http://liufusong.top:8080' + item.imgSrc"
            class="left_img"
          />
          <span class="right_text">
            <p>{{ item.title }}</p>
            <p>{{ item.desc }}</p>
          </span>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getSwiper, getGroups } from '@/api'
export default {
  data () {
    return {
      getSwiperList: {},
      getGroupsList: {}
    }
  },
  created () {
    this.getSwiper()
    this.getGroups()
  },
  methods: {
    async getSwiper () {
      try {
        const res = await getSwiper()
        // console.log(res.data.body)
        this.getSwiperList = res.data.body
      } catch (err) {
        this.$toast.fail('请重新刷新网络')
      }
    },
    async getGroups () {
      try {
        const res = await getGroups()
        // console.log(res)
        this.getGroupsList = res.data.body
      } catch (err) {
        this.$toast.fail('请重新刷新网络')
      }
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
    .van-button--default {
      border: none;
      padding-right: 10px;
      border-right: 1px solid #888;
      i{
        font-size: 12px;
      }
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
  height: 212px;
  img {
    height: 212px;
  }
  :deep(.van-swipe__indicator) {
    background-color: #ccc;
  }
  :deep(.am-carousel-wrap-dot-active > span) {
    background-color: #888;
  }
}
// 分类选择
.choose {
  margin-top: 10px;
  i {
    // background-color: rgb(224, 70, 13);
    background-color: rgb(242, 251, 247);
    font-size: 36px;
    padding: 10px;
    border-radius: 50%;
    color: rgb(2, 174, 102);
  }
  .van-grid-item__content {
    p {
      font-size: 15px;
      margin-top: 18px;
    }
  }
}
// 租房小组
.group {
  background-color: #f6f5f6;
  :deep(.van-cell-group) {
    background-color: #f6f5f6;
  }
  .van-cell {
    background-color: #f6f5f6;
    .van-cell__title {
      font-weight: bold;
    }
  }
  :deep(.van-grid-item__content) {
    display: flex;
    -webkit-flex-direction: unset;
    flex-direction: unset;
    padding: 10px 0 20px;
    justify-content: left;
    .left_img {
      width: 50px;
      height: 50px;
      margin: 0 10px;
    }
    .right_text {
      font-size: 14px;
      color: #333;
      p {
        margin: 0;
      }
    }
  }
}
</style>
