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
    houseId: '5cc4494549926d0e2b94c816'
  },
  // 修改数据的地方
  mutations: {
    // 修改token
    setUser (state, payload) {
      state.user = payload
      // token放在本地存储
      setToken(payload)
    },
    // 修改城市点
    changeCity (state, indexLabel, indexValue) {
      state.cityLabel = indexLabel
      state.cityId = indexValue
    },
    // 修改房屋id
    changeHouse (state, houseCode) {
      state.houseId = houseCode
    }
  }
})
