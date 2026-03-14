import { defineHandler, getRequestIP } from 'nitro/h3'

export default defineHandler((event) => {
  const ip = getRequestIP(event)
  const cityHeader = event.req.headers.get('x-vercel-ip-city') as string
  const city = cityHeader ? decodeURIComponent(cityHeader) : '-'
  return {
    ip,
    city,
  }
})
