<template>
  <div class="houseDetail">
    <!-- 头部导航 -->
    <Head :title="getHouseList.community"></Head>
    <!-- 轮播图 -->
    <van-swipe
      class="my-swipe"
      :autoplay="3000"
      indicator-color="#779CBF"
      height="252"
    >
      <van-swipe-item
        v-for="(item, index) in getHouseList.houseImg"
        :key="index"
      >
        <template #default>
          <img
            class="pic"
            :src="'http://liufusong.top:8080' + item"
            style="height: 252px"
          />
        </template>
      </van-swipe-item>
    </van-swipe>
    <!-- 房屋信息数据 -->
    <div class="house-detail-info">
      <!-- 第一部分 -->
      <div class="house-place">
        <p class="house-text">{{ getHouseList.title }}</p>
        <div class="house-tags">
          <span
            class="house-tag"
            v-for="(item, index) in getHouseList.tags"
            :key="index"
            >{{ item }}</span
          >
        </div>
      </div>
      <!-- 第二部分 -->
      <div class="house-info">
        <div class="info-price">
          <p class="info-top">{{ getHouseList.price }}<span>/月</span></p>
          <p class="info-button">租金</p>
        </div>
        <div class="info-size">
          <p class="info-top">{{ getHouseList.roomType }}</p>
          <p class="info-button">房型</p>
        </div>
        <div class="info-big">
          <p class="info-top">{{ getHouseList.size }}平米</p>
          <p class="info-button">面积</p>
        </div>
      </div>
      <!-- 第三部分 -->
      <div class="house-decorate">
        <div class="decorate-left">
          <p><span>装修:</span>精装</p>
          <p><span>楼层:</span>{{ getHouseList.floor }}</p>
        </div>
        <div class="decorate-right">
          <p>
            <span>朝向:</span>
            <span v-for="(item, index) in getHouseList.oriented" :key="index">{{
              item
            }}</span>
          </p>
          <p><span>类型:</span>普通住宅</p>
        </div>
      </div>
    </div>
    <!-- 地图位置 -->
    <div class="map">
      <p>
        小区:
        <span>{{ getHouseList.community }}</span>
      </p>
      <div class="baidu-map"></div>
    </div>
    <!-- 房屋配套设施 -->
    <div class="house-uses">
      <div class="house-assort">
        <p>房屋配套</p>
      </div>
      <div class="house-simple">
        <ul>
          <li v-for="(item, index) in getHouseList.supporting" :key="index">
            <i :class="`home ${icon(item)}`"></i>
            <p>{{ item }}</p>
          </li>
        </ul>
      </div>
    </div>
    <!-- 房源概况 -->
    <div class="house-status">
      <p class="header">房源概况</p>
      <div class="owner">
        <div class="house-owner">
          <van-image
            round
            width="52px"
            height="52px"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
          />
          <div class="owner-info">
            <p>王女士</p>
            <p class="text-red">
              <i class="home home-shimingrenzheng"></i>
              已认证博主
            </p>
          </div>
        </div>
        <van-button class="btn" plain type="primary" size="small"
          >发消息</van-button
        >
      </div>
      <div class="house-text">
        {{ getHouseList.description }}
      </div>
    </div>
    <!-- 猜你喜欢 -->
    <div class="guess-favorite">
      <p>猜你喜欢</p>
      <ul>
        <List
          v-for="item in getFavoritesList"
          :key="item.houseCode"
          :houseList="item"
        ></List>
      </ul>
    </div>
    <!-- 底部导航栏-->
    <div class="house-bottom">
      <div @click="clickFavorite">
        <van-icon
          :name="isFavorite ? 'star' : 'star-o'"
          :color="isFavorite ? 'red' : ''"
        />收藏
      </div>
      <div>在线咨询</div>
      <div class="calllast">
        <a href="tel:400-618-4000">电话预约</a>
      </div>
    </div>
  </div>
</template>

<script>
import Head from '@/components/head.vue'
import List from '@/components/list.vue'
import {
  getHouse,
  getFavorites,
  getIfFavorites,
  getAddFavorites,
  getDeleteFavorites
} from '@/api'
export default {
  data() {
    return {
      getHouseList: {},
      getFavoritesList: {},
      isFavorite: false
    }
  },
  components: {
    Head,
    List
  },
  created() {
    this.getHouse()
  },
  methods: {
    async getHouse() {
      try {
        // 房屋信息
        // const res = await getHouse(this.$store.state.houseId)
        const res = await getHouse(this.$route.query.code)
        // console.log(res)
        this.getHouseList = res.data.body
        // 猜你喜欢
        const res1 = await getFavorites()
        console.log(res1)
        this.getFavoritesList = res1.data.body.slice(0, 3)
        // 是否收藏
        const res2 = await getIfFavorites(this.$route.query.code)
        console.log(res2)
        this.isFavorite = res2.data.body.isFavorite
        console.log(this.isFavorite)
      } catch (err) {
        this.$toast.fail('请重新刷新网络')
      }
    },
    icon(item) {
      switch (item) {
        case '电视':
          return 'home-dianshi'
        case '冰箱':
          return 'home-bingxiang'
        case '洗衣机':
          return 'home-xiyiji'
        case '空调':
          return 'home-air-conditioning'
        case '热水器':
          return 'home-linyu1'
        case '沙发':
          return 'home-shafa'
        case '暖气':
          return 'home-nuanqi'
        case '宽带':
          return 'home-wuxian'
        case '衣柜':
          return 'home-yigui'
        case '天然气':
          return 'home-tianranqi-01'
        default:
          return 'home-jinzhi'
      }
    },
    async clickFavorite() {
      if (this.isFavorite) {
        await getDeleteFavorites(this.$route.query.code)
        this.$toast.success('取消收藏成功')
      } else {
        await getAddFavorites(this.$route.query.code)
        this.$toast.success('收藏成功')
      }
      this.isFavorite = !this.isFavorite
    }
  }
}
</script>

