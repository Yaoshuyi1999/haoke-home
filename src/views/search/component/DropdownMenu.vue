<template>
  <van-dropdown-item :title="title" ref="dropdown">
    <van-picker
      show-toolbar
      toolbar-position="bottom"
      confirm-button-text="确定"
      value-key="label"
      @confirm="onConfirm"
      @cancel="onCancel"
      :columns="DropdownMenu"
    >
    </van-picker>
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
    DropdownMenu: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      toggle: ''
    }
  },
  methods: {
    onConfirm(value, index) {
      const params = this.$store.state.houseParams
      // console.log(params)
      // console.log('确定')
      // console.log(value)
      // console.log(index)
      // console.log(this.title)
      this.$refs.dropdown.toggle(false)
      switch (this.title) {
        case '区域':
          const place = this.DropdownMenu[index[0]].value
          const noplace = place === 'area' ? 'subway' : 'area'
          params[place] =
            this.DropdownMenu[index[0]].children[index[1]].children[
              index[2]
            ].value
          params[noplace] = ''
          console.log(params)
          this.$store.commit('changeHouseParams', params)
          break
        case '方式':
          params.rentType = value.value
          console.log(params)
          this.$store.commit('changeHouseParams', params)
          break
        case '租金':
          params.price = value.value
          console.log(params)
          this.$store.commit('changeHouseParams', params)
          break
      }
      eventBus.$emit('sendDropdown')
    },
    // 切换菜单展示状态
    onCancel() {
      // console.log('取消')
      //
      this.$refs.dropdown.toggle(false)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.van-picker__toolbar {
  height: 50px;
  .van-picker__confirm {
    width: 65%;
    padding: 0;
    height: 100%;
    background-color: #21b97a;
    font-size: 18px;
    color: #fff;
  }
  .van-picker__cancel {
    flex: 1;
    border: 1px solid #e9e9e9;
    font-size: 18px;
    color: #21b97a;
    background-color: #fff;
  }
}
</style>
