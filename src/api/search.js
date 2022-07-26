import request from '@/utils/request'
import store from '@/store'

// 获取房屋查询条件
export const getCondition = () => {
  return request({
    url: '/houses/condition',
    params: {
      id: store.state.cityId
    }
  })
}

// 根据条件查询房屋
export const getHousesInfo = (params) => {
  return request({
    url: '/houses',
    params
  })
}
