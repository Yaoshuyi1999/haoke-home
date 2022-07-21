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
