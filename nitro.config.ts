import { defineConfig } from 'nitro'

export default defineConfig({
  serverDir: './server',
  output: {
    publicDir: 'dist',
  },
})
