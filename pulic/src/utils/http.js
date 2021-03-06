// @ts-nocheck
import qs from 'qs'
import axios from 'axios';
// import Message from 'Message';

axios.defaults.baseURL = baseURL || '';

// 处理post请求的查询字符串
// axios.defaults.headers = {'content-type': 'application/x-www-form-urlencoded'}
axios.defaults.transformRequest = [(data) => {
  return Object.prototype.toString.call(data) != '[object FormData]' ? qs.stringify(data) : data;
}]


// 请求发送拦截器
axios.interceptors.request.use(
  config => {
    // if(config.method === 'post') {
    //   config.data = qs.parse(config.data)
    // }
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