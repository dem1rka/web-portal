// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/leaflet'],
  
  // Добавляем глобальные переходы
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' }
  },
  
  // Добавляем компоненты
  components: [
    { path: '~/components', pathPrefix: false }
  ],
  
  // CSS
  css: ['~/assets/css/transitions.css']
})