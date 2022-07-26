<template>
  <li @click="clickFn">
    <div class="house">
      <div class="pic"><img :src="`${baseUrl}${houseList.houseImg}`" /></div>
      <div class="text">
        <div class="dan">{{ houseList.title }}</div>
        <div class="desc">{{ houseList.desc }}</div>
        <div class="tag">
          <span v-for="(str, index) in houseList.tags" :key="index">{{
            str
          }}</span>
        </div>
        <div class="price">
          {{ houseList.price }}
          <span>元/月</span>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  data() {
    return {
      baseUrl: 'http://liufusong.top:8080'
    }
  },
  props: {
    houseList: {
      type: Object,
      required: true
    }
  },
  methods: {
    // 点击列表项，跳转至详情页面
    clickFn() {
      // console.log(this.houseList.houseCode)
      this.$store.commit('changeHouse', this.houseList.houseCode)
      this.$router.push({
        path: '/detail',
        query: {
          code: this.houseList.houseCode
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.house {
  box-sizing: border-box;
  height: 120px;
  padding-top: 18px;
  border-bottom: 2px solid #e5e5e5;
  display: flex;
  .pic {
    width: 106px;
    height: 80px;
    margin-right: 12px;
    margin-left: 10px;
    img {
      width: 106px;
      height: 80px;
    }
  }
  .text {
    .dan {
      font-size: 15px;
      font-weight: 700;
      margin-bottom: 3px;
    }
    .desc {
      font-size: 12px;
      color: #afb2b3;
    }
    .tag {
      font-size: 12px;
      margin: 8px 0 6px 3px;
      span {
        padding: 3px 4px;
        border-radius: 3px;
        margin-right: 5px;
        line-height: 12px;
        color: #39becd;
        background: #e1f5f8;
      }
    }
    .price {
      font-size: 16px;
      color: #fa5741;
      font-weight: 700;
      span {
        font-size: 12px;
        font-weight: normal;
      }
    }
  }
}
</style>
