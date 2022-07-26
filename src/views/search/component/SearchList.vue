<template>
  <div>
    <!-- <List
      v-for="item in getHousesInfoList"
      :key="item.houseCode"
      :houseList="item"
    ></List> -->
    <List></List>
  </div>
</template>

<script>
import { getHousesInfo } from '@/api'
// import List from '@/components/list.vue'
export default {
  // components: {
  //   List
  // },
  props: {
    params: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      getHousesInfoList: []
    }
  },
  created() {
    this.getHousesInfo()
  },
  methods: {
    async getHousesInfo() {
      const res = await getHousesInfo(this.$store.state.houseParams)
      //   this.getHousesInfoList = res.data.body
      console.log(res)
    }
  }
}
</script>

<style></style>
