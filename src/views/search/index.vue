<template>
  <div>
    <!-- 头部搜索 -->
    <div class="navbar">
      <van-nav-bar title="标题" left-text="返回" left-arrow>
        <template #left>
          <div class="back">
            <van-icon name="arrow-left" />
          </div>
        </template>
        <template #title>
          <van-search placeholder="请输入小区或地址" class="search">
            <template #left>
              <van-button type="default" size="small" to="/city">
                {{ $store.state.cityLabel }}
                <i class="home home-xiajiantou"></i>
              </van-button>
            </template>
          </van-search>
        </template>
        <template #right>
          <div class="ditu">
            <i class="home home-ditu"></i>
          </div>
        </template>
      </van-nav-bar>
    </div>
    <!-- 分类选择 -->
    <div class="choose">
      <van-dropdown-menu active-color="#21b97a">
        <DropdownMenu title="区域" :DropdownMenu="address"></DropdownMenu>
        <DropdownMenu title="方式" :DropdownMenu="rentType"></DropdownMenu>
        <DropdownMenu title="租金" :DropdownMenu="price"></DropdownMenu>
        <ChooseType title="筛选" :ChooseType="chooseType"></ChooseType>
      </van-dropdown-menu>
    </div>
    <!-- 列表 -->
  </div>
</template>

<script>
import { getCondition } from '@/api'
import DropdownMenu from './component/DropdownMenu.vue'
import ChooseType from './component/ChooseType'
export default {
  components: {
    DropdownMenu,
    ChooseType
  },
  data () {
    return {
      getConditionList: {}, // 得到的所有筛选数据
      price: [], // 表示的是租金的选项
      rentType: [], // 表示的是方式的选项
      address: [], // 表示的是区域的选项
      chooseType: {} // 表示的是筛选的选项
    }
  },
  created () {
    this.getCondition()
  },
  methods: {
    goBack () {
      this.$router.back()
    },
    async getCondition () {
      try {
        const res = await getCondition()
        this.getConditionList = res.data.body
        console.log(this.getConditionList)
        // 进行数据的变化
        this.jieGou(this.getConditionList)
      } catch (err) {
        this.$toast.fail('请重新刷新网络')
      }
    },
    jieGou (value) {
      let {
        area, // 区域
        characteristic, // 房屋亮点
        floor, // 楼层
        oriented, // 朝向
        price, // 租金
        rentType, // 方式
        roomType, // 户型
        subway // 地铁
      } = value

      // 区域
      // console.log(this.address)
      area = this.panduan('children', area)
      subway = this.panduan('children', subway)
      this.address = [area, subway]
      // 租金
      this.price = price
      // 方式
      this.rentType = rentType
      // 筛选
      this.chooseType.roomType = roomType
      this.chooseType.oriented = oriented
      this.chooseType.floor = floor
      this.chooseType.characteristic = characteristic
      console.log(this.chooseType)
    },
    // 判断是否有children的存在，如果不存在则添加
    panduan (k, obj) {
      const flag = k in obj
      if (flag) {
        for (const key in obj.children) {
          this.panduan(k, obj.children[key])
        }
      } else {
        obj.children = [
          {
            label: '不限',
            value: 'null'
          }
        ]
      }
      return obj
    }
  }
}
</script>

<style lang="less" scoped>
// 头部搜索样式
.navbar {
  background-color: #21b97a;
  height: 46px;
  padding: 0 10px;
  .van-nav-bar {
    background-color: unset;
    :deep(.van-nav-bar__left) {
      padding: 0;
      .van-icon {
        color: #fff;
        font-size: 16px;
      }
    }
    .van-nav-bar__right {
      .ditu {
        border: 2.5px solid #fff;
        border-radius: 50%;
        .home {
          padding: 3px;
          color: #fff;
          font-size: 15px;
        }
      }
    }
    :deep(.van-nav-bar__title) {
      max-width: 76%;
      height: 34px;
      margin: 0 30px;
      .search {
        padding: 0;
      }
    }
  }
}
</style>
