<template>
  <div class="main-content">
    <!-- 头部区域 -->
    <div class="title">
      <van-nav-bar title="发布房源" left-arrow @click-left="$router.back()" />
    </div>

    <!-- 房源信息区域 -->
    <div class="container">
      <van-cell-group>
        <van-cell value="房源信息" value-class="house-info" />
        <van-cell title="小区名称" is-link value="请输入小区名称" />
        <van-field v-model="price" label="租金" placeholder="请输入租金/月">
          <template #right-icon>￥/月</template></van-field
        >
        <van-field v-model="size" label="建筑面积" placeholder="请输入建筑面积">
          <template #right-icon>m²</template></van-field
        >
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
        <van-popup v-model="PickRoomType" round position="bottom">
          <van-picker
            show-toolbar
            :columns="['一室', '二室', '三室', '四室', '四室+']"
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
        <van-popup v-model="PickFloor" round position="bottom">
          <van-picker
            show-toolbar
            :columns="['高楼层', '中楼层', '低楼层']"
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
        <van-popup v-model="PickOriented" round position="bottom">
          <van-picker
            show-toolbar
            :columns="['东', '西', '南', '北', '东南', '东北', '西南', '西北']"
            @cancel="PickOriented = false"
            @confirm="confirmOriented"
          />
        </van-popup>
        <van-cell title="房屋标题" />
        <van-field
          v-model="title"
          rows="1"
          autosize
          type="textarea"
          placeholder="请输入标题（例如：整租 小区名 2室 5000元）"
        />
        <van-cell title="房屋图像" />
        <van-field name="uploader">
          <template #input>
            <van-uploader v-model="houseImg" upload-icon="plus" />
          </template>
        </van-field>
        <van-cell title="房屋配置" />
        <van-grid :border="false" :column-num="5" center square>
          <van-grid-item
            v-for="(item, index) in supporting"
            :key="item"
            :class="{ active: active.includes(index) }"
            @click="selected(index)"
          >
            <i class="iconfont" v-html="supporting[index]"></i>
            <p>{{ index }}</p>
          </van-grid-item>
        </van-grid>
      </van-cell-group>
      <!-- 房屋描述 -->
      <van-cell-group>
        <van-cell title="房屋描述" />
        <van-field
          v-model="description"
          rows="1"
          :autosize="{ minHeight: 150 }"
          type="textarea"
          placeholder="请输入房屋描述信息"
        />
      </van-cell-group>
    </div>
    <!-- 底部区域 -->
    <footer>
      <van-grid direction="horizontal" :column-num="2" clickable>
        <van-grid-item text="取消" class="cancel" />
        <van-grid-item text="提交" class="commit" />
      </van-grid>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'AddHouse',

  data() {
    return {
      price: '',
      size: '',
      title: '',
      houseImg: [],
      supporting: {
        衣柜: '&#xe7eb;',
        洗衣机: '&#xe67d;',
        空调: '&#xe632;',
        天然气: '&#xe60f;',
        冰箱: '&#xe625;',
        暖气: '&#xe610;',
        电视: '&#xe680;',
        热水器: '&#xe611;',
        宽带: '&#xe66c;',
        沙发: '&#xe652;'
      },
      description: '',
      active: [],
      PickRoomType: false,
      PickFloor: false,
      PickOriented: false,
      roomType: '',
      floor: '',
      oriented: ''
    }
  },

  mounted() {},

  methods: {
    selected(name) {
      if (this.active.includes(name)) {
        const index = this.active.findIndex((item) => item === name)
        return this.active.splice(index, 1)
      }
      this.active.push(name)
    },
    confirmRoomType(value) {
      this.roomType = value
      this.PickRoomType = false
    },
    confirmFloor(value) {
      this.floor = value
      this.PickFloor = false
    },
    confirmOriented(value) {
      this.oriented = value
      this.PickOriented = false
    }
  }
}
</script>

<style lang="less" scoped>
body {
  background-color: #f6f5f6;
}
.main-content {
  background-color: #f6f5f6;
}
// 头部样式
.title {
  :deep(.van-nav-bar__content) {
    background-color: #21b97a;
  }
  :deep(.van-nav-bar__title) {
    font-size: 36px;
    color: #fff;
  }
  :deep(.van-nav-bar__arrow) {
    color: #fff;
  }
}
.container {
  padding-bottom: 120px;
  .van-cell-group {
    margin-bottom: 35px;
  }
}
.house-info {
  color: #21b97a;
  font-size: 30px;
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
    .iconfont {
      font-size: 46px;
    }
    p {
      font-size: 28px;
    }
  }
}
// 弹出层样式
.van-picker {
  :deep(.van-picker__toolbar) {
    border-bottom: 1px solid #dedede;
    [type='button'] {
      font-size: 34px;
      color: #108ee9;
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
    font-size: 30px;
    color: #21b97a;
  }
}
</style>
