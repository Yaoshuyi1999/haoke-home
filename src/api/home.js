import request from '@/utils/request'

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
      area: 1 // 目前先给了固定的，后面如果对于地区的id，有得到，就更改
    }
  })
}