<style lang="less" scoped>
.houseDetail {
  margin: 45px 0 50px;
  background-color: #f6f5f6;
  // 轮播图
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #fff;
  }
  // 房屋信息数据
  .house-detail-info {
    padding: 15px;
    background-color: #fff;
    // 第一部分
    .house-place {
      .house-text {
        font-size: 16px;
        color: #333;
      }
      .house-tags {
        display: flex;
        justify-content: space-between;
        .house-tag {
          font-size: 13px;
          color: #39becd;
          background-color: #e1f5f8;
          padding: 4px 5px;
          margin-right: 5px;
        }
        margin-bottom: 10px;
        margin-right: 50px;
      }
    }
    // 第二部分
    .house-info {
      display: flex;
      justify-content: space-around;
      border-top: 1px solid #cecece;
      border-bottom: 1px solid #cecece;
      padding: 15px 0;
      margin: 15px 0;
      p {
        margin: 0;
      }
      .info-top {
        color: #fa5741;
        font-size: 18px;
        font-weight: 700;
        margin-bottom: 5px;
      }
      .info-button {
        font-size: 14px;
        color: #999;
        text-align: center;
      }
    }
    // 第三部分
    .house-decorate {
      font-size: 14px;
      display: flex;
      .decorate-left,
      .decorate-right {
        flex: 1;
        p {
          margin: 0;
          span {
            margin-right: 5px;
          }
          span:first-child {
            color: #999;
            padding-right: 5px;
            line-height: 26px;
          }
        }
      }
    }
  }
  // 地图部分
  .map {
    background-color: #fff;
    p {
      margin-left: 10px;
      padding-top: 14px;
      font-size: 14px;
      color: #666;
      span {
        color: #333;
      }
    }
    .baidu-map {
      width: 100%;
      height: 145px;
      background-color: #fa5741;
    }
  }
  //房屋配套设施
  .house-uses {
    background-color: #fff;
    .house-assort {
      padding: 0 10px;
      p {
        margin: 0;
        font-weight: 600;
        font-size: 15px;
        margin-bottom: 10px;
        padding: 15px 0;
        border-bottom: 1px solid #cecece;
      }
    }
    .house-simple {
      ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        margin: 5px;
        li {
          i {
            font-size: 20px;
          }
          text-align: center;
          margin: 10px 0;
          width: 20%;
          p {
            margin: 0;
            font-size: 14px;
          }
        }
      }
    }
  }
  // 房源概况
  .house-status {
    // margin-bottom: 10px;
    padding: 0 10px;
    margin: 10px 0;
    background: #fff;
    p {
      margin: 0;
    }
    .header {
      font-weight: 600;
      font-size: 15px;
      margin-bottom: 20px;
      padding: 15px 0;
      border-bottom: 1px solid #cecece;
    }
    // 房主信息
    .owner {
      display: flex;
      justify-content: space-between;
      .house-owner {
        display: flex;
        .owner-info {
          margin-left: 20px;
          font-size: 14px;
          .text-red {
            i {
              font-size: 14px;
            }
            color: red;
            margin-top: 5px;
          }
        }
      }
    }
    // 文字描述
    .house-text {
      margin-top: 20px;
      font-size: 14px;
      padding-bottom: 10px;
    }
  }
  // 猜你喜欢
  .guess-favorite {
    background-color: #fff;
    padding: 0 10px;
    margin-top: 10px;
    p {
      font-weight: 600;
      margin: 0;
      font-size: 15px;
      padding: 10px 0;
      border-bottom: 1px solid #cecece;
    }
  }
  // 底部导航栏
  .house-bottom {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    line-height: 50px;
    border-top: 1px solid #cecece;
    text-align: center;
    font-size: 17px;
    color: #999;
    background-color: #fff;
    div {
      flex: 1;
      border-right: 1px solid #e8e8e9;
      &.calllast {
        background-color: #21b97a;
        color: #fff;
        a {
          text-decoration: none;
          color: #fff;
        }
      }
    }
  }
}
</style>
