/* eslint-disable no-console */
import NProgress from 'nprogress'
import type {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import axios from 'axios'

const BASE_PREFIX = import.meta.env.VITE_API_BASE_PREFIX || ''
const STATUS_TEXT: { [key: number]: string } = {
  200: '200请求成功',
  400: '400请求错误',
  401: '401无权限',
  403: '403认证失败',
  404: '404找不到',
  500: '500服务器错误',
}
// 创建实例
const axiosInstance: AxiosInstance = axios.create({
  // 前缀
  baseURL: BASE_PREFIX,
  // 超时
  timeout: 1000 * 30,
  // 请求头
  headers: {
    'Content-Type': 'application/json',
  },
})
// 请求拦截器
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // TODO 在这里可以加上想要在请求发送前处理的逻辑
    // TODO 比如 loading 等
    if (!NProgress.isStarted())
      NProgress.start()
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    NProgress.done()
    if (response.status === 200)
      return response.data

    return Promise.reject(response.data)
  },
  (error: AxiosError<{ msg: string }>) => {
    NProgress.done()
    const { response, request } = error
    if (response) {
      console.log(response)

      const code = response.status
      window.$notification.error({
        title: STATUS_TEXT[code] || `${code}错误`,
        duration: 5 * 1000,
      })
      return Promise.reject(response.data)
    }
    if (request) {
      console.log(request)

      window.$notification.error({ title: '出错了~', duration: 3000 })
      return Promise.reject(error)
    }
  },
)

export const get: <RES = any, REQ = object>(
  path: string,
  data?: REQ,
) => Promise<AxiosResponse<RES, REQ>['data']> = (path, data) => {
  return axiosInstance.get(path, {
    params: data,
  })
}

export const post: <RES = any, REQ = object>(
  path: string,
  data?: REQ,
) => Promise<AxiosResponse<RES, REQ>['data']> = (path, data) => {
  return axiosInstance.post(path, data)
}
export const http = {
  get,
  post,
}
