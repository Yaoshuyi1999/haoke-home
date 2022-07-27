<template>
  <van-dropdown-item :title="title" @open="openFn" ref="file" class="item">
    <template #default>
      <van-popup
        v-model="show"
        position="right"
        :style="{ width: '80%', height: '100%' }"
        get-container="body"
      >
        <van-cell
          v-for="(item, key) in ChooseType"
          :key="key"
          :title="key | titleFilters"
        >
          <template #label>
            <van-button
              v-for="(value, index) in item"
              :key="index"
              type="primary"
              size="small"
              :text="value.label"
              :class="{ active: more.includes(value.value) }"
              @click="chooseFn(key, value.value)"
            >
            </van-button>
          </template>
        </van-cell>

        <div class="cancle-confirm">
          <van-button type="default" @click="clearFn">清除</van-button>
          <van-button type="default" @click="confirmFn">确定</van-button>
        </div>
      </van-popup>
    </template>
  </van-dropdown-item>
</template>

<script>
import eventBus from './EventBus'
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    ChooseType: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      show: false,
      more: []
    }
  },
  methods: {
    openFn() {
      this.show = true
    },
    clearFn() {
      console.log('清除')
      this.more = []
      // console.log($refs.file)
    },
    confirmFn() {
      const params = this.$store.state.houseParams
      params.more = this.more.join(',')
      console.log('确认')
      this.$store.commit('changeHouseParams', params)
      this.show = false
      eventBus.$emit('sendDropdown')
    },
    // 点击相应标签
    async chooseFn(key, value) {
      console.log(1)
      console.log(key)
      console.log(value)
      if (this.more.includes(value)) {
        const index = this.more.findIndex((ele) => ele === value)
        return this.more.splice(index, 1)
      }
      this.more.push(value)
      // console.log(this.more)
    }
  },
  // 过滤器
  filters: {
    titleFilters(index) {
      switch (index) {
        case 'characteristic':
          return '房屋亮点'
        case 'floor':
          return '楼层'
        case 'oriented':
          return '朝向'
        case 'roomType':
          return '户型'
      }
    }
  }
}
</script>

<style scoped lang="less">
/deep/.active {
  color: #21b97a !important;
  background-color: #defaef !important;
}
/deep/.van-button--primary {
  background-color: #fff;
  color: #888888;
  width: 70px;
  height: 32px;
  margin: 10px 5px 10px 30px;
  border: 0;

  /deep/.van-button--hairline::after {
    border-color: black;
    border-radius: 10px;
  }
  .van-button__content {
    border: 0;
  }
}

.cancle-confirm {
  position: sticky;
  bottom: 0;
  display: flex;
  height: 50px;
  width: 100%;
  font-size: 18px;
  text-align: center;
  line-height: 50px;
  .van-button:nth-child(1) {
    height: 100%;
    flex: 35%;
    border: 1px solid #e3e5e6;
    color: #21b97a;
    background-color: #fff;
  }
  .van-button:nth-child(2) {
    height: 100%;
    flex: 70%;
    background-color: #21b97a;
    color: #fff;
  }
}
</style>
