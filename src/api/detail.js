import request from '@/utils/request'

// 获取房屋的详细数据
export const getHouse = (id) => {
  return request({
    url: `/houses/${id}`
  })
}

// 房屋是否收藏
export const getIfFavorites = (id) => {
  return request({
    url: `/user/favorites/${id}`
  })
}

// 房屋添加收藏
export const getAddFavorites = (id) => {
  return request({
    method: 'POST',
    url: `/user/favorites/${id}`
  })
}

// 房屋删除收藏
export const getDeleteFavorites = (id) => {
  return request({
    method: 'DELETE',
    url: `/user/favorites/${id}`
  })
}
