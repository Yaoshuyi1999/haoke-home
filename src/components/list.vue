<template>
  <div>
  </div>
</template>

<script>
export default {
  props: ['item']
}
</script>

<style scoped lang="less">
.house {
  height: 120px;
  position: relative;
  box-sizing: border-box;
  justify-content: space-around;
  padding-top: 18px;
  border-bottom: 1px solid #e5e5e5;
  background-color: #ccc;
  display: flex;
  .pic {
    width: 106px;
    height: 80px;
    margin-right: 12px;
    img {
      width: 106px;
      height: 80px;
      margin-left: 5px;
    }
  }
  .text {
    flex: 1;
    .dan {
      font-size: 15px;
      font-weight: 700;
    }
    .desc {
      font-size: 12px;
      color: #afb2b3;
    }
    .tag {
      color: #39becd;
      background: #e1f5f8;
      display: inline-block;
      font-size: 12px;
      border-radius: 3px;
      padding: 4px 5px;
      margin-right: 5px;
      line-height: 12px;
    }
    .price {
      font-size: 16px;
      color: #fa5741;
      span {
        font-size: 12px;
      }
    }
  }
}
</style>
