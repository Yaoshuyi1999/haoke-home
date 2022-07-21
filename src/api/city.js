import request from '@/utils/request'

// 获取城市列表数据
export const getCity = () => {
  return request({
    url: '/area/city',
    params: {
      level: 1
    }
  })
}

// 获得热门城市数据
export const getHot = () => {
  return request({
    url: '/area/hot'
  })
}
