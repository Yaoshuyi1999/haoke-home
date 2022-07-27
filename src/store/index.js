import Vue from 'vue'
import Vuex from 'vuex'
import { getToken, setToken } from '@/utils'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    // 声明,进行初始化服务
    user: getToken() || '',
    cityLabel: '北京',
    cityId: 'AREA|88cff55c-aaa4-e2e0',
    houseId: '5cc4494549926d0e2b94c816',
    areaId: '', // 小区
    areaName: '',
    houseParams: {
      cityId: 'AREA|88cff55c-aaa4-e2e0', // ID地区AREA|88cff55c-aaa4-e2e0
      area: '', // 地区AREA|88cff55c-aaa4-e2e0
      subway: '', // 地铁subway - 地铁
      rentType: '', // 整租true
      price: '', // 价格null
      more: '', // 复合查询CHARI76eb0532-8099-d1f4,FLOOR(1,ARE
      start: 1, // 开始项1
      end: 20 // 结束项20
    }
  },
  // 修改数据的地方
  mutations: {
    // 修改token
    setUser(state, payload) {
      state.user = payload
      // token放在本地存储
      setToken(payload)
    },
    // 修改城市点
    changeCityLabel(state, indexLabel) {
      state.cityLabel = indexLabel
    },
    changeCityValue(state, indexValue) {
      state.cityId = indexValue
      state.houseParams.cityId = indexValue
    },
    // 修改房屋id
    changeHouse(state, houseCode) {
      state.houseId = houseCode
    },
    // 修改小区
    changeAreaName(state, areaName) {
      state.areaName = areaName
    },
    changeAreaId(state, areaId) {
      state.areaId = areaId
    },
    // 修改筛选
    changeHouseParams(state, value) {
      state.houseParams = value
    }
  }
})
