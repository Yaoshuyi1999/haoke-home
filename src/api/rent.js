// 我的出租，房屋管理
import request from '@/utils/request'
export const getRent = () => {
  return request({
    url: '/user/houses'
  })
}
