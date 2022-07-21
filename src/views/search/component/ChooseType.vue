<template>
  <van-dropdown-item :title="title" @open="openFn">
    <template #default>
      <van-popup
        v-model="show"
        position="right"
        :style="{ width: '80%', height: '100%' }"
        class="popup"
        :get-container="getContainer"
        :overlay="false"
      >
        <van-cell
          v-for="(item, key) in ChooseType"
          :key="key"
          :title="key | titleFilters"
        >
          <template #label>
            <van-grid :column-num="2">
              <van-grid-item
                v-for="(value, index) in item"
                :key="index"
                :text="value.label"
              >
              </van-grid-item>
            </van-grid>
          </template>
        </van-cell>

        <div class="btn">
          <van-button type="default">清除</van-button>
          <van-button type="default">确定</van-button>
        </div>
      </van-popup>
    </template>
  </van-dropdown-item>
</template>

<script>
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
  data () {
    return {
      show: false
    }
  },
  methods: {
    openFn () {
      this.show = true
    }
  },
  // 过滤器
  filters: {
    titleFilters (index) {
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
/deep/.van-dropdown-item {
  z-index: 999;
}
.popup {
  .van-cell {
    font-size: 15px;
    color: #333;
  }
  .van-grid {
    padding: 0;
    width: 80%;
    border-bottom: 1px solid #ddd;
    padding: 0 40px 10px 0;
  }
  .van-cell__label {
    margin: 10px 10px 0 30px;
  }
  /deep/.van-grid-item__text {
    font-size: 12px;
    color: #888;
    height: 32px;
    width: 70px;
    border: 1px solid #ddd;
    text-align: center;
    line-height: 32px;
    margin-bottom: 15px;
  }
  /deep/.van-grid-item__content {
    padding: 0;
    margin: 0;
  }
  .btn {
    width: 100%;
    height: 50px;
    position: sticky;
    bottom: 0;
    z-index: 999;
    button {
      height: 100%;
      font-size: 18px;
    }
    button:first-child {
      width: 35%;
      color: #21b97a;
    }
    button:last-child {
      width: 65%;
      background-color: #21b97a;
      color: #fff;
    }
  }
}
</style>
