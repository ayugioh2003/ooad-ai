import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    sourcemap: false
  },
  server: {
    hmr: {
      overlay: false
    }
  },
  define: {
    global: 'globalThis'
  },
  // 忽略 source map 警告
  css: {
    devSourcemap: false
  }
})
