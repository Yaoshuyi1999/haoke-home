<template>
  <van-dropdown-item :title="title">
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
  methods: {
    onConfirm () {
      console.log('确定')
    },
    onCancel () {
      console.log('取消')
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
