import request from '@/utils/request'

export const login = body => {
  return request({
    url: '/user/login',
    method: 'POST',
    data: body
  })
}
