<template>
  <div>
    <!-- 头部 -->
    <div class="head">
      <van-image class="bg-img" :src="require('@/assets/bg.png')" />
      <div class="myInfo">
        <div class="touxiang">
          <van-image round :src="require('@/assets/avatar.png')" />
        </div>
        <div class="userName">
          <p>游客</p>
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
        <van-grid-item>
          <template>
            <van-icon name="star-o" />
          </template>
          <span>我的收藏</span>
        </van-grid-item>
        <van-grid-item>
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
export default {}
</script>

<style lang="less" scoped>
// 头部样式
.head {
  height: 300px;
  .bg-img {
    width: 100%;
  }
  .myInfo {
    position: absolute;
    background: #fff;
    width: 80%;
    text-align: center;
    height: 25%;
    left: 50%;
    top: 135px;
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
    .userName {
      margin: -30px 0 10px;
    }
    .van-button {
      margin-top: 8px;
      padding: 0 15px;
      border-radius: 5px;
    }
  }
}
// 分类样式
.menu {
  height: 200px;
  margin-top: 10px;
  .van-icon,
  .home{
    font-size: 21px;
    margin-bottom: 6px;
  }
  span{
    font-size: 13px;
    color: #333;
    margin-bottom: 18px;
  }
}
// 广告样式
.banner{
  .joinImg{
    text-align: center;
    margin: -10px 15px 0;
  }
}
</style>
