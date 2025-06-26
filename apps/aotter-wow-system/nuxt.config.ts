// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    // Private keys (only available on server-side)
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
    // Public keys (exposed to client-side)
    public: {
      apiBase: '/api',
      appName: 'Aotter Wow'
    }
  },
  nitro: {
    storage: {
      db: {
        driver: 'fs',
        base: './data'
      }
    }
  },
  compatibilityDate: '2025-06-26'
})
