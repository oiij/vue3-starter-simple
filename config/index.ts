export const APP_NAME = 'Vue3-Admin-Starter'
export const APP_DESCRIPTION = 'Vue3 Quick Launch Template'
export const API_BASE_PREFIX = '/api'
export const DEV_PORT = 5678
export const SERVER_PORT = 5633
export const DEV_BASE_URL = `http://127.0.0.1:${SERVER_PORT}/`

export const DEV_PROXY = {
  [API_BASE_PREFIX]: `${DEV_BASE_URL}`,
}
