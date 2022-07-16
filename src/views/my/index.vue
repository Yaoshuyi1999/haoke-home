<template>
  <div class="box">
    <!-- 头部 -->
    <div class="head logining" v-if="isLogin">
      <van-image class="bg-img" :src="require('@/assets/avataring.png')" />
      <div class="myInfo">
        <div class="touxiang">
          <img round :src="`${base}${userInfo.avatar}`"  class="ht_img"/>
        </div>
        <div class="userName">
          <span>{{ userInfo.nickname }}</span>
        </div>
        <div class="button">
          <van-button type="primary" size="mini" @click="logout"
            >退出</van-button
          >
        </div>
        <div class="persondata">
          <span>编辑个人资料</span>
          <van-icon name="play" />
        </div>
      </div>
    </div>
    <div class="head nologin" v-else>
      <van-image class="bg-img" :src="require('@/assets/bg.png')" />
      <div class="myInfo">
        <div class="touxiang">
          <van-image round :src="require('@/assets/avatar.png')" />
        </div>
        <div class="userName">
          <span>游客</span>
        </div>
        <div class="button">
          <van-button type="primary" url="#/login" size="small"
            >去登录</van-button
          >
        </div>
      </div>
    </div>
    <!-- 分类 -->
    <div class="menu">
      <van-grid :column-num="3">
        <van-grid-item to='/favorate'>
          <template>
            <van-icon name="star-o" />
          </template>
          <span>我的收藏</span>
        </van-grid-item>
        <van-grid-item to='/rent'>
          <template>
            <van-icon name="wap-home-o" />
          </template>
          <span>我的出租</span>
        </van-grid-item>
        <van-grid-item>
          <template>
            <i class="home home-jilu"></i>
          </template>
          <span>看房记录</span>
        </van-grid-item>
        <van-grid-item>
          <template>
            <i class="home home-identity-card"></i>
          </template>
          <span>成为房主</span>
        </van-grid-item>
        <van-grid-item>
          <template>
            <i class="home home-wode"></i>
          </template>
          <span>个人资料</span>
        </van-grid-item>
        <van-grid-item>
          <template>
            <i class="home home-lianxiwomen"></i>
          </template>
          <span>联系我们</span>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 广告 -->
    <div class="banner">
      <van-image class="joinImg" :src="require('@/assets/join.png')" />
    </div>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
export default {
  data () {
    return {
      userInfo: {},
      base: 'http://liufusong.top:8080'
    }
  },
  computed: {
    isLogin () {
      // console.log(this.$store.state.user.token)
      return !!this.$store.state.user
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    logout () {
      this.$dialog
        .confirm({
          title: '提示',
          message: '是否确认退出?',
          width: 270,
          confirmButtonColor: '#62b5f0',
          confirmButtonText: '退出'
        })
        .then(() => {
          this.$store.commit('setUser', '')
        })
        .catch(() => {})
    },
    async getUserInfo () {
      const res = await getUserInfo()
      console.log(res)
      this.userInfo = res.data.body
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  margin-bottom: 60px;
}
// 头部样式
.head {
  .bg-img {
    width: 100%;
  }
  .myInfo {
    position: absolute;
    background: #fff;
    width: 80%;
    text-align: center;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 0 0 10px 3px #ddd;
    padding: 0 10px;
    font-size: 13px;
    .touxiang {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      transform: translateY(-50%);
      border: 5px solid #f5f5f5;
      box-shadow: 0 2px 2px #bdbdbd;
      margin: 0 auto;
    }
  }
}
.nologin {
  height: 300px;
  .myInfo {
    height: 25%;
    top: 135px;
  }
  .userName {
    margin: -15px 0 10px;
  }
  .van-button {
    margin-top: 8px;
    padding: 0 15px;
    border-radius: 5px;
  }
}
.logining {
  .myInfo {
    height: 32%;
    top: 170px;
  }
  .userName {
    margin: -20px 0 3px;
  }
  .van-button {
    padding: 0 10px;
    border-radius: 30px;
  }
  .van-button--mini {
    height: 20px;
  }
  .persondata {
    margin-top: 20px;
    color: #999;
    font-size: 12px;
  }
}
// 分类样式
.menu {
  height: 200px;
  margin-top: 10px;
  .van-icon,
  .home {
    font-size: 21px;
    margin-bottom: 6px;
  }
  span {
    font-size: 13px;
    color: #333;
    margin-bottom: 18px;
  }
}
// 广告样式
.banner {
  .joinImg {
    text-align: center;
    margin: -10px 15px 0;
  }
}
// 后台请求回来的图片
.ht_img{
  width: 60px;
  height: 60px;
}
</style>
