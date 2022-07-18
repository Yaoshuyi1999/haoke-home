import request from '@/utils/request'
// import store from '@/store'

// 登录成功以后，请求回用户数据
export const getUserInfo = () => {
  return request({
    url: '/user',
    method: 'GET'
    // headers: {
    //   Authorization: store.state.user.token
    // }
  })
}
