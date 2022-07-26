<template>
  <div class="box">
    <div class="plot">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @cancel="cancelFn"
        @input="inputFn"
      />
    </div>
    <van-cell-group>
      <van-cell
        :title="item.communityName"
        v-for="item in getCommunityList"
        :key="item.community"
        @click="returnFn(item)"
      />
    </van-cell-group>
  </div>
</template>

<script>
import { getCommunity } from '@/api'
export default {
  data() {
    return {
      value: '',
      getCommunityList: []
    }
  },
  methods: {
    cancelFn() {
      this.$router.go(-1)
    },
    async inputFn() {
      const res = await getCommunity({
        name: this.value,
        id: this.$store.state.cityId
      })
      // console.log(res)
      this.getCommunityList = res.data.body
      console.log(this.getCommunityList)
    },
    returnFn(item) {
      // console.log(item)
      // console.log(item.communityName, 1)
      // console.log(item.community, 2)
      this.$store.commit('changeAreaName', item.communityName)
      this.$store.commit('changeAreaId', item.community)
      this.$router.push('/rent/add')
    }
  }
}
</script>

<style lang="less" scoped>
.plot {
  background-color: #f6f5f6;
  height: 44px;
  box-sizing: border-box;
  .van-search {
    background-color: #f6f5f6;
  }
  .van-search__content {
    background-color: #fff;
  }
  .van-field__control {
    height: 28px;
  }
}
</style>
