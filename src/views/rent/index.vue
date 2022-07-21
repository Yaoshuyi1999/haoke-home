<template>
  <div>
    <Head title="房屋管理"></Head>
    <ul>
      <List
        v-for="item in getRentList"
        :key="item.houseCode"
        :houseList="item"
      ></List>
    </ul>
  </div>
</template>

<script>
import Head from '@/components/head.vue'
import List from '@/components/list.vue'
import { getRent } from '@/api'
export default {
  data () {
    return {
      getRentList: {}
    }
  },
  components: {
    Head,
    List
  },
  created () {
    this.getRent()
  },
  methods: {
    async getRent () {
      try {
        const res = await getRent()
        // console.log(res)
        this.getRentList = res.data.body
      } catch (err) {
        this.$toast.fail('请重新刷新网络')
      }
    }
  }
}
</script>

<style scoped lang="less">
ul {
  margin-top: 48px;
}
</style>
