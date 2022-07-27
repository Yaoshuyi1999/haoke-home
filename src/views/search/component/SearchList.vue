<template>
  <ul>
    <List
      v-for="item in getHousesInfoList"
      :key="item.houseCode"
      :houseList="item"
    ></List>
  </ul>
</template>

<script>
import { getHousesInfo } from '@/api'
import eventBus from './EventBus'
import List from '@/components/list.vue'
export default {
  components: {
    List
  },
  data() {
    return {
      getHousesInfoList: []
    }
  },
  created() {
    this.getHousesInfo()
    eventBus.$on('sendDropdown', () => {
      this.getHousesInfo()
    })
  },
  methods: {
    async getHousesInfo() {
      const res = await getHousesInfo(this.$store.state.houseParams)
      this.getHousesInfoList = res.data.body.list
      // console.log(res, 1)
      console.log(this.getHousesInfoList)
    }
  }
}
</script>

<style></style>
