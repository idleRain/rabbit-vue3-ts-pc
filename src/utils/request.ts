import axios, { AxiosError } from 'axios'
import { Message } from '@/components/message'

// 备用接口地址1: http://pcapi-xiaotuxian-front-devtest.itheima.net/
// 备用接口地址2: https://apipc-xiaotuxian-front.itheima.net
// 备用接口地址3: http://pcapi-xiaotuxian-front.itheima.net/
const instance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front.itheima.net/',
  // timeout: 5000
  timeout: 200000
  // timeout: 1
})

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    return response
  }, function (error: AxiosError<{message: string, code: string}>) {
    // 对响应错误做点什么
    if (!error.response) {
      Message.error('网络异常，请稍后重试')
    }else {
      Message.error(error.response.data.message)
    }
    return Promise.reject(error)
  }
)

export default instance
