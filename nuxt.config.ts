// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["bootstrap/dist/css/bootstrap.min.css"], // add
  modules: [
    ['@flyodev/nitrocms-nuxt3']
  ],
  build: {
    transpile: ['@flyodev/nitrocms-nuxt3', '@flyodev/nitrocms-js', '@flyodev/nitrocms-vue3']
  }
})
