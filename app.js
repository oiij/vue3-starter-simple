/* eslint-disable no-console */
import fs from 'node:fs'
import process from 'node:process'
import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'

const app = express()
const port = process.env.PORT || 3300

/* 代理配置 start */
const proxyOptions = {
  target: 'http://sys1.lfqqd.com', // 后端服务器地址
  changeOrigin: true, // 处理跨域
  pathRewrite: {
    '^/api': '/api',
  },
}
const exampleProxy = createProxyMiddleware(['/api'], proxyOptions) // api前缀的请求都走代理
app.use(exampleProxy)
/* 代理配置 end */

app.use('/', express.static('./dist'))
app.get('*', (req, res) => {
  const indexHtml = fs.readFileSync('./dist/index.html', 'utf-8')
  res.send(indexHtml)
})

app.listen(port, () => {
  console.log(`Local: http://localhost:${port}`)
})
