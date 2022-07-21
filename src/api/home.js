import request from '@/utils/request'
import store from '@/store'

// 轮播图
export const getSwiper = () => {
  return request({
    url: '/home/swiper'
  })
}

// 租房小组数据
export const getGroups = () => {
  return request({
    url: '/home/groups',
    params: {
      area: store.state.cityId
    }
  })
}
