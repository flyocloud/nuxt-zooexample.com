// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@flyodev/nitrocms-nuxt3'],
    flyo: {
      token: process.env.TOKEN
    }
})
