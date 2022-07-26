<template>
  <div class="main-content">
    <!-- 头部导航区域 -->
    <van-nav-bar
      title="发布房源"
      @click-left="$router.push('/')"
      class="navbar"
      style="height: 45px"
      fixed
    >
      <template #left>
        <van-icon name="arrow-left" />
      </template>
    </van-nav-bar>
    <!-- 房源信息区域 -->
    <div class="container">
      <van-cell-group>
        <!-- 房源信息的名称 -->
        <van-cell class="house-date" title="房源信息" />
        <van-cell title="小区名称" is-link @click="$router.push('/rent/plot')">
          <span v-if="$store.state.areaName">{{ $store.state.areaName }}</span>
          <span v-else>请输入小区名称</span>
        </van-cell>
        <van-field v-model="price" label="租金" placeholder="请输入租金/月">
          <template #right-icon>￥/月</template>
        </van-field>
        <van-field v-model="size" label="建筑面积" placeholder="请输入建筑面积">
          <template #right-icon>m²</template>
        </van-field>
        <!-- 户型 -->
        <van-field
          readonly
          clickable
          label="户型"
          :value="roomType"
          is-link
          input-align="right"
          placeholder="请选择"
          @click="PickRoomType = true"
        />
        <van-popup v-model="PickRoomType" position="bottom">
          <van-picker
            show-toolbar
            value-key="label"
            :columns="getParamsList.roomType"
            @cancel="PickRoomType = false"
            @confirm="confirmRoomType"
          />
        </van-popup>
        <!-- 所在楼层 -->
        <van-field
          readonly
          clickable
          label="所在楼层"
          :value="floor"
          is-link
          input-align="right"
          placeholder="请选择"
          @click="PickFloor = true"
        />
        <van-popup v-model="PickFloor" position="bottom">
          <van-picker
            value-key="label"
            show-toolbar
            :columns="getParamsList.floor"
            @cancel="PickFloor = false"
            @confirm="confirmFloor"
          />
        </van-popup>
        <!-- 朝向 -->
        <van-field
          readonly
          clickable
          label="朝向"
          :value="oriented"
          is-link
          input-align="right"
          placeholder="请选择"
          @click="PickOriented = true"
        />
        <van-popup v-model="PickOriented" position="bottom">
          <van-picker
            show-toolbar
            value-key="label"
            :columns="getParamsList.oriented"
            @cancel="PickOriented = false"
            @confirm="confirmOriented"
          />
        </van-popup>
        <!-- 房屋标题 -->
        <van-cell title="房屋标题" />
        <van-field
          v-model="title"
          rows="1"
          autosize
          type="textarea"
          placeholder="请输入标题（例如：整租 小区名 2室 5000元）"
        />
        <!-- 房屋图像 -->
        <van-cell title="房屋图像" />
        <van-field name="uploader">
          <!-- name表示的是提交的标识符 -->
          <template #input>
            <van-uploader
              v-model="uploaderImg"
              upload-icon="plus"
              :after-read="afterRead"
            />
          </template>
        </van-field>
        <!-- 房屋配置 -->
        <van-cell title="房屋配置" />
        <van-grid :border="false" :column-num="5" center square>
          <van-grid-item
            v-for="(item, index) in getParamsList.supporting"
            :key="index"
            :class="{ active: active.includes(item.label) }"
            @click="selected(item.label)"
          >
            <i :class="`home ${icon(item.label)}`"></i>
            <p>{{ item.label }}</p>
          </van-grid-item>
        </van-grid>
      </van-cell-group>
      <!-- 房屋描述 -->
      <van-cell-group>
        <van-cell title="房屋描述" />
        <van-field
          v-model="description"
          rows="1"
          :autosize="{ minHeight: 100 }"
          type="textarea"
          placeholder="请输入房屋描述信息"
        />
      </van-cell-group>
    </div>
    <!-- 底部区域 -->
    <footer>
      <van-grid direction="horizontal" :column-num="2" clickable>
        <van-grid-item text="取消" class="cancel" @click="$router.push('/')" />
        <van-grid-item text="提交" class="commit" @click="addFn" />
      </van-grid>
    </footer>
  </div>
</template>

