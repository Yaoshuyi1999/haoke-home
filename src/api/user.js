import request from '@/utils/request'
import store from '@/store'

// 登录页面的请求确认账号密码
export const login = (body) => {
  return request({
    url: '/user/login',
    method: 'POST',
    data: body
  })
}

// 登录成功以后，请求回用户数据
export const getUserInfo = () => {
  return request({
    url: '/user',
    method: 'GET',
    header: {
      Authorization: store.state.user.token
    }
  })
}
