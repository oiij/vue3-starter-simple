/* eslint-disable no-console */
import fs from 'node:fs'
import process from 'node:process'
import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'

const app = express()
const port = process.env.PORT || 3300

/* 代理配置 start */

const exampleProxy = createProxyMiddleware({
  target: 'http://www.example.org/api',
  changeOrigin: true,
}) // api前缀的请求都走代理
app.use('/api', exampleProxy)
/* 代理配置 end */

app.use('/', express.static('./dist'))
app.get('*', (_, res) => {
  const indexHtml = fs.readFileSync('./dist/index.html', 'utf-8')
  res.send(indexHtml)
})

app.listen(port, () => {
  console.log(`Local: http://localhost:${port}`)
})
