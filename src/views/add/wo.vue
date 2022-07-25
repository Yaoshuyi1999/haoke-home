<template>
  <div>
    <Head title="发布房源"></Head>
    <van-form>
      <!-- 房源信息 -->
      <van-cell class="house-date" title="房源信息" />
      <div>
        <van-cell value="请输入小区名称" is-link>
          <template #title>
            <van-field v-model="value" label="小区名称" placeholder="" />
          </template>
        </van-cell>
        <van-cell value="￥/月">
          <template #title>
            <van-field
              v-model="value"
              label="租金"
              placeholder="请输入租金/月"
            />
          </template>
        </van-cell>
        <van-cell value="m³">
          <template #title>
            <van-field
              v-model="value"
              label="建筑面积"
              placeholder="请输入建筑面积"
            />
          </template>
        </van-cell>
        <van-cell value="请选择" is-link>
          <template #title>
            <van-field v-model="value" label="户型" placeholder="" />
          </template>
        </van-cell>
        <van-cell value="请选择" is-link>
          <template #title>
            <van-field v-model="value" label="所在楼层" placeholder="" />
          </template>
        </van-cell>
        <van-cell value="请选择" is-link>
          <template #title>
            <van-field v-model="value" label="朝向" placeholder="" />
          </template>
        </van-cell>
      </div>
      <van-cell title="房屋标题">
        <template #label>
          <van-field
            v-model="value"
            placeholder="
            请输入标题(请输入标题(例如:整租 小区名 2室 5000元))"
          />
        </template>
      </van-cell>
      <van-cell title="房屋图像">
        <template #label>
          <van-field name="uploader">
            <template #input>
              <van-uploader>
                <van-icon name="plus" />
              </van-uploader>
            </template>
          </van-field>
        </template>
      </van-cell>
      <van-cell title="房屋配置">
        <template #label>
          <van-field name="checkbox" label="复选框">
            <template #input>
              <van-checkbox-group
                v-model="checkboxGroup"
                direction="horizontal"
              >
                <van-checkbox v-model="checked">
                  衣柜
                  <template #icon>
                    <i class="home home-yigui"></i>
                  </template>
                </van-checkbox>
                <van-checkbox name="2">冰箱</van-checkbox>
              </van-checkbox-group>
            </template>
          </van-field>
        </template>
      </van-cell>
      <van-cell title="房屋描述">
        <template #label>
          <van-field
            v-model="value"
            placeholder="
            请输入房屋描述信息"
          />
        </template>
      </van-cell>
    </van-form>
    <div class="btn">
      <div>取消</div>
      <div class="yes">提交</div>
    </div>
  </div>
</template>

<script>
import Head from '@/components/head.vue'
export default {
  data() {
    return {
      value: ''
    }
  },
  components: {
    Head
  }
}
</script>

<style scoped lang="less">
.van-form {
  margin-top: 46px;
  font-size: 14px;
  .house-date {
    font-size: 15px;
    color: #21b97a;
  }
  .van-cell {
    font-size: 14px;
    padding: 7px 15px;
    // box-sizing: border-box;
  }
  .van-cell--clickable{
    padding:0
  }
}

.btn {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 45px;
  line-height: 45px;
  text-align: center;
  font-size: 15px;
  color: #21b97a;
  background-color: #fff;
  div {
    flex: 1;
    &.yes {
      background-color: #21b97a;
      color: #fff;
    }
  }
}
</style>
