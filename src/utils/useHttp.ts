/* eslint-disable no-console */

import type {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import axios from 'axios'
import NProgress from 'nprogress'

const BASE_PREFIX = import.meta.env.VITE_API_BASE_PREFIX
const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_PREFIX,
  timeout: 1000 * 30,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (!NProgress.isStarted())
      NProgress.start()
    return config
  },
  (error: AxiosError) => {
    console.error('request-error', error)
    return Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    NProgress.done()
    console.log('response', response)
    return response.data
  },
  (error: AxiosError) => {
    NProgress.done()
    console.error('response-error', error)
    window.$message.error(error.message)
    return Promise.reject(error)
  },
)

export function get<RES = any, REQ = object>(path: string, data?: REQ): Promise<RES> {
  return axiosInstance(path, {
    method: 'get',
    params: data,
  })
}
export function post<RES extends string | object>(path: string, data?: Record<string, any>): Promise<RES> {
  return axiosInstance(path, {
    method: 'post',
    data,
  })
}
