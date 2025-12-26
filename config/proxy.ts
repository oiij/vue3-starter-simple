const DEV_BASE_URL = 'http://127.0.0.1:5633/'
const RELEASE_BASE_URL = 'http://127.0.0.1:5633'

export const DEV_PROXY = {
  '/api': `${DEV_BASE_URL}api`,
}
export const RELEASE_PROXY = {
  '/api': `${RELEASE_BASE_URL}api`,
}
