// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
 ssr: true,

 // 调试工具
 devtools: { enabled: true },

 // 应用模块
 modules: ['@vant/nuxt'],

 postcss: {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 375,
    },
  },
},



 compatibilityDate: '2024-07-05',
})