// 我的收藏
import request from '@/utils/request'
export const getFavorites = () => {
  return request({
    url: '/user/favorites'
  })
}
