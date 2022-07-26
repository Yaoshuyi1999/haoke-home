<template>
  <div>
    <!-- 头部搜索框 -->
    <div class="navbar">
      <van-search placeholder="请输入小区或地址" class="search">
        <template #left>
          <van-button type="default" size="small" to="/city">
            {{ $store.state.cityLabel }}
            <i class="home home-xiajiantou"></i>
          </van-button>
        </template>
      </van-search>
      <div class="ditu" @click="$router.push('/map')">
        <i class="home home-ditu"></i>
      </div>
    </div>
    <!-- 轮播图 -->
    <div class="banner">
      <van-swipe
        class="my-swipe"
        :autoplay="3000"
        indicator-color="white"
        height="212"
      >
        <van-swipe-item v-for="item in getSwiperList" :key="item.id">
          <template #default>
            <img
              class="pic"
              :src="'http://liufusong.top:8080' + item.imgSrc"
              style="height: 212px"
            />
          </template>
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
      <van-grid-item to="/map">
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
  data() {
    return {
      getSwiperList: {},
      getGroupsList: {},
      test: ''
    }
  },
  created() {
    this.getSwiper()
    this.getGroups()
  },
  methods: {
    async getSwiper() {
      try {
        const res = await getSwiper()
        // console.log(res.data.body)
        this.getSwiperList = res.data.body
      } catch (err) {
        this.$toast.fail('请重新刷新网络')
      }
    },
    async getGroups() {
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

<style lang="less" scoped>
// 头部搜索的样式
.navbar {
  padding: 0 0.125rem;
  position: absolute;
  top: 0.3125rem;
  z-index: 999;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  .van-search {
    background-color: unset;
  }
  .search {
    flex: 1;
    van-button {
      height: 100%;
    }
  }
  .ditu {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border: 0.025rem solid rgb(255, 255, 255);
    line-height: 25px;
    .home-ditu {
      display: flex;
      justify-content: center;
      font-size: 20px;
      color: #fff;
    }
  }
}
// 分类选择
.choose {
  margin-top: 0.125rem;
  i {
    // background-color: rgb(224, 70, 13);
    background-color: rgb(242, 251, 247);
    font-size: 34px;
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
