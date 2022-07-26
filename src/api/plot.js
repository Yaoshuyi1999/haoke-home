import request from '@/utils/request'

// 小区关键词查找
export const getCommunity = (params) => {
  return request({
    url: '/area/community',
    params
  })
}
