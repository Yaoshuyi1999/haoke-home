import request from '@/utils/request'

// 获得发布房源所需的条件
export const getParams = () => {
  return request({
    url: '/houses/params'
  })
}

// 房屋图像上传
export const publishHouseImage = (file) => {
  return request({
    url: '/houses/image',
    data: file,
    method: 'POST'
  })
}

// 发布房源
export const getAddHouses = (data) => {
  return request({
    url: '/user/houses',
    method: 'POST',
    data
  })
}
