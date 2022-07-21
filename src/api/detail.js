import request from '@/utils/request'

// 获取房屋的详细数据
export const getHouse = (id) => {
  return request({
    url: `/houses/${id}`
  })
}
