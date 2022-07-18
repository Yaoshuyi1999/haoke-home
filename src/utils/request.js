import axios from 'axios'
import store from '@/store'

const request = axios.create({
  // 请求根路径
  baseURL: 'http://liufusong.top:8080',
  timeout: 3000
})

// 添加请求拦截器
request.interceptors.request.use(
  (config) => {
    const token = store.state.user
    // 在发送请求之前做些什么
    config.headers.Authorization = token
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

export default request