<script>
// import Head from '@/components/head.vue'
import { getParams, publishHouseImage, getAddHouses } from '@/api'
export default {
  // components: {
  //   Head
  // },
  data() {
    return {
      price: '', // 租金
      size: '', // 建筑面积
      title: '', // 房屋标题
      uploaderImg: [], // 图片上传得到的base64位
      imgArr: [], // 处理过后的图片
      houseImg: '', // 最后可以发布的图片
      description: '', // 房屋描述的值
      active: [], // 得到的配置内容
      PickRoomType: false, // 户型的弹出框状态
      PickFloor: false, // 所在楼层的弹出框状态
      PickOriented: false, // 朝向的弹出框状态
      roomType: '', // 户型渲染页面的
      floor: '', // 所在楼层渲染页面的
      oriented: '', // 朝向渲染页面的
      roomTypeD: '', // 户型上传的
      floorD: '', // 所在楼层上传的
      orientedD: '', // 朝向上传的
      getParamsList: {} // 得到的是对象，所有发布请求的条件，选项
    }
  },
  created() {
    this.getParams()
  },
  methods: {
    // 获取发布房源所需要的条件
    async getParams() {
      try {
        const res = await getParams()
        // console.log(res.data.body)
        this.getParamsList = res.data.body
        console.log(this.getParamsList)
      } catch (err) {
        this.$toast.fail('请重新刷新网络')
      }
    },
    // 得到的base64图片进行处理
    async afterRead(file) {
      // console.log(file)
      const formData = new FormData()
      formData.append('file', file.file)
      // console.log(formData)
      const imgArr = (await publishHouseImage(formData)).data.body
      // console.log(imgArr)
      this.imgArr.push(...imgArr)
      // console.log(this.imgArr)
      this.houseImg = this.imgArr.join('|')
      // console.log(this.houseImg)
    },
    // 选择相应的图标
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
        case '床':
          return 'home-chuang'
        default:
          return 'home-jinzhi'
      }
    },
    // 选中房屋配置时候的操作
    selected(name) {
      if (this.active.includes(name)) {
        const index = this.active.findIndex((item) => item === name)
        return this.active.splice(index, 1)
      }
      this.active.push(name)
    },
    // 点击确认按钮时候触发事件，picker的确认事件，自动返回value，index两个值
    // 点击确定户型
    confirmRoomType(value) {
      this.roomType = value.label
      this.roomTypeD = value.value
      this.PickRoomType = false
    },
    // 点击确定楼层
    confirmFloor(value) {
      this.floor = value.label
      this.floorD = value.value
      this.PickFloor = false
    },
    // 点击确定朝向
    confirmOriented(value) {
      this.oriented = value.label
      this.orientedD = value.value
      this.PickOriented = false
    },
    // 按确认以后提交数据
    async addFn() {
      // console.log(this.$store.state.areaName)
      // console.log(this.title)
      // console.log(this.description)
      // console.log(this.houseImg)
      // console.log(this.orientedD)
      // console.log(this.active.join('|'))
      // console.log(this.price)
      // console.log(this.roomTypeD)
      // console.log(this.size)
      // console.log(this.floorD)
      // console.log(this.$store.state.areaId)
      try {
        const res = await getAddHouses({
          title: this.title,
          description: this.description,
          houseImg: this.houseImg,
          oriented: this.orientedD,
          supporting: this.active.join('|'),
          price: this.price,
          roomType: this.roomTypeD,
          size: this.size,
          floor: this.floorD,
          community: this.$store.state.areaId
        })
        // console.log(res)
        this.$dialog
          .confirm({
            title: '提示',
            message: '房源发布成功！',
            confirmButtonText: '继续发布', // 取消
            cancelButtonText: '去查看' // 删除
          })
          .then(() => {
            this.title = ''
            this.description = ''
            this.houseImg = ''
            this.oriented = ''
            this.active = []
            this.price = ''
            this.roomType = ''
            this.size = ''
            this.floor = ''
          })
          .catch(() => {
            this.$router.push('/layout/search')
            this.$store.commit('changeAreaName', '')
            this.$store.commit('changeAreaId', '')
          })
      } catch (err) {
        this.$toast.fail('发布失败, 请重试!')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.navbar {
  z-index: 999;
  background-color: #21b97a;
  :deep(.van-nav-bar__title) {
    color: #fff;
    font-size: 18px;
  }
  .van-icon {
    color: #fff;
  }
}
.main-content {
  background-color: #f6f5f6;
  margin-top: 46px;
  // 房源信息区域
  .container {
    padding-bottom: 60px;
    // 房源信息的名称
    .house-date {
      font-size: 15px;
      color: #21b97a;
    }
    .van-cell-group {
      margin-bottom: 17px;
    }
    // 房源信息样式
    :deep(.van-uploader__upload) {
      border: 1px solid #dedede;
      background-color: #fff;
    }
    // 房屋配置
    .van-grid {
      .active {
        color: #21b97a;
      }
      .van-grid-item {
        .home {
          font-size: 24px;
        }
        p {
          font-size: 14px;
        }
      }
    }
    // 弹出层样式
    .van-picker {
      :deep(.van-picker__toolbar) {
        border-bottom: 1px solid #dedede;
        [type='button'] {
          font-size: 17px;
          color: #108ee9;
        }
      }
    }
  }

  // 底部样式
  footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    .commit {
      :deep(.van-grid-item__content--horizontal) {
        background-color: #21b97a;
        .van-grid-item__text {
          color: #fff;
        }
      }
    }
    :deep(.van-grid-item__text) {
      font-size: 15px;
      color: #21b97a;
    }
  }
}
</style>
