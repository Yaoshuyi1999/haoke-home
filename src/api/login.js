import request from '@/utils/request'

// 登录页面的请求确认账号密码
export const login = (body) => {
  return request({
    url: '/user/login',
    method: 'POST',
    data: body
  })
}
