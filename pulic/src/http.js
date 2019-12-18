// @ts-nocheck
import qs from 'qs'
import axios from 'axios';
// import Message from 'Message';

axios.defaults.baseURL = 'http://127.0.0.1:8080';

// 处理post请求的查询字符串
axios.defaults.transformRequest = [(data) => {
  return Object.prototype.toString.call(data) != '[object FormData]' 
  ? qs.stringify(data) : data;
}]


// // 请求发送拦截器
axios.interceptors.request.use(
  config => {
    // let { data } = config
    console.log(config)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 请求响应拦截器
axios.interceptors.response.use(
  config => {
    let { data } = config
    return data
  },
  error => {
    return Promise.reject(error)
  }
)

export default axios