<template>
  <div>
    <Head title="收藏列表"></Head>
    <ul>
      <List
        v-for="item in getFavoritesList"
        :key="item.houseCode"
        :title="item.title"
        :desc="item.desc"
        :tags="item.tags"
        :price="item.price"
        :imgUrl='item.houseImg'
      ></List>
    </ul>
  </div>
</template>

<script>
import Head from '@/components/head.vue'
import List from '@/components/list.vue'
import { getFavorites } from '@/api'
export default {
  data () {
    return {
      getFavoritesList: {}
    }
  },
  components: {
    Head,
    List
  },
  created () {
    this.getFavorites()
  },
  methods: {
    async getFavorites () {
      try {
        const res = await getFavorites()
        // console.log(res)
        this.getFavoritesList = res.data.body
      } catch (err) {
        this.$toast.fail('请重新刷新网络')
      }
    }
  }
}
</script>

<style scoped lang='less'>
ul{
  margin-top: 48px;
}
</style>
