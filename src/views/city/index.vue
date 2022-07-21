<template>
  <div>
    <Head title="城市列表"></Head>
    <div class="wrap">
      <van-index-bar :index-list="indexList">
        <div v-for="item in filterData" :key="item.letter">
          <van-index-anchor :index="item.letter"></van-index-anchor>
          <van-cell
            class="content"
            v-for="row in item.list"
            :key="row.value"
            :title="row.label"
            @click="clickFn(row)"
          />
        </div>
      </van-index-bar>
    </div>
  </div>
</template>

<script>
import Head from '@/components/head.vue'
import { getCity, getHot } from '@/api'
export default {
  data () {
    return {
      indexList: [], // 索引字符
      filterData: [], // 处理后的 待渲染数据
      getCityList: [],
      findList: [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z'
      ],
      getHotList: [],
      indexCity: { label: this.$store.state.cityLabel }
    }
  },
  components: {
    Head
  },
  created () {
    this.getCity()
    this.getHot()
  },
  methods: {
    async getCity () {
      try {
        const res = await getCity()
        console.log(res)
        this.getCityList = res.data.body
        // console.log(this.getCityList.dep.id)

        // 得到的是所有的存在的首字母以及内容对象
        // provice里面放的对象是key：ABC这类，value：相关首字母的对象
        const provice = {}
        this.getCityList.map(function (item) {
          // 选取每个对象中short里面的第一个字母
          const Initials = item.short[0].toUpperCase()
          if (provice[Initials]) {
            provice[Initials].push(item)
          } else {
            provice[Initials] = [item]
          }
        })
        this.filterData = []
        // 将provice转为数组
        for (const key in provice) {
          const obj = { letter: key, list: provice[key] }
          this.filterData.push(obj)
        }
        // filterData是一个数组，数组里面是对象
        // 对象的属性1：letter：A、B
        // 对象的属性2：list：[]
        // 数组里面是对象，原本的每条数据，包括返回的四个属性
        // 按字母排列
        this.filterData.sort((a, b) => {
          return a.letter.localeCompare(b.letter)
        })
        this.indexList = []
        // 为索引字符数组赋值,得到右侧的字母
        this.filterData.forEach((item) => this.indexList.push(item.letter))
        // 添加不存在的几个字母
        for (let i = 0; i < this.findList.length; i++) {
          if (this.indexList.indexOf(this.findList[i]) === -1) {
            const index = this.indexList.indexOf(this.findList[i - 1]) + 1
            this.indexList.splice(index, 0, this.findList[i])
            this.filterData.splice(index, 0, {
              letter: this.findList[i],
              list: [{ label: '暂无城市' }]
            })
          }
        }

        // 添加当前城市和热门城市
        this.indexList.splice(0, 0, '#', '热')
        this.filterData.splice(0, 0, {
          letter: '热门城市',
          list: this.getHotList
        })
        this.filterData.splice(0, 0, {
          letter: '当前城市',
          list: [this.indexCity]
        })
        // console.log(this.indexList)
        // console.log(this.filterData)
        // console.log('filterData', this.filterData)
      } catch (err) {
        this.$toast.fail('请重新刷新网络')
      }
    },
    async getHot () {
      try {
        const res = await getHot()
        // console.log(res)
        this.getHotList = res.data.body
      } catch (err) {
        this.$toast.fail('请重新刷新网络')
      }
    },
    clickFn (name) {
      // console.log(value.label)
      this.indexCity = name
      this.$store.commit('changeCity', name.label, name.value)
      this.getCityList = []
      this.getCity()
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
.wrap {
  margin-top: 48px;
  .content {
    height: 50px;
    line-height: 50px;
    font-size: 15px;
    padding: 0 15px;
    border-bottom: 1px solid #eeeeee;
  }
  :deep(.van-index-anchor) {
    color: #999;
    font-size: 14px;
  }
  :deep(.van-index-bar__sidebar) {
    margin-top: 20px;
    height: 90%;
  }
  :deep(.van-index-bar__index) {
    height: 80%;
    margin-right: 10px;
    padding: 0;
    color: #333;
    font-size: 14px;
  }
  :deep(.van-index-bar__index--active) {
    height: 15px;
    border-radius: 50%;
    background-color: #21b97a;
    color: #fff;
  }
}
</style>
