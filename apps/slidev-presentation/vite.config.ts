import { defineConfig } from 'vite'

export default defineConfig({
  base: '/ooad-ai/', // process.env.NODE_ENV === 'production' ? '/ooad-ai/' : '/',
  build: {
    sourcemap: false,
    outDir: 'dist'
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
